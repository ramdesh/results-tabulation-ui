import React, {useEffect, useState} from "react";
import {getElections} from "../services/tabulation-api";
import {Link} from "react-router-dom";
import {PATH_ELECTION, PATH_ELECTION_BY_ID, PATH_ELECTION_DATA_ENTRY, TALLY_SHEET_CODE_PRE_41} from "../App";
import BreadCrumb from "../components/bread-crumb";
import Processing from "../components/processing";
import Error from "../components/error";


export default function Home() {
    const [state, setState] = useState({
        electionsList: []
    });
    const [processing, setProcessing] = useState(true);
    const [error, setError] = useState(false);


    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        getElections().then((electionsList) => {
            setState({electionsList});
            setProcessing(false);
        }).catch(() => {
            setError(true);
            setProcessing(false);
        })
    }, []);

    function getElectionListJsx() {
        if (processing) {
            return <Processing/>
        } else if (error) {
            return <Error
                title="Tally sheet list cannot be accessed"
            />
        } else {
            return <div className="election-list">
                {state.electionsList.map((election) => {
                    const {electionId, electionName} = election;

                    return <Link
                        key={electionId} to={PATH_ELECTION_BY_ID(electionId)}
                        className="election-list-item"
                    >
                        {electionName}
                    </Link>
                })}
            </div>
        }
    }


    return <div className="page">
        <BreadCrumb
            links={[
                {label: "elections", to: PATH_ELECTION()}
            ]}
        />
        <div className="page-content">
            {getElectionListJsx()}
        </div>
    </div>
}
