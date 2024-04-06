import {
  NotificationFragmentFragment,
  useNotificationAddedSubscription,
} from '@/__generated__/graphql';

export default function useNotificationAdded(
  userId: number,
  setAllNotifications: React.Dispatch<
    React.SetStateAction<NotificationFragmentFragment[]>
  >
) {
  return useNotificationAddedSubscription({
    variables: { userId },
    onData: (data) => {
      if (!data.data.data?.notificationAdded) return;

      const newNotification = data.data.data.notificationAdded;

      setAllNotifications((prevNotifications) => [
        newNotification,
        ...prevNotifications,
      ]);
    },
  });
}
