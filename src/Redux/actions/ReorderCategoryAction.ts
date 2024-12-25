

export const FETCH_REORDER_CATEGORY_REQUEST = 'FETCH_REORDER_CATEGORY_REQUEST';
export const FETCH_REORDER_CATEGORY_SUCCESS = 'FETCH_REORDER_CATEGORY_SUCCESS';
export const FETCH_REORDER_CATEGORY_FAILURE = 'FETCH_REORDER_CATEGORY_FAILURE';
export const FETCH_REORDER_PRODUCT_SUCCESS = 'FETCH_REORDER_PRODUCT_SUCCESS';

export const fetchReorderCategoryRequest = () => ({
    type: FETCH_REORDER_CATEGORY_REQUEST,
});

export const fetchReorderCategorySuccess = (categoryData: any) => ({
    type: FETCH_REORDER_CATEGORY_SUCCESS,
    payload: categoryData,
});
export const fetchReorderProductSuccess = (productData: any) => ({
    type: FETCH_REORDER_PRODUCT_SUCCESS,
    payload: productData,
});

export const fetchReorderCategoryfailure = (error: string) => ({
    type: FETCH_REORDER_CATEGORY_FAILURE,
    payload: error,
});
