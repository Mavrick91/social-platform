import { useMarkNotificationsAsReadMutation } from '@/__generated__/graphql';

export default function useMarkNotificationsAsRead() {
  return useMarkNotificationsAsReadMutation({
    update(cache, { data }) {
      if (data?.markNotificationsAsRead) {
        data.markNotificationsAsRead.forEach((notification) => {
          cache.evict({
            id: cache.identify({
              __typename: 'NotificationUser',
              id: notification.id,
            }),
          });
        });
      }
    },
  });
}
