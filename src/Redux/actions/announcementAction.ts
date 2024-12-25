

export const FETCH_ADD_ANNOUNCEMENT_REQUEST = 'FETCH_ADD_ANNOUNCEMENT_REQUEST';
export const FETCH_ADD_ANNOUNCEMENT_SUCCESS = 'FETCH_ADD_ANNOUNCEMENT_SUCCESS';
export const FETCH_ADD_ANNOUNCEMENT_FAILURE = 'FETCH_ADD_ANNOUNCEMENT_FAILURE';

export const fetchAnnouncementRequest = () => ({
    type: FETCH_ADD_ANNOUNCEMENT_REQUEST,
});

export const fetchAnnouncementSuccess = (AnnouncementData: any) => ({
    type: FETCH_ADD_ANNOUNCEMENT_SUCCESS,
    payload: AnnouncementData,
});

export const fetchAnnouncementFailure = (error: string) => ({
    type: FETCH_ADD_ANNOUNCEMENT_FAILURE,
    payload: error,
});
