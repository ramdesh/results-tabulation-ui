import React, {Component, useEffect, useState} from "react";

import {
    PATH_ELECTION, PATH_ELECTION_BY_ID,
    PATH_ELECTION_DATA_ENTRY, PATH_ELECTION_DATA_ENTRY_EDIT,
    TALLY_SHEET_CODE_CE_201, TALLY_SHEET_CODE_CE_201_PV,
    TALLY_SHEET_CODE_PRE_41, TALLY_SHEET_CODE_PRE_34_CO
} from "../../App";
import BreadCrumb from "../../components/bread-crumb";
import DataEntryEdit_PRE_41 from "./data-entry-edit-pre-41";
import DataEntryEdit_CE_201 from "./data-entry-edit-ce-201";
import DataEntryEdit_CE_201_PV from "./data-entry-edit-ce-201-pv";
import DataEntryEdit_PRE_34_CO from "./data-entry-edit-pre-34-co";
import {getTallySheetCodeStr} from "../../utils/tallySheet";


export default function DataEntryEdit({history, queryString, election, tallySheet, messages}) {
    const {tallySheetId, tallySheetCode} = tallySheet;
    const subElectionId = tallySheet.electionId;
    const {electionId, electionName} = election;

    function getEditorJsx() {
        const props = {history, queryString, election, tallySheet, messages};
        if (tallySheetCode === TALLY_SHEET_CODE_PRE_41) {
            return <DataEntryEdit_PRE_41 {...props} />
        } else if (tallySheetCode === TALLY_SHEET_CODE_CE_201) {
            return <DataEntryEdit_CE_201 {...props} />
        } else if (tallySheetCode === TALLY_SHEET_CODE_CE_201_PV) {
            return <DataEntryEdit_CE_201_PV {...props} />
        } else if (tallySheetCode === TALLY_SHEET_CODE_PRE_34_CO) {
            return <DataEntryEdit_PRE_34_CO {...props} />
        } else {
            return null;
        }
    }

    return <div className="page">
        <BreadCrumb
            links={[
                {label: "elections", to: PATH_ELECTION()},
                {label: electionName, to: PATH_ELECTION_BY_ID(electionId)},
                {
                    label: getTallySheetCodeStr(tallySheet).toLowerCase(),
                    to: PATH_ELECTION_DATA_ENTRY(electionId, tallySheetCode, subElectionId)
                },
                {
                    label: tallySheet.area.areaName,
                    to: PATH_ELECTION_DATA_ENTRY_EDIT(electionId, tallySheet.tallySheetId)
                },
            ]}
        />
        <div className="page-content">
            <div className="data-entry-edit-header">
                <div className="data-entry-edit-header-election-name">{electionName}</div>
                <div className="data-entry-edit-header-tally-sheet-code">{getTallySheetCodeStr(tallySheet)}</div>
            </div>
            <div>{tallySheet.electoralDistrict ? tallySheet.electoralDistrict.areaName : null} >&nbsp;
                {tallySheet.pollingDivision ? tallySheet.pollingDivision.areaName : null} >&nbsp;
                {tallySheet.countingCentre ? tallySheet.countingCentre.areaName : null}</div>
            {getEditorJsx()}
        </div>
    </div>
}