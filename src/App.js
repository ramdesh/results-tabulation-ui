import React from 'react';
import './App.css';
import NavBar from "./components/navbar/Navbar";
import {BrowserRouter as Router, Route} from "react-router-dom";
import InvalidBallots from "./components/invalid-ballots/InvalidBallots";

function App() {
    return (
        <Router>
            <div>
                <NavBar/>
                <Route exact path="/" component={InvalidBallots}/>
            </div>
        </Router>

    );
}

export default App;





