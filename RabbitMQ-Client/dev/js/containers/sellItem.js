import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link,Redirect } from 'react-router-dom';

import axios from 'axios';

class UserAccount extends Component {
    constructor(props) {
        super(props);
        console.log("Sell Item");
        console.log(this.props);

        this.state={categories:[],conditions:[]};

        this.state.conditions = [
            "New",
            "New other (see details)",
            "Manufacturer refurbished",
            "Seller refurbished",
            "Used",
            "For parts or not working"
        ];

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
            ];

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
        const itemConditions = this.state.conditions.map((condition,index) =>
            <option value={index} key={index} >{condition}</option>	
        );
        const categories = this.state.categories.map((category,index)=>
            <option value={index} key={index} >{category}</option>	
        );
        return (
            <div className="container">
            <form style={{display:"block"}} onSubmit="sellitem()">
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8" style={{border: "1px solid #ddd",borderRadius: "3px",backgroundColor: "#fff",padding: "17px 30px",marginBottom: "20px"}}>
                        <h3>Describe your item</h3>
                        <div className="row" style={{marginTop: "30px"}}>
                            <div className="col-md-3">
                                <label>Categories</label>
                            </div>
                            <div className="col-md-9">
                                <select style={{padding:"5px"}} required>
                                    <option value="">--Select--</option>
                                    {categories}
                                </select>
                            </div>
                        </div>
                        <div className="row" style={{marginTop: "30px"}}>
                            <div className="col-md-3">
                                <label>Title</label>
                            </div>
                            <div className="col-md-9">
                                <input type="text" className="form-control" required />
                            </div>
                        </div>
                        <div className="row" style={{marginTop: "30px"}}>
                            <div className="col-md-3">
                                <label>Condition</label>
                            </div>
                            <div className="col-md-9">
                                <select id="condition" name="condition" size="1" tabindex="0" aria-required="true" required>	
                                    <option value="">--Select--</option>
                                    {itemConditions}
                                </select>
                            </div>
                        </div>
                        <div className="row" style={{marginTop: "30px"}}>
                            <div className="col-md-3">
                                <label>Details</label>
                            </div>
                            <div className="col-md-9">
                                <textarea className="form-control" rows="5" id="comment" required></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8" style={{border: "1px solid #ddd", borderRadius: "3px",backgroundColor: "#fff",padding: "17px 30px",marginBottom: "20px"}}>
                        <h3>Select format and price</h3>
                        <div className="row" style={{marginTop: "30px"}}>
                            <div className="col-md-3">
                                <label>Listing format</label>
                            </div>
                            <div className="col-md-9">
                                <div className="row">
                                    <div className="col-md-5">
                                        <span style={{fontSize:"12px",marginBottom: "10px",display: "block"}}>
                                            Auction is best when you're not sure how much your item could sell for.
                                        </span>
                                        <button className="btn btn-default" role="button" style={{width:"100%"}}>
                                            Auction
                                        </button>
                                    </div>
                                    <div className="col-md-5">
                                        <span style={{fontSize:"12px",marginBottom: "10px",display: "block"}}>
                                            Fixed price is best when you know how much you want to get.
                                        </span>
                                        <button className="btn btn-default" role="button" style={{width:"100%"}}>
                                            Fixed price
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row" style={{marginTop: "30px"}}>
                            <div className="col-md-3">
                                <label>Starting price</label>
                            </div>
                            <div className="col-md-9">
                                <div className="input-group" style={{width: "30%"}}>
                                    <span className="input-group-addon" style={{fontSize:"bold"}}>$</span>
                                    <input type="text" className="form-control"/>
                                </div>
                            </div>
                        </div>
                        <div className="row" style={{marginTop: "30px"}}>
                            <div className="col-md-3">
                                <label>Price</label>
                            </div>
                            <div className="col-md-9">
                                <div className="input-group" style={{width: "30%"}}>
                                    <span className="input-group-addon" style={{fontSize:"bold"}}>$</span>
                                    <input type="text" className="form-control"/>
                                </div>
                            </div>
                        </div>
                        <div className="row" style={{marginTop: "30px"}}>
                            <div className="col-md-3">
                                <label>Quantity</label>
                            </div>
                            <div className="col-md-9">
                                <input  style={{ width: "30%"}} type="number" className="form-control" value="1" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8" style={{textAlign:"right"}}>
                        <button className="btn btn-primary" type="submit" style={{color: "#fff",fontSize: "medium",padding: "8px 30px", fontWeight: "bold"}}>List it</button>
                    </div>
                </div>
            </form>
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
