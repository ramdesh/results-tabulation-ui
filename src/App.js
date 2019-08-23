import React from 'react';
import './App.css';
import NavBar from "./components/navbar/Navbar";
import {BrowserRouter as Router, Route} from "react-router-dom";
import InvalidBallots from "./components/invalid-ballots/InvalidBallots";
import PartywiseCount from "./components/partywise-count/PartywiseCount";
import Invalid from "./components/invalid-ballots/Invalid";
import Preferences from "./components/preferences/Preferences";
import CE201 from "./components/CE201/CE201";
import PRE28A from "./components/PRE28A/PRE28A";
import PRE28AEntry from "./components/PRE28A/PRE28AEntry";

function App() {
    return (
        <Router>
            <div>
                <NavBar/>
                <Route exact path="/" component={InvalidBallots}/>
                <Route exact path="/party-wise" component={PartywiseCount}/>
                <Route exact path="/invalid" component={Invalid}/>
                <Route exact path="/preferences" component={Preferences}/>
                <Route exact path="/CE201" component={CE201}/>
                <Route exact path="/PRE28A" component={PRE28A}/>
                <Route exact path="/PRE28A-Entry" component={PRE28AEntry}/>

            </div>
        </Router>

    );
}

export default App;





