import { revisionData, scheduleData } from "../data/dashboard/scheduleData.js";
import { heroData } from "../data/dashboard/heroData.js";
import { STORAGE_KEYS, getStoredItem, setStoredItem } from "./storage.js";

/**
 * Skillscovery - Centralized Notifications Store
 * Derives notifications strictly from verified application data
 * (overdue spaced revisions, active schedule blocks, and learning streak).
 *
 * Implements a strictly cached snapshot reference for useSyncExternalStore
 * to guarantee reference stability and prevent infinite render loops.
 */

// Build base notifications strictly from real application data
function deriveBaseNotifications() {
  const items = [];

  // 1. Spaced Repetition items from revisionData
  if (revisionData && Array.isArray(revisionData.items)) {
    revisionData.items.forEach((rev) => {
      if (rev.isOverdue) {
        items.push({
          id: `notif-rev-${rev.id}`,
          title: "Spaced Repetition Overdue",
          message: `${rev.title} has ${rev.cardsCount} overdue (${rev.dueText}).`,
          category: "Revision",
          categoryColor: "text-error bg-error-container/20 border border-error/30",
          icon: "warning",
          timestamp: rev.dueText || "Overdue",
          destination: "/planner",
        });
      } else if (rev.dueText && rev.dueText.toLowerCase().includes("hour")) {
        items.push({
          id: `notif-rev-${rev.id}`,
          title: "Revision Due Soon",
          message: `${rev.title} has ${rev.cardsCount} scheduled (${rev.dueText}).`,
          category: "Revision",
          categoryColor: "text-tertiary bg-tertiary-container/20 border border-tertiary/30",
          icon: "schedule",
          timestamp: rev.dueText,
          destination: "/planner",
        });
      }
    });
  }

  // 2. Active Focus session from scheduleData
  if (scheduleData && Array.isArray(scheduleData.sessions)) {
    const currentSession = scheduleData.sessions.find(
      (s) => s.stateType === "current"
    );
    if (currentSession) {
      items.push({
        id: `notif-sess-${currentSession.id}`,
        title: "Active Study Block",
        message: `${currentSession.title} (${currentSession.time}) is currently scheduled.`,
        category: "Schedule",
        categoryColor: "text-secondary bg-secondary-container/20 border border-secondary/30",
        icon: "event_upcoming",
        timestamp: "Now",
        destination: "/planner",
      });
    }
  }

  // 3. Active Streak from heroData
  if (heroData && heroData.streak && heroData.streak.days > 0) {
    items.push({
      id: `notif-streak-${heroData.streak.days}`,
      title: "Learning Streak Active",
      message: `${heroData.streak.days} days streak (${heroData.streak.tier}). Complete today's study goal to keep the momentum!`,
      category: "Streak",
      categoryColor: "text-primary bg-primary-container/20 border border-primary/30",
      icon: "local_fire_department",
      timestamp: "Today",
      destination: "/analytics",
    });
  }

  return items;
}

const baseNotifications = deriveBaseNotifications();

let readIds = getStoredItem(
  STORAGE_KEYS.NOTIFICATIONS_READ,
  [],
  (arr) => Array.isArray(arr)
);

let dismissedIds = getStoredItem(
  STORAGE_KEYS.NOTIFICATIONS_DISMISSED,
  [],
  (arr) => Array.isArray(arr)
);

const listeners = new Set();

function notify() {
  listeners.forEach((listener) => listener());
}

// Compute snapshot and freeze references for stability
function computeSnapshot() {
  const readSet = new Set(readIds);
  const dismissedSet = new Set(dismissedIds);

  return Object.freeze(
    baseNotifications
      .filter((n) => !dismissedSet.has(n.id))
      .map((n) =>
        Object.freeze({
          ...n,
          isRead: readSet.has(n.id),
        })
      )
  );
}

// Maintain a single cached reference that only updates on actual state changes
let cachedSnapshot = computeSnapshot();

function updateSnapshot() {
  cachedSnapshot = computeSnapshot();
}

export const notificationsStore = {
  subscribe: (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  // Stable snapshot getter for useSyncExternalStore
  getSnapshot: () => cachedSnapshot,
  getNotifications: () => cachedSnapshot,

  getUnreadCount: () => {
    return cachedSnapshot.filter((n) => !n.isRead).length;
  },

  markAsRead: (id) => {
    if (!readIds.includes(id)) {
      readIds = [...readIds, id];
      setStoredItem(STORAGE_KEYS.NOTIFICATIONS_READ, readIds);
      updateSnapshot();
      notify();
    }
  },

  markAllAsRead: () => {
    const hasUnread = cachedSnapshot.some((n) => !n.isRead);
    if (!hasUnread) return;

    const activeIds = cachedSnapshot.map((n) => n.id);
    const combined = Array.from(new Set([...readIds, ...activeIds]));
    readIds = combined;
    setStoredItem(STORAGE_KEYS.NOTIFICATIONS_READ, readIds);
    updateSnapshot();
    notify();
  },

  dismissNotification: (id) => {
    if (!dismissedIds.includes(id)) {
      dismissedIds = [...dismissedIds, id];
      setStoredItem(STORAGE_KEYS.NOTIFICATIONS_DISMISSED, dismissedIds);
      updateSnapshot();
      notify();
    }
  },

  resetNotifications: () => {
    readIds = [];
    dismissedIds = [];
    setStoredItem(STORAGE_KEYS.NOTIFICATIONS_READ, []);
    setStoredItem(STORAGE_KEYS.NOTIFICATIONS_DISMISSED, []);
    updateSnapshot();
    notify();
  },
};
