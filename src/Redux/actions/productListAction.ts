

    export const FETCH_PRODUSTLIST_REQUEST = 'FETCH_PRODUSTLIST_REQUEST';
    export const FETCH_PRODUSTLIST_SUCCESS = 'FETCH_PRODUSTLIST_SUCCESS';
    export const FETCH_PRODUSTLIST_FAILURE = 'FETCH_PRODUSTLIST_FAILURE';

    export const fetchProductListRequest = () => ({
        type: FETCH_PRODUSTLIST_REQUEST,
    });

    export const fetchProductListSuccess = (productListData: any) => ({
        type: FETCH_PRODUSTLIST_SUCCESS,
        payload: productListData,
    });

    export const fetchProductListGailure = (error: string) => ({
        type: FETCH_PRODUSTLIST_FAILURE,
        payload: error,
    });

    // --sign Up---
    export const FETCH_SIGN_UP_PRODUSTLIST_REQUEST = 'FETCH_SIGN_UP_PRODUSTLIST_REQUEST';
    export const FETCH_SIGN_UP_PRODUSTLIST_SUCCESS = 'FETCH_SIGN_UP_PRODUSTLIST_SUCCESS';
    export const FETCH_SIGN_UP_PRODUSTLIST_FAILURE = 'FETCH_SIGN_UP_PRODUSTLIST_FAILURE';

    export const fetchSignUpProductListRequest = () => ({
        type: FETCH_SIGN_UP_PRODUSTLIST_REQUEST,
    });

    export const fetchSignUpProductListSuccess = (productListSignUpData: any) => ({
        type: FETCH_SIGN_UP_PRODUSTLIST_SUCCESS,
        payload: productListSignUpData,
    });

    export const fetchSignUpProductListFailure = (error: string) => ({
        type: FETCH_SIGN_UP_PRODUSTLIST_FAILURE,
        payload: error,
    });
