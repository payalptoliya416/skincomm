

import { Dispatch } from 'redux';
import { AxioInMyTeamSearch } from '../../Utilities/axios';
import { fetchSearchTeamFailure, fetchSearchTeamRequest, fetchSearchTeamSuccess } from '../actions/myTeamSearch';

export const fetchSearchTeamData = (Data : any) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchSearchTeamRequest());
        try {
            const response = await AxioInMyTeamSearch.post('' , {
                "userId" : Data
            });                       
            dispatch(fetchSearchTeamSuccess(response.data.data.member));            
            const data = response.data.data
            return data ;
        } catch (error: any) {
            dispatch(fetchSearchTeamFailure(error.message || 'Failed to fetch search Team data'));
        }
    };
};
