import React, {Component} from 'react'
import {
    Button,
} from '@material-ui/core';
import axios from "../../axios-base";

class CE201Report extends Component {
    constructor(props) {
        super(props);
        this.handleReport = this.handleReport.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.state = {
            open: "Test",
            htmlContent: " ",
            dataURI: '',
            isLocked: false,
        };
    }

    // submit the form data
    handleBack() {
        console.log("Back API ");
        const {tallySheetId} = this.props.match.params
        const {tallySheetVersionId} = this.props.match.params
        // const {countingId} = this.props.match.params
        // alert("Successfully Created the TallySheet - PRE 41")


        this.props.history.push('/CE201Entry/'+tallySheetId+'/'+tallySheetVersionId)
    }

    componentDidMount() {
        const {tallySheetId} = this.props.match.params
        const {tallySheetVersionId} = this.props.match.params
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
    }

    handleReport() {
        console.log("HTML")
        // var html = document.getElementById("html").innerHTML;
        var dataURI = 'data:text/html,' + encodeURIComponent(this.state.htmlContent);
        console.log(dataURI)

        this.setState({
            dataURI: dataURI
        })

        // alert("Successfully Created the TallySheet - PRE41")
    }

    // submit the form data
    handleSubmit() {
        alert("Successfully Created the TallySheet - CE 201")
        this.props.history.push('/Home')
    }

    render() {
        return (
            <div style={{marginLeft: '11%', marginTop: '4%'}}>
                <iframe height="1700" width="1110" src={this.state.dataURI}>
                </iframe>
                {this.state.isLocked===false && <div style={{margin: '4%', marginLeft: '76%'}}>
                    <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleBack}
                            className="button">Back</Button>
                    <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleSubmit}
                            className="button">Submit</Button>
                </div>}
                {this.state.isLocked===true && <div style={{margin: '4%', marginLeft: '76%'}}>
                    <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleBackToPRE41}
                            className="button">Back</Button>
                    <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleUnlock}
                            className="button">Unlock</Button>
                </div>}
            </div>
        )
    }
}

export default CE201Report;
