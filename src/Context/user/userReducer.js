import { REGISTER, LOGIN, DELETE_USER, UPDATE_USER, RESET } from "./action";

export const userReducer = (state, action) => {
  switch (action.type) {
    case REGISTER:
      // return the state and useEffect later on userPage
      return {
        ...state,
      };

    case LOGIN:
      break;

    case DELETE_USER:
      break;

    case UPDATE_USER:
      break;
    case RESET:
      return {
        ...state,
        message: "",
      };

    default:
      throw new Error("no case satisfied");
  }
};
