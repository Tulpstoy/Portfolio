import { Routes, Route } from "react-router-dom";
import PageWrap from "./global/PageWrap";
import Header from "./global/Header";
import Footer from "./global/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import OffTheClock from "./pages/OffTheClock";
import Projects from "./pages/Projects";
import DreamDaddyFanApp from "./pages/project_pages/dream-daddy-fan-app";
import Project2Page from "./pages/project_pages/wcdonalds";
import PokeAPIWebApp from "./pages/project_pages/pokeapiwebapp";
import StonewallStorybook from "./pages/project_pages/stonewall-storybook";
import PokeAPIReactNativeApp from "./pages/project_pages/pokeapi_reactnativeapp";
import InvestTogether from "./pages/project_pages/investtogether";
import StyleGuide from "./pages/StyleGuide";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PageWrap />} >
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/off-the-clock" element={<OffTheClock />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/1" element={<InvestTogether />} />
          <Route path="/projects/2" element={<PokeAPIReactNativeApp />} />
          <Route path="/projects/3" element={<PokeAPIWebApp />} />
          <Route path="/projects/4" element={<Project2Page />} />
          <Route path="/projects/5" element={<DreamDaddyFanApp />} />
          <Route path="/projects/6" element={<StonewallStorybook />} />
          <Route path="/style" element={<StyleGuide />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
