
import { FETCH_ADD_ANNOUNCE_EDIT_FAILURE, FETCH_ADD_ANNOUNCE_EDIT_REQUEST, FETCH_ADD_ANNOUNCE_EDIT_SUCCESS } from "../actions/AnnounceEditAction";
  
  interface AddAnnounceEditState {
    loading: boolean;
    announceEditData: any;
    error: string | null;
  }
  
  const initialState: AddAnnounceEditState = {
    loading: false,
    announceEditData: null,
    error: null,
  };
  
  export const AnnounceEditReducer = (
    state = initialState,
    action: any
  ): AddAnnounceEditState => {
    switch (action.type) {
      case FETCH_ADD_ANNOUNCE_EDIT_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_ADD_ANNOUNCE_EDIT_SUCCESS:
        return { ...state, loading: false, announceEditData: action.payload };
      case FETCH_ADD_ANNOUNCE_EDIT_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  