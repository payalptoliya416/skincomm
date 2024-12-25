

import { FETCH_DELIVERY_ORDERS_FAILURE, FETCH_DELIVERY_ORDERS_REQUEST, FETCH_DELIVERY_ORDERS_SUCCESS } from '../actions/DeliveryOrderAction';

interface DeliveryOrderState {
    loading: boolean;
    DeliveryOrder: any;
    error: string | null;
}

const initialState: DeliveryOrderState = {
    loading: false,
    DeliveryOrder: [],
    error: null,
};

export const DeliveryOrderReducer = (state = initialState, action: any): DeliveryOrderState => {
    switch (action.type) {
        case FETCH_DELIVERY_ORDERS_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_DELIVERY_ORDERS_SUCCESS:
            return { ...state, loading: false, DeliveryOrder: action.payload };
        case FETCH_DELIVERY_ORDERS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
