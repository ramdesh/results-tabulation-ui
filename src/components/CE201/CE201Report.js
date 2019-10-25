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
        this.handleUnlock = this.handleUnlock.bind(this);
        this.handleBackToCE201 = this.handleBackToCE201.bind(this);
        this.state = {
            open: "Test",
            htmlContent: " ",
            dataURI: '',
            isLocked: false,
            iframeHeight: 600,
            iframeWidth: "100%"
        };
        this.iframeRef = React.createRef()
    }

    handleBackToCE201() {
        console.log("Back to CE201 selection ");
        this.props.history.push('/CE201')
    }

    /** Back **/
    handleBack() {
        console.log("Back API CE201 ");
        const {tallySheetId} = this.props.match.params
        const {tallySheetVersionId} = this.props.match.params
        this.props.history.push('/CE201Entry/' + tallySheetId + '/' + tallySheetVersionId)
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


        /** To confirm the Lock status **/
        axios.get('/tally-sheet/' + tallySheetId, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token'),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            if (res.data.locked) {
                // alert("Already Locked Tally Sheet !")
                this.setState({
                    isLocked: true
                })

            } else {
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

    /** unlock **/
    handleUnlock() {
        const {tallySheetId} = this.props.match.params
        const {tallySheetVersionId} = this.props.match.params
        // const {countingId} = this.props.match.params
        /** UnLock Report **/
        axios.put('/tally-sheet/' + tallySheetId + '/unlock', null,
            {
                headers: {
                    'authorization': "Bearer " + localStorage.getItem('token'),
                }
            })
            .then(res => {
                console.log("UnLock API " + res);
                alert("Successfully Unlocked the TallySheet - CE 201")
                this.props.history.push('/Home')
                this.props.history.push('/CE201Entry/' + tallySheetId + '/' + tallySheetVersionId)

            }).catch((error) => console.log(error));
    }

    // submit the form data
    handleSubmit() {
        const {tallySheetId} = this.props.match.params
        const {tallySheetVersionId} = this.props.match.params
        // const {countingId} = this.props.match.params

        /** Lock Report CE201 **/
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
                alert("Successfully Locked the TallySheet - CE 201")
                this.props.history.push('/Home')

            }).catch((error) => console.log(error));

    }

    handleIframeHeight(evt) {
        this.setState({
            iframeHeight: evt.target.contentDocument.documentElement.scrollHeight + 50,
            //iframeWidth: evt.target.contentDocument.documentElement.scrollWidth + 50
        })
    }

    isIframeContentReady() {
        return this.state.htmlContent !== null
    }

    getIframeContent() {
        if (this.isIframeContentReady()) {
            return this.state.htmlContent
        } else {
            return "<div style='font-size: 20px; color: #222323; text-align: center'>Loading ...</div>"
        }
    }

    render() {
        return (
            <div style={{marginLeft: '2%', marginTop: '3%'}}>

                <iframe
                    style={{border: "none"}}
                    height={this.state.iframeHeight}
                    width={this.state.iframeWidth}
                    srcDoc={this.getIframeContent()}
                    onLoad={this.handleIframeHeight.bind(this)}
                    ref={this.iframeRef}
                >
                </iframe>

                {/*<iframe height="1700" width="1110" src={this.state.dataURI}>*/}
                {/*</iframe>*/}
                {this.state.isLocked === false && <div style={{margin: '4%', marginLeft: '80%'}}>
                    {/*<Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleBack}*/}
                    {/*className="button">Back</Button>*/}
                    <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleBack}
                            className="button">Back</Button>
                    <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleSubmit}
                            className="button">Submit</Button>

                </div>}
                {this.state.isLocked === true && <div style={{margin: '4%', marginLeft: '70%'}}>
                    <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}}
                            onClick={this.handleBackToCE201}
                            className="button">Back</Button>
                    <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleUnlock}
                            className="button">Unlock</Button>
                    <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleSubmit}
                            className="button">Submit</Button>
                </div>}
            </div>
        )
    }
}

export default CE201Report;
