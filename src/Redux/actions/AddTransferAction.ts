

export const FETCH_ADD_TRANSFER_REQUEST = 'FETCH_ADD_TRANSFER_REQUEST';
export const FETCH_ADD_TRANSFER_SUCCESS = 'FETCH_ADD_TRANSFER_SUCCESS';
export const FETCH_ADD_TRANSFER_FAILURE = 'FETCH_ADD_TRANSFER_FAILURE';

export const fetchAddTransferRequest = () => ({
    type: FETCH_ADD_TRANSFER_REQUEST,
});

export const fetchAddTransferSuccess = (addTransderData: any) => ({
    type: FETCH_ADD_TRANSFER_SUCCESS,
    payload: addTransderData,
});

export const fetchAddTransferFailure = (error: string) => ({
    type: FETCH_ADD_TRANSFER_FAILURE,
    payload: error,
});
