import AboutPage from './pages/AboutPage/AboutPage';
import GameView from './pages/GameMode/GameView';
import HomePage from './pages/homePage/HomePage';
import ProjectPage from './pages/projectPage/ProjectPage';

export const PATHTO = {
  homepage: { path: `${import.meta.env.BASE_URL}`, component: HomePage },
  aboutpage: { path: `${import.meta.env.BASE_URL}about`, component: AboutPage },
  projectpage: { path: `${import.meta.env.BASE_URL}projects`, component: ProjectPage },
  gamemode: { path: `${import.meta.env.BASE_URL}projects/games/play`, component: GameView },
  projectsubcat: { path: `${import.meta.env.BASE_URL}projects/:category/:subcategory`, component: ProjectPage },
  projectcat: { path: `${import.meta.env.BASE_URL}projects/:category`, component: ProjectPage },
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