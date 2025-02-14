

import { Dispatch } from 'redux';
import {  AxiosMatrixside } from '../../Utilities/axios';
import { fetchMatrixSidefailure, fetchMatrixSideRequest, fetchMatrixSidetSuccess } from '../actions/MatrixAction';

export const fetchMatrixThunk = (formData : any) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchMatrixSideRequest());
        try {
            const response = await AxiosMatrixside.post('' , formData);
            dispatch(fetchMatrixSidetSuccess(response.data));
            return {data: response.data };
        } catch (error: any) {
            dispatch(fetchMatrixSidefailure(error.message || 'Failed to fetch matixside'));
            return {error}
        }
    };
};
