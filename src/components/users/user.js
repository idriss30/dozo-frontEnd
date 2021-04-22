import { useContext, useRef, useState } from "react";

import Alert from "../alertComponent/alert";
import "./user.scss";
import UserContext from "../../Context/user/userContext";

const UserSection = () => {
  // destructure the register and login method from the context
  const { register } = useContext(UserContext);

  // manage error with state
  // check if error
  const [hasAlert, setHasAlert] = useState(false);
  // define the error the message in the alert component
  const [alertMessage, setAlertMessage] = useState("");

  // handle register form
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState();

  const handleFormChange = (e) => {
    // reset the error to false everytime an input change
    setHasAlert(false);
    // create a switch to check the target name and setState
    switch (e.target.name) {
      case "firstname":
        setFirstName(e.target.value);
        break;
      case "lastname":
        setLastname(e.target.value);
        break;
      case "username":
        setUsername(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "confirm":
        setConfirm(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "address":
        setAddress(e.target.value);
        break;
      case "city":
        setCity(e.target.value);
        break;
      case "state":
        setState(e.target.value);
        break;
      case "zip":
        setZip(e.target.value);
        break;
      default:
        return;
    }
  };

  // create a function to check email using regex
  const checkEmail = (email) => {
    // create regex to check email
    const reGex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reGex.test(String(email).toLowerCase());
  };

  // function to register
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    // check if email is valid
    let isEmail = checkEmail(email);
    if (!isEmail) {
      setAlertMessage("email is not valid");
      setHasAlert(true);
      return;
    }
    if (password !== confirm) {
      setAlertMessage("passwords don't match");
      setHasAlert(true);
      return;
    }
    let userData = {
      firstname,
      lastname,
      username,
      password,
      email,
      address,
      city,
      state,
      zip,
    };
    register(userData);
    setHasAlert(false);
    registerForm.current.reset();
  };
  //  reate a ref or the register  form to clear it out
  const registerForm = useRef();
  return (
    <>
      <div className="login">
        <h2>Do you have an account ?</h2>
        <p>Login</p>

        <div className="login__container">
          <div className="login__container-loginForm">
            <form className="login__form" action="/" method="POST">
              <input type="text" name="username" placeholder="username" />
              <input type="text" name="password" placeholder="password" />
              <button>log in</button>
            </form>
            <p>or </p>
            <p>Sign up</p>
          </div>
          <div className="login__container-registerForm">
            <form
              onChange={handleFormChange}
              onSubmit={handleRegisterSubmit}
              ref={registerForm}
            >
              <div className="form__container">
                <input
                  type="text"
                  name="firstname"
                  placeholder="first"
                  required
                />
                <input
                  type="text"
                  name="lastname"
                  placeholder="last"
                  required
                />
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  required
                />
                <input type="email" name="email" placeholder="email" required />
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  required
                />
                <input
                  type="password"
                  name="confirm"
                  placeholder="confirm password"
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="address"
                  required
                />
                <input type="text" name="city" placeholder="city" required />
                <input type="text" name="state" placeholder="state" required />
                <input type="text" name="zip" placeholder="zip" required />
              </div>

              <button type="submit">Sign Up</button>
            </form>
          </div>
        </div>
        {hasAlert && <Alert alertText={alertMessage} />}
      </div>
    </>
  );
};

export default UserSection;
