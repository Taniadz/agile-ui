import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from "react-redux";

import {LOGOUT_USER} from '../actions/logout';
import {bindActionCreators} from 'redux';
import {Link} from "react-router-dom";

function mapStateToProps({auth}, props) {
  return {
    ...props,
    auth,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
      {
        LOGOUT_USER,
      },
      dispatch,
  );
}

const Header = styled(
    class extends Component {
      render() {
        return (
            <ul className={this.props.className}>
              {localStorage.getItem('user_name') &&
              <div>
                <li className="colomn"><span onClick={this.props.LOGOUT_USER}>logout</span></li>
                <li className="colomn"><span>{localStorage.getItem('user_name')}</span></li>
              </div>
              }
              {!localStorage.getItem('user_name') &&
              <div>
                <Link to='/login'>
                  <li className="colomn"><span>login</span></li>
                </Link>
                <Link to='/register'>
                  <li className="colomn"><span>register</span></li>
                </Link>
              </div>
              }
            </ul>
        );
      }
    },
)`
      {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
background: #026aa7;  
    height: 48px;
li {
  float: right;
  a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none; 
  background-color:  #3897cf;
}
:last-child{
    margin-right: 15px;
    }
a:hover {
  background-color: #73b2d7;
}
span {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none; 
    background-color:  #3897cf;
}
span:hover {
  background-color: #73b2d7;
}
}
}






`;

export default connect(mapStateToProps, mapDispatchToProps)(Header);