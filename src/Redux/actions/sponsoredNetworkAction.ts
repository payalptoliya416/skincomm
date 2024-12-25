

export const FETCH_SPONSERED_NETWORK_REQUEST = 'FETCH_SPONSERED_NETWORK_REQUEST';
export const FETCH_SPONSERED_NETWORK_SUCCESS = 'FETCH_SPONSERED_NETWORK_SUCCESS';
export const FETCH_SPONSERED_NETWORK_FAILURE = 'FETCH_SPONSERED_NETWORK_FAILURE';

export const fetchSposoredNetworkRequest = () => ({
    type: FETCH_SPONSERED_NETWORK_REQUEST,
});

export const fetchSposoredNetworkSuccess = (sponsoredNetworkData: any) => ({
    type: FETCH_SPONSERED_NETWORK_SUCCESS,
    payload: sponsoredNetworkData,
});

export const fetchSposoredNetworkGailure = (error: string) => ({
    type: FETCH_SPONSERED_NETWORK_FAILURE,
    payload: error,
});
