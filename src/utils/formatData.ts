import type { Course, Roadmap } from "../types";

/** Converts duration string like "6-8 months" to a sortable number (midpoint) */
export function parseDurationMonths(duration: string): number {
  const match = duration.match(/(\d+)(?:-(\d+))?/);
  if (!match) return 0;
  const min = parseInt(match[1], 10);
  const max = match[2] ? parseInt(match[2], 10) : min;
  return (min + max) / 2;
}

/** Returns min salary from "8-22 LPA" → 8 */
export function parseMinSalary(salary: string): number {
  const match = salary.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

/** Capitalize first letter */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/** Truncate string to maxLength with ellipsis */
export function truncate(str: string, maxLength: number): string {
  return str.length <= maxLength ? str : str.slice(0, maxLength).trimEnd() + "…";
}

/** Convert slug to title case — "full-stack-web" → "Full Stack Web" */
export function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map(capitalize)
    .join(" ");
}

/** Total topics across all phases of a course */
export function totalCourseTopics(course: Course): number {
  return course.syllabus.reduce((acc, phase) => acc + phase.topics.length, 0);
}

/** Completion percentage of required roadmap steps (0-100) */
export function roadmapRequiredPercent(roadmap: Roadmap): number {
  const required = roadmap.steps.filter((s) => s.status === "required").length;
  return roadmap.steps.length > 0
    ? Math.round((required / roadmap.steps.length) * 100)
    : 0;
}

/** Format number with K suffix — 1200 → "1.2K" */
export function formatCount(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n);
}