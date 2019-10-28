import React, {Component, useEffect, useState} from "react";
import {getElections} from "./tabulation-api";
import {MessagesProvider, MessagesConsumer} from "./messages.provider";
import {Link} from "react-router-dom";
import {PATH_ELECTION, PATH_ELECTION_BY_ID, PATH_ELECTION_DATA_ENTRY, TALLY_SHEET_CODE_PRE_41} from "../App";
import BreadCrumb from "../components/bread-crumb";


export default function Home(props) {
    const [state, setState] = useState({
        electionsList: []
    });


    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        getElections().then((electionsList) => {
            setState({electionsList})
        });
    }, []);

    return <div className="page">
        <BreadCrumb
            links={[
                {label: "elections", to: PATH_ELECTION()}
            ]}
        />
        <div className="page-content">
            {state.electionsList.map((election) => {
                const {electionId, electionName} = election;

                return <Link key={electionId} to={PATH_ELECTION_BY_ID(electionId)}>{electionName}</Link>
            })}
        </div>
    </div>
}


{/*<MessagesConsumer>*/
}
{/*    {({push, messages}) => {*/
}
{/*        console.log("Heyyyy ", messages);*/
}
{/*        return <button*/
}
{/*            onClick={push.bind(this, "Test Title", "THis is the message body....")}*/
}
{/*        >Add Message</button>*/
}
{/*    }}*/
}
{/*</MessagesConsumer>*/
}