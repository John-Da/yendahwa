
import GameView from './pages/GameMode/GameView';
import HomePage from './pages/homePage/HomePage';
import ProjectPage from './pages/projectPage/ProjectPage';
import Hightlights from './pages/HightlightsPage/Hightlights';
import AboutPage from './pages/AboutPage/AboutPage';


export const PATHTO = {
  homepage: { path: `/`, component: HomePage },
  aboutpage: { path: `/about`, component: AboutPage },
  projectpage: { path: `/projects`, component: ProjectPage },

  projecthightlights: { path: `/projects/hightlights/:name`, component: Hightlights },

  gamemode: { path: `/projects/games/play`, component: GameView },
  projectsubcat: { path: `/projects/:category/:subcategory`, component: ProjectPage },
  projectcat: { path: `/projects/:category`, component: ProjectPage },
};


export const SOCIALLINKS = {
    fb: "",
    gh: "https://github.com/John-Da",
    ig: "",
    th: "",
}



  // "education": [
  //   { "type": "High School", "name": "Auroa Private High School", "year": "2019 - 2020", "gpa": "2.87" },
  //   { "type": "University", "name": "Khon Kaen University (KKU)", "degree": "Bachelor of Digital Media Engineering in Computer Engineering", "year": "2023 - present", "gpa": "3.3" },
  //   { "type": "University", "name": "Tech Institute", "degree": "Master of AI", "year": "2025", "gpa": "4.0" }
  // ],