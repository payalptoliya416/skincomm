
import { FETCH_ANNOUNCE_PENDING_FAILURE, FETCH_ANNOUNCE_PENDING_REQUEST, FETCH_ANNOUNCE_PENDING_SUCCESS } from "../actions/AnnouncePendingAction";
  
  interface AnnouncementState {
    loading: boolean;
    AnnouncependingtData: any;
    error: string | null;
  }
  
  const initialState: AnnouncementState = {
    loading: false,
    AnnouncependingtData: null,
    error: null,
  };
  
  export const AnnouncePendingReducer = (
    state = initialState,
    action: any
  ): AnnouncementState => {
    switch (action.type) {
      case FETCH_ANNOUNCE_PENDING_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_ANNOUNCE_PENDING_SUCCESS:
        return { ...state, loading: false, AnnouncependingtData: action.payload };
      case FETCH_ANNOUNCE_PENDING_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  