import { AUTH } from '../const';
import axios from 'axios';

export const actions = {
  LOGOUT_USER_SUCCESS: 'LOGOUT_USER_SUCCESS',
  LOGOUT_USER_FAILURE: 'LOGOUT_USER_FAILURE',
  LOGOUT_USER_START: 'LOGOUT_USER_START',
};

export const LOGOUT_USER_SUCCESS = () => {
  return {
    type: actions.LOGOUT_USER_SUCCESS,
  };
};

export const LOGOUT_USER_START = () => {
  return {
    type: actions.LOGOUT_USER_START,
  };
};

export const LOGOUT_USER_FAILURE = data => {
  return {
    type: actions.LOGOUT_USER_FAILURE,
    data,
  };
};

export const LOGOUT_USER = () => {
  return dispatch => {
    dispatch(LOGOUT_USER_START());
    return axios({
      method: 'post',
      url: AUTH + "logout/",
      headers: {},
      data: {},
    }).then(
      res => {
        console.log("succes");
        return dispatch(LOGOUT_USER_SUCCESS());
      },
      (e) => {
        return dispatch(LOGOUT_USER_FAILURE(e.response.data));
      },
    );
  };
};
