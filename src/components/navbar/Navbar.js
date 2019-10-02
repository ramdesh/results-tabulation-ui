import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import './Navbar.css';

const NavBar = () => {

    // handleClickOpen () {
    //     this.props.history.replace('/Home')
    // }

    return(
        <div>
            <AppBar position="static" style={{backgroundColor:'#5079c8'}}>
                <Toolbar>
                    <Typography style={{paddingLeft:'1.5%'}} variant="h7" gutterBottom>
                        Election Result Tabulation
                    </Typography>
                    {/*<Typography variant="title" color='#4879d1'>*/}
                       {/*Election Result Tabulation*/}
                    {/*</Typography>*/}
                    {/*<Button  color="inherit">Login</Button>*/}
                </Toolbar>
            </AppBar>
            {/*<div id="main_nav">*/}
                {/*<ul>*/}

                    {/*<li>*/}
                        {/*<a href="">Election Commission</a>*/}
                        {/*<ul>*/}
                            {/*<li><a href="">Ratites</a></li>*/}
                            {/*<li><a href="">Fowl</a></li>*/}
                            {/*<li><a href="">Neoaves</a></li>*/}
                        {/*</ul>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                        {/*<a href="">District Result Centre</a>*/}
                        {/*<ul>*/}
                            {/*<li>*/}
                                {/*<a href="">Data Entry</a>*/}
                                {/*<ul>*/}
                                    {/*<li><a href="/issuing">Issuing</a></li>*/}
                                    {/*<li><a href="">Receiving</a></li>*/}
                                {/*</ul>*/}
                            {/*</li>*/}
                            {/*<li>*/}
                                {/*<a href="">Reports</a>*/}
                                {/*<ul>*/}
                                    {/*<li><a href="">PRE-30-PD</a></li>*/}
                                    {/*<li><a href="">PRE-30-PV</a></li>*/}
                                {/*</ul>*/}
                            {/*</li>*/}
                        {/*</ul>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                        {/*<a href="">Counting Centre</a>*/}
                        {/*<ul>*/}
                            {/*<li>*/}
                                {/*<a href="">Data Entry</a>*/}
                                {/*<ul>*/}
                                    {/*<li>*/}
                                        {/*<a href="">Votes</a>*/}
                                        {/*<ul>*/}
                                            {/*<li><a href="/PRE28">PRE-28</a></li>*/}
                                            {/*<li><a href="/PRE28A">PRE-28A</a></li>*/}
                                            {/*<li><a href="/CE201">CE-201</a></li>*/}
                                            {/*<li><a href="/PRE41">PRE-41</a></li>*/}
                                            {/*<li><a href="/PRE21">PRE-21</a></li>*/}
                                            {/*<li><a href="/PRE34CO">PRE-34-CO</a></li>*/}
                                        {/*</ul>*/}
                                    {/*</li>*/}
                                    {/*<li>*/}
                                        {/*<a href="">Postal Votes</a>*/}
                                        {/*<ul>*/}
                                            {/*<li><a href="/PRE21PV">PRE-21 PV</a></li>*/}
                                            {/*<li><a href="/PRE41PV">PRE-41 PV</a></li>*/}
                                            {/*<li><a href="/PRE34COPV">PRE-34-CO PV</a></li>*/}
                                        {/*</ul>*/}
                                    {/*</li>*/}
                                {/*</ul>*/}
                            {/*</li>*/}

                            {/*<li>*/}
                                {/*<a href="">Reports</a>*/}
                                {/*<ul>*/}
                                    {/*<li><a href="/ReportsEntry">Report</a></li>*/}
                                {/*</ul>*/}
                            {/*</li>*/}

                        {/*</ul>*/}
                    {/*</li>*/}

                {/*</ul>*/}
            {/*</div>*/}

        </div>
    )
}
export default NavBar;
