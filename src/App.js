import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './theme';


import Header from './components/header'


import Button from '@material-ui/core/Button';


class App extends Component {

    render() {

        return (
            <MuiThemeProvider theme={theme}>
                <Header/>


            </MuiThemeProvider>
        );
    }
}

export default App;




