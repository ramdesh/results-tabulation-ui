import React from 'react';
import './App.css';
import NavBar from "./components/navbar/Navbar";
import {BrowserRouter as Router, Route} from "react-router-dom";
import InvalidBallots from "./components/invalid-ballots/InvalidBallots";
import PartywiseCount from "./components/partywise-count/PartywiseCount";
import Invalid from "./components/invalid-ballots/Invalid";
import Preferences from "./components/preferences/Preferences";

function App() {
    return (
        <Router>
            <div>
                <NavBar/>
                <Route exact path="/" component={InvalidBallots}/>
                <Route exact path="/party-wise" component={PartywiseCount}/>
                <Route exact path="/invalid" component={Invalid}/>
                <Route exact path="/preference" component={Preferences}/>
            </div>
        </Router>

    );
}

export default App;





