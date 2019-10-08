import React, {Component} from 'react'
import {
    Button,
} from '@material-ui/core';
import axios from "../../axios-base";

class ReportView extends Component {
    constructor(props) {
        super(props);
        this.handleReport = this.handleReport.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            open: "Test",
            htmlContent: " ",
            dataURI: ''
        };
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
        this.props.history.replace('/Home')
    }

    render() {
        return (
            <div style={{marginLeft: '11%', marginTop: '4%'}}>
                <iframe height="1700" width="1110" src={this.state.dataURI}>
                </iframe>
                <Button style={{margin: '4%',marginLeft: '78%',borderRadius: 18, color: 'white'}} onClick={this.handleSubmit}
                        className="button">Submit</Button>
            </div>
        )
    }
}

export default ReportView;
