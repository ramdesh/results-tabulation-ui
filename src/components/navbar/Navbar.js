import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import './Navbar.css';

const NavBar = () => {
    return(
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="title" color='#4879d1'>
                       Election Result Tabulation
                    </Typography>
                </Toolbar>
            </AppBar>
            <div id="main_nav">
                <ul>
                    <li>
                        <a href="">Election Commission</a>
                        <ul>
                            <li><a href="">Ratites</a></li>
                            <li><a href="">Fowl</a></li>
                            <li><a href="">Neoaves</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="">District Result Centre</a>
                        <ul>
                            <li>
                                <a href="">Data Entry</a>
                                <ul>
                                    <li><a href="/issuing">Issuing</a></li>
                                    <li><a href="">Receiving</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="">Reports</a>
                                <ul>
                                    <li><a href="">PRE-30-PD</a></li>
                                    <li><a href="">PRE-30-PV</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="">Counting Centre</a>
                        <ul>
                            <li>
                                <a href="">Data Entry</a>
                                <ul>
                                    <li><a href="/invalid">Invalid Ballot Count</a></li>
                                    <li><a href="/party-wise">Party-wise Count</a></li>
                                    <li><a href="/preference">Preferences </a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="">Reports</a>
                                <ul>
                                    <li><a href="">PRE-41</a></li>
                                    <li><a href="">PRE-21</a></li>
                                    <li><a href="">PRE-30-CO</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default NavBar;
