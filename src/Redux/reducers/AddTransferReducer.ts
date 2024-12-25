
import { FETCH_ADD_TRANSFER_FAILURE, FETCH_ADD_TRANSFER_REQUEST, FETCH_ADD_TRANSFER_SUCCESS } from "../actions/AddTransferAction";

interface AddTransfer{
  loading: boolean;
  addTransderData: any;
  error: string | null;
}

const initialState: AddTransfer = {
  loading: false,
  addTransderData: null,
  error: null,
};

export const addTransferReducer = (
  state = initialState,
  action: any
): AddTransfer => {
  switch (action.type) {
    case FETCH_ADD_TRANSFER_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_ADD_TRANSFER_SUCCESS:
      return { ...state, loading: false, addTransderData: action.payload };
    case FETCH_ADD_TRANSFER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
