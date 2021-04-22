import { userReducer } from "./userReducer";
import UserContext from "./userContext";
import { REGISTER, LOGIN, DELETE_USER, UPDATE_USER, RESET } from "./action";
import { useReducer, useState } from "react";
import axios from "axios";
import Alert from "../../components/alertComponent/alert";
let registerFunction = async (user) => {
  return await axios.post("http://localhost:5000/api/users/register", user);
};
const UserState = ({ children }) => {
  // define the initial state
  const myInitialState = {
    user: [],
  };
  // create an alert boolean to display Alert
  const [alert, setAlert] = useState(false);
  // update Alert message
  const [alertMessage, setAlertMessage] = useState("");

  // define the differents action

  const register = async (user) => {
    setAlert(false);
    let result = await registerFunction(user);
    if (!result) {
      setAlert(true);
      setAlertMessage("sorry can't perform your request");
    }
    // create logic for the server message response;
    if (result.data.message === "found") {
      setAlert(true);
      setAlertMessage("your email is already in use");
    } else if (result.data.message === "username") {
      setAlert(true);
      setAlertMessage("username is taken");
    } else if (result.data.message === "error") {
      setAlert(true);
      setAlertMessage("request can not be performed");
    } else if (result.data.message === "success") {
      setAlert(true);
      setAlertMessage("your account was created");
    }

    dispatch({
      type: REGISTER,
      payload: null,
    });
  };
  const login = async (user) => {
    dispatch({
      type: LOGIN,
      payload: user,
    });
  };

  const updateUser = async (user) => {
    dispatch({
      type: UPDATE_USER,
      payload: user,
    });
  };

  const deleteUser = async (user) => {
    dispatch({
      type: DELETE_USER,
      payload: user,
    });
  };

  const reset = () => {
    dispatch({
      type: RESET,
    });
  };

  // use the reducer now
  const [state, dispatch] = useReducer(userReducer, myInitialState);
  return (
    <UserContext.Provider
      value={{
        user: state.user,

        reset,
        register,
        login,
        updateUser,
        deleteUser,
      }}
    >
      {alert && <Alert alertText={alertMessage} />}
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
