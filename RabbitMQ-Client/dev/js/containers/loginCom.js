import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {login} from '../actions/loginAction'
import {register} from '../actions/registerAction'
import { Link,Redirect } from 'react-router-dom'

class LoginPage extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {username: '',password:'',firstname:'',lastname:'',confirm_password:''};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }
    handleSubmit(e) {
        // debugger
        console.log('A user was submitted: ' + this.state.username + ","+this.state.password);
        var user = {
            username:this.state.username,
            password:this.state.password
        };

        this.props.login(user);

        e.preventDefault();
    }
    handleRegister(e) {
        debugger
        console.log('A user was submitted: ' + this.state.firstname + ","+this.state.lastname);
        this.props.register(this.state);
        e.preventDefault();
    }
    render() {
        var ebaylogoStyle={
            height:"60px",
            display:"block",
            position:"relative",
            left: "30%"
        };

        var logoImageStyle={
            clip:"rect(47px, 118px, 95px, 0px)",
            position:"absolute",
            top:"-47px",
            left:"0"
        };
        var formStyle={
            display: "block",
            marginTop:"20px"
        };
        var firstnameStyle={
            width: "48%",
            float: "left",
            marginRight: "5px"
        };

        var lastnameStyle={
            width:"50%"
        };
        debugger
        let alertMessage = null;
         if(this.props.loginError!=null){
            alertMessage =(
                <div className="alert alert-danger alert-dismissible" role="alert" style={{marginTop:"15px",paddingTop:"10px",paddingBottom:"10px"}}>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <strong>{this.props.loginError.error}</strong>
                </div>
            );
        }

        let registerAlert = null;
        
        if(this.props.registerStatus!=null){
            if(this.props.registerStatus.type == 'success'){
                registerAlert=(
                    <div className="alert alert-success alert-dismissible" role="alert" style={{marginTop:"15px",paddingTop:"10px",paddingBottom:"10px"}}>
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <strong>{this.props.registerStatus.msg}</strong>
                    </div>
                );
            }else{
                registerAlert=(
                    <div className="alert alert-danger alert-dismissible" role="alert" style={{marginTop:"15px",paddingTop:"10px",paddingBottom:"10px"}}>
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <strong>{this.props.registerStatus.msg}</strong>
                    </div>
                );
            }
        }


        if(this.props.user!=null){
            return <Redirect to="/"/>;
        }
        else{
            return (
                <div className="container">
                    <div className="row" style={{ marginTop:"50px"}}>
                        <div className="col-md-4 col-md-offset-4">
                            <a href="/" style={ebaylogoStyle}>
                                <img role="presentation" width="250" height="200" style={logoImageStyle}
                                    alt="" src="https://ir.ebaystatic.com/rs/v/fxxj3ttftm5ltcqnto1o4baovyl.png" id="gh-logo"/>
                            </a>
                        </div>
                        <div className="col-md-4 col-md-offset-4">
                            <div active="activeJustified" justified="true" style={{border: "1px solid #ccc",borderRadius: "3px"}} className="ng-isolate-scope">
                                <ul className="nav nav-tabs nav-justified">
                                    <li className="active">
                                        <a data-toggle="tab" href="#signin">
                                            <i className="glyphicon glyphicon-log-in"></i> Sign in
                                        </a>	
                                    </li>
                                    <li>
                                        <a data-toggle="tab" href="#register">
                                            <i className="glyphicon glyphicon-list-alt"></i> Register
                                        </a>
                                    </li>
                                </ul>

                                <div className="tab-content" style={{background: "white",borderRadius: "3px",padding: "10px"}}>
                                    <div id="signin" className="tab-pane fade in active">
                                        {alertMessage}
                                        <form role="form" style={formStyle} method="post">
                                            <div className="form-group input-group">
                                                <span className="input-group-addon">
                                                        @
                                                    </span>
                                                <input type="email" name="username" className="form-control" placeholder="Email" value={this.state.username} onChange={this.onChange} required/>
                                            </div>
                                            <div className="form-group input-group">
                                                <span className="input-group-addon">
                                                        <i className="glyphicon glyphicon-lock"></i>
                                                    </span>
                                                <input type="password" name="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.onChange} required />
                                            </div>
                                            <div className="form-group text-center">
                                                <input type="checkbox" tabIndex="3" className="" name="remember" id="remember"/>
                                                <label htmlFor="remember"> Remember Me</label>
                                            </div>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <input onClick={this.handleSubmit} type="submit" name="login-submit" id="login-submit" tabIndex="4" className="form-control btn btn-primary" value="Log In"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div id="register" className="tab-pane fade">
                                        {registerAlert}

                                        <form id="register-form" role="form" method="post" style={formStyle}>
                                            <div className="form-group">
                                                <input type="text" name="firstname" className="form-control" placeholder="Firstname" value={this.state.firstname} style={firstnameStyle} onChange={this.onChange} required/>
                                                
                                                <input type="text" name="lastname" className="form-control" placeholder="Lastname" value={this.state.lastname} style={lastnameStyle} onChange={this.onChange} required/>
                                            </div>
                                            <div className="form-group input-group">
                                                <span className="input-group-addon">
                                                        @
                                                    </span>
                                                <input type="email" name="username" className="form-control" placeholder="Username(Email)" value={this.state.username} onChange={this.onChange} required/>
                                            </div>
                                            <div className="form-group input-group">
                                                <span className="input-group-addon">
                                                        <i className="glyphicon glyphicon-lock"></i>
                                                    </span>
                                                <input type="password" name="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.onChange} required/>
                                            </div>
                                            <div className="form-group input-group">
                                                <span className="input-group-addon">
                                                        <i className="glyphicon glyphicon-lock"></i>
                                                    </span>
                                                <input type="password" name="confirm_password" className="form-control" placeholder="Confirm Password" value={this.state.confirm_password} onChange={this.onChange} required/>
                                            </div>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <input onClick={this.handleRegister} type="submit" name="register-submit" className="form-control btn btn-primary" value="Register Now"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        
    }
}

function mapStateToProps(state) {
    return {
        user: state.loginUser,
        loginError:state.loginError,
        registerStatus:state.registerStatus
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({login: login,register:register}, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(LoginPage);
