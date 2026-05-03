import { useMemo } from "react";
import roadmapsData from "../data/roadmaps.json";
import type { Roadmap } from "../types";

export function useRoadmap(id: string): Roadmap | undefined {
  return useMemo(
    () => roadmapsData.roadmaps.find((r) => r.id === id) as Roadmap | undefined,
    [id]
  );
}

export function useRoadmaps(): Roadmap[] {
  return useMemo(() => roadmapsData.roadmaps as Roadmap[], []);
}