import React, {Component} from 'react'
import { Button } from '@material-ui/core';
import axios from "../../axios-base";

class ReportView extends Component {
    constructor(props) {
        super(props);
        this.handleBack = this.handleBack.bind(this);
        this.handlePrint = this.handlePrint.bind(this);
        this.handleLock = this.handleLock.bind(this);
        this.handleUnlock = this.handleUnlock.bind(this);
        this.state = {
            open: "Test",
            htmlContent: null,
            iframeHeight: 600,
            iframeWidth: "100%",
            isLocked: false,
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
            if (res.data.locked){
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

    // submit the form data
    handleBack() {
        this.props.history.replace('/ReportsEntry')
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
                        onClick={this.handleBack}
                        className="button">Back</Button>

                <Button style={{borderRadius: 18, color: 'white', align: 'right', marginLeft: 10}}
                        onClick={this.handlePrint}
                        className="button">Print</Button>

            </div>
        } else {
            return null
        }
    }

    /** Lock Report **/
    handleLock() {
        const {tallySheetId} = this.props.match.params
        const {tallySheetVersionId} = this.props.match.params
        // const {countingId} = this.props.match.params

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
                alert("Successfully Locked the Report")
                this.props.history.push('/ReportsEntry')

            }).catch((error) => console.log(error));
    }

    /** unlock Report **/
    handleUnlock() {
        console.log("unlock");
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
                alert("Successfully Unlocked the Report")
                this.props.history.push('/ReportsEntry')
            }).catch((error) => console.log(error));
    }

    render() {
        return (
            <div style={{marginLeft: '2%', marginTop: '4%'}}>
                <iframe
                    style={{border: "none"}}
                    height={this.state.iframeHeight}
                    width={this.state.iframeWidth}
                    srcDoc={this.getIframeContent()}
                    onLoad={this.handleIframeHeight.bind(this)}
                    ref={this.iframeRef}
                >
                </iframe>

                {this.state.isLocked===false && <div style={{margin: '4%', marginLeft: '65%'}}>
                    <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleBack}
                            className="button">Back</Button>
                    <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handlePrint}
                            className="button">Print</Button>
                    <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleLock}
                            className="button">Lock</Button>
                </div>}
                {this.state.isLocked===true && <div style={{margin: '4%', marginLeft: '65%'}}>
                    <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleBack}
                            className="button">Back</Button>
                    <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handlePrint}
                            className="button">Print</Button>
                    <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleUnlock}
                            className="button">Unlock</Button>
                </div>}
            </div>
        )
    }

    // render() {
    //     return [
    //         <div style={{padding: 10}}>
    //             <iframe
    //                 style={{border: "none"}}
    //                 height={this.state.iframeHeight}
    //                 width={this.state.iframeWidth}
    //                 srcDoc={this.getIframeContent()}
    //                 onLoad={this.handleIframeHeight.bind(this)}
    //                 ref={this.iframeRef}
    //             >
    //             </iframe>
    //             {this.getActionButtonsJsx()}
    //         </div>
    //     ]
    // }
}

export default ReportView;
