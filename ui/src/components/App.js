import React from "react";
import NavBar from "./NavBar";
import Carousel from "./Carousel";

const App = () => {
  return (
    <div>
      <NavBar />
      <div className="content">
        <Carousel />
      </div>
    </div>
  );
};

export default App;
