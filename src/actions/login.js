import { AUTH } from '../const';
import axios from 'axios';

export const actions = {
  LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS',
  LOGIN_USER_FAILURE: 'LOGIN_USER_FAILURE',
  LOGIN_USER_START: 'LOGIN_USER_START',
};

export const LOGIN_USER_SUCCESS = data => {
  return {
    type: actions.LOGIN_USER_SUCCESS,
    data,
  };
};

export const LOGIN_USER_START = () => {
  return {
    type: actions.LOGIN_USER_START,
  };
};

export const LOGIN_USER_FAILURE = data => {
  return {
    type: actions.LOGIN_USER_FAILURE,
    data,
  };
};

export const LOGIN_USER = (username, password) => {
  console.log(username, password, "from actions");
  return dispatch => {
    dispatch(LOGIN_USER_START());
    return axios({
      method: 'post',
      url: AUTH + "login/",
      headers: {},
      data: {
        username: username,
        password:password,
      }
    }).then(
      res => {
        return dispatch(LOGIN_USER_SUCCESS(res.data));
      },
      (e) => {
        return dispatch(LOGIN_USER_FAILURE(e.response.data));
      },
    );
  };
};
