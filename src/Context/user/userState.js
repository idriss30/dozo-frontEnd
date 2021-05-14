import { userReducer } from "./userReducer";
import UserContext from "./userContext";
import { REGISTER, LOGIN, DELETE_USER, UPDATE_USER, RESET } from "./action";
import { useReducer, useState } from "react";
import axios from "axios";
import Alert from "../../components/alertComponent/alert";
import { useCookies } from "react-cookie";

// function to register
let registerFunction = async (user) => {
  return await axios.post("http://localhost:5000/api/users/register", user);
};

// create login function
let loginFunction = async (userData) => {
  return await axios.post("http://localhost:5000/api/users/login", userData, {
    withCredentials: true,
    credentials: "include", // get the  back from the server
  });
};

// create updateFunction
const updateFunction = async (id, data) => {
  return await axios.put(`http://localhost:5000/api/users/update/${id}`, data, {
    withCredentials: true,
    credentials: "include",
  });
};

// create a function to deleteCookie || signout
const deleteCookie = async () => {
  return await axios.get("http://localhost:5000/api/users/signout", {
    withCredentials: true,
    credentials: "include",
  });
};

// create a function to delete the user
const removeUser = async (username) => {
  return await axios.delete(
    `http://localhost:5000/api/users/delete/${username}`,
    {
      withCredentials: true,
      credentials: "include",
    }
  );
};

const UserState = ({ children }) => {
  // create an alert boolean to display Alert
  const [alert, setAlert] = useState(false);
  // update Alert message
  const [alertMessage, setAlertMessage] = useState("");
  // manage cookies
  const [cookies, setCookies, removeCookie] = useCookies(["username"]);
  // initial state
  const initialState = {
    user: cookies.username || "guest",
    isLog: cookies.username ? true : false,
  };

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
      payload: "",
    });
  };
  const login = async (userData) => {
    // re-init the alert
    setAlert(false);

    const loginResult = await loginFunction(userData);
    // check the message
    let message = loginResult.data.message;
    let username = loginResult.data.userId;
    if (message === "user not found") {
      setAlert(true);
      setAlertMessage("Sorry User not found");
    } else if (message === "wrong-pass") {
      setAlert(true);
      setAlertMessage("your password is incorrect");
    } else if (message.includes("error")) {
      setAlert(true);
      setAlertMessage("there was an error fetching user");
    } else if (message === "success") {
      setCookies("username", username, {
        path: "/",
        maxAge: 3600,
        sameSite: "lax",
      });
      window.location.href = "http://localhost:3000/users/profile";

      dispatch({
        type: LOGIN,
        payload: username,
      });
    }
  };

  const updateUser = async (id, user) => {
    // send the request
    const updateRequest = await updateFunction(id, user);
    if (!updateRequest) {
      setAlert(true);
      setAlertMessage("there is an error handling your request");
    }
    if (updateRequest.data.message === "success") {
      removeCookie("username", { path: "/" });
      setAlert(true);
      setAlertMessage("your account has been updated! please login again");
      setTimeout(() => {
        // redirect after 2s
        window.location.href = "http://localhost:3000/users/login";
      }, 2000);
      dispatch({
        type: UPDATE_USER,
        payload: null,
      });
      window.location.replace("http://localhost:3000/users/profile");
    }
  };

  const deleteUser = async (user) => {
    const isDeleted = await removeUser(user);
    if (isDeleted.data.message === "success") {
      removeCookie("username", { path: "/" });
      setAlert(true);
      setAlertMessage("your account has been deleted. redirecting...");
      dispatch({
        type: DELETE_USER,
        payload: null,
      });
      setTimeout(() => {
        window.location.href = "http://localhost:3000/";
      }, 2000);
    } else {
      setAlert(true);
      setAlertMessage("can't delete user right now");
    }
  };

  const reset = async () => {
    const sendDelete = await deleteCookie();
    if (sendDelete.data.message === "success") {
      removeCookie("username", { path: "/" });
      setAlert(true);
      setAlertMessage("login out..");
      setTimeout(() => {
        // redirect after 2s
        window.location.href = "http://localhost:3000/";
      }, 2000);
    }
    dispatch({
      type: RESET,
      payload: null,
    });
  };

  // use the reducer now
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        isLog: state.isLog,
        register,
        login,
        reset, // which is signing out
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
