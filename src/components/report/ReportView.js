import React, {Component} from 'react'
import { Button } from '@material-ui/core';
import axios from "../../axios-base";

class ReportView extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePrint = this.handlePrint.bind(this);
        this.state = {
            open: "Test",
            htmlContent: null,
            iframeHeight: 600,
            iframeWidth: "100%"
        };
        this.iframeRef = React.createRef()
    }

    getIframeContent() {
        if (this.isIframeContentReady()) {
            return this.state.htmlContent
        } else {
            return "<div style='font-size: 20px; color: #222323; text-align: center'>Loading ...</div>"
        }
    }

    isIframeContentReady() {
        return this.state.htmlContent !== null
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
        }).catch((error) => console.log(error));
    }

    // submit the form data
    handleSubmit() {
        alert("Successfully Created the TallySheet - CE 201")
        this.props.history.replace('/Home')
    }

    handlePrint() {
        this.iframeRef.current.contentWindow.print()
    }

    handleIframeHeight(evt) {
        this.setState({
            iframeHeight: evt.target.contentDocument.documentElement.scrollHeight + 50,
            //iframeWidth: evt.target.contentDocument.documentElement.scrollWidth + 50
        })
    }

    getActionButtonsJsx() {
        if (this.isIframeContentReady()) {
            return <div style={{width: "100%", textAlign: "right"}}>
                <Button style={{borderRadius: 18, color: 'white', align: 'right', marginLeft: 10}}
                        onClick={this.handlePrint}
                        className="button">Print</Button>
                <Button style={{borderRadius: 18, color: 'white', align: 'right', marginLeft: 10}}
                        onClick={this.handleSubmit}
                        className="button">Submit</Button>
            </div>
        } else {
            return null
        }
    }

    render() {
        return [
            <div style={{padding: 10}}>
                <iframe
                    style={{border: "none"}}
                    height={this.state.iframeHeight}
                    width={this.state.iframeWidth}
                    srcDoc={this.getIframeContent()}
                    onLoad={this.handleIframeHeight.bind(this)}
                    ref={this.iframeRef}
                >
                </iframe>
                {this.getActionButtonsJsx()}
            </div>
        ]
    }
}

export default ReportView;
