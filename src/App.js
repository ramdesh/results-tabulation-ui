import React, {useContext} from 'react';
import './App.css';
import NavBar from "./components/navbar/Navbar";

import {Redirect, Switch} from "react-router";
import {ElectionProtectedRoute, ProtectedRoute, TallySheetProtectedRoute} from "./auth";

import Home from "./pages/home"
import Election from "./pages/election";
import DataEntryList from "./pages/data-entry-list";
import DataEntryEdit from "./pages/data-entry-edit";
import ReportList from "./pages/report-list";
import ReportView from "./pages/report-view";

export const ROUTER_PREFIX = "";
export const PATH_ELECTION = () => `${ROUTER_PREFIX}/election`;
export const PATH_ELECTION_BY_ID = (electionId) => `${ROUTER_PREFIX}/election/${electionId}`;
export const PATH_ELECTION_DATA_ENTRY = (electionId, tallySheetCode) => {
    let path = `${ROUTER_PREFIX}/election/${electionId}/data-entry`;
    if (tallySheetCode) {
        path += `?tallySheetCode=${tallySheetCode}`;
    }

    return path;
};
export const PATH_ELECTION_DATA_ENTRY_EDIT = (electionId, tallySheetId, tallySheetVersionId) => {
    let path = `${ROUTER_PREFIX}/election/${electionId}/data-entry/${tallySheetId}`;
    if (tallySheetVersionId) {
        path += `/${tallySheetVersionId}`
    }

    return path
};
export const PATH_ELECTION_VERIFICATION = (electionId, tallySheetCode) => {
    return `${ROUTER_PREFIX}/election/${electionId}/verification?tallySheetCode=${tallySheetCode}`;
};
export const PATH_ELECTION_VERIFICATION_EDIT = (electionId, tallySheetId) => {
    return `${ROUTER_PREFIX}/election/${electionId}/verification/${tallySheetId}`;
};
export const PATH_ELECTION_REPORT = (electionId, tallySheetCode) => {
    let path = `${ROUTER_PREFIX}/election/${electionId}/report`;
    if (tallySheetCode) {
        path += `?tallySheetCode=${tallySheetCode}`;
    }

    return path;
};
export const PATH_ELECTION_REPORT_VIEW = (electionId, tallySheetId) => {
    return `${ROUTER_PREFIX}/election/${electionId}/report/${tallySheetId}`;
};
// export const PATH_ELECTION_TALLY_SHEET_REVIEW = (electionId, tallySheetId) => {
//     return `${ROUTER_PREFIX}/election/${electionId}/tallySheet-/${tallySheetId}`;
// };

export const TALLY_SHEET_CODE_PRE_41 = "PRE-41";
export const TALLY_SHEET_CODE_CE_201 = "CE-201";
export const TALLY_SHEET_CODE_CE_201_PV = "CE-201-PV";
export const TALLY_SHEET_CODE_PRE_30_PD = "PRE-30-PD";
export const TALLY_SHEET_CODE_PRE_30_ED = "PRE-30-ED";

function App() {

    function getHeader() {
        if (ProtectedRoute.isAuthenticated()) {
            return <NavBar/>
        } else {
            return <div className="fixed-loading-page">
                Loading ...
            </div>
        }
    }

    return (
        <div>
            {getHeader()}
            <Switch>

                <Redirect exact path="/" to={PATH_ELECTION()}/>


                <ProtectedRoute
                    exact
                    path={PATH_ELECTION()}
                    component={Home}
                />
                <ElectionProtectedRoute
                    exact
                    path={PATH_ELECTION_BY_ID(":electionId")}
                    component={Election}
                />
                <ElectionProtectedRoute
                    exact
                    path={PATH_ELECTION_DATA_ENTRY(":electionId")}
                    component={DataEntryList}
                />
                <TallySheetProtectedRoute
                    exact
                    path={PATH_ELECTION_DATA_ENTRY_EDIT(":electionId", ":tallySheetId", ":tallySheetVersionId?")}
                    component={DataEntryEdit}
                />
                {/*<ProtectedRoute*/}
                {/*    exact*/}
                {/*    path={PATH_ELECTION_VERIFICATION(":electionId", ":tallySheetCode")}*/}
                {/*    component={Home}*/}
                {/*/>*/}
                {/*<ProtectedRoute*/}
                {/*    exact*/}
                {/*    path={PATH_ELECTION_VERIFICATION_EDIT(":electionId", ":tallySheetId")}*/}
                {/*    component={Home}*/}
                {/*/>*/}

                <ElectionProtectedRoute
                    exact
                    path={PATH_ELECTION_REPORT(":electionId")}
                    component={ReportList}
                />

                <TallySheetProtectedRoute
                    exact
                    path={PATH_ELECTION_REPORT_VIEW(":electionId", ":tallySheetId")}
                    component={ReportView}
                />
                {/*<ProtectedRoute*/}
                {/*    exact*/}
                {/*    path={PATH_ELECTION_REPORT_VIEW(":electionId", ":tallySheetId")}*/}
                {/*    component={Home}*/}
                {/*/>*/}


                {/*<ProtectedRoute exact path="/Election" component={HomeElection}/>*/}
                {/*<ProtectedRoute exact path="/Home" component={Home}/>*/}
                {/*<ProtectedRoute exact path="/Main" component={HomeSelection}/>*/}

                {/*<ProtectedRoute exact path="/ReportsEntry" component={ReportsEntry}/>*/}
                {/*<ProtectedRoute exact path="/ReportView/:tallySheetId/:tallySheetVersionId" component={ReportView}/>*/}

                {/*<ProtectedRoute exact path="/CE201" component={CE201}/>*/}
                {/*<ProtectedRoute exact path="/CE201-Entry/:name/:name2/:countingId" component={CE201Entry}/>*/}
                {/*<ProtectedRoute path="/CE201Entry/:tallySheetId/:tallySheetVersionId" component={CE201New}/>*/}
                {/*<ProtectedRoute exact path="/CE201Report/:tallySheetId/:tallySheetVersionId" component={CE201Report}/>*/}

                {/*<ProtectedRoute exact path="/PRE21" component={PRE21}/>*/}
                {/*<ProtectedRoute exact path="/PRE21-Entry/:name/:name2" component={PRE21Entry}/>*/}

                {/*<ProtectedRoute exact path="/PRE34CO" component={PRE34CO}/>*/}
                {/*<ProtectedRoute exact path="/PRE34CO-Entry" component={PRE34COEntry}/>*/}

                {/*<ProtectedRoute exact path="/PRE28" component={PRE28}/>*/}
                {/*<ProtectedRoute path="/PRE28-Entry/:name" component={PRE28Entry}/>*/}

                {/*<ProtectedRoute exact path="/PRE41" component={PRE41}/>*/}
                {/*<ProtectedRoute path="/PRE41Entry/:tallySheetId/:tallySheetVersionId" component={PRE41New}/>*/}
                {/*<ProtectedRoute exact path="/PRE41Report/:tallySheetId/:tallySheetVersionId/" component={PRE41Report}/>*/}

                {/*<ProtectedRoute exact path="/PRE28A" component={PRE28A}/>*/}
                {/*<ProtectedRoute path="/PRE28A-Entry/:name" component={PRE28AEntry}/>*/}

                {/*<ProtectedRoute exact path="/PRE21PV" component={PRE21PV}/>*/}
                {/*<ProtectedRoute exact path="/PRE21PV-Entry/:name/:name2" component={PRE21PVEntry}/>*/}

                {/*<ProtectedRoute exact path="/PRE41PV" component={PRE41PV}/>*/}
                {/*<ProtectedRoute exact path="/PRE41PVEntry/:tallySheetId/:tallySheetVersionId" component={PRE41PVEntry}/>*/}

                {/*<ProtectedRoute exact path="/CE201PV" component={CE201PV}/>*/}
                {/*<ProtectedRoute exact path="/CE201PVEntry/:tallySheetId/:tallySheetVersionId" component={CE201PVEntry}/>*/}
                {/*<ProtectedRoute exact path="/CE201PVReport/:tallySheetId/:tallySheetVersionId" component={CE201PVReport}/>*/}

                {/*<ProtectedRoute exact path="/PRE34COPV" component={PRE34COPV}/>*/}
                {/*<ProtectedRoute exact path="/PRE34COPV-Entry" component={PRE34COPVEntry}/>*/}
            </Switch>
        </div>
    );
}

export default App;
