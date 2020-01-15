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
        <Route
          path="/electronics"
          exact
          render={props => <SectionPage {...props} section="Electronics" />}
        />
        <Route
          path="/appliances"
          exact
          render={props => <SectionPage {...props} section="Appliances" />}
        />
        <Route
          path="/fashion"
          exact
          render={props => <SectionPage {...props} section="Fashion" />}
        />
        <Route
          path="/furniture"
          exact
          render={props => <SectionPage {...props} section="Furniture" />}
        />
        <Route
          path="/sports"
          exact
          render={props => <SectionPage {...props} section="Sports" />}
        />
        <Route
          path="/books"
          exact
          render={props => <SectionPage {...props} section="Books" />}
        />
      </div>
    </BrowserRouter>
  );
};

export default App;
