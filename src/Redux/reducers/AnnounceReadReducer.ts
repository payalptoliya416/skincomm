
import { FETCH_ADD_ANNOUNCEMENT_FAILURE, FETCH_ADD_ANNOUNCEMENT_REQUEST, FETCH_ADD_ANNOUNCEMENT_SUCCESS } from "../actions/announcementAction";
import { FETCH_ANNOUNCE_READ_FAILURE, FETCH_ANNOUNCE_READ_REQUEST, FETCH_ANNOUNCE_READ_SUCCESS } from "../actions/AnnouncReadAction";
  
  interface AnnouncementState {
    loading: boolean;
    AnnounceReadData: any;
    error: string | null;
  }
  
  const initialState: AnnouncementState = {
    loading: false,
    AnnounceReadData: null,
    error: null,
  };
  
  export const AnnouncementReadReducer = (
    state = initialState,
    action: any
  ): AnnouncementState => {
    switch (action.type) {
      case FETCH_ANNOUNCE_READ_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_ANNOUNCE_READ_SUCCESS:
        return { ...state, loading: false, AnnounceReadData: action.payload };
      case FETCH_ANNOUNCE_READ_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  