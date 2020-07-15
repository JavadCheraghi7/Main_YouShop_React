import {
  GET_PRODUCT,
  DETAIL_SUCCESS,
  DETAIL_ERROR,
  PRODUCT_ERROR,
  SET_LOADING,
  SET_COMPARE,
  SET_LIKE,
  LIKE_ERROR,
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
} from "../actions/types";

const initialState = {
  products: null,
  detail: null,
  compare: [],
  filteredCompare: null,
  cart: [],
  cartTotal: 0,
  cartSubTotal: 0,
  search: null,
  error: null,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };

    case DETAIL_SUCCESS:
      return {
        ...state,
        detail: action.payload,
        loading: false,
      };

    case SET_COMPARE:
      return {
        ...state,
        compare: [action.payload],
        loading: false,
      };

    case SET_GROUP_PRODUCT_COMPARE:
      const group = state.products.filter(
        (item) =>
          item.group === action.payload.group && item.id !== action.payload.id
      );
      return {
        ...state,
        products: Array.from(new Set(group)),
        loading: false,
      };

    case ADD_TO_COMPARE_LIST:
      const pro = [
        ...state.compare,
        state.products.find((item) => item.id === action.payload),
      ];
      return {
        ...state,
        compare: Array.from(new Set([...pro])),
        products: state.products.filter((item) => item.id !== action.payload),
        loading: false,
      };

    case SET_SEARCH_COMPARE:
      return {
        ...state,
        filteredCompare: state.products.filter((product) => {
          const regex = new RegExp(action.payload, "gi");
          return product.title.match(regex);
        }),
        loading: false,
      };

    case CLEAR_SEARCH_FILTER:
      return {
        ...state,
        filteredCompare: null,
        loading: false,
      };

    case ADD_WITH_FILTERED:
      const pro2 = [
        ...state.compare,
        state.filteredCompare.find((item) => item.id === action.payload),
      ];
      return {
        ...state,
        compare: Array.from(new Set([...pro2])),
        filteredCompare: state.filteredCompare.filter(
          (item) => item.id !== action.payload
        ),
        loading: false,
      };

    case CLOSE_COMPARE_PRODUCT:
      return {
        ...state,
        compare: state.compare.filter((item) => item.id !== action.payload.id),
        products: [action.payload, ...state.products],
        loading: false,
      };

    case ADD_TO_CART:
      const temProducts = [...state.products];
      const getProduct = temProducts.find((item) => item.id === action.payload);
      const index = temProducts.indexOf(getProduct);
      let product = temProducts[index];
      product.inCart = true;
      product.count = 1;
      const price = parseFloat(product.price);
      product.total = price;

      return {
        ...state,
        cart: [...state.cart, product],
        products: temProducts,
        detail: product,
        loading: false,
      };

    case INCREMENT_PRODUCT_COUNT:
      const temCart = [...state.cart];
      const selectItem = temCart.find((item) => item.id === action.payload);
      const inx = temCart.indexOf(selectItem);
      const CartProduct = temCart[inx];
      CartProduct.count = CartProduct.count + 1;
      CartProduct.total = CartProduct.price * CartProduct.count;

      return {
        ...state,
        cart: [...temCart],
        loading: false,
      };

    case DECREMENT_PRODUCT_COUNT:
      let exampleCart = [...state.cart];
      const select = exampleCart.find((item) => item.id === action.payload);
      const inxd = exampleCart.indexOf(select);
      const CartPro = exampleCart[inxd];
      CartPro.count = CartPro.count - 1;

      if (CartPro.count === 0) {
        var exProducts = [...state.products];
        var exCart = [...state.cart];
        exCart = exCart.filter((item) => item.id !== action.payload);
        const selItem = exProducts.find((item) => item.id === action.payload);
        const ind = exProducts.indexOf(selItem);
        const targetPro = exProducts[ind];
        targetPro.inCart = false;
        targetPro.count = 0;
        targetPro.total = 0;
      } else {
        CartPro.total = CartPro.price * CartPro.count;
      }

      return {
        ...state,
        cart: CartPro.count === 0 ? exCart : [...exampleCart],
        loading: false,
      };

    case REMOVE_PRODUCT_CART:
      const examProduct = [...state.products];
      let examCart = [...state.cart];
      examCart = examCart.filter((item) => item.id !== action.payload);
      const selectedItem = examProduct.find(
        (item) => item.id === action.payload
      );
      const indexed = examProduct.indexOf(selectedItem);
      const targetProduct = examProduct[indexed];
      targetProduct.inCart = false;
      targetProduct.count = 0;
      targetProduct.total = 0;

      return {
        ...state,
        cart: examCart,
        products: examProduct,
        loading: false,
      };

    case ADD_TOTAL:
       // cart calculation total price
       let subTotal = 0;
       state.cart.map((item) => (subTotal += item.total));
       const tax = 0;
       const total = subTotal + tax;
      return {
        ...state,
        cartSubTotal: subTotal,
        cartTotal: total,
        loading: false
      };

    case REMOVE_ALL_PRODUCT:
      return{
        ...state,
        cart: [],
        loading: false
      };
      
    case SEARCH_PRODUCT:
      return{
        ...state,
        search: action.payload,
        loading: false
      }  

    case SET_LIKE:
      return {
        ...state,
        products: state.products.map((pcs) =>
          pcs.id === action.payload.id ? action.payload : pcs
        ),
        loading: false,
      };

    case PRODUCT_ERROR:
    case DETAIL_ERROR:
    case LIKE_ERROR:
    case ERROR_COMPARE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};