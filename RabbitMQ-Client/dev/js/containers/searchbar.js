import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactDOM from "react-dom";
import {bindActionCreators} from 'redux';
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