import { ADD, REMOVE, INCREMENT, DECREMENT } from "./action";

// create the cart Reducer
export const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD:
      // find products first

      let isProduct = state.products.find(
        (product) => product.id === action.payload.id
      );
      // if product not present add it
      if (!isProduct) {
        return {
          ...state,
          products: [...state.products, action.payload],
          qty: state.qty + 1,
        };
      }
      // if product is found
      // check the size
      if (isProduct.size === action.payload.size) {
        state.products[
          state.products.findIndex(
            (product) => product.id === action.payload.id
          )
        ].qty++;
        return {
          ...state,
          products: [...state.products],
          qty: state.qty + 1,
        };
      }
      // if size is not same add the product as new
      return {
        ...state,
        products: [...state.products, action.payload],
        qty: state.qty + 1,
      };

    case REMOVE:
      //filter the products by uniqueId
      return {
        ...state,
        products: [
          ...state.products.filter(
            (product) => product.uniqueId !== action.payload.uniqueId
          ),
        ],
        qty: state.qty - action.payload.qty,
      };

    case INCREMENT:
      state.products[
        state.products.findIndex(
          (product) => product.uniqueId === action.payload
        )
      ].qty++;
      return {
        ...state,
        qty: state.qty + 1,
      };
    case DECREMENT:
      state.products[
        state.products.findIndex(
          (product) => product.uniqueId === action.payload
        )
      ].qty--;
      return {
        ...state,
        qty: state.qty - 1,
      };
    default:
      throw new Error();
  }
};
