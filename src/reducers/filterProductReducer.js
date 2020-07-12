import {
  SET_LOADING,
} from "../actions/types";

const initialState = {
  
};

export default (state = initialState, action) => {
  switch (action.type) {



    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};
