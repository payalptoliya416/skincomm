

export const FETCH_JUMPSTART_PACKAGE_REQUEST = 'FETCH_JUMPSTART_PACKAGE_REQUEST';
export const FETCH_JUMPSTART_PACKAGE_SUCCESS = 'FETCH_JUMPSTART_PACKAGE_SUCCESS';
export const FETCH_JUMPSTART_PACKAGE_FAILURE = 'FETCH_JUMPSTART_PACKAGE_FAILURE';

export const fetchJumpstartPackageRequest = () => ({
    type: FETCH_JUMPSTART_PACKAGE_REQUEST,
});

export const fetchJumpstartPackageSuccess = (JumpstartPackageData: any) => ({
    type: FETCH_JUMPSTART_PACKAGE_SUCCESS,
    payload: JumpstartPackageData,
});

export const fetchJumpstartPackageFailure = (error: string) => ({
    type: FETCH_JUMPSTART_PACKAGE_FAILURE,
    payload: error,
});
