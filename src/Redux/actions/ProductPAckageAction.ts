

export const FETCH_PRODUSTLISTPACAGE_REQUEST = 'FETCH_PRODUSTLISTPACAGE_REQUEST';
export const FETCH_PRODUSTLISTPACAGE_SUCCESS = 'FETCH_PRODUSTLISTPACAGE_SUCCESS';
export const FETCH_PRODUSTLISTPACAGE_FAILURE = 'FETCH_PRODUSTLISTPACAGE_FAILURE';

export const fetchProductListActionRequest = () => ({
    type: FETCH_PRODUSTLISTPACAGE_REQUEST,
});

export const fetchProductListActionSuccess = (productPacakgeListData: any) => ({
    type: FETCH_PRODUSTLISTPACAGE_SUCCESS,
    payload: productPacakgeListData,
});

export const fetchProductListActionGailure = (error: string) => ({
    type: FETCH_PRODUSTLISTPACAGE_FAILURE,
    payload: error,
});
