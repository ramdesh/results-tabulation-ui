/**
 * This is a mock service to be replaces once the electorates api is ready.
 */

const mockElectorates = {
    electoralDistricts: [
        {electoralDistrictId: "1", name: "Colombo"},
        {electoralDistrictId: "2", name: "Kalutara"},
        {electoralDistrictId: "3", name: "Gampaha"}
    ],
    pollingDivisions: [
        {pollingDivisionId: "4", electoralDistrictId: "1", name: "Colombo South"},
        {pollingDivisionId: "5", electoralDistrictId: "1", name: "Colombo Central"},
        {pollingDivisionId: "6", electoralDistrictId: "1", name: "Colombo Borella"},
        {pollingDivisionId: "7", electoralDistrictId: "2", name: "Panadura"},
        {pollingDivisionId: "8", electoralDistrictId: "2", name: "Horana"},
        {pollingDivisionId: "9", electoralDistrictId: "2", name: "Aluthgama"}
    ],
    pollingDistricts: [
        {pollingDistrictId: "10", pollingDivisionId: "4", electoralDistrictId: "1", name: "Colombo South - 1"},
        {pollingDistrictId: "11", pollingDivisionId: "4", electoralDistrictId: "1", name: "Colombo South - 2"},
        {pollingDistrictId: "12", pollingDivisionId: "5", electoralDistrictId: "1", name: "Colombo Central - 1"},
        {pollingDistrictId: "13", pollingDivisionId: "5", electoralDistrictId: "1", name: "Colombo Central - 2"},
        {pollingDistrictId: "14", pollingDivisionId: "6", electoralDistrictId: "1", name: "Colombo Borella - 1"},
        {pollingDistrictId: "15", pollingDivisionId: "6", electoralDistrictId: "1", name: "Colombo Borella - 2"},
        {pollingDistrictId: "16", pollingDivisionId: "7", electoralDistrictId: "2", name: "Panadura - 1"},
        {pollingDistrictId: "17", pollingDivisionId: "7", electoralDistrictId: "2", name: "Panadura - 2"},
        {pollingDistrictId: "18", pollingDivisionId: "8", electoralDistrictId: "2", name: "Horana - 1"},
        {pollingDistrictId: "19", pollingDivisionId: "8", electoralDistrictId: "2", name: "Horana - 2"},
        {pollingDistrictId: "20", pollingDivisionId: "9", electoralDistrictId: "2", name: "Aluthgama - 1"},
        {pollingDistrictId: "21", pollingDivisionId: "9", electoralDistrictId: "2", name: "Aluthgama - 2"}
    ],
    pollingStations: [
        {pollingStationId: "22", pollingDistrictId: "10", pollingDivisionId: "4", electoralDistrictId: "1", name: "PS 22"},
        {pollingStationId: "23", pollingDistrictId: "11", pollingDivisionId: "4", electoralDistrictId: "1", name: "PS 23"},
        {pollingStationId: "24", pollingDistrictId: "12", pollingDivisionId: "5", electoralDistrictId: "1", name: "PS 24"},
        {pollingStationId: "25", pollingDistrictId: "13", pollingDivisionId: "5", electoralDistrictId: "1", name: "PS 25"},
        {pollingStationId: "26", pollingDistrictId: "14", pollingDivisionId: "6", electoralDistrictId: "1", name: "PS 26"},
        {pollingStationId: "27", pollingDistrictId: "15", pollingDivisionId: "6", electoralDistrictId: "1", name: "PS 27"},
        {pollingStationId: "28", pollingDistrictId: "16", pollingDivisionId: "7", electoralDistrictId: "2", name: "PS 28"},
        {pollingStationId: "29", pollingDistrictId: "17", pollingDivisionId: "7", electoralDistrictId: "2", name: "PS 29"},
        {pollingStationId: "30", pollingDistrictId: "18", pollingDivisionId: "8", electoralDistrictId: "2", name: "PS 30"},
        {pollingStationId: "31", pollingDistrictId: "19", pollingDivisionId: "8", electoralDistrictId: "2", name: "PS 31"},
        {pollingStationId: "32", pollingDistrictId: "20", pollingDivisionId: "9", electoralDistrictId: "2", name: "PS 32"},
        {pollingStationId: "33", pollingDistrictId: "21", pollingDivisionId: "9", electoralDistrictId: "2", name: "PS 33"}
    ],
}

export default {
    electoralDistricts: {
        getAll: function () {
            return new Promise((resolve, reject) => {
                resolve(mockElectorates.electoralDistricts)
            });
        },
        getById: function (electoralDistrictId = "") {
            return new Promise((resolve, reject) => {
                if (electoralDistrictId === "") {
                    resolve(undefined)
                } else {
                    for (var i = 0; i < mockElectorates.electoralDistricts.length; i++) {
                        const electoralDistrict = mockElectorates.electoralDistricts[i];
                        if (electoralDistrict.electoralDistrictId === electoralDistrictId) {
                            return resolve(electoralDistrict)
                        }
                    }

                    return resolve(undefined)
                }
            });
        }
    },
    pollingDivisions: {
        getAll: function (electoralDistrictId = "") {
            return new Promise((resolve, reject) => {
                if (electoralDistrictId === "") {
                    resolve(mockElectorates.pollingDivisions)
                } else {
                    resolve(mockElectorates.pollingDivisions.filter(
                        pollingDivision => pollingDivision.electoralDistrictId === electoralDistrictId
                    ))
                }
            });
        },
        getById: function (pollingDivisionId = "") {
            return new Promise((resolve, reject) => {
                if (pollingDivisionId === "") {
                    resolve(undefined)
                } else {
                    for (var i = 0; i < mockElectorates.pollingDivisions.length; i++) {
                        const pollingDivision = mockElectorates.pollingDivisions[i];
                        if (pollingDivision.pollingDivisionId === pollingDivisionId) {
                            return resolve(pollingDivision)
                        }
                    }

                    return resolve(undefined)
                }
            });
        }
    },
    pollingDistricts: {
        getAll: function (electoralDistrictId = "", pollingDivisionId = "") {
            return new Promise((resolve, reject) => {

                // TODO filter by "electoralDistrictId"

                if (pollingDivisionId === "") {
                    resolve(mockElectorates.pollingDistricts)
                } else {
                    resolve(mockElectorates.pollingDistricts.filter(
                        pollingDistrict => pollingDistrict.pollingDivisionId === pollingDivisionId
                    ))
                }
            });
        },
        getById: function (pollingDistrictId = "") {
            return new Promise((resolve, reject) => {
                if (pollingDistrictId === "") {
                    resolve(undefined)
                } else {
                    for (var i = 0; i < mockElectorates.pollingDistricts.length; i++) {
                        const pollingDistrict = mockElectorates.pollingDistricts[i];
                        if (pollingDistrict.pollingDistrictId === pollingDistrictId) {
                            return resolve(pollingDistrict)
                        }
                    }

                    return resolve(undefined)
                }
            });
        }
    },
    pollingStations: {
        getAll: function (electoralDistrictId = "", pollingDivisionId = "", pollingDistrictId = "") {
            return new Promise((resolve, reject) => {

                // TODO filter by "electoralDistrictId" and "pollingDivisionId"

                if (pollingDistrictId === "") {
                    resolve(mockElectorates.pollingStations)
                } else {
                    resolve(mockElectorates.pollingStations.filter(
                        pollingStation => pollingStation.pollingDistrictId === pollingDistrictId
                    ))
                }
            });
        },
        getById: function (pollingStationId = "") {
            return new Promise((resolve, reject) => {
                if (pollingStationId === "") {
                    resolve(undefined)
                } else {
                    for (var i = 0; i < mockElectorates.pollingStations.length; i++) {
                        const pollingStation = mockElectorates.pollingStations[i];
                        if (pollingStation.pollingStationId === pollingStationId) {
                            return resolve(pollingStation)
                        }
                    }

                    return resolve(undefined)
                }
            });
        }
    },
}
