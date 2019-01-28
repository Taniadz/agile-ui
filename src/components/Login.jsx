import React, {Component} from "react";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import { LOGIN_USER} from '../actions/login';
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
      LOGIN_USER,
    },
    dispatch,
  );
}

class Login extends Component {
  state = {
    username: "",
    password: "",
  };
  handlePasswordChange = e => {
      this.setState({
        password: e.target.value
      });
    };
  handleUsernameChange = e => {
      this.setState({
        username: e.target.value
      });
    };

  onSubmit = e => {
    e.preventDefault();
    this.props.LOGIN_USER(this.state.username, this.state.password);
  };

  render() {
     if (this.props.auth && this.props.auth.login.token) {
      return <Redirect to="/" />
    }
    return (
        <div className="Login">
      <form onSubmit={this.onSubmit}>
        <fieldset>
          <legend>Login</legend>
          {this.props.auth.errors  && (
            <ul>
              {console.log(this.props.auth.errors)}
                <li>{this.props.auth.errors.non_field_errors}</li>
            </ul>
          )}
          <p>
            <label htmlFor="username">Username</label>
            <input
              type="text" id="username"
              onChange={this.handleUsernameChange} />
          </p>
          <p>
            <label htmlFor="password">Password</label>
            <input
              type="password" id="password"
              onChange={this.handlePasswordChange} />
          </p>
          <p>
            <button type="submit">Login</button>
          </p>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </fieldset>
      </form>
        </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);