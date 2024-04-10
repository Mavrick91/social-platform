import {
  NotificationFragmentFragment,
  useMarkNotificationsAsReadMutation,
} from '@/__generated__/graphql';
import { NOTIFICATION_FRAGMENT } from '@/graphql/queries/notification';

export default function useMarkNotificationsAsRead(
  setAllNotifications: React.Dispatch<
    React.SetStateAction<NotificationFragmentFragment[]>
  >
) {
  return useMarkNotificationsAsReadMutation({
    update(cache, { data }) {
      if (data?.markNotificationsAsRead) {
        const notificationIds = new Set(
          data.markNotificationsAsRead.map((notification) => notification.id)
        );

        const updatedNotifications: NotificationFragmentFragment[] = [];

        cache.modify({
          fields: {
            notifications(existingNotifications = {}, { readField }) {
              const newNotifications = existingNotifications.notifications?.map(
                (notificationRef: any) => {
                  const notificationId = readField('id', notificationRef);

                  if (notificationIds.has(notificationId as number)) {
                    const updatedNotification = cache.writeFragment({
                      id: cache.identify(notificationRef),
                      fragment: NOTIFICATION_FRAGMENT,
                      data: {
                        ...notificationRef,
                        read: true,
                      },
                      fragmentName: 'NotificationFragment',
                    });

                    updatedNotifications.push(updatedNotification);

                    return updatedNotification;
                  }

                  return notificationRef;
                }
              );

              return {
                ...existingNotifications,
                notifications: newNotifications,
              };
            },
          },
        });

        setAllNotifications((prevNotifications) =>
          prevNotifications.map((notification) =>
            notificationIds.has(notification.id)
              ? { ...notification, read: true }
              : notification
          )
        );
      }
    },
  });
}
