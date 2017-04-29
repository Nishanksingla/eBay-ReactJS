import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link,Redirect } from 'react-router-dom';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

class MarketPage extends Component {
    constructor(props) {
        super(props);
        console.log("marketpage");
        console.log(this.props);
        this.state = {
            products:[]
        }
        
    }
    getProducts(category){
        
        axios.get("/products/getByCategory/" + category)
        .then(response => {
            debugger
            if (response.data.products.length !== 0) {
                this.setState({products : response.data.products});
            }else{
                this.setState({products:[]});
            } 
        })
        .catch(error => {
            debugger
            console.log(error);
            
        });
    }
    componentDidMount() {
        console.log("component did mount");
        debugger
        this.getProducts(this.props.match.params.category);
    }
    componentWillMount(){
        debugger
        console.log("component will mount");
        this.setState({products:[]});
    }
    componentWillReceiveProps(nextProps){
        debugger
        // this.setState({products:[]});
        console.log("component will ReceiveProps");
        // console.log(this.props.match.params.category);
        // console.log(this.nextProps)
        this.getProducts(nextProps.match.params.category);
    }
    render() {
        debugger
        let content = null;
        if(this.state.products.length==0){
            content=(
                <div className="row" style={{paddingLeft: "15px"}}>
                    <h3 style={{margin: "0"}}>Sorry! No product found.</h3>
                </div>
            );
        }else{
            content=[];
            (this.state.products).map((product,index)=>
                content.push(
                    <div key={index} className="row" style={{padding: "9px 0",borderWidth: "1px 0",borderStyle: "solid",borderColor: "transparent",borderBottomColor: "#e4e4e4",color: "#767676"}}>
                        <div className="col-md-4" style={{padding: "10px"}}>
                            <img alt="100%x200" data-src="holder.js/100%x200" style={{height: "200px",borderRadius: "3px",
                                    border: "1px solid #e4e4e4", width: "100%", display: "block"}} 
                                    data-holder-rendered="true"
                                    src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjQyIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDI0MiAyMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzEwMCV4MjAwCkNyZWF0ZWQgd2l0aCBIb2xkZXIuanMgMi42LjAuCkxlYXJuIG1vcmUgYXQgaHR0cDovL2hvbGRlcmpzLmNvbQooYykgMjAxMi0yMDE1IEl2YW4gTWFsb3BpbnNreSAtIGh0dHA6Ly9pbXNreS5jbwotLT48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWyNob2xkZXJfMTU3YmY5NTZkYmYgdGV4dCB7IGZpbGw6I0FBQUFBQTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMnB0IH0gXV0+PC9zdHlsZT48L2RlZnM+PGcgaWQ9ImhvbGRlcl8xNTdiZjk1NmRiZiI+PHJlY3Qgd2lkdGg9IjI0MiIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSI4OS44NTkzNzUiIHk9IjEwNS40Ij4yNDJ4MjAwPC90ZXh0PjwvZz48L2c+PC9zdmc+"
                                    />
                        </div>
                        <div className="col-md-6" style={{paddingTop: "8px"}}>
                            <a href={"/product/"+product._id} style={{wordWrap: "break-word",margin: "0",fontSize: "20px",lineHeight: "1.25"}}>{product.title}</a><br/><br/>
                            <span style={{fontWeight: "bold",fontSize: "20px",color: "#333",lineHeight: "1.1"}}>
                                { product.price ? '$ ' + product.price : '$ ' + product.bid_price}
                            </span><br/>
                            <span style={{fontSize: "12px"}}>Buy It Now</span><br/>
                            <span style={{fontSize: "13px",color: "#333",fontWeight:"bold"}}> Free Shipping</span>
                        </div>
                    </div>
                )
            );
        }

        return (
            <div className="row">
                <div className="col-md-2">
                    
                </div>

                <div className="col-md-8" style={{border: "1px solid #DDD",borderRadius: "3px",backgroundColor: "white",boxShadow: "4px 4px 1px #EEE",marginBottom: "20px", padding: "20px"}}>
                    <div>
                        <h3>{this.props.match.params.category}</h3>
                    </div>
                    <div style={{textAlign:"right"}}>
                        <h5 style={{marginRight: "15px",paddingBottom: "10px",borderBottom: "1px solid lightgray"}}>Total Products found: <span>{this.state.products.length}</span></h5>
                    </div>
                    {content}
                    
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
export default connect(mapStateToProps)(MarketPage);
