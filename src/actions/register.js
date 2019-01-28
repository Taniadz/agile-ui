import { AUTH } from '../const';
import axios from 'axios';

export const actions = {
  REGISTER_USER_SUCCESS: 'REGISTER_USER_SUCCESS',
  REGISTER_USER_FAILURE: 'REGISTER_USER_FAILURE',
  REGISTER_USER_START: 'REGISTER_USER_START',
};

export const REGISTER_USER_SUCCESS = data => {
  return {
    type: actions.REGISTER_USER_SUCCESS,
    data,
  };
};

export const REGISTER_USER_START = () => {
  return {
    type: actions.REGISTER_USER_START,
  };
};

export const REGISTER_USER_FAILURE = data => {
  return {
    type: actions.REGISTER_USER_FAILURE,
    data,
  };
};

export const REGISTER_USER = (data) => {
  return dispatch => {
    dispatch(REGISTER_USER_START());
    return axios({
      method: 'post',
      url: AUTH + "registration/",
      headers: {},
      data: data,
    }).then(
      res => {
        return dispatch(REGISTER_USER_SUCCESS(res.data));
      },
      (e) => {
        return dispatch(REGISTER_USER_FAILURE(e.response.data));
      },
    );
  };
};
