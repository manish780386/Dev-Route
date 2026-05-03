import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import Home            from "../pages/Home/Home";
import CourseList      from "../pages/Courses/CourseList";
import CourseDetail    from "../pages/Courses/CourseDetail";
import RoadmapList     from "../pages/Roadmaps/RoadmapList";
import RoadmapDetail   from "../pages/Roadmaps/RoadmapDetail";
import RoadmapGraph    from "../pages/Roadmaps/RoadmapGraph";
import CSSubjectList   from "../pages/CSSubjects/CSSubjectList";
import CSSubjectDetail from "../pages/CSSubjects/CSSubjectDetail";
import AptitudeHub     from "../pages/Aptitude/AptitudeHub";
import AptitudeTopic   from "../pages/Aptitude/AptitudeTopic";
import SkillsPage      from "../pages/Skills/SkillsPage";
import PlacementPage   from "../pages/Placement/PlacementPage";
import SearchPage      from "../pages/Search/SearchPage";
import QuizPage        from "../pages/Quiz/QuizPage.tsx";
import NotFound        from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true,                        element: <Home />            },
      { path: "courses",                    element: <CourseList />      },
      { path: "courses/:courseId",          element: <CourseDetail />    },
      { path: "roadmaps",                   element: <RoadmapList />     },
      { path: "roadmaps/:roadmapId",        element: <RoadmapDetail />   },
      { path: "cs-subjects",               element: <CSSubjectList />   },
      { path: "cs-subjects/:subjectId",    element: <CSSubjectDetail /> },
      { path: "aptitude",                   element: <AptitudeHub />     },
      { path: "aptitude/:categoryId",       element: <AptitudeTopic />   },
      { path: "skills",                     element: <SkillsPage />      },
      { path: "placement",                  element: <PlacementPage />   },
      { path: "search",                     element: <SearchPage />      },
      { path: "quiz",                       element: <QuizPage />        },
      { path: "*",                          element: <NotFound />        },
    ],
  },
  // RoadmapGraph is OUTSIDE App layout — it's full screen
  {
    path: "/roadmaps/:roadmapId/graph",
    element: <RoadmapGraph />,
  },
]);