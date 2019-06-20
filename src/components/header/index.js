import React, {Component} from 'react';
import MenuBar from './menu-bar'
import TopBar from './top-bar'

class Header extends Component {
    render() {
        return (
            <div>
                <TopBar/>
                <MenuBar/>
            </div>
        );
    }
}

export default Header;
