import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import Home from './components/Home';
import GiuseppeBondi42 from './components/people/GiuseppeBondi42';
import MattiaPressiani43 from './components/people/MattiaPressiani43';
import SofiaComerci44 from "./components/people/SofiaComerci44";
import RiccardoMari45 from "./components/people/RiccardoMari45";

function App() {
  return (
    <Router basename="/">  {/* Aggiungi il basename corretto */}
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/GiuseppeBondi42" element={<GiuseppeBondi42 />} />
          <Route path="/MattiaPressiani43" element={<MattiaPressiani43 />} />
          <Route path="/SofiaComerci44" element={<SofiaComerci44 />} />
          <Route path="/RiccardoMari45" element={<RiccardoMari45 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;