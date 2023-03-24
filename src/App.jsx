import React from "react";
import Home from "./home";
import Cities from "./cities";
import News from "./news";
import { UpArrow } from "./components/upArrow";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <div className="scroll-to-top">
        <a href="#home">
          <UpArrow />
        </a>
      </div>
      <Home />
      <Cities />
      <News />
    </div>
  );
}

export default App;
