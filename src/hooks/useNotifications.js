import { useSyncExternalStore, useMemo } from "react";
import { notificationsStore } from "../utils/notificationsStore.js";

/**
 * useNotifications - React hook for reactive notifications state.
 *
 * Uses useSyncExternalStore with a strictly cached snapshot reference
 * to prevent re-render loops.
 */
export function useNotifications() {
  const notifications = useSyncExternalStore(
    notificationsStore.subscribe,
    notificationsStore.getSnapshot
  );

  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.isRead).length;
  }, [notifications]);

  return {
    notifications,
    unreadCount,
    markAsRead: notificationsStore.markAsRead,
    markAllAsRead: notificationsStore.markAllAsRead,
    dismissNotification: notificationsStore.dismissNotification,
  };
}
