import React, {Component, useEffect, useState} from "react";
import {getElections} from "./tabulation-api";
import {MessagesProvider, MessagesConsumer} from "./messages.provider";


export default function Home(props) {
    const [state, setState] = useState({
        electionsList: []
    });

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(async () => {
        try {
            const electionsList = await getElections();
            setState({electionsList})
        } catch (e) {

        }
    });

    return <MessagesProvider>


        {/*<MessagesConsumer>*/}
        {/*    {({push, messages}) => {*/}
        {/*        console.log("Heyyyy ", messages);*/}
        {/*        return <button*/}
        {/*            onClick={push.bind(this, "Test Title", "THis is the message body....")}*/}
        {/*        >Add Message</button>*/}
        {/*    }}*/}
        {/*</MessagesConsumer>*/}
    </MessagesProvider>
}