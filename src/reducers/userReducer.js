import {
  SET_LOADING,
  GET_USERS,
  ERROR_GET_USERS,
  ADD_USER,
  ERROR_ADD_USER,
} from "../actions/types";

const initialState = {
  users: null,
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };

    case ADD_USER:
      return {
        ...state,
        users: [action.payload, ...state.users],
        loading: false,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    case ERROR_GET_USERS:
    case ERROR_ADD_USER:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
