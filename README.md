# DevRoute 🚀

> **Complete Career & Placement Preparation Platform for Tech Students**
>
> Courses · Roadmaps · CS Fundamentals · Mock Quiz · MP College Finder · Aptitude Practice · Placement Guide

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38BDF8?style=flat&logo=tailwindcss)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=flat&logo=vite)](https://vitejs.dev)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat)](LICENSE)



## ✨ Features

### 📚 Learning Content
- **15+ Courses** — Full Stack, Data Science, ML/AI, Android, iOS, Flutter, React Native, DevOps, Cloud, Cybersecurity, Blockchain, UI/UX, Game Dev, Python Backend, DSA & CP
- **8 Visual Roadmaps** — Frontend, Backend, Data Science, DevOps, Android, iOS, ML Engineer, Cybersecurity — with step-by-step nodes and time estimates
- **6 CS Subjects** — DSA (60+ Q&A), OS, DBMS, Computer Networks, OOP, System Design — deep interview-focused content
- **27+ Skills** — Languages, frameworks, databases, DevOps tools with demand levels, salary data, and top companies

### 🎯 Practice & Preparation
- **Timed Mock Quiz** — 3 modes (Quick 10Q/30s, Standard 20Q/45s, Challenge 30Q/60s), category filters, score breakdown, answer review
- **Aptitude Hub** — Quantitative, Logical, Verbal & Programming MCQs with step-by-step explanations
- **CS Q&A** — 60+ interview questions with detailed answers, difficulty tags, topic filters
- **Placement Guide** — Resume tips, interview rounds breakdown, HR questions, STAR method behavioral prep

### 🏫 MP College Finder (Advanced)
- **14 Madhya Pradesh institutes** — IIT Indore, NIT Bhopal, SGSITS, IET DAVV, LNCT, Acropolis, Coding Blocks, Allen, and more
- **Advanced filters** — City, district, type, tier, fees range, hostel availability, minimum rating
- **Side-by-side comparison** — Compare 2-3 colleges across 20+ parameters
- **Interactive SVG map** — Visual MP map with color-coded institute markers
- **Placement charts** — Year-wise Recharts graphs (avg package, highest package, placement rate)
- **Admission timeline** — Calendars, JEE cutoffs, process details
- **Rating breakdown** — Placements, faculty, infrastructure, value for money, campus life
- **Scholarships** — All available scholarships per institute
- **All India colleges** — IIT Bombay, IIT Delhi, BITS, VIT, SRM, Masai, Scaler, upGrad, and more

### 🔍 Search & Navigation
- **Global fuzzy search** — ⌘K shortcut, live dropdown results across all content
- **Roadmap Graph View** — Full-screen ReactFlow visual graph with progress tracking
- **Dark Mode** — System preference detection, localStorage persistence, ☀️/🌙 toggle

### 🎨 UI/UX
- Clean & minimal design inspired by roadmap.sh
- Fully responsive — mobile, tablet, desktop
- Custom fonts: Syne (display) + DM Sans (body) + JetBrains Mono (code)
- Smooth animations with Framer Motion
- Progress tracking with Zustand (bookmarks, roadmap step completion, recently viewed)
- Reading progress bar on detail pages

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 18 + TypeScript |
| Routing | React Router DOM v6 |
| Styling | Tailwind CSS v3 |
| Icons | Lucide React |
| Animations | Framer Motion |
| Charts | Recharts |
| Search | Fuse.js (fuzzy search) |
| State | Zustand (with localStorage persistence) |
| Graphs | ReactFlow |
| Build | Vite 8 |

---

## 📁 Project Structure

```
devroute-web/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── colleges/          # MP College-specific components
│   │   │   ├── MPCollegeCard.tsx
│   │   │   ├── CollegeFilters.tsx
│   │   │   ├── CollegeCompareBar.tsx
│   │   │   ├── PlacementChart.tsx
│   │   │   ├── AdmissionTimeline.tsx
│   │   │   └── RatingBreakdown.tsx
│   │   ├── layout/            # Navbar, Footer
│   │   ├── shared/            # SearchBar, CourseCard, RoadmapCard, PageHeader, etc.
│   │   └── ui/                # Badge, Button, Card, Input, Tabs, ProgressBar, EmptyState
│   ├── data/                  # All static JSON (single source of truth)
│   │   ├── courses.json       # 15 courses
│   │   ├── roadmaps.json      # 8 roadmaps
│   │   ├── cs-subjects.json   # 6 subjects, 60+ Q&A
│   │   ├── aptitude.json      # 4 categories, MCQs
│   │   ├── skills.json        # 27+ skills
│   │   ├── colleges.json      # All India institutes
│   │   └── mp-colleges.json   # 14 MP institutes (advanced data)
│   ├── hooks/                 # Custom React hooks
│   │   ├── useSearch.ts       # Fuse.js global search
│   │   ├── useCourse.ts
│   │   ├── useRoadmap.ts
│   │   ├── useDarkMode.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useScrollProgress.ts
│   │   └── useCollegeFilters.ts
│   ├── pages/
│   │   ├── Home/
│   │   ├── Courses/           # CourseList, CourseDetail
│   │   ├── Roadmaps/          # RoadmapList, RoadmapDetail, RoadmapGraph
│   │   ├── CSSubjects/        # CSSubjectList, CSSubjectDetail
│   │   ├── Aptitude/          # AptitudeHub, AptitudeTopic (interactive MCQ)
│   │   ├── Skills/
│   │   ├── Placement/
│   │   ├── Quiz/              # Mock Quiz (timed, scored)
│   │   ├── Search/
│   │   ├── Colleges/          # All India college finder
│   │   └── MPColleges/        # MP College Finder (advanced)
│   │       ├── MPCollegeList.tsx
│   │       ├── MPCollegeDetail.tsx
│   │       ├── MPCollegeCompare.tsx
│   │       └── MPCollegeMap.tsx
│   ├── router/
│   │   └── index.tsx          # All route definitions
│   ├── store/
│   │   └── index.ts           # Zustand store (bookmarks, progress, recently viewed)
│   ├── styles/
│   │   └── globals.css        # Custom utilities, dark mode, animations
│   ├── types/
│   │   ├── index.ts           # Course, Roadmap, CSSubject, Skill types
│   │   └── college.types.ts   # Institute, MPInstitute types
│   ├── utils/
│   │   ├── formatData.ts      # Helper functions
│   │   └── filterCourses.ts   # Filter logic
│   ├── App.tsx                # Root layout
│   └── main.tsx               # Entry point
├── index.html                 # SEO meta tags, OG tags, favicon
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/devroute-web.git
cd devroute-web

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
# → Opens at http://localhost:5173
```

### Build for Production

```bash
npm run build
# Output in /dist directory

npm run preview
# Preview the production build locally
```

---

## 🌐 Deployment

### Deploy to Vercel (Recommended — Free)

```bash
# Option 1: Vercel CLI
npm install -g vercel
vercel login
vercel --prod

# Option 2: GitHub Integration
# 1. Push code to GitHub
# 2. Go to vercel.com → New Project
# 3. Import your repository
# 4. Click Deploy — zero configuration needed
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

### Environment
No environment variables needed — this is a pure frontend application with static JSON data.

---

## 📊 Content Overview

| Section | Count | Details |
|---------|-------|---------|
| 📚 Courses | 15 | Full Stack, ML/AI, Android, iOS, Flutter, RN, DevOps, Cloud, Cyber, Blockchain, UI/UX, Game Dev, Python, DSA |
| 🗺️ Roadmaps | 8 | Frontend, Backend, Data Science, DevOps, Android, iOS, ML Engineer, Cybersecurity |
| 🧠 CS Subjects | 6 | DSA, OS, DBMS, Computer Networks, OOP, System Design |
| ❓ CS Q&A | 60+ | Detailed answers with tags and difficulty levels |
| 🔢 Aptitude | 4 categories | Quantitative, Logical, Verbal, Programming MCQ |
| ⚡ Skills | 27+ | Languages, frameworks, databases, DevOps, AI/ML |
| 🏫 MP Colleges | 14 | IIT, NIT, Govt, Private, Bootcamps, Coaching, Spoken English |
| 🇮🇳 All India | 15+ | IITs, BITS, VIT, SRM, Masai, Scaler, upGrad, etc. |

---

## 🗺️ Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/courses` | All Courses |
| `/courses/:id` | Course Detail |
| `/roadmaps` | All Roadmaps |
| `/roadmaps/:id` | Roadmap Detail |
| `/roadmaps/:id/graph` | Visual Graph (full-screen) |
| `/cs-subjects` | CS Subjects |
| `/cs-subjects/:id` | Subject + Q&A |
| `/aptitude` | Aptitude Hub |
| `/aptitude/:id` | Category Practice |
| `/quiz` | Mock Quiz |
| `/skills` | Skills Explorer |
| `/placement` | Placement Guide |
| `/search` | Global Search |
| `/colleges` | All India Colleges |
| `/colleges/:id` | College Detail |
| `/mp-colleges` | MP College Finder |
| `/mp-colleges/:id` | MP College Detail |
| `/mp-colleges/compare` | Side-by-side Compare |
| `/mp-colleges/map` | Interactive Map |

---

## 🔧 Customization

### Adding New Courses
Edit `src/data/courses.json` — follow the existing schema:

```json
{
  "id": "your-course-id",
  "title": "Course Title",
  "icon": "🎯",
  "tagline": "Short description",
  "category": "Web",
  "duration": "3-4 months",
  "difficulty": "Beginner to Advanced",
  "avgSalary": "8-20 LPA",
  "color": "from-blue-500 to-cyan-400",
  "syllabus": [...]
}
```

### Adding New MP Colleges
Edit `src/data/mp-colleges.json`:

```json
{
  "id": "college-id",
  "name": "College Full Name",
  "type": "engineering-college",
  "tier": "government",
  "city": "Indore",
  "district": "Indore",
  "rating": 4.2,
  "fees": "₹80,000/year",
  "feesPerYear": 80000,
  "placementStats": [...]
}
```

### Changing Theme Colors
Edit `tailwind.config.js`:

```js
colors: {
  brand: {
    600: "#0062f5",  // Primary blue — change this
  }
}
```

---

## 🤝 Contributing

Contributions are welcome! Here's how:

```bash
# 1. Fork the repository
# 2. Create your feature branch
git checkout -b feature/add-new-roadmap

# 3. Make changes — most common contribution is adding JSON data:
#    - New courses in src/data/courses.json
#    - New Q&A in src/data/cs-subjects.json
#    - New colleges in src/data/mp-colleges.json
#    - New aptitude questions in src/data/aptitude.json

# 4. Commit with clear message
git commit -m "feat: add React Native roadmap with 7 steps"

# 5. Push and open PR
git push origin feature/add-new-roadmap
```

### Contribution Ideas
- 📝 Add more CS Q&A (target: 200+)
- 📚 Add more aptitude questions (target: 100+)
- 🏫 Add more MP colleges (target: 50+)
- 🗺️ Add more roadmaps (Blockchain, Game Dev, Flutter)
- 🌐 Add more All India colleges
- 🐛 Fix bugs and improve performance

---

## 📈 Roadmap (Planned Features)

- [ ] **PWA Support** — Install as mobile app, offline support
- [ ] **User Authentication** — Google login via Supabase
- [ ] **Progress Sync** — Save progress to cloud across devices
- [ ] **AI College Recommender** — Answer 5 questions → get top 3 matches
- [ ] **Real Reviews** — Students can submit verified reviews
- [ ] **Daily DSA Problem** — Date-seeded daily challenge with streak tracking
- [ ] **Job Board** — Entry-level jobs filtered for MP/India freshers
- [ ] **More Roadmaps** — Flutter, Blockchain, Game Dev, Full Stack Python
- [ ] **React Native App** — Same content, native mobile experience

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- [roadmap.sh](https://roadmap.sh) — Inspiration for roadmap design
- [Lucide Icons](https://lucide.dev) — Beautiful icon set
- [Tailwind CSS](https://tailwindcss.com) — Utility-first CSS framework
- [ReactFlow](https://reactflow.dev) — Roadmap graph visualization
- [Recharts](https://recharts.org) — Placement statistics charts
- [Fuse.js](https://fusejs.io) — Fuzzy search engine
- All students of Madhya Pradesh who inspired this project 🇮🇳

---

## 📬 Contact

Built with ❤️ for every student in India

[![GitHub](https://img.shields.io/badge/GitHub-yourusername-181717?style=flat&logo=github)](https://github.com/manish780386)
[![Twitter](https://img.shields.io/badge/Twitter-@yourhandle-1DA1F2?style=flat&logo=twitter)](https://twitter.com/ManishDang90567)

---

<div align="center">
  <strong>⭐ Star this repo if DevRoute helped you!</strong>
  <br/>
  <sub>Made for students of Madhya Pradesh and all of India 🇮🇳</sub>
</div>
