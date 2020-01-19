import React from "react";
import NavBar from "./NavBar";
import Home from "./Home";
import SectionPage from "./SectionPage";
import { BrowserRouter, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="content">
        <Route path="/" exact component={Home} />
        <Route path="/:section" exact component={SectionPage} />
      </div>
    </BrowserRouter>
  );
};

export default App;
