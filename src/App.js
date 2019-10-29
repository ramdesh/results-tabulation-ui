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
export const PATH_ELECTION_RESULTS_RELEASE = (electionId, tallySheetCode) => {
    let path = `${ROUTER_PREFIX}/election/${electionId}/release`;
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
export const TALLY_SHEET_CODE_PRE_ALL_ISLAND_RESULTS_BY_ELECTORAL_DISTRICTS = "PRE_ALL_ISLAND_RESULTS_BY_ELECTORAL_DISTRICTS";
export const TALLY_SHEET_CODE_PRE_ALL_ISLAND_RESULTS = "PRE_ALL_ISLAND_RESULTS";

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
            </Switch>
        </div>
    );
}

export default App;
