import React, {Component} from "react";
import {connect} from "react-redux";

import {Link, Redirect} from "react-router-dom";
import { REGISTER_USER} from '../actions/register';
import { bindActionCreators } from 'redux';

function mapStateToProps({ auth}, props) {
  return {
    ...props,
    auth,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      REGISTER_USER,
    },
    dispatch,
  );
}

class Register extends Component {


  state = {
    username: "",
    email: "",
    password1: "",
    password2: "",

  };

  onSubmit = e => {
    e.preventDefault();
    this.props.REGISTER_USER({"username": this.state.username,
                              "password1":this.state.password1,
                              "password2":this.state.password2,
                              "email":this.state.email,
    });
  };

  render() {

    if (this.props.auth.isAuthenticated) {
      return <Redirect to="/" />
    }
    return (
        <div className="Register">
      <form onSubmit={this.onSubmit}>
        <fieldset>
          <legend>Register</legend>

           <ul>
          {this.props.auth.errors &&
            Object.keys(this.props.auth.errors).map((error, key) =>

              <li key={error}>{this.props.auth.errors[error][0]}</li>
            )}


            </ul>




          <p>
            <label htmlFor="username">Username</label>
            <input
              type="text" id="username"
              onChange={e => this.setState({username: e.target.value})} />
          </p>

          <p>
            <label htmlFor="email">Email</label>
            <input
              type="email" id="email"
              onChange={e => this.setState({email: e.target.value})} />
          </p>

          <p>
            <label htmlFor="password1">Password</label>
            <input
              type="password" id="password1"
              onChange={e => this.setState({password1: e.target.value})} />
          </p>
          <p>
            <label htmlFor="password2">Repeat password</label>
            <input
              type="password" id="password2"
              onChange={e => this.setState({password2: e.target.value})} />
          </p>
          <p>
            <button type="submit">Register</button>
          </p>

          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </fieldset>
      </form>
        </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Register);