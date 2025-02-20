

export const FETCH_GET_SUBCATEGORY_REQUEST = 'FETCH_GET_SUBCATEGORY_REQUEST';
export const FETCH_GET_SUBCATEGORY_SUCCESS = 'FETCH_GET_SUBCATEGORY_SUCCESS';
export const FETCH_GET_SUBCATEGORY_FAILURE = 'FETCH_GET_SUBCATEGORY_FAILURE';

export const fetchGetSubcategoryRequest = () => ({
    type: FETCH_GET_SUBCATEGORY_REQUEST,
});

export const fetchGetSubcategorySuccess = (SubcategoryData: any) => ({
    type: FETCH_GET_SUBCATEGORY_SUCCESS,
    payload: SubcategoryData,
});

export const fetchGetSubcategoryFailure = (error: string) => ({
    type: FETCH_GET_SUBCATEGORY_FAILURE,
    payload: error,
});
