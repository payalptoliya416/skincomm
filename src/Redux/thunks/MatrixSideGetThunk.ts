

import { Dispatch } from 'redux';
import { AxiosMatrixsideGetSide } from '../../Utilities/axios';
import { fetchMatrixSideGetfailure, fetchMatrixSideGetRequest, fetchMatrixSideGettSuccess } from '../actions/MatrixSideAction';

export const fetchMatrixGetThunk = (ID : any) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchMatrixSideGetRequest());
        try {
            const response = await AxiosMatrixsideGetSide.get(`/${ID}`);
            dispatch(fetchMatrixSideGettSuccess(response.data.data));
            return {data: response.data.data };
        } catch (error: any) {
            dispatch(fetchMatrixSideGetfailure(error.message || 'Failed to fetch matixside getData'));
            return {error}
        }
    };
};
