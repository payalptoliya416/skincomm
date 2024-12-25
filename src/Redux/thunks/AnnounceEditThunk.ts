

import { Dispatch } from 'redux';
import {  AxiosAnnouncementEdit } from '../../Utilities/axios';
import { fetchAddAnnounceEditFailure, fetchAddAnnounceEditRequest, fetchAddAnnounceEditSuccess } from '../actions/AnnounceEditAction';

export const fetchEditAnnounce = (id:string) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchAddAnnounceEditRequest());
        try {
            const response = await AxiosAnnouncementEdit.get(`${id}`);
            dispatch(fetchAddAnnounceEditSuccess(response.data.data.announcement));
        } catch (error: any) {
            dispatch(fetchAddAnnounceEditFailure(error.message || 'Failed to fetch editAnnounce data'));
        }
    };
};
