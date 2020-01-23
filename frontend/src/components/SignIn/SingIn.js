import React, { Component } from "react";
import ErrorMessage from "../ErrorMeassage/ErrorMessage";

class SingIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
      errorLogin: "Welcome To Smart Brain"
    };
  }

  onEmailChange = event => {
    this.setState({ signInEmail: event.target.value });
  };

  theFetcherUrl = () => {
    console.log("https://sleepy-beyond-74213.herokuapp.com/signin");
  };

  onPasswordChange = event => {
    this.setState({ signInPassword: event.target.value });
  };
  onLoginSuccess = () => {
    return (
      <div class="alert alert-success" role="alert">
        Success
      </div>
    );
  };
  onSubmitSignIn = () => {
    fetch("http://localhost:3000/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(res => res.json())
      .then(user => {
        //console.log(user);
        this.setState({ errorLogin: user });
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange("home");
          this.onLoginSuccess();
        }
      })
      .catch(err => console.error(err));
  };

  render() {
    return (
      <div>
        <ErrorMessage error={this.state.errorLogin} />
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
                    onChange={this.onEmailChange}
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="email"
                    name="email-address"
                    id="email-address"
                  />
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
                    onChange={this.onPasswordChange}
                  />
                </div>
              </fieldset>
              <div className="">
                <input
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                  value="Sign in"
                  onClick={this.onSubmitSignIn}
                />
              </div>
              <div className="lh-copy mt3">
                <p
                  className="f4 link dim black db pointer"
                  onClick={() => this.props.onRouteChange("register")}
                >
                  Register
                </p>
              </div>
            </div>
          </main>
        </article>
      </div>
    );
  }
}

export default SingIn;
