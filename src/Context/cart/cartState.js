import { ADD, REMOVE, INCREMENT, DECREMENT } from "./action";
import cartContext from "./cartContext";
import cartReducer from "./cartReducer";
import { useReducer } from "react";

const cartState = ({ children }) => {
  // define the initial State
  const initialCartState = {
    products: [],
    qty: 0,
    total: null,
  };

  // define the differents actions in the state
  const addToCart = (product) => {
    dispatch({
      type: ADD,
      payload: product,
    });
  };

  const removeFromCart = (productId) => {
    dispatch({
      type: REMOVE,
      payload: productId,
    });
  };

  const incrementQuantity = (productId) => {
    dispatch({
      type: INCREMENT,
      payload: productId,
    });
  };

  const decrementQuantity = (productId) => {
    dispatch({ type: DECREMENT, payload: productId });
  };

  // use Reducer to updtate the carts
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  return (
    <cartContext.Provider
      value={{
        products: state.products,
        qty: state.qty,
        total: state.total,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default cartState;
