import React, {useContext} from 'react';
import './App.css';
import NavBar from "./components/navbar/Navbar";
import {Route} from "react-router-dom";
import CE201 from "./components/CE201/CE201";
import PRE28A from "./components/PRE28A/PRE28A";
import PRE28AEntry from "./components/PRE28A/PRE28AEntry";
import PRE21 from "./components/invalid-ballots/PRE21";
import PRE21Entry from "./components/invalid-ballots/PRE21Entry";
import PRE21PVEntry from "./components/invalid-ballots/postal-votes/PRE21PVEntry";
import PRE21PV from "./components/invalid-ballots/postal-votes/PRE21PV";
import PRE41 from "./components/partywise-count/PRE41";
import PRE41PV from "./components/partywise-count/postal-votes/PRE41PV";
import PRE34CO from "./components/preferences/PRE34CO";
import PRE34COEntry from "./components/preferences/PRE34COEntry";
import PRE34COPV from "./components/preferences/postal-votes/PRE34COPV";
import PRE34COPVEntry from "./components/preferences/postal-votes/PRE34COPVEntry";
import CE201Entry from "./components/CE201/CE201Entry";
import PRE28Entry from "./components/PRE28/PRE28Entry";
import PRE28 from "./components/PRE28/PRE28";
import ReportsEntry from "./components/report/ReportsEntry";
import Home from "./components/home/Home";
import HomeSelection from "./components/home/HomeSelection";
import HomeElection from "./components/home/HomeElection";
import CE201PV from "./components/CE201/postal-votes/CE201PV";
import CE201PVEntry from "./components/CE201/postal-votes/CE201PVEntry";
import PRE41Report from "./components/partywise-count/PRE41Report";
import ReportView from "./components/report/ReportView";
import CE201Report from "./components/CE201/CE201Report";

import {Redirect, Switch} from "react-router";
import PRE41New from "./components/partywise-count/PRE41New";
import CE201New from "./components/CE201/CE201New";
import {ProtectedRoute} from "./auth";
import CE201PVReport from "./components/CE201/postal-votes/CE201PVReport";


function App() {
    return (
        <div>
            <NavBar/>
            <Switch>

                <Redirect exact path="/" to="/Election"/>

                <ProtectedRoute exact path="/Election" component={HomeElection}/>
                <ProtectedRoute exact path="/Home" component={Home}/>
                <ProtectedRoute exact path="/Main" component={HomeSelection}/>

                <ProtectedRoute exact path="/ReportsEntry" component={ReportsEntry}/>
                <ProtectedRoute exact path="/ReportView/:tallySheetId/:tallySheetVersionId" component={ReportView}/>

                <ProtectedRoute exact path="/CE201" component={CE201}/>
                <ProtectedRoute exact path="/CE201-Entry/:name/:name2/:countingId" component={CE201Entry}/>
                <ProtectedRoute path="/CE201Entry/:tallySheetId/:tallySheetVersionId" component={CE201New}/>
                <ProtectedRoute exact path="/CE201Report/:tallySheetId/:tallySheetVersionId" component={CE201Report}/>

                <ProtectedRoute exact path="/PRE41" component={PRE41}/>
                <ProtectedRoute exact path="/PRE41PV" component={PRE41PV}/>
                <ProtectedRoute path="/PRE41Entry/:tallySheetId/:tallySheetVersionId" component={PRE41New}/>
                <ProtectedRoute exact path="/PRE41Report/:tallySheetId/:tallySheetVersionId/" component={PRE41Report}/>

                <ProtectedRoute exact path="/CE201PV" component={CE201PV}/>
                <ProtectedRoute exact path="/CE201PVEntry/:tallySheetId/:tallySheetVersionId" component={CE201PVEntry}/>
                <ProtectedRoute exact path="/CE201PVReport/:tallySheetId/:tallySheetVersionId" component={CE201PVReport}/>

                <ProtectedRoute exact path="/PRE34COPV" component={PRE34COPV}/>
                <ProtectedRoute exact path="/PRE34COPV-Entry" component={PRE34COPVEntry}/>

                <ProtectedRoute exact path="/PRE28A" component={PRE28A}/>
                <ProtectedRoute path="/PRE28A-Entry/:name" component={PRE28AEntry}/>

                <ProtectedRoute exact path="/PRE21PV" component={PRE21PV}/>
                <ProtectedRoute exact path="/PRE21PV-Entry/:name/:name2" component={PRE21PVEntry}/>

                <ProtectedRoute exact path="/PRE21" component={PRE21}/>
                <ProtectedRoute exact path="/PRE21-Entry/:name/:name2" component={PRE21Entry}/>

                <ProtectedRoute exact path="/PRE34CO" component={PRE34CO}/>
                <ProtectedRoute exact path="/PRE34CO-Entry" component={PRE34COEntry}/>

                <ProtectedRoute exact path="/PRE28" component={PRE28}/>
                <ProtectedRoute path="/PRE28-Entry/:name" component={PRE28Entry}/>
            </Switch>
        </div>
    );
}

export default App;
