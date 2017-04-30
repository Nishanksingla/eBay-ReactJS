import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link,Redirect } from 'react-router-dom';

import axios from 'axios';

class UserAccount extends Component {
    constructor(props) {
        super(props);
        console.log("userAccount");
        console.log(this.props);
    }
    
    componentDidMount() {
        console.log("component did mount");
    }
    componentWillMount(){
        console.log("component will mount");
    }
    componentWillReceiveProps(nextProps){
        console.log("component will ReceiveProps");
    }
    render() {
        debugger
        var startSellingStyle={
            borderRadius: "3px",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            color: "#0654ba",
            display: "inline-block",
            fontWeight: "normal",
            fontSize: "17px",
            lineHeight: "normal",
            textAlign: "center",
            textDecoration: "none",
            padding: "12px 35px",
            verticalAlign: "middle"
        }

        var tabContent = {
            border: "1px solid #eee",
            borderRadius: "6px",
            boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.05)",
            padding: "15px",
            marginRight: "25px"
        }

        let itemsSold = [];
        (this.props.user.items_sold).map((item, index)=>
            itemsSold.push(
                <tr key={index}>
                    <th scope="row">{index}</th>
                    <td>{item.title}</td>
                    <td style={{textAlign: "center"}}>{item.quantity}</td>
                    <td style={{textAlign: "center"}}>{item.remainingQuantity}</td>
                    <td>{"$"+item.price}</td>
                </tr>
            )
        );
        return (
           	<div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-10">
                     <ul className="nav nav-tabs">
                        <li className="active">
                            <a data-toggle="tab" href="#account">
                                Account
                            </a>	
                        </li>
                        <li>
                            <a data-toggle="tab" href="#activity">
                                Activity
                            </a>
                        </li>
                    </ul>

                    <div className="tab-content" style={{background: "white",borderRadius: "3px",padding: "10px"}}>
                        <div id="account" className="tab-pane fade in active">
                            <div className="row">
                                <div className="col-md-12">
                                    <h4 className="myaccount-header" style={{paddingLeft: "10px"}}>My Account</h4>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <ul className="nav nav-pills nav-stacked">
                                                <li className="active"><a data-toggle="pill" href="#information">Personal Information</a></li>
                                                <li className=""><a data-toggle="pill" href="#dashboard">Seller Dashboard</a></li>
                                            </ul>
                                        </div>
                                        <div className="col-md-9">
                                            <div className="tab-content" style={tabContent}>
                                                <div id="information" className="tab-pane fade in active">
                                                    <div className="panel panel-default">
                                                        <div className="panel-heading">
                                                            <h3 className="panel-title">Name</h3>
                                                        </div>
                                                        <div className="panel-body">
                                                            {this.props.user.firstname+" "+this.props.user.lastname}
                                                        </div>
                                                    </div>
                                                    <div className="panel panel-default">
                                                        <div className="panel-heading">
                                                            <h3 className="panel-title">Address</h3>
                                                        </div>
                                                        <div className="panel-body">
                                                            <div>
                                                                <div>{this.props.user.address.streetaddress+", "+this.props.user.address.streetaddress2}</div>
                                                                <div>{this.props.user.address.city+", "+this.props.user.address.state+" "+this.props.user.address.zip }</div>
                                                                <div>{this.props.user.address.country}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="panel panel-default">
                                                        <div className="panel-heading">
                                                            <h3 className="panel-title">Contact information</h3>
                                                        </div>
                                                        <div className="panel-body">
                                                            <div className="row" style={{marginBottom: "10px"}}>
                                                                <div className="col-md-3"><span>Phone Number:</span></div>
                                                                <div className="col-md-3"><span>{this.props.user.phone}</span></div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-3"><span>Email ID:</span></div>
                                                                <div className="col-md-3"><span>{this.props.user.username}</span></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div id="dashboard" className="tab-pane fade">
                                                    <div className="row">
                                                        <div className="col-md-12" id="mainContent">
                                                            <section className="box sd--alert" style={{margin: "20px 0",padding: "30px 0px",paddingLeft: "50px"}}>
                                                                <div className="alert__msg" style={{paddingBottom: "30px"}}>
                                                                    <span style={{color: "#777",lineHeight: "1.3",fontSize: "1.2em"}}>
                                                                        Sell your first item on eBay to see your Seller Dashboard!
                                                                    </span>
                                                                </div>
                                                                <div className="alert__startselling" style={{paddingBottom: "12px"}}>
                                                                    <Link className="btn btn--faux" style={startSellingStyle} to="/Sell">
                                                                        Start selling
                                                                    </Link>
                                                                    {/*<a className="btn btn--faux" style={startSellingStyle} href="/Sell">
                                                                        <span>Start selling</span>
                                                                    </a>*/}
                                                                </div>
                                                                <div className="alert_help"><a href="http://pages.ebay.com/sellingbasics"><span>Learn the selling basics</span></a></div>
                                                            </section>
                                                            <div className="panel panel-default">
                                                                <div className="panel-heading">
                                                                    <h3 className="panel-title">Items Sold</h3>
                                                                </div>
                                                                <div className="panel-body">
                                                                    <table className="table">
                                                                        <thead>
                                                                            <tr>
                                                                                <th>#</th>
                                                                                <th>Product title</th>
                                                                                <th style={{textAlign: "center"}}>Quantity sold</th>
                                                                                <th style={{textAlign: "center"}}>Remaining quantity</th>
                                                                                <th>Price</th>
                                                                            
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {itemsSold}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="activity" className="tab-pane fade">
                            <h3>Activity tab</h3>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.loginUser,
    };
}
export default connect(mapStateToProps)(UserAccount);
