import React, { useState } from "react";
import axios from "axios";
import ErrorMessage from "../ErrorMeassage/ErrorMessage";

//used to be a class component ,change it to functional with hooks
//replaced fetch with axios
const SingIn = (props) => {
  /* constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
      errorLogin: "Welcome To Smart Brain"
    };
  } */
  //state

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const theFetcherUrl = () => {
    console.log("https://sleepy-beyond-74213.herokuapp.com/signin");
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitSignIn = () => {
    /* fetch("http://localhost:3000/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        //console.log(user);
        this.setState({ errorLogin: user });
        if (user.id) {
          props.loadUser(user);
          props.onRouteChange("home");
        }
      })
      .catch((err) => console.error(err)); */

    axios
      .post("http://localhost:5000/signin", {
        email: email,
        password: password,
      })
      .then((user) => {
        console.log(user);
        setMsg(user.data);
        if (user.id) {
          props.loadUser(user);
          props.onRouteChange("home");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw6 center">
        <main className="pa4 black-80 ">
          <div className="measure ">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  onChange={onEmailChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                />
                <small>{msg}</small>
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={onPasswordChange}
                />
                <small
                  style={{ fontSize: "14px", color: "red", fontWeight: "500" }}
                >
                  hi
                </small>
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
                onClick={onSubmitSignIn}
              />
            </div>
            <div className="lh-copy mt3">
              <p
                className="f4 link dim black db pointer"
                onClick={() => props.onRouteChange("register")}
              >
                Register
              </p>
            </div>
          </div>
        </main>
      </article>
    </div>
  );
};

export default SingIn;
