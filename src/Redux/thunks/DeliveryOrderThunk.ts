

import { Dispatch } from 'redux';
import {  AxioInDeliveryOrder, } from '../../Utilities/axios';
import { fetchDeliveryOrderFailure, fetchDeliveryOrderRequest, fetchDeliveryOrderSuccess } from '../actions/DeliveryOrderAction';

export const fetchDeliveryOrder = () => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchDeliveryOrderRequest());
        try {
            const response = await AxioInDeliveryOrder.post("");
            dispatch(fetchDeliveryOrderSuccess(response.data.data.invoices));
        } catch (error: any) {
            dispatch(fetchDeliveryOrderFailure(error.message || 'Failed to fetchDeliveryOrder data'));
        }
    };
};
