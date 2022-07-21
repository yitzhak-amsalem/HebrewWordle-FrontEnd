import React from "react";
import {BrowserRouter as Router, Routes, Route, Link, NavLink} from "react-router-dom";

import UsersComponent from "./UsersComponent";
import FirstScreen from "./FirstScreen";
import GameScreen from "./GameScreen";
function App() {
  return (
    <div className="App">
        <Router>
            <div>
                <h2>Hebrew Wordle</h2>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <ul className="navbar-nav mr-auto">
                        <li><NavLink to={'/'} className="nav-link"> Home </NavLink></li>
                        <li><NavLink to={'/gameScreen'} className="nav-link">GameScreen</NavLink></li>
                    </ul>
                </nav>
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
