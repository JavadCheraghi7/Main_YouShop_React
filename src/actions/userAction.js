import {SET_LOADING, GET_USERS, ERROR_GET_USERS, ADD_USER, ERROR_ADD_USER} from "./types";
import axios from "axios";

export const getUsers = () => async (dispatch) =>{
    try{
        setLoading();
        const {data} = await axios.get("http://localhost:5000/users", { maxContentLength: Infinity });
        dispatch({type: GET_USERS, payload: data});
    }
    catch(err){
        dispatch({type: ERROR_GET_USERS, payload: err.response.statusText});
    }
};

export const addUser = (user) => async (dispatch) =>{
    console.log(user);
    const config = {
        headers:{
            "content-type": "application/json"
        }
    }
    try{
        setLoading();
        const {data} = await axios.post("http://localhost:5000/users", user, config);
        dispatch({type: ADD_USER, payload: data});
    }
    catch(err){
        console.log(err);
        dispatch({type: ERROR_ADD_USER, payload: err.response.statusText});
    }
}


export const setLoading = () => {
    return {
      type: SET_LOADING,
    };
  };
  