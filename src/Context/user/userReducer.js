import { REGISTER, LOGIN, DELETE_USER, UPDATE_USER, RESET } from "./action";

export const userReducer = (state, action) => {
  switch (action.type) {
    case REGISTER:
      // return the state and useEffect later on userPage
      return {
        ...state,
      };

    case LOGIN:
      return {
        ...state,
        user: action.payload,
      };

    case DELETE_USER:
      return {
        ...state,
        user: null,
      };

    case UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      };

    case RESET:
      return {
        ...state,
        user: null,
      };

    default:
      throw new Error("no case satisfied");
  }
};
