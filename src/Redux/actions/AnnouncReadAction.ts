

export const FETCH_ANNOUNCE_READ_REQUEST = 'FETCH_ANNOUNCE_READ_REQUEST';
export const FETCH_ANNOUNCE_READ_SUCCESS = 'FETCH_ANNOUNCE_READ_SUCCESS';
export const FETCH_ANNOUNCE_READ_FAILURE = 'FETCH_ANNOUNCE_READ_FAILURE';

export const fetchAnnouncReadRequest = () => ({
    type: FETCH_ANNOUNCE_READ_REQUEST,
});

export const fetchAnnouncReadSuccess = (AnnounceReadData: any) => ({
    type: FETCH_ANNOUNCE_READ_SUCCESS,
    payload: AnnounceReadData,
});

export const fetchAnnouncReadailure = (error: string) => ({
    type: FETCH_ANNOUNCE_READ_FAILURE,
    payload: error,
});
