import React from "react";
import {BrowserRouter as Router, Routes, Route, Link, NavLink} from "react-router-dom";

import UsersComponent from "./UsersComponent";
import FirstScreen from "./FirstScreen";
import GameScreen from "./GameScreen";
function App() {
  return (
    <div className="App" style={{margin: "10px"}}>
        <Router>
            <div>
                <h2>Hebrew Wordle</h2>
                <hr />
            </div>
            <Routes>
                <Route exact path='/' element={<FirstScreen/>} />
                <Route path='/gameScreen' element={<GameScreen/>} />
            </Routes>
        </Router>
{/*      <UsersComponent/>*/}
    </div>
  );
}

export default App;
