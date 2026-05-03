import { create } from "zustand";
import { persist } from "zustand/middleware";

// ── Types ─────────────────────────────────────────────────────────────────────

interface BookmarkItem {
  id:        string;
  type:      "course" | "roadmap" | "subject" | "skill";
  title:     string;
  url:       string;
  icon:      string;
  savedAt:   number;
}

interface RoadmapProgress {
  roadmapId:    string;
  completedIds: number[]; // step IDs completed
  updatedAt:    number;
}

interface DevRouteStore {
  // ── Bookmarks ──────────────────────────────────────────────────────────────
  bookmarks:        BookmarkItem[];
  addBookmark:      (item: Omit<BookmarkItem, "savedAt">) => void;
  removeBookmark:   (id: string) => void;
  isBookmarked:     (id: string) => boolean;
  toggleBookmark:   (item: Omit<BookmarkItem, "savedAt">) => void;

  // ── Roadmap step completion ────────────────────────────────────────────────
  roadmapProgress:     Record<string, RoadmapProgress>;
  toggleStepComplete:  (roadmapId: string, stepId: number) => void;
  isStepComplete:      (roadmapId: string, stepId: number) => boolean;
  getProgressPercent:  (roadmapId: string, totalSteps: number) => number;
  resetRoadmap:        (roadmapId: string) => void;

  // ── Recently viewed ────────────────────────────────────────────────────────
  recentlyViewed:  BookmarkItem[];
  addRecentlyViewed: (item: Omit<BookmarkItem, "savedAt">) => void;
  clearRecentlyViewed: () => void;
}

// ── Store ─────────────────────────────────────────────────────────────────────

export const useStore = create<DevRouteStore>()(
  persist(
    (set, get) => ({
      // Bookmarks
      bookmarks: [],

      addBookmark: (item) =>
        set((s) => ({
          bookmarks: [
            { ...item, savedAt: Date.now() },
            ...s.bookmarks.filter((b) => b.id !== item.id),
          ],
        })),

      removeBookmark: (id) =>
        set((s) => ({ bookmarks: s.bookmarks.filter((b) => b.id !== id) })),

      isBookmarked: (id) => get().bookmarks.some((b) => b.id === id),

      toggleBookmark: (item) => {
        const { isBookmarked, addBookmark, removeBookmark } = get();
        isBookmarked(item.id) ? removeBookmark(item.id) : addBookmark(item);
      },

      // Roadmap progress
      roadmapProgress: {},

      toggleStepComplete: (roadmapId, stepId) =>
        set((s) => {
          const prev    = s.roadmapProgress[roadmapId];
          const current = prev?.completedIds ?? [];
          const updated = current.includes(stepId)
            ? current.filter((id) => id !== stepId)
            : [...current, stepId];
          return {
            roadmapProgress: {
              ...s.roadmapProgress,
              [roadmapId]: { roadmapId, completedIds: updated, updatedAt: Date.now() },
            },
          };
        }),

      isStepComplete: (roadmapId, stepId) =>
        get().roadmapProgress[roadmapId]?.completedIds?.includes(stepId) ?? false,

      getProgressPercent: (roadmapId, totalSteps) => {
        const completed = get().roadmapProgress[roadmapId]?.completedIds?.length ?? 0;
        return totalSteps > 0 ? Math.round((completed / totalSteps) * 100) : 0;
      },

      resetRoadmap: (roadmapId) =>
        set((s) => {
          const next = { ...s.roadmapProgress };
          delete next[roadmapId];
          return { roadmapProgress: next };
        }),

      // Recently viewed
      recentlyViewed: [],

      addRecentlyViewed: (item) =>
        set((s) => ({
          recentlyViewed: [
            { ...item, savedAt: Date.now() },
            ...s.recentlyViewed.filter((r) => r.id !== item.id),
          ].slice(0, 10), // keep last 10
        })),

      clearRecentlyViewed: () => set({ recentlyViewed: [] }),
    }),
    {
      name:    "devroute-store",
      version: 1,
    }
  )
);

// ── Selector hooks ────────────────────────────────────────────────────────────

export const useBookmarks    = () => useStore((s) => s.bookmarks);
export const useRecentlyViewed = () => useStore((s) => s.recentlyViewed);