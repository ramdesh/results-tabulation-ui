/**
 * This is a mock service to be replaces once the electorates api is ready.
 */

const mockElections = {
    elections: [
        {electionId: "1", electionName: "Presidential"},
        {electionId: "2", electionName: "Regional"}
    ],
    parties: [
        {partyId: "1", electionId: "1", symbol: "Moon", partyName: "ABC"},
        {partyId: "2", electionId: "1", symbol: "Bottle", partyName: "DEF"},
        {partyId: "3", electionId: "1", symbol: "Python", partyName: "GHI"},
        {partyId: "4", electionId: "1", symbol: "Hammer", partyName: "JKH"},
        {partyId: "5", electionId: "1", symbol: "Carrot", partyName: "LMN"},
        {partyId: "6", electionId: "1", symbol: "Fish", partyName: "OPQ"}
    ],
    candidates: [
        {candidateId: "1", partyId: "1", electionId: "1", candidateName: "Yujith Waraniyagoda", symbol: "Moon", partyName: "ABC"},
        {candidateId: "2", partyId: "2", electionId: "1", candidateName: "Clement Fernando",  symbol: "Bottle", partyName: "DEF"},
        {candidateId: "3", partyId: "3", electionId: "1", candidateName: "Umayanga Gunewardena", symbol: "Python", partyName: "GHI"},
        {candidateId: "4", partyId: "4", electionId: "1", candidateName: "Sherazad Hamit", symbol: "Hammer", partyName: "JKH"},
        {candidateId: "5", partyId: "5", electionId: "1", candidateName: "Anushka", symbol: "Carrot", partyName: "LMN"},
        {candidateId: "6", partyId: "6", electionId: "1", candidateName: "Samudra Weerasinghe", symbol: "Fish", partyName: "OPQ"}
    ]
}

export default {
    elections: {
        getAll: function () {
            return new Promise((resolve, reject) => {
                resolve(mockElections.elections)
            });
        },
        getById: function (electionId = "") {
            return new Promise((resolve, reject) => {
                if (electionId === "") {
                    resolve(undefined)
                } else {
                    for (var i = 0; i < mockElections.elections.length; i++) {
                        const election = mockElections.elections[i];
                        if (election.electionId === electionId) {
                            return resolve(election)
                        }
                    }

                    return resolve(undefined)
                }
            });
        }
    },
    parties: {
        getAll: function (electionId = "") {
        console.log("HELLO");
            return new Promise((resolve, reject) => {
                if (electionId === "") {
                    resolve(mockElections.parties)
                } else {
                    resolve(mockElections.parties.filter(
                        party => party.electionId === electionId
                    ))
                }
            });
        },
        getById: function (partyId = "") {
            return new Promise((resolve, reject) => {
                if (partyId === "") {
                    resolve(undefined)
                } else {
                    for (var i = 0; i < mockElections.parties.length; i++) {
                        const party = mockElections.parties[i];
                        if (party.partyId === partyId) {
                            return resolve(party)
                        }
                    }

                    return resolve(undefined)
                }
            });
        }
    },
    candidates: {
        getAll: function (electionId = "", partyId = "") {
            return new Promise((resolve, reject) => {

                // TODO filter by "electoralDistrictId"

                if (partyId === "") {
                    resolve(mockElections.candidates)
                } else {
                    resolve(mockElections.candidates.filter(
                        candidate => candidate.partyId === partyId
                    ))
                }
            });
        },
        getById: function (candidateId = "") {
            return new Promise((resolve, reject) => {
                if (candidateId === "") {
                    resolve(undefined)
                } else {
                    for (var i = 0; i < mockElections.candidates.length; i++) {
                        const candidate = mockElections.candidates[i];
                        if (candidate.candidateId === candidateId) {
                            return resolve(candidate)
                        }
                    }

                    return resolve(undefined)
                }
            });
        }
    }

}
