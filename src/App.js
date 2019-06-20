import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './theme';


import Header from './components/header'


import Button from '@material-ui/core/Button';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

import Pages from './pages'

class App extends Component {

    render() {

        return (
            <MuiThemeProvider theme={theme}>
                <Header/>

                <Router>
                    <div>
                        {/*<ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/about">About</Link>
                            </li>
                            <li>
                                <Link to="/topics">Topics</Link>
                            </li>
                        </ul>

                        <hr/>
*/}
                        <Route exact path="/" component={Pages.BoxCount}/>
                        <Route path="/about" component={Pages.IssuingAndReceiving}/>
                    </div>
                </Router>
            </MuiThemeProvider>
        );
    }
}

export default App;
