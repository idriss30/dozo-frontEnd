import "./user.scss";

const UserSection = () => {
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
            <form action="/" method="POST">
              <div className="form__container">
                <input type="text" name="firstname" placeholder="first" />
                <input type="text" name="last " placeholder="last" />
                <input type="email" name="email " placeholder="email" />
                <input type="text" name="password " placeholder="password" />
                <input
                  type="text"
                  name="confirm"
                  placeholder="confirm password"
                />
                <input type="text" name="address" placeholder="address" />
                <input type="text" name="city" placeholder="city" />
                <input type="text" name="state" placeholder="state" />
                <input type="text" name="zip" placeholder="zip" />
              </div>
              <button type="submit">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSection;
