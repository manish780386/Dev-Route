import type { Course } from "../types";

export interface CourseFilters {
  query:      string;
  difficulty: string;
  category:   string;
}

export function filterCourses(courses: Course[], filters: CourseFilters): Course[] {
  const q = filters.query.toLowerCase();

  return courses.filter((c) => {
    const matchQuery =
      !q ||
      c.title.toLowerCase().includes(q) ||
      c.tagline.toLowerCase().includes(q) ||
      c.popularSkills.some((s) => s.toLowerCase().includes(q)) ||
      c.jobRoles.some((r) => r.toLowerCase().includes(q));

    const matchDiff =
      filters.difficulty === "All" || c.difficulty === filters.difficulty;

    const matchCat =
      filters.category === "All" || c.category === filters.category;

    return matchQuery && matchDiff && matchCat;
  });
}

export function sortCoursesBySalary(courses: Course[]): Course[] {
  return [...courses].sort((a, b) => {
    const getMin = (s: string) => parseInt(s.match(/\d+/)?.[0] ?? "0", 10);
    return getMin(b.avgSalary) - getMin(a.avgSalary);
  });
}