import React, {Component, useEffect, useState} from "react";

import {
    PATH_ELECTION, PATH_ELECTION_BY_ID,
    PATH_ELECTION_DATA_ENTRY, PATH_ELECTION_DATA_ENTRY_EDIT,
    TALLY_SHEET_CODE_CE_201, TALLY_SHEET_CODE_CE_201_PV,
    TALLY_SHEET_CODE_PRE_41
} from "../../App";
import BreadCrumb from "../../components/bread-crumb";
import DataEntryEdit_PRE_41 from "./data-entry-edit-pre-41";
import DataEntryEdit_CE_201 from "./data-entry-edit-ce-201";
import DataEntryEdit_CE_201_PV from "./data-entry-edit-ce-201-pv";


export default function DataEntryEdit(props) {
    const {election, tallySheet} = props;
    const {tallySheetId, tallySheetCode} = tallySheet;
    const {electionId, electionName} = election;

    function getEditorJsx() {
        if (tallySheetCode === TALLY_SHEET_CODE_PRE_41) {
            return <DataEntryEdit_PRE_41 {...props} />
        } else if (tallySheetCode === TALLY_SHEET_CODE_CE_201) {
            return <DataEntryEdit_CE_201 {...props} />
        } else if (tallySheetCode === TALLY_SHEET_CODE_CE_201_PV) {
            return <DataEntryEdit_CE_201_PV {...props} />
        } else {
            return null;
        }
    }

    return <div className="page">
        <BreadCrumb
            links={[
                {label: "elections", to: PATH_ELECTION()},
                {label: electionName, to: PATH_ELECTION_BY_ID(electionId)},
                {label: tallySheetCode.toLowerCase(), to: PATH_ELECTION_DATA_ENTRY(electionId, tallySheetCode)},
                {
                    label: tallySheet.area.areaName,
                    to: PATH_ELECTION_DATA_ENTRY_EDIT(electionId, tallySheet.tallySheetId)
                },
            ]}
        />
        <div className="page-content">
            <div className="data-entry-edit-header">
                <div className="data-entry-edit-header-election-name">{electionName}</div>
                <div className="data-entry-edit-header-tally-sheet-code">{tallySheetCode}</div>
            </div>
            {getEditorJsx()}
        </div>
    </div>
}