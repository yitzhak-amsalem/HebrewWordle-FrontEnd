import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import FirstScreen from "./FirstScreen";
import GameScreen from "./GameScreen";
import "./App.css"
function App() {
  return (
    <div className="App">
        <Router>
            <div>
                <h2>Hebrew Wordle</h2>
            </div>
            <Routes>
                <Route exact path='/' element={<FirstScreen/>} />
                <Route path='/gameScreen' element={<GameScreen/>} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
