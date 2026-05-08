import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import Home              from "../pages/Home/Home";
import CourseList        from "../pages/Courses/CourseList";
import CourseDetail      from "../pages/Courses/CourseDetail";
import RoadmapList       from "../pages/Roadmaps/RoadmapList";
import RoadmapDetail     from "../pages/Roadmaps/RoadmapDetail";

import CSSubjectList     from "../pages/CSSubjects/CSSubjectList";
import CSSubjectDetail   from "../pages/CSSubjects/CSSubjectDetail";
import AptitudeHub       from "../pages/Aptitude/AptitudeHub";
import AptitudeTopic     from "../pages/Aptitude/AptitudeTopic";
import SkillsPage        from "../pages/Skills/SkillsPage";
import PlacementPage     from "../pages/Placement/PlacementPage";
import SearchPage        from "../pages/Search/SearchPage";
import QuizPage          from "../pages/Quiz/QuizPage";
import CollegeList       from "../pages/Colleges/CollegeList";
import CollegeDetail     from "../pages/Colleges/CollegeDetail";
import MPCollegeList     from "../pages/MPColleges/MPCollegeList.tsx";
import MPCollegeDetail   from "../pages/MPColleges/MPCollegeDetail.tsx";
import MPCollegeCompare  from "../pages/MPColleges/MPCollegeCompare.tsx";
import NotFound          from "../pages/NotFound";

// Full-screen pages (outside App layout — no Navbar/Footer)
import RoadmapGraph2     from "../pages/Roadmaps/RoadmapGraph";
import MPCollegeMap      from "../pages/MPColleges/MPCollegeMap.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true,                           element: <Home />            },
      { path: "courses",                       element: <CourseList />      },
      { path: "courses/:courseId",             element: <CourseDetail />    },
      { path: "roadmaps",                      element: <RoadmapList />     },
      { path: "roadmaps/:roadmapId",           element: <RoadmapDetail />   },
      { path: "cs-subjects",                   element: <CSSubjectList />   },
      { path: "cs-subjects/:subjectId",        element: <CSSubjectDetail /> },
      { path: "aptitude",                      element: <AptitudeHub />     },
      { path: "aptitude/:categoryId",          element: <AptitudeTopic />   },
      { path: "skills",                        element: <SkillsPage />      },
      { path: "placement",                     element: <PlacementPage />   },
      { path: "search",                        element: <SearchPage />      },
      { path: "quiz",                          element: <QuizPage />        },
      { path: "colleges",                      element: <CollegeList />     },
      { path: "colleges/:collegeId",           element: <CollegeDetail />   },
      // MP-specific pages
      { path: "mp-colleges",                   element: <MPCollegeList />   },
      { path: "mp-colleges/:collegeId",        element: <MPCollegeDetail /> },
      { path: "mp-colleges/compare",           element: <MPCollegeCompare /> },
      { path: "*",                             element: <NotFound />        },
    ],
  },
  // Full-screen routes (no Navbar/Footer)
  { path: "/roadmaps/:roadmapId/graph",        element: <RoadmapGraph2 />   },
  { path: "/mp-colleges/map",                  element: <MPCollegeMap />    },
]);