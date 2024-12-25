import { FETCH_SPONSERED_NETWORK_FAILURE, FETCH_SPONSERED_NETWORK_REQUEST, FETCH_SPONSERED_NETWORK_SUCCESS } from "../actions/sponsoredNetworkAction";

interface SponsoredNetworkState {
    loading: boolean;
    sponsoredNetworkData: any;    
    error: string | null;
}

const initialState: SponsoredNetworkState = {
    loading: false,
    sponsoredNetworkData: null,
    error: null,
};

export const sponsoredNetworkReducer = (state = initialState, action: any): SponsoredNetworkState => {
    switch (action.type) {
        case FETCH_SPONSERED_NETWORK_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_SPONSERED_NETWORK_SUCCESS:
            return { ...state, loading: false, sponsoredNetworkData: action.payload };
        case FETCH_SPONSERED_NETWORK_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
