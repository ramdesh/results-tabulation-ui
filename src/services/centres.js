const mockCentres = {
    districtCentres: [
        {
            districtCentreId: 1, name: "Colombo",
            pollingStations: [
                {pollingStationId: 22, pollingDistrictId: 10, pollingDivisionId: 4, electoralDistrictId: 1, name: "PS 22"},
                {pollingStationId: 23, pollingDistrictId: 11, pollingDivisionId: 4, electoralDistrictId: 1, name: "PS 23"},
                {pollingStationId: 24, pollingDistrictId: 12, pollingDivisionId: 5, electoralDistrictId: 1, name: "PS 24"},
                {pollingStationId: 25, pollingDistrictId: 13, pollingDivisionId: 5, electoralDistrictId: 1, name: "PS 25"},
                {pollingStationId: 26, pollingDistrictId: 14, pollingDivisionId: 6, electoralDistrictId: 1, name: "PS 26"},
                {pollingStationId: 27, pollingDistrictId: 15, pollingDivisionId: 6, electoralDistrictId: 1, name: "PS 27"}
            ]
        },
        {
            districtCentreId: 2, name: "Kalutara",
            pollingStations: [
                {pollingStationId: 22, pollingDistrictId: 10, pollingDivisionId: 4, electoralDistrictId: 1, name: "PS 22"},
                {pollingStationId: 23, pollingDistrictId: 11, pollingDivisionId: 4, electoralDistrictId: 1, name: "PS 23"},
                {pollingStationId: 24, pollingDistrictId: 12, pollingDivisionId: 5, electoralDistrictId: 1, name: "PS 24"},
                {pollingStationId: 25, pollingDistrictId: 13, pollingDivisionId: 5, electoralDistrictId: 1, name: "PS 25"},
                {pollingStationId: 26, pollingDistrictId: 14, pollingDivisionId: 6, electoralDistrictId: 1, name: "PS 26"},
                {pollingStationId: 27, pollingDistrictId: 15, pollingDivisionId: 6, electoralDistrictId: 1, name: "PS 27"}
            ]
        },
        {
            districtCentreId: 3, name: "Gampaha",
            pollingStations: [
            ]
        }
    ],
    countingCentres: [
        {
            countingCentreId: 4, districtCentreId: 1, name: "Colombo South",
            pollingStations: [
                {pollingStationId: 22, pollingDistrictId: 10, pollingDivisionId: 4, electoralDistrictId: 1, name: "PS 22"},
                {pollingStationId: 23, pollingDistrictId: 11, pollingDivisionId: 4, electoralDistrictId: 1, name: "PS 23"},
                {pollingStationId: 24, pollingDistrictId: 12, pollingDivisionId: 5, electoralDistrictId: 1, name: "PS 24"}
            ]
        },
        {
            countingCentreId: 5, districtCentreId: 1, name: "Colombo Central",
            pollingStations: [
                {pollingStationId: 25, pollingDistrictId: 13, pollingDivisionId: 5, electoralDistrictId: 1, name: "PS 25"},
                {pollingStationId: 26, pollingDistrictId: 14, pollingDivisionId: 6, electoralDistrictId: 1, name: "PS 26"},
                {pollingStationId: 27, pollingDistrictId: 15, pollingDivisionId: 6, electoralDistrictId: 1, name: "PS 27"}
            ]
        },
        {
            countingCentreId: 6, districtCentreId: 2, name: "Panadura",
            pollingStations: [
                {pollingStationId: 22, pollingDistrictId: 10, pollingDivisionId: 4, electoralDistrictId: 1, name: "PS 22"},
                {pollingStationId: 23, pollingDistrictId: 11, pollingDivisionId: 4, electoralDistrictId: 1, name: "PS 23"}
            ]
        },,
        {
            countingCentreId: 7, districtCentreId: 2, name: "Horana",
            pollingStations: [
                {pollingStationId: 24, pollingDistrictId: 12, pollingDivisionId: 5, electoralDistrictId: 1, name: "PS 24"},
                {pollingStationId: 25, pollingDistrictId: 13, pollingDivisionId: 5, electoralDistrictId: 1, name: "PS 25"}
            ]
        },,
        {
            countingCentreId: 8, districtCentreId: 2, name: "Aluthgama",
            pollingStations: [
                {pollingStationId: 26, pollingDistrictId: 14, pollingDivisionId: 6, electoralDistrictId: 1, name: "PS 26"},
                {pollingStationId: 27, pollingDistrictId: 15, pollingDivisionId: 6, electoralDistrictId: 1, name: "PS 27"}
            ]
        }
    ]
}

export default {
    districtCentres: {
        getAll: function () {
            return new Promise((resolve, reject) => {
                resolve(mockCentres.districtCentres)
            });
        }
    },
    countingCentres: {
        getAll: function (districtCentreId = null) {
            return new Promise((resolve, reject) => {
                if (districtCentreId === null) {
                    resolve(mockCentres.countingCentres)
                } else {
                    resolve(mockCentres.countingCentres.filter(
                        countingCentre => countingCentre.districtCentreId === districtCentreId
                    ))
                }
            });
        }
    }
}
