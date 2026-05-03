import { useMemo } from "react";
import coursesData from "../data/courses.json";
import type { Course } from "../types";

export function useCourse(id: string): Course | undefined {
  return useMemo(
    () => coursesData.courses.find((c) => c.id === id) as Course | undefined,
    [id]
  );
}

export function useCourses(): Course[] {
  return useMemo(() => coursesData.courses as Course[], []);
}

export function useCoursesByCategory(category: string): Course[] {
  return useMemo(
    () =>
      category === "All"
        ? (coursesData.courses as Course[])
        : (coursesData.courses.filter((c) => c.category === category) as Course[]),
    [category]
  );
}