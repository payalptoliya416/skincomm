

import { Dispatch } from 'redux';
import { AxioInConverData } from '../../Utilities/axios';
import { fetchBConvertRequest, fetchConvertFailure, fetchConvertSuccess } from '../actions/ConverAction';

export const fetchConvertDetail = (formData : any) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchBConvertRequest());
        try {
            const response = await AxioInConverData.post('',formData);
            dispatch(fetchConvertSuccess(response.data.data));
            return {data : response.data.data}
        } catch (error: any) {
            dispatch(fetchConvertFailure(error.message || 'Failed to fetch convert data'));
        }
    };
};
