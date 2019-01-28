import { API } from '../const';
import axios from 'axios';

export const actions = {
  LOAD_CARD_SUCCESS: 'LOAD_CARD_SUCCESS',
  LOAD_CARD_FAILURE: 'LOAD_CARD_FAILURE',
  LOAD_CARD_START: 'LOAD_CARD_START',
};

export const LOAD_CARD_SUCCESS = data => {
  return {
    type: actions.LOAD_CARD_SUCCESS,
    data,
  };
};

export const LOAD_CARD_START = () => {
  return {
    type: actions.LOAD_CARD_START,
  };
};

export const LOAD_CARD_FAILURE = () => {
  return {
    type: actions.LOAD_CARD_FAILURE,
  };
};

export const LOAD_CARDS = () => {
  return dispatch => {
    dispatch(LOAD_CARD_SUCCESS());
    return axios.get(API + "cards").then(
      res => {
        return dispatch(LOAD_CARD_SUCCESS(res.data));
      },
      () => {
        return dispatch(LOAD_CARD_FAILURE());
      },
    );
  };
};
