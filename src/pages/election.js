import React, {Component, useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import {getElections} from "../services/tabulation-api";
import {MessagesProvider, MessagesConsumer} from "../services/messages.provider";
import {
    PATH_ELECTION,
    PATH_ELECTION_BY_ID,
    PATH_ELECTION_DATA_ENTRY,
    PATH_ELECTION_REPORT, PATH_ELECTION_RESULTS_RELEASE,
    TALLY_SHEET_CODE_CE_201,
    TALLY_SHEET_CODE_CE_201_PV,
    TALLY_SHEET_CODE_PRE_30_ED,
    TALLY_SHEET_CODE_PRE_30_PD,
    TALLY_SHEET_CODE_PRE_41,
    TALLY_SHEET_CODE_PRE_ALL_ISLAND_RESULTS,
    TALLY_SHEET_CODE_PRE_ALL_ISLAND_RESULTS_BY_ELECTORAL_DISTRICTS
} from "../App";
import Grid from '@material-ui/core/Grid';
import BreadCrumb from "../components/bread-crumb";


export default function Election(props) {
    const {election} = props;


    const {electionId, electionName} = election;
    //return <p></p>

    return <div className="page">
        <BreadCrumb
            links={[
                {label: "elections", to: PATH_ELECTION()},
                {label: electionName, to: PATH_ELECTION_BY_ID(electionId)}
            ]}
        />
        <div className="page-content">
            <h3>{electionName}</h3>

            <Grid container spacing={3}>
                <Grid item xs={4} className="election-grid">
                    <Grid item xs={12}><h4>Data Entry</h4></Grid>
                    <Grid item xs={12}><h5>Ordinary Votes</h5></Grid>
                    <Grid item xs={12}>
                        <ul className="tally-sheet-code-list">
                            <li>PRE 41
                                <Link
                                    className="tally-sheet-code-list-item btn-select"
                                    to={PATH_ELECTION_DATA_ENTRY(electionId, TALLY_SHEET_CODE_PRE_41)}
                                >
                                    Select
                                </Link>
                                <Link
                                    className="tally-sheet-code-list-item btn-list"
                                    to={PATH_ELECTION_DATA_ENTRY(electionId, TALLY_SHEET_CODE_PRE_41)}
                                >
                                    List
                                </Link>
                            </li>
                            <li>CE 201
                                <Link
                                    className="tally-sheet-code-list-item btn-select"
                                    to={PATH_ELECTION_DATA_ENTRY(electionId, TALLY_SHEET_CODE_PRE_41)}
                                >
                                    Select
                                </Link>
                                <Link
                                    className="tally-sheet-code-list-item btn-list"
                                    to={PATH_ELECTION_DATA_ENTRY(electionId, TALLY_SHEET_CODE_CE_201)}
                                >
                                    List
                                </Link>

                            </li>
                        </ul>
                    </Grid>
                    <Grid item xs={12}><h5>Postal Votes</h5></Grid>
                    <Grid item xs={12}>
                        <ul className="tally-sheet-code-list">
                            <li>PRE 41
                                <Link
                                    className="tally-sheet-code-list-item btn-select"
                                    to={PATH_ELECTION_DATA_ENTRY(electionId, TALLY_SHEET_CODE_PRE_41)}
                                >
                                    Select
                                </Link>
                                <Link
                                    className="tally-sheet-code-list-item btn-list"
                                    to={PATH_ELECTION_DATA_ENTRY(electionId, TALLY_SHEET_CODE_PRE_41)}
                                >
                                    List
                                </Link>
                            </li>
                            <li>CE 201 PV
                                <Link
                                    className="tally-sheet-code-list-item btn-select"
                                    to={PATH_ELECTION_DATA_ENTRY(electionId, TALLY_SHEET_CODE_PRE_41)}
                                >
                                    Select
                                </Link>
                                <Link
                                    className="tally-sheet-code-list-item btn-list"
                                    to={PATH_ELECTION_DATA_ENTRY(electionId, TALLY_SHEET_CODE_CE_201_PV)}
                                >
                                    List
                                </Link>
                            </li>
                        </ul>
                    </Grid>
                </Grid>
                <Grid item xs={4} className="election-grid">
                    <Grid item xs={12}><h4>Reports</h4></Grid>
                    <Grid item xs={12}>
                        <ul className="tally-sheet-code-list">
                            <li>PRE 30 PD
                                <Link
                                    className="tally-sheet-code-list-item btn-list"
                                    to={PATH_ELECTION_REPORT(electionId, TALLY_SHEET_CODE_PRE_30_PD)}
                                >
                                    List
                                </Link>
                            </li>
                            <li>PRE 30 ED
                                <Link
                                    className="tally-sheet-code-list-item btn-list"
                                    to={PATH_ELECTION_REPORT(electionId, TALLY_SHEET_CODE_PRE_30_ED)}
                                >
                                    List
                                </Link>
                            </li>
                            <li>All Island ED
                                <Link
                                    className="tally-sheet-code-list-item btn-list"
                                    to={PATH_ELECTION_REPORT(electionId, TALLY_SHEET_CODE_PRE_ALL_ISLAND_RESULTS_BY_ELECTORAL_DISTRICTS)}
                                >
                                    List
                                </Link>
                            </li>
                            <li>All Island
                                <Link
                                    className="tally-sheet-code-list-item btn-list"
                                    to={PATH_ELECTION_REPORT(electionId, TALLY_SHEET_CODE_PRE_ALL_ISLAND_RESULTS)}
                                >
                                    List
                                </Link>
                            </li>
                        </ul>
                    </Grid>
                </Grid>
                <Grid item xs={4} className="election-grid">
                    <Grid item xs={12}><h4>Release</h4></Grid>
                    <Grid item xs={12}>
                        <ul className="tally-sheet-code-list">
                            <li>PRE 30 PD
                                <Link
                                    className="tally-sheet-code-list-item btn-list"
                                    to={PATH_ELECTION_RESULTS_RELEASE(electionId, TALLY_SHEET_CODE_PRE_30_PD)}
                                >
                                    List
                                </Link>
                            </li>
                            <li>PRE 30 ED
                                <Link
                                    className="tally-sheet-code-list-item btn-list"
                                    to={PATH_ELECTION_RESULTS_RELEASE(electionId, TALLY_SHEET_CODE_PRE_30_ED)}
                                >
                                    List
                                </Link>
                            </li>
                            <li>All Island ED
                                <Link
                                    className="tally-sheet-code-list-item btn-list"
                                    to={PATH_ELECTION_RESULTS_RELEASE(electionId, TALLY_SHEET_CODE_PRE_ALL_ISLAND_RESULTS_BY_ELECTORAL_DISTRICTS)}
                                >
                                    List
                                </Link>
                            </li>
                            <li>All Island
                                <Link
                                    className="tally-sheet-code-list-item btn-list"
                                    to={PATH_ELECTION_RESULTS_RELEASE(electionId, TALLY_SHEET_CODE_PRE_ALL_ISLAND_RESULTS)}
                                >
                                    List
                                </Link>
                            </li>
                        </ul>
                    </Grid>
                </Grid>
            </Grid>

        </div>
    </div>
}
