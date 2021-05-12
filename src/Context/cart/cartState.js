import { ADD, REMOVE, INCREMENT, DECREMENT, RESET } from "./action";
import cartContext from "./cartContext";
import { cartReducer } from "./cartReducer";
import { useReducer } from "react";

const CartState = ({ children }) => {
  // check if cart is present
  const checkStorage = sessionStorage.getItem("cart");
  // if present convert back to regular object
  let retrievedProducts = JSON.parse(checkStorage);

  // get the initial quantity if cart is in session
  let initialQty = null;
  if (retrievedProducts) {
    initialQty = retrievedProducts.reduce((acc, product) => {
      return acc + product.qty;
    }, 0);
  }

  // define the initial State
  const initialCartState = {
    products: retrievedProducts || [],
    qty: initialQty || 0,
  };

  // define the differents actions in the state
  const addToCart = (product) => {
    dispatch({
      type: ADD,
      payload: product,
    });
  };

  const removeFromCart = (product) => {
    dispatch({
      type: REMOVE,
      payload: product,
    });
  };

  const incrementQuantity = (identifier) => {
    dispatch({
      type: INCREMENT,
      payload: identifier,
    });
  };

  const decrementQuantity = (identifier) => {
    dispatch({ type: DECREMENT, payload: identifier });
  };

  const reset = () => {
    sessionStorage.removeItem("cart"); // remove cart from storage before dispatching

    dispatch({ type: RESET, payload: { qty: 0, products: [] } });
  };
  // use Reducer to updtate the carts
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  return (
    <cartContext.Provider
      value={{
        products: state.products,
        qty: state.qty,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        reset,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartState;
