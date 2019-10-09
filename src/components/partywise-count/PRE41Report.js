import React, {Component} from 'react'
import {
    Button,
} from '@material-ui/core';
import axios from "../../axios-base";

class PRE41Report extends Component {
    constructor(props) {
        super(props);
        this.handleReport = this.handleReport.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleUnlock = this.handleUnlock.bind(this);
        this.handleBackToPRE41 = this.handleBackToPRE41.bind(this);
        this.state = {
            open: "Test",
            htmlContent: " ",
            dataURI: '',
            isLocked: false
        };
    }

    componentDidMount() {
        const {tallySheetId} = this.props.match.params
        const {tallySheetVersionId} = this.props.match.params
        const {countingId} = this.props.match.params
        console.log("Ids >>> ", tallySheetId, tallySheetVersionId)
        axios.get('/tally-sheet/' + tallySheetId + '/version/' + tallySheetVersionId + '/html', {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token'),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log("Html " + res.data)
            this.setState({
                htmlContent: res.data
            })
            this.handleReport()
        })
            .catch((error) => console.log(error));

        /** To confirm the Lock status **/
        axios.get('/tally-sheet?limit=1000&offset=0&electionId='+localStorage.getItem('electionType_NonPostal_Id')+'&officeId='+countingId+'&tallySheetCode=PRE-41', {
            headers: {
                'Authorization': "Bearer "+localStorage.getItem('token'),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {


            if (res.data[0].locked){
                // alert("Already Locked Tally Sheet !")
                this.setState({
                    isLocked: true
                })

            }else {
                console.log("Unlocked Tally Sheet !")
            }
        })
            .catch((error) => console.log(error));

    }

    handleReport() {
        console.log("HTML")
        // var html = document.getElementById("html").innerHTML;
        var dataURI = 'data:text/html,' + encodeURIComponent(this.state.htmlContent);
        console.log(dataURI)
        this.setState({
            dataURI: dataURI
        })
    }

    // submit the form data
    handleSubmit() {
        const {tallySheetId} = this.props.match.params
        const {tallySheetVersionId} = this.props.match.params
        const {countingId} = this.props.match.params
        /** Lock Report **/
        axios.put('/tally-sheet/' + tallySheetId + '/lock',
            {
                "lockedVersionId": parseInt(tallySheetVersionId)
            },
            {
                headers: {
                    'authorization': "Bearer " + localStorage.getItem('token'),
                }
            })
            .then(res => {
                console.log("Lock API " + res);

                alert("Successfully Created the TallySheet - PRE 41")
                this.props.history.replace('/Home')

            }).catch((error) => console.log(error));


    }

    // submit the form data
    handleUnlock() {
        console.log("unlock");
        const {tallySheetId} = this.props.match.params
        const {tallySheetVersionId} = this.props.match.params
        const {countingId} = this.props.match.params
        /** UnLock Report **/
        axios.put('/tally-sheet/' + tallySheetId + '/unlock',
            {
                headers: {
                    'authorization': "Bearer " + localStorage.getItem('token'),
                }
            })
            .then(res => {
                console.log("UnLock API " + res);
                alert("Successfully Unlocked the TallySheet - PRE 41")
                this.props.history.replace('/PRE41Edit/' + tallySheetId + '/'+tallySheetVersionId+'/'+countingId)

            }).catch((error) => console.log(error));

    }

    // submit the form data
    handleBack() {
        console.log("Back API ");
        const {tallySheetId} = this.props.match.params
        const {tallySheetVersionId} = this.props.match.params
        const {countingId} = this.props.match.params
        // alert("Successfully Created the TallySheet - PRE 41")


        this.props.history.replace('/PRE41Edit/' + tallySheetId + '/'+tallySheetVersionId+'/'+countingId)
    }

    handleBackToPRE41() {
        this.props.history.replace('/PRE41')
    }


    render() {
        return (
            <div style={{marginLeft: '18%', marginTop: '4%'}}>
                <iframe height="2700" width="900" src={this.state.dataURI}>
                </iframe>

                {this.state.isLocked===false && <div style={{margin: '4%', marginLeft: '56%'}}>
                   <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleBack}
                            className="button">Back</Button>
                    <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleSubmit}
                            className="button">Submit</Button>
                </div>}
                {this.state.isLocked===true && <div style={{margin: '4%', marginLeft: '56%'}}>
                    <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleBackToPRE41}
                            className="button">Back</Button>
                    <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleUnlock}
                            className="button">Unlock</Button>
                </div>}
            </div>
        )
    }
}

export default PRE41Report;
