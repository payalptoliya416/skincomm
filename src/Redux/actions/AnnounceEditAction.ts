

export const FETCH_ADD_ANNOUNCE_EDIT_REQUEST = 'FETCH_ADD_ANNOUNCE_EDIT_REQUEST';
export const FETCH_ADD_ANNOUNCE_EDIT_SUCCESS = 'FETCH_ADD_ANNOUNCE_EDIT_SUCCESS';
export const FETCH_ADD_ANNOUNCE_EDIT_FAILURE = 'FETCH_ADD_ANNOUNCE_EDIT_FAILURE';

export const fetchAddAnnounceEditRequest = () => ({
    type: FETCH_ADD_ANNOUNCE_EDIT_REQUEST,
});

export const fetchAddAnnounceEditSuccess = (announceEditData: any) => ({
    type: FETCH_ADD_ANNOUNCE_EDIT_SUCCESS,
    payload: announceEditData,
});

export const fetchAddAnnounceEditFailure = (error: string) => ({
    type: FETCH_ADD_ANNOUNCE_EDIT_FAILURE,
    payload: error,
});
