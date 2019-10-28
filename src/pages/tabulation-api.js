import axios from 'axios';
import {TABULATION_API_URL} from "../config";
import {TALLY_SHEET_CODE_CE_201, TALLY_SHEET_CODE_CE_201_PV, TALLY_SHEET_CODE_PRE_41} from "../App";

const ENDPOINT_PATH_ELECTIONS = () => "/election";
const ENDPOINT_PATH_ELECTIONS_BY_ID = (electionId) => `/election/${electionId}`;
const ENDPOINT_PATH_AREAS = () => "/area";
const ENDPOINT_PATH_TALLY_SHEETS = () => "/tally-sheet";
const ENDPOINT_PATH_TALLY_SHEETS_BY_ID = (tallySheetId) => `/tally-sheet/${tallySheetId}`;
const ENDPOINT_PATH_TALLY_SHEET_VERSION_BY_ID = (tallySheetId, tallySheetCode, tallySheetVersionId) => {
    let path = `/tally-sheet/${tallySheetCode}/${tallySheetId}/version`;
    if (tallySheetVersionId) {
        path += `/${tallySheetVersionId}`;
    }

    return path;
};
const ENDPOINT_PATH_TALLY_SHEET_LOCK = (tallySheetId) => `/tally-sheet/${tallySheetId}/lock`;
const ENDPOINT_PATH_TALLY_SHEET_UNLOCK = (tallySheetId) => `/tally-sheet/${tallySheetId}/unlock`;
const ENDPOINT_PATH_TALLY_SHEET_VERSION_HTML = (tallySheetId, tallySheetVersionId) => `/tally-sheet/${tallySheetId}/version/${tallySheetVersionId}/html`;


const axiosInstance = axios.create({
    baseURL: TABULATION_API_URL,
    headers: {
        'Authorization': "Bearer " + localStorage.getItem('token'),
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'X-Requested-With': 'XMLHttpRequest'
    }
});

//
function request(config) {
    return axiosInstance.request(config).then((res) => res.data)
    // return new Promise((resolve, reject) => {
    //
    //     axios.request({
    //         url: '/user',
    //         method: 'get', // default,
    //     }).then(res => {
    //         resolve(res.data);
    //     }).catch((error) => {
    //         resolve(error);
    //     });
    // });
}

//
// function post(path, params, body) {
//
// }


export function getElections() {
    return request({
        url: ENDPOINT_PATH_ELECTIONS(),
        method: 'get', // default,
    })
}

export function getElectionById(electionId) {
    return request({
        url: ENDPOINT_PATH_ELECTIONS_BY_ID(electionId),
        method: 'get', // default,
    })
}


export function getAreas(areaType = null, associatedAreaId = null) {
    const params = {};

    if (areaType) {
        params["areaType"] = areaType;
    }

    if (associatedAreaId) {
        params["associatedAreaId"] = associatedAreaId;
    }

    return request({
        url: ENDPOINT_PATH_AREAS(),
        method: 'get',
        params: params
    })
}

export function getCountingCentres(associatedAreaId = null) {
    return getAreas("CountingCentre", associatedAreaId)
}

export function getElectoralDistricts(associatedAreaId = null) {
    return getAreas("ElectoralDistrict", associatedAreaId)
}

export function getPollingDivisions(associatedAreaId = null) {
    return getAreas("PollingDivision", associatedAreaId)
}

export function getPollingStations(associatedAreaId = null) {
    return getAreas("PollingStation", associatedAreaId)
}


export const TALLY_SHEET_STATUS_ENUM = {
    NOT_ENTERED: "Not Entered",
    SUBMITTED: "Submitted",
    VIEWED: "Viewed",
    ENTERED: "Entered, Not Submitted",
    VERIFIED: "Verified",
    RELEASED: "Released"
}

function getTallySheetStatus(tallySheet) {
    const {tallySheetCode, lockedVersionId, submittedVersionId, latestVersionId} = tallySheet;
    let tallySheetStatus = "";
    let readyToLock = false;
    if (tallySheetCode === TALLY_SHEET_CODE_PRE_41 || tallySheetCode === TALLY_SHEET_CODE_CE_201 || tallySheetCode === TALLY_SHEET_CODE_CE_201_PV) {
        if (lockedVersionId) {
            tallySheetStatus = TALLY_SHEET_STATUS_ENUM.VERIFIED;
        } else if (submittedVersionId) {
            tallySheetStatus = TALLY_SHEET_STATUS_ENUM.SUBMITTED;
            readyToLock = true;
        } else if (latestVersionId) {
            tallySheetStatus = TALLY_SHEET_STATUS_ENUM.ENTERED;
        } else {
            tallySheetStatus = TALLY_SHEET_STATUS_ENUM.NOT_ENTERED;
        }
    } else {
        if (lockedVersionId) {
            tallySheetStatus = TALLY_SHEET_STATUS_ENUM.VERIFIED;
        } else {
            tallySheetStatus = TALLY_SHEET_STATUS_ENUM.VIEWED;
            readyToLock = false
        }
    }

    return tallySheetStatus;
}

function refactorTallySheetObject(tallySheet) {
    tallySheet.tallySheetCode = tallySheet.tallySheetCode.replace(/_/g, "-");
    const {tallySheetCode, lockedVersionId, submittedVersionId, latestVersionId} = tallySheet;
    let tallySheetStatus = "";
    let readyToLock = false;
    if (tallySheetCode === TALLY_SHEET_CODE_PRE_41 || tallySheetCode === TALLY_SHEET_CODE_CE_201 || tallySheetCode === TALLY_SHEET_CODE_CE_201_PV) {
        if (lockedVersionId) {
            tallySheetStatus = TALLY_SHEET_STATUS_ENUM.VERIFIED;
        } else if (submittedVersionId) {
            tallySheetStatus = TALLY_SHEET_STATUS_ENUM.SUBMITTED;
            readyToLock = true;
        } else if (latestVersionId) {
            tallySheetStatus = TALLY_SHEET_STATUS_ENUM.ENTERED;
        } else {
            tallySheetStatus = TALLY_SHEET_STATUS_ENUM.NOT_ENTERED;
        }
    } else {
        if (lockedVersionId) {
            tallySheetStatus = TALLY_SHEET_STATUS_ENUM.VERIFIED;
        } else {
            tallySheetStatus = TALLY_SHEET_STATUS_ENUM.VIEWED;
            readyToLock = false
        }
    }

    tallySheet.tallySheetStatus = tallySheetStatus;
    tallySheet.readyToLock = readyToLock;

    return tallySheet
}

export function getTallySheet({areaId, tallySheetCode, limit = 20, offset = 0}) {
    return request({
        url: ENDPOINT_PATH_TALLY_SHEETS(),
        method: 'get',
        params: {areaId, tallySheetCode}
    }).then((tallySheets) => {
        return tallySheets.map((tallySheet) => {
            return refactorTallySheetObject(tallySheet);
        });
    })
}

export function getTallySheetById(tallySheetId) {
    return request({
        url: ENDPOINT_PATH_TALLY_SHEETS_BY_ID(tallySheetId),
        method: 'get',
        params: {}
    }).then((tallySheet) => {
        return refactorTallySheetObject(tallySheet);
    })
}

export function getTallySheetVersionById(tallySheetId, tallySheetCode, tallySheetVersionId) {
    return request({
        url: ENDPOINT_PATH_TALLY_SHEET_VERSION_BY_ID(tallySheetId, tallySheetCode, tallySheetVersionId),
        method: 'get',
        params: {}
    })
}


export function saveTallySheetVersion(tallySheetId, tallySheetCode, body) {
    return request({
        url: ENDPOINT_PATH_TALLY_SHEET_VERSION_BY_ID(tallySheetId, tallySheetCode),
        method: 'post',
        data: body
    })
}

export function lockTallySheet(tallySheetId, tallySheetVersionId) {
    return request({
        url: ENDPOINT_PATH_TALLY_SHEET_LOCK(tallySheetId),
        method: 'put',
        data: {
            lockedVersionId: tallySheetVersionId
        }
    }).then((tallySheet) => {
        return refactorTallySheetObject(tallySheet);
    })
}


export function unlockTallySheet(tallySheetId, tallySheetVersionId) {
    return request({
        url: ENDPOINT_PATH_TALLY_SHEET_LOCK(tallySheetId),
        method: 'put',
        data: {
            lockedVersionId: tallySheetVersionId
        }
    }).then((tallySheet) => {
        return refactorTallySheetObject(tallySheet);
    })
}


export function getTallySheetVersionHtml(tallySheetId, tallySheetVersionId) {
    return request({
        url: ENDPOINT_PATH_TALLY_SHEET_VERSION_HTML(tallySheetId, tallySheetVersionId),
        method: 'get'
    })
}

export function generateReport(tallySheetId, tallySheetVersionId) {
    return saveTallySheetVersion(tallySheetId, tallySheetVersionId)
}

