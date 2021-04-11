import { ADD, REMOVE, INCREMENT, DECREMENT } from "./action";

// create the cart Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD:
      if (state.products.length > 0) {
        state.products.map((product) => {
          if (product.id === action.payload.id) {
          }
        });
      } else {
      }

      return;
    case REMOVE:
      return;

    case INCREMENT:
      return;
    case DECREMENT:
      return;
    default:
      throw new Error();
  }
};

export default cartReducer;
