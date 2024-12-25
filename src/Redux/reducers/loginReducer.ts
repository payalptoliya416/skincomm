import { CommonTypes, LoginTypes } from "../types";

const INITIAL_STATE = {
  loading: false,
  data: "",
  error: "",
};

const loginReducer = (state: object = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case CommonTypes.ACTION_START:
      return {
        ...state,
        loading: true,
      };
    case CommonTypes.ACTION_END:
      return {
        ...state,
        loading: false,
      };
    case LoginTypes.LOGIN_SUCCESS:
      return {
        ...state, 
        data: action.payload,
        token: action.token,
        error: "",
      };
    case LoginTypes.LOGIN_FAILED:
      return {
        ...state,
        data: "",
        error: action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;
