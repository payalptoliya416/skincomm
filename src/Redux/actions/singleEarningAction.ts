

export const FETCH_SINGLEEARNING_REQUEST = 'FETCH_SINGLEEARNING_REQUEST';
export const FETCH_SINGLEEARNING_SUCCESS = 'FETCH_SINGLEEARNING_SUCCESS';
export const FETCH_SINGLEEARNING_FAILURE = 'FETCH_SINGLEEARNING_FAILURE';

export const fetchsingleEarningGRequest = () => ({
    type: FETCH_SINGLEEARNING_REQUEST,
});

export const fetchsingleEarningSuccess = (singleearningData: any) => ({
    type: FETCH_SINGLEEARNING_SUCCESS,
    payload: singleearningData,
});

export const fetchsingleEarningGailure = (error: string) => ({
    type: FETCH_SINGLEEARNING_FAILURE,
    payload: error,
});
