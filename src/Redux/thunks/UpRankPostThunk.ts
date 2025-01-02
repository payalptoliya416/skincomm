

import { Dispatch } from 'redux';
import {  AxiosUPRankPostData, } from '../../Utilities/axios';
import { fetchUprankPostFailure, fetchUprankPostRequest, fetchUprankPostSuccess } from '../actions/UprankPostAction';

export const fetchUpRankPost = (data : any) => {
    
    return async (dispatch: Dispatch) => {
        dispatch(fetchUprankPostRequest());
        try {
            const response = await AxiosUPRankPostData.post("",data);
            dispatch(fetchUprankPostSuccess(response.data.data));
            return {data :response.data.data}
        } catch (error: any) {
            dispatch(fetchUprankPostFailure(error.message || 'Failed to fetch Uprank post data'));
        }
    };
};
