import React, {Component} from 'react';
import './menu-bar.css';

class MenuBar extends Component {
    render() {
        return (

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
                                    <li><a href="">Issuing</a></li>
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
                                    <li><a href="">Receiving</a></li>
                                    <li><a href="">Dispatching</a></li>
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
        );
    }
}

export default MenuBar;
