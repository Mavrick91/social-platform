import { NotificationFragmentFragment } from '@/__generated__/graphql';
import moment from 'moment';
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

type Props = {
  notifications: NotificationFragmentFragment[];
  hasNextPage: number | boolean;
  fetchNextPage: () => void;
};

export default function NotificationList({
  notifications,
  hasNextPage,
  fetchNextPage,
}: Props) {
  const categorizedNotifications = categorizeNotifications(notifications);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 20 && hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <div className="flex flex-col">
      <div
        className="min-h-0 overflow-y-auto grow max-h-screen"
        onScroll={handleScroll}
      >
        <div className="text-2xl font-semibold text-primary-text pt-3 pl-6 pb-6">
          Notifications
        </div>
        <div className="relative">
          {categorizedNotifications.map(({ label, items }) => {
            if (!items.length) return null;

            return (
              <div key={label} className="border-b border-separator pb-4">
                <div className="font-bold px-6 py-2 text-primary-text">
                  {label}
                </div>
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
