import {
  SET_LOADING,
} from "./types";
import axios from "axios";


export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
