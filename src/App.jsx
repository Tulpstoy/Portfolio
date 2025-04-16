import { Routes, Route } from "react-router";
import PageWrap from "./global/PageWrap";
import Header from "./global/Header";
import Footer from "./global/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Project1Page from "./assets/Project1/Project1Page";
import Project2Page from "./assets/project2/Project2Page";
import Project3Page from "./assets/project3/Project3Page";
import Project4Page from "./assets/project4/Project4Page";
import StyleGuide from "./pages/StyleGuide";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PageWrap />} >
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/1" element={<Project1Page />} />
          <Route path="/projects/2" element={<Project2Page />} />
          <Route path="/projects/3" element={<Project3Page />} />
          <Route path="/projects/4" element={<Project4Page />} />
          <Route path="/style" element={<StyleGuide />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
