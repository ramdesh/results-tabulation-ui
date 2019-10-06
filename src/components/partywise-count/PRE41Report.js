import React, {Component} from 'react'
import {
    Typography,
    Button,

} from '@material-ui/core';
import axios from "../../axios-base";
class PRE41Report extends Component {

    constructor(props) {
        super(props);
        this.handleBack = this.handleBack.bind(this);
        this.state = {
            open: "Test",
            htmlContent : " "
            ,dataURI: ''
        };
    }


    componentDidMount() {
        axios.get('/tally-sheet/6/version/4/html', {
            headers: {
                'Authorization': "Bearer "+localStorage.getItem('token'),
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
        })
            .catch((error) => console.log(error));
    }


    handleBack() {
        console.log("HTML")

        // var html = document.getElementById("html").innerHTML;
        var dataURI = 'data:text/html,' + encodeURIComponent(this.state.htmlContent);
        console.log(dataURI)

        this.setState({
            dataURI: dataURI
        })
    }


    render() {
        return(

                <div style={{marginLeft: '2%', marginTop: '2%'}}>
                    <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleBack} className="button">Back</Button>


                    <iframe height="1000" width="900" src={this.state.dataURI}>


                    </iframe>
                </div>


        )
    }

}
export default PRE41Report;
