

import { Dispatch } from 'redux';
import { AxioAnnouncement } from '../../Utilities/axios';
import { fetchAnnouncementFailure, fetchAnnouncementRequest, fetchAnnouncementSuccess } from '../actions/announcementAction';

export const fetchAnnouncementData = () => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchAnnouncementRequest());
        try {
            const response = await AxioAnnouncement.get('');
            dispatch(fetchAnnouncementSuccess(response.data.data));
        } catch (error: any) {
            dispatch(fetchAnnouncementFailure(error.message || 'Failed to fetch AnnouncementData data'));
        }
    };
};
