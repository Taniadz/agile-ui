import { actions } from '../actions/login';
import { actions as register_actions } from '../actions/register';
import { actions as logout_actions } from '../actions/logout';

export const Auth = (
  state = {
    token: localStorage.getItem("token"),
    loader: false,
    is_authenticated: false,
    login: {},
    errors: null,
  },
  action,

) => {
  console.log(action, action.type, logout_actions.LOGOUT_USER_SUCCESS);
  switch (action.type) {

    case actions.LOGIN_USER_START:
      return {
        ...state,
        loader: true,
      };
    case actions.LOGIN_USER_SUCCESS:
      localStorage.setItem("token",  action.data.token);
      localStorage.setItem("user_id", action.data.user.pk);
      localStorage.setItem("user_name", action.data.user.username);
      return {
        ...state,
        loader: false,
        is_authenticated: true,
        login: action.data
      };
    case actions.LOGIN_USER_FAILURE:
      console.log(action.data);
      return {
        ...state,
        loader: false,
        errors: action.data,
        login: {},
      };
      case register_actions.REGISTER_USER_START:
      return {
        ...state,
        loader: true,
      };
    case register_actions.REGISTER_USER_SUCCESS:
      console.log(action.data);
      localStorage.setItem("token",  action.data.token);
      localStorage.setItem("user_id", action.data.user.pk);
      localStorage.setItem("user_name", action.data.user.username);
      return {
        ...state,
        loader: false,
        login: action.data,
         isAuthenticated: true,
        errors: null,
      };
    case register_actions.REGISTER_USER_FAILURE:
      console.log(action.data);
      return {
        ...state,
        loader: false,
        login: {},
        errors: action.data,
      };
    case logout_actions.LOGOUT_USER_START:
      console.log("we are here 1");
      return {
        ...state,
        loader: true,
      };
    case logout_actions.LOGOUT_USER_SUCCESS:
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("user_name");
      return {
        ...state,
        loader: false,
        is_authenticated: false,
      };
    case logout_actions.LOGOUT_USER_FAILURE:
            console.log("we are here3");

      return {
        ...state,
        loader: false,
        errors: action.data,
      };
    default:
      return state;
  }
};
