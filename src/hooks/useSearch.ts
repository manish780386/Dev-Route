import { useMemo } from "react";
import Fuse from "fuse.js";
import coursesData    from "../data/courses.json";
import roadmapsData   from "../data/roadmaps.json";
import csData         from "../data/cs-subjects.json";
import skillsData     from "../data/skills.json";
import type { SearchResult } from "../types";

// Build a flat searchable index from all data sources
function buildIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  // Courses
  coursesData.courses.forEach((c) => {
    results.push({
      id:          c.id,
      title:       c.title,
      type:        "course",
      description: c.tagline,
      url:         `/courses/${c.id}`,
    });
    // Also index individual phases
    c.syllabus.forEach((phase) => {
      phase.topics.forEach((topic) => {
        results.push({
          id:          `${c.id}-${topic.id}`,
          title:       `${topic.title} — ${c.title}`,
          type:        "course",
          description: topic.subtopics.join(", "),
          url:         `/courses/${c.id}`,
        });
      });
    });
  });

  // Roadmaps
  roadmapsData.roadmaps.forEach((r) => {
    results.push({
      id:          r.id,
      title:       `${r.title} Roadmap`,
      type:        "roadmap",
      description: r.description,
      url:         `/roadmaps/${r.id}`,
    });
    r.steps.forEach((step) => {
      results.push({
        id:          `${r.id}-step-${step.id}`,
        title:       `${step.title} — ${r.title} Roadmap`,
        type:        "roadmap",
        description: step.description,
        url:         `/roadmaps/${r.id}`,
      });
    });
  });

  // CS Subjects
  csData.subjects.forEach((s) => {
    results.push({
      id:          s.id,
      title:       s.title,
      type:        "subject",
      description: s.tagline,
      url:         `/cs-subjects/${s.id}`,
    });
    s.chapters.forEach((ch) => {
      results.push({
        id:          `${s.id}-${ch.id}`,
        title:       `${ch.title} — ${s.title}`,
        type:        "subject",
        description: ch.topics.join(", "),
        url:         `/cs-subjects/${s.id}`,
      });
      ch.questions.forEach((q) => {
        results.push({
          id:          `${s.id}-${ch.id}-${q.id}`,
          title:       q.question,
          type:        "subject",
          description: q.answer.slice(0, 120) + "…",
          url:         `/cs-subjects/${s.id}`,
        });
      });
    });
  });

  // Skills
  skillsData.categories.forEach((cat) => {
    cat.skills.forEach((skill) => {
      results.push({
        id:          skill.id,
        title:       skill.title,
        type:        "skill",
        description: skill.description,
        url:         `/skills`,
      });
    });
  });

  return results;
}

const INDEX = buildIndex();

const fuse = new Fuse(INDEX, {
  keys: [
    { name: "title",       weight: 0.6 },
    { name: "description", weight: 0.4 },
  ],
  threshold:          0.35,
  includeScore:       true,
  minMatchCharLength: 2,
});

export function useSearch(query: string): SearchResult[] {
  return useMemo(() => {
    if (!query.trim() || query.length < 2) return [];
    return fuse.search(query).slice(0, 20).map((r) => r.item);
  }, [query]);
}

export function useGlobalSearch(query: string, limit = 8): SearchResult[] {
  return useMemo(() => {
    if (!query.trim() || query.length < 2) return [];
    return fuse.search(query).slice(0, limit).map((r) => r.item);
  }, [query, limit]);
}