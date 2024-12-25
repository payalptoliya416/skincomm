import { Dispatch } from 'redux';
import { AxiosSponsoredNetwork } from '../../Utilities/axios';
import { fetchSposoredNetworkGailure, fetchSposoredNetworkRequest, fetchSposoredNetworkSuccess } from '../actions/sponsoredNetworkAction';

export const fetchSponsredNetwork = (params: { userid: string }) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchSposoredNetworkRequest());
        try {
            const response = await AxiosSponsoredNetwork.post('', params);             
            dispatch(fetchSposoredNetworkSuccess(response.data.data.reports));
            return {data : response.data.data}
        } catch (error: any) {
            dispatch(fetchSposoredNetworkGailure(error.message || 'Failed to fetch Sponsored Network Report data'));
        }
    };
};
