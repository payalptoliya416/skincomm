

export const FETCH_DELIVERY_ORDERS_REQUEST = 'FETCH_DELIVERY_ORDERS_REQUEST';
export const FETCH_DELIVERY_ORDERS_SUCCESS = 'FETCH_DELIVERY_ORDERS_SUCCESS';
export const FETCH_DELIVERY_ORDERS_FAILURE = 'FETCH_DELIVERY_ORDERS_FAILURE';

export const fetchDeliveryOrderRequest = () => ({
    type: FETCH_DELIVERY_ORDERS_REQUEST,
});

export const fetchDeliveryOrderSuccess = (DeliveryOrder: any) => ({
    type: FETCH_DELIVERY_ORDERS_SUCCESS,
    payload: DeliveryOrder,
});

export const fetchDeliveryOrderFailure = (error: string) => ({
    type: FETCH_DELIVERY_ORDERS_FAILURE,
    payload: error,
});
