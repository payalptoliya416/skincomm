


import { FETCH_JUMPSTART_PACKAGE_FAILURE, FETCH_JUMPSTART_PACKAGE_REQUEST, FETCH_JUMPSTART_PACKAGE_SUCCESS } from "../actions/JumpStartPackageAction";

interface JumpStartPackgeState {
    loading: boolean;
    JumpstartPackageData: any;
    error: string | null;
}

const initialState: JumpStartPackgeState = {
    loading: false,
    JumpstartPackageData: [],
    error: null,
};

export const JumpstartPackageReducer = (state = initialState, action: any): JumpStartPackgeState => {
    switch (action.type) {
        case FETCH_JUMPSTART_PACKAGE_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_JUMPSTART_PACKAGE_SUCCESS:
            return { ...state, loading: false, JumpstartPackageData: action.payload };
        case FETCH_JUMPSTART_PACKAGE_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
