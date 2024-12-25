
import { FETCH_ADD_ANNOUNCEMENT_FAILURE, FETCH_ADD_ANNOUNCEMENT_REQUEST, FETCH_ADD_ANNOUNCEMENT_SUCCESS } from "../actions/announcementAction";
  
  interface AnnouncementState {
    loading: boolean;
    AnnouncementData: any;
    error: string | null;
  }
  
  const initialState: AnnouncementState = {
    loading: false,
    AnnouncementData: null,
    error: null,
  };
  
  export const AnnouncementReducer = (
    state = initialState,
    action: any
  ): AnnouncementState => {
    switch (action.type) {
      case FETCH_ADD_ANNOUNCEMENT_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_ADD_ANNOUNCEMENT_SUCCESS:
        return { ...state, loading: false, AnnouncementData: action.payload };
      case FETCH_ADD_ANNOUNCEMENT_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  