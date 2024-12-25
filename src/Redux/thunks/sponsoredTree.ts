

import { Dispatch } from 'redux';
import { AxiosSponsoredTree } from '../../Utilities/axios';
import { fetchSposoredTreeGailure, fetchSposoredTreeRequest, fetchSposoredTreeSuccess } from '../actions/sponsoredTree';

export const fetchSponsoredTree = (earningParams: any) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchSposoredTreeRequest());
        try {
            const response = await AxiosSponsoredTree.post('', earningParams);
            dispatch(fetchSposoredTreeSuccess(response.data.data));
            return {data : response.data.data}
        } catch (error: any) {
            dispatch(fetchSposoredTreeGailure(error.message || 'Failed to fetch Sponsored TreeReport data'));            
            return  ;
        }
    };
};
