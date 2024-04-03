import {
  NotificationFragmentFragment,
  useGetNotificationsQuery,
  useMarkNotificationsAsReadMutation,
} from '@/__generated__/graphql';
import QuerySpinner from '@/components/ui/QuerySpinner';
import moment from 'moment';
import { useEffect } from 'react';
import NotificationItem from './NotificationItem';

const NOTIFICATION_CATEGORIES = [
  {
    label: 'New',
    filter: (notification: NotificationFragmentFragment) => !notification.read,
  },
  {
    label: 'Today',
    filter: (notification: NotificationFragmentFragment) =>
      moment().isSame(notification.createdAt, 'day'),
  },
  {
    label: 'Yesterday',
    filter: (notification: NotificationFragmentFragment) =>
      moment().subtract(1, 'days').isSame(notification.createdAt, 'day'),
  },
  {
    label: 'Last 7 days',
    filter: (notification: NotificationFragmentFragment) =>
      moment().diff(notification.createdAt, 'days') <= 7,
  },
  {
    label: 'Last 30 days',
    filter: (notification: NotificationFragmentFragment) =>
      moment().diff(notification.createdAt, 'days') <= 30,
  },
  { label: 'Older', filter: () => true },
];

const categorizeNotifications = (
  notifications: NotificationFragmentFragment[]
) => {
  const categorizedNotifications = NOTIFICATION_CATEGORIES.map(({ label }) => ({
    label,
    items: [] as NotificationFragmentFragment[],
  }));

  notifications.forEach((notification) => {
    const category = NOTIFICATION_CATEGORIES.find(({ filter }) =>
      filter(notification)
    );
    if (category) {
      categorizedNotifications
        .find(({ label }) => label === category.label)
        ?.items.push(notification);
    }
  });

  return categorizedNotifications.filter(({ items }) => items.length > 0);
};

export default function NotificationList() {
  const { data, loading, error } = useGetNotificationsQuery();
  const [markNotifAsRead] = useMarkNotificationsAsReadMutation();

  useEffect(() => {
    const newNotifications = data?.notifications.filter(
      (notification) => !notification.read
    );
    if (newNotifications?.length) {
      markNotifAsRead({
        variables: { notificationIds: newNotifications.map((n) => n.id) },
      });
    }
  }, [data, markNotifAsRead]);

  if (loading) return <QuerySpinner />;
  if (error || !data) return <div>Error fetching notifications</div>;

  const categorizedNotifications = categorizeNotifications(data.notifications);

  return (
    <div className="flex flex-col">
      <div className="min-h-0 overflow-y-auto grow max-h-screen">
        <div className="text-2xl font-semibold pt-3 pl-6 pb-6">
          Notifications
        </div>
        <div className="mb-6 relative">
          {categorizedNotifications.map(({ label, items }) => {
            if (!items.length) return null;

            return (
              <div key={label} className="border-b border-separator pb-4">
                <div className="font-bold px-6 py-2">{label}</div>
                {items.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
