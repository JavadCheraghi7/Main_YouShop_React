import {
  GET_PRODUCT,
  PRODUCT_ERROR,
  SET_LOADING,
  DETAIL_SUCCESS,
  DETAIL_ERROR,
  SET_LIKE,
  LIKE_ERROR,
  SET_COMPARE,
  ERROR_COMPARE,
  SET_GROUP_PRODUCT_COMPARE,
  ADD_TO_COMPARE_LIST,
  SET_SEARCH_COMPARE,
  CLEAR_SEARCH_FILTER,
  ADD_WITH_FILTERED,
  CLOSE_COMPARE_PRODUCT,
  ADD_TO_CART,
  INCREMENT_PRODUCT_COUNT,
  DECREMENT_PRODUCT_COUNT,
  REMOVE_PRODUCT_CART,
  ADD_TOTAL,
  REMOVE_ALL_PRODUCT,
  SEARCH_PRODUCT
} from "./types";
import axios from "axios";

export const getProducts = () => async (dispatch) => {
  try {
    setLoading();
    const { data } = await axios.get("http://localhost:5000/products", { maxContentLength: Infinity });
    dispatch({ type: GET_PRODUCT, payload: data });
  } catch (err) {
    dispatch({ type: PRODUCT_ERROR, payload: err.response.statusText });
  }
};

// detail Action
export const handleDetail = (id) => async (dispatch) => {
  try {
    setLoading();
    const { data } = await axios.get(
      `http://localhost:5000/products/${id}`
    );
    dispatch({ type: DETAIL_SUCCESS, payload: data });
  } catch (err) {
    console.log(err);
    dispatch({ type: DETAIL_ERROR, payload: err.response.statusText });
  }
};

// compare Action
export const handleCompare = (id) => async (dispatch) => {
  try {
    setLoading();
    const { data } = await axios.get(`http://localhost:5000/products/${id}`);
    dispatch({ type: SET_COMPARE, payload: data });
  } catch (err) {
    console.log(err);
    dispatch({ type: ERROR_COMPARE, payload: err.response.statusText });
  }
};

// set group product compare
export const setGroupCompare = (product) => (dispatch) => {
  dispatch({ type: SET_GROUP_PRODUCT_COMPARE, payload: product });
};

// Add to List Compare
export const addToComponentList = (id) => (dispatch) => {
  dispatch({ type: ADD_TO_COMPARE_LIST, payload: id });
};

// search product to modal compare
export const searchProductCompare = (text) => (dispatch) => {
  dispatch({ type: SET_SEARCH_COMPARE, payload: text });
};

// clear search product to modal compare
export const clearSearchFilter = () => (dispatch) => {
  dispatch({ type: CLEAR_SEARCH_FILTER });
};

// add product with filtered product for compare
export const addWithFiltered = (id) => (dispatch) => {
  dispatch({ type: ADD_WITH_FILTERED, payload: id });
};

// close product to compare
export const closeProductCompare = (product) => (dispatch) => {
  dispatch({ type: CLOSE_COMPARE_PRODUCT, payload: product });
};

export const addToCart = (id) => (dispatch) => {
  dispatch({ type: ADD_TO_CART, payload: id });
};

// increment product count
export const increment = (id) => (dispatch) => {
  dispatch({ type: INCREMENT_PRODUCT_COUNT, payload: id });
};

// decrement product count
export const decrement = (id) => (dispatch) => {
  dispatch({ type: DECREMENT_PRODUCT_COUNT, payload: id });
};

// Remove product cart
export const removeProduct = (id) => (dispatch) => {
  dispatch({ type: REMOVE_PRODUCT_CART, payload: id });
};

// Add total cart
export const totalCart = () => dispatch =>{
  dispatch({type: ADD_TOTAL});
};

export const removeAllProduct = () => dispatch =>{
  dispatch({type:REMOVE_ALL_PRODUCT});
};

// search product
export const productSearch = (text) => async (dispatch) =>{
  try{
    setLoading();
    const {data} = await axios.get(`http://localhost:5000/products?q=${text}`,{ maxContentLength: Infinity })
    dispatch({type: SEARCH_PRODUCT, payload: data});
  }
  catch(err){
    console.log(err);
    dispatch({type: PRODUCT_ERROR, payload: err.response.statusText});
  }
};

// product Like
export const Like = (setLike) => async (dispatch) => {
  const config = {
    headers: {
      "content-type": "application/json",
    },
  };
  try {
    setLoading();
    const { data } = await axios.put(
      `http://localhost:5000/products/${setLike.id}`,
      setLike,
      config
    );
    dispatch({ type: SET_LIKE, payload: data });
  } catch (err) {
    // این کنسول کمک میکند تا علت درخواست ناموفق را ببینیم
    console.log("err response", err);
    dispatch({ type: LIKE_ERROR, payload: err.response.statusText });
  }
};

// To Rial price
export const ToRial = (str) => {
  str = str.replace(/,/g, "");
  var objRegex = new RegExp("(-?[0-9]+)([0-9]{3})");

  while (objRegex.test(str)) {
    str = str.replace(objRegex, "$1,$2");
  }

  return str;
};

export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
