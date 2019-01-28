import { combineReducers } from 'redux';
import {Cards} from "./cards";
import {Auth} from "./auth"
export const rootReducer = combineReducers({
  cards: Cards,
  auth: Auth,
});