

export const FETCH_SPONSERED_TREE_REQUEST = 'FETCH_SPONSERED_TREE_REQUEST';
export const FETCH_SPONSERED_TREE_SUCCESS = 'FETCH_SPONSERED_TREE_SUCCESS';
export const FETCH_SPONSERED_TREE_FAILURE = 'FETCH_SPONSERED_TREE_FAILURE';

export const fetchSposoredTreeRequest = () => ({
    type: FETCH_SPONSERED_TREE_REQUEST,
});

export const fetchSposoredTreeSuccess = (sponsoredTreeData: any) => ({
    type: FETCH_SPONSERED_TREE_SUCCESS,
    payload: sponsoredTreeData,
});

export const fetchSposoredTreeGailure = (error: string) => ({
    type: FETCH_SPONSERED_TREE_FAILURE,
    payload: error,
});
