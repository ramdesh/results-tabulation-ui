export const getPollingDivisionName = (tallySheet) => {
    let pollingDivisionName = null;
    if (tallySheet) {
        const {pollingDivisions} = tallySheet.area;
        if (pollingDivisions.length > 0) {
            const {areaName} = pollingDivisions[0];
            pollingDivisionName = areaName;
        }
    }

    return pollingDivisionName;
};

export const getElectoralDistrictName = (tallySheet) => {
    let electoralDistrictName = null;
    if (tallySheet) {
        const {electoralDistricts} = tallySheet.area;
        if (electoralDistricts.length > 0) {
            const {areaName} = electoralDistricts[0];
            electoralDistrictName = areaName;
        }
    }

    return electoralDistrictName;
};