

import { Dispatch } from 'redux';
import { AxioInMyAnnounceReading } from '../../Utilities/axios';
import { fetchAnnouncReadailure, fetchAnnouncReadRequest, fetchAnnouncReadSuccess } from '../actions/AnnouncReadAction';

export const fetchAnnounceReadData = (id: any) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchAnnouncReadRequest());
        try {
            const response = await AxioInMyAnnounceReading.post('',
                {
                    "announcement_id" : id
                }
            );
            dispatch(fetchAnnouncReadSuccess(response));
        } catch (error: any) {
            dispatch(fetchAnnouncReadailure(error.message || 'Failed to fetch AnnouncementReadData data'));
        }
    };
};
