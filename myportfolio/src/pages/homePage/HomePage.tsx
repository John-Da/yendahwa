import "../../index.css"
import HeroSection from '../../components/sections/herosec/HeroSection'
import ProjectPageSec from "../../components/sections/projectsec/ProjectSec"
import Footer from "../../components/footer/Footer"
import ContactSection from "../../components/sections/contactsec/ContactSection"
import Image from "../../assets/myinfo/me.jpg"
import PROJECTDETAILS from '../../ProjectDetails.json'

function HomePage() {
  return (
    <>
    <HeroSection sectionFor={'home'} author={"John Da"} heroDescription={
      "I bring visuals to life with motion, design, and storytelling.\nLet’s create something that not only looks good but feels right."
    }/>
    <HeroSection sectionFor={'about'} aboutImage={Image}
    aboutDescription={
      "I’m John Da, a Web Developer and Software Engineer who loves creating digital experiences that blend creativity and functionality. I specialize in building interactive UIs, smooth animations, and modern web apps that bring ideas to life.\n\nMy approach focuses on clean design, performance, and user-first experience. When I’m not coding, I enjoy exploring new technologies, refining motion design techniques, and learning how design and engineering can work together to tell better stories."
    }/>
    <ProjectPageSec sectionFor={"home"} projectdetails={PROJECTDETAILS} />
    <ContactSection />
    <Footer footerFor={"home"} />
    </>
  )
}

export default HomePage