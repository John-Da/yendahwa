import HomePage from './pages/homePage/HomePage';
import ProjectPage from './pages/projectPage/ProjectPage';
import AboutPage from './pages/aboutPage/AboutPage';

export const PATHTO = {
  homepage: { path: "/", component: HomePage },
  aboutpage: { path: "/about", component: AboutPage },
  projectpage: { path: "/projects", component: ProjectPage },
  projectcat: { path: "/projects/:category", component: ProjectPage },
  projectsubcat: { path: "/projects/:category/:subcategory", component: ProjectPage},
};

export const SOCIALLINKS = {
    fb: "",
    gh: "https://github.com/John-Da",
    ig: "",
    th: "",
}
