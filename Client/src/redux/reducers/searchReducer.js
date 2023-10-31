import { SEARCH_PRODUCTS_SUCCESS, SEARCH_PRODUCTS_FAILURE , CLEAR_PRODUCTS} from '../actionTypes';

const initialState = {
   products: [],
   error: null,
}

const searchReducer = (state = initialState, action) => {
   switch (action.type) {
      case CLEAR_PRODUCTS:
         return initialState;
      case SEARCH_PRODUCTS_SUCCESS:
         return {
            ...state,
            products: action.payload,
            error: null,
         };
      case SEARCH_PRODUCTS_FAILURE:
         return {
            ...state,
            products: [],
            error: action.payload
         };
      default:
         return state;
   }
};

export default searchReducer
