

import { Dispatch } from 'redux';
import { AxioInMyAnnouncePending } from '../../Utilities/axios';
import { fetchAnnouncePendingFailure, fetchAnnouncePendingRequest, fetchAnnouncePendingSuccess } from '../actions/AnnouncePendingAction';

export const fetchAnnouncePendingData = () => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchAnnouncePendingRequest());
        try {
            const response = await AxioInMyAnnouncePending.get('');
            dispatch(fetchAnnouncePendingSuccess(response.data.data));
        } catch (error: any) {
            dispatch(fetchAnnouncePendingFailure(error.message || 'Failed to fetch AnnouncementPendingData data'));
        }
    };
};
