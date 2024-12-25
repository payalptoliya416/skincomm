import {
  FETCH_ADD_MEMBER_FAILURE,
  FETCH_ADD_MEMBER_REQUEST,
  FETCH_ADD_MEMBER_SUCCESS,
} from "../actions/AddMemberAction";

interface AddMenerState {
  loading: boolean;
  addmemberData: any;
  error: string | null;
}

const initialState: AddMenerState = {
  loading: false,
  addmemberData: null,
  error: null,
};

export const addMemberReducer = (
  state = initialState,
  action: any
): AddMenerState => {
  switch (action.type) {
    case FETCH_ADD_MEMBER_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_ADD_MEMBER_SUCCESS:
      return { ...state, loading: false, addmemberData: action.payload };
    case FETCH_ADD_MEMBER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
