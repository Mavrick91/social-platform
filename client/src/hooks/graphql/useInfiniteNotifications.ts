import {
  NotificationFragmentFragment,
  useGetNotificationsQuery,
} from '@/__generated__/graphql';
import { useCallback, useState } from 'react';

export const useInfiniteNotifications = () => {
  const [page, setPage] = useState(1);
  const [allNotifications, setAllNotifications] = useState<
    NotificationFragmentFragment[]
  >([]);

  const { data, loading, error } = useGetNotificationsQuery({
    variables: { page, limit: 20 },
    onCompleted: (data) => {
      if (data?.notifications?.notifications) {
        setAllNotifications((prevNotifications) => [
          ...prevNotifications,
          ...data.notifications.notifications,
        ]);
      }
    },
  });

  const hasNextPage =
    data?.notifications.currentPage ??
    0 < (data?.notifications.totalPages ?? 0);

  const fetchNextPage = useCallback(() => {
    if (hasNextPage) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [hasNextPage]);

  return {
    notifications: allNotifications,
    loading,
    error,
    fetchNextPage,
    hasNextPage,
    setAllNotifications,
  };
};
