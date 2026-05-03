// ─── Resource ────────────────────────────────────────────────────────────────
export interface Resource {
  title: string;
  url: string;
  type: "video" | "article" | "docs" | "book" | "practice";
  isFree: boolean;
}

// ─── Course ───────────────────────────────────────────────────────────────────
export interface Topic {
  id: string;
  title: string;
  subtopics: string[];
  resources: Resource[];
  isCore: boolean;
}

export interface SyllabusPhase {
  phase: number;
  title: string;
  duration: string;
  topics: Topic[];
}

export interface Course {
  id: string;
  title: string;
  icon: string;
  tagline: string;
  category: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Beginner to Advanced";
  avgSalary: string;
  jobRoles: string[];
  companies: string[];
  futureScope: string;
  popularSkills: string[];
  syllabus: SyllabusPhase[];
  color: string; // tailwind gradient class
}

// ─── Roadmap ──────────────────────────────────────────────────────────────────
export type StepStatus = "required" | "recommended" | "optional";

export interface SubTopic {
  title: string;
  description: string;
}

export interface RoadmapStep {
  id: number;
  title: string;
  description: string;
  status: StepStatus;
  estimatedTime: string;
  subtopics: SubTopic[];
  resources: Resource[];
  nextSteps: number[];
}

export interface Roadmap {
  id: string;
  title: string;
  icon: string;
  description: string;
  totalDuration: string;
  level: string;
  steps: RoadmapStep[];
  color: string;
}

// ─── CS Subjects ──────────────────────────────────────────────────────────────
export interface CSQuestion {
  id: string;
  question: string;
  answer: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
}

export interface CSChapter {
  id: string;
  title: string;
  description: string;
  topics: string[];
  questions: CSQuestion[];
}

export interface CSSubject {
  id: string;
  title: string;
  icon: string;
  tagline: string;
  importance: string;
  color: string;
  chapters: CSChapter[];
}

// ─── Aptitude ─────────────────────────────────────────────────────────────────
export interface AptitudeQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  topic: string;
}

export interface AptitudeTopic {
  id: string;
  title: string;
  formula?: string;
  tips: string[];
  questions: AptitudeQuestion[];
}

export interface AptitudeCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: string;
  topics: AptitudeTopic[];
}

// ─── Skills ───────────────────────────────────────────────────────────────────
export interface Skill {
  id: string;
  title: string;
  icon: string;
  category: string;
  demandLevel: "High" | "Very High" | "Extreme";
  avgSalary: string;
  description: string;
  useCases: string[];
  learningPath: string[];
  resources: Resource[];
  relatedSkills: string[];
  color: string;
}

// ─── Search ───────────────────────────────────────────────────────────────────
export type SearchResultType = "course" | "roadmap" | "subject" | "skill";

export interface SearchResult {
  id: string;
  title: string;
  type: SearchResultType;
  description: string;
  url: string;
}