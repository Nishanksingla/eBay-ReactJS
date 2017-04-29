import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactDOM from "react-dom";
import {bindActionCreators} from 'redux';
import {signout} from '../actions/signoutAction';
import {getLoginStatus} from '../actions/getLoginStatusAction';
import {BrowserRouter as Router, Route } from 'react-router-dom'
import { Link,Redirect } from 'react-router-dom'
import market from '../containers/marketPage';
require('../../scss/style.scss');
import axios from 'axios';

class App extends Component {

    constructor(props){
        super(props);
        console.log("In app.js");
        console.log(this.props);

        this.state={categories:[]};
        this.handleSignOut = this.handleSignOut.bind(this);
        this.state.categories=[
                "All Categories",
                "Antiques",
                "Art",
                "Baby",
                "Books",
                "Business & Industrial",
                "Cameras & Photo",
                "Cell Phones & Accessories",
                "Clothing, Shoes & Accessories",
                "Coins & Paper Money",
                "Collectibles",
                "Computers Tablets & Networking",
                "Consumer Electronics",
                "Crafts",
                "Dolls & Bears",
                "DVDs & Movies",
                "eBay Motors",
                "Entertainment Memorabilia",
                "Gift Cards & Coupons",
                "Health & Beauty",
                "Home & Garden",
                "Jewelry & Watches",
                "Music",
                "Musical Instruments & Gear",
                "Pet Supplies",
                "Pottery & Glass",
                "Real Estate",
                "Specialty Services",
                "Sporting Goods",
                "Sports Mem, Cards & Fan Shop",
                "Stamps",
                "Tickets & Experiences",
                "Toys & Hobbies",
                "Travel",
                "Video Games & Consoles",
                "Everything Else"
            ]
    }
    componentDidMount(){
        debugger
        this.props.getLoginStatus();
        // axios.get("/login/status")
        // .then(response => {
        //     debugger
        //     if (response.data.user) {
        //         this.props.user = response.data.user;
        //     } 
        // })
        // .catch(error => {
        //     debugger
        //     console.log(error);
            
        // });
        

    }
    handleSignOut(e){
        this.props.signout();
        e.preventDefault();
    }

    render() {
        debugger
        
        let categoriesDrodownHTML = [];
        (this.state.categories).map((category, index)=>
            categoriesDrodownHTML.push(<li key={index} role="menuitem"> 
                <Link to={"/market/"+category}>
                    {category}
                </Link> 
            </li>)
        );
        
        if(this.props.user!=null){
            return (
                <div>
                	<nav className="navbar" style={{marginBottom: "10px",background: "white",minHeight:"0px",boxShadow: "0px 4px 5px lightgray"}}>
                        <div className="container">
                            <ul className="nav navbar-nav">
                                <div className="btn-group" style={{paddingTop: "7px",float: "left"}}>
                                    <a style={{cursor: "pointer",color: "black"}} 
                                    className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Hi <b>{this.props.user.firstname}</b>! 
                                        <span className="caret"></span>
                                    </a>
                                    <ul className="dropdown-menu" role="menu" aria-labelledby="single-button" style={{minWidth: "auto"}}>
                                        <li><a style={{color: "#337ab7"}} href="/MyAccount">My eBay</a></li>
                                        <li className="divider"></li>
                                        <li>
                                            <a style={{cursor:"pointer", color: "#337ab7"}} onClick={this.handleSignOut}>
                                                Sign out
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <li className="divider-vertical"><button className="btn btn-link" role="link"> Daily Deals</button></li>
                                <li className="divider-vertical"><button className="btn btn-link" role="link"> Gift Cards</button></li>
                                <li className="divider-vertical"><button className="btn btn-link" role="link"> Sell</button></li>
                                <li className="divider-vertical"><button className="btn btn-link" role="link"> Help and Contact</button></li>

                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li><a style={{paddingTop: "10px",paddingBottom: "10px"}} href="/MyAccount">My eBay</a></li>
                                <li><a style={{paddingTop: "10px",paddingBottom: "10px"}} href="#"><span className="glyphicon glyphicon-bell"></span></a></li>
                                <li>
                                    <a style={{paddingTop: "10px",paddingBottom: "10px"}} href="/Cart">
                                        <span className="glyphicon glyphicon-shopping-cart"></span>
                                        <span className="badge" style={{marginBottom: "3px",backgroundColor: "orange",fontSize: "8px"}}></span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div className="container-fluid">
                        <div className="row" style={{marginBottom: "20px"}}>
                            <div className="col-md-3" style={{paddingLeft: "40px",width: "20.8%",paddingRight: "0"}}>
                                <a className="navbar-brand" href="/" style={{height: "50px",display: "block",position: "relative",width: "45%",padding: "0"}}>
                                    <img role="presentation" width="250" height="200" style={{clip:"rect(47px, 118px, 95px, 0px)", position:"absolute", top:"-47px",left:"0"}}
                                        alt="" src="https://ir.ebaystatic.com/rs/v/fxxj3ttftm5ltcqnto1o4baovyl.png" id="gh-logo"/>
                                </a>
                                 
                                <div className="btn-group" style={{float: "right"}}>
                                    <button id="single-button" type="button" 
                                    className="btn btn-default dropdown-toggle"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                    style={{width: "105px", wordBreak: "normal",whiteSpace: "normal",background: "transparent",border: "none",textAlign: "left",color: "#555",lineHeight: "14px", paddingTop: "10px"}}>
                                        Shop by category <span className="caret" style={{borderTop: "7px dashed",marginBottom: "16px",marginLeft: "4px", borderRight: "7px solid transparent", borderLeft: "7px solid transparent"}}></span>
                                    </button>
                                    <ul className="dropdown-menu" role="menu" aria-labelledby="single-button" style={{maxHeight: "300px",overflowY: "auto"}}>
                                        {categoriesDrodownHTML}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-7" style={{padding: "0"}}>
                                
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Search..."aria-label="..." 
                                    style={{padding: "10px 0 9px 8px",fontSize: "16px",height: "inherit"}}/>
                                    <div className="input-group-btn">
                                        <button type="button" style={{height: "43px",width: "160px"}} 
                                            className="btn btn-default" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            All Categories <span className="caret"></span></button>
                                        <ul className="dropdown-menu dropdown-menu-right">
                                            <li><a href="#">Action</a></li>
                                            <li><a href="#">Another action</a></li>
                                            <li><a href="#">Something else here</a></li>
                                            <li role="separator" className="divider"></li>
                                            <li><a href="#">Separated link</a></li>
                                        </ul>
                                    </div>
                                </div>
                            
                               
                            </div>
                            <div className="col-md-2">
                                <input type="submit" className="btn btn-primary" value="Search" 
                                style={{background: "-webkit-gradient(linear,left top,left bottom,from(#0079bc),to(#00509d))",
                                    height: "40px",
                                    fontWeight: "500",
                                    textShadow: "0 1px 0 rgba(0,0,0,.2)",
                                    padding: ".5em 1.2em",
                                    fontSize: "16px"}} />
                            </div>
                        </div>
                    </div>
                    <Route path="/market/:category" component={market}/>
                    <Route exact path={this.props.match.url} render={() => (
                        <div style={{marginLeft: "20%"}}>
                            <h4>Please select a category from "Shop by category" dropdown.</h4>
                        </div>
                    )}/>
                </div>
            )
        }else{
            return <Redirect to="/login"/>; 
        }   
         

    }
}

function mapStateToProps(state) {
    return {
        user: state.loginUser
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({signout: signout,getLoginStatus:getLoginStatus}, dispatch);
}


export default connect(mapStateToProps,matchDispatchToProps)(App);
