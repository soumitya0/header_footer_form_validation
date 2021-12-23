import { Button } from "@material-ui/core";
import { Component } from "react";
import Login from "./Login/Login";
import Register from "./Register/Register";
import classes from "./Auth.module.css";

class Auth extends Component {
  state = { mode: "", disableButton: false };

  onSwitchMode = () => {
    if (this.state.mode === "register") {
      this.setState({ mode: "login" });
    } else {
      this.setState({ mode: "register" });
    }
  };

  goToHomePage = (user) => {
    this.props.history.push("/home", { user });
  };

  handleSwitchDisable = (bool) => {
    this.setState({
      disableButton: bool,
    });
  };

  render() {
    return (
      <div>
        {this.state.mode === "register" ? (
          <Register
            mode={this.state.mode}
            onRegisteration={this.onSwitchMode}
            handleSwitchDisable={this.handleSwitchDisable}
          />
        ) : (
          <Login   mode={this.state.mode} goToHomePage={this.goToHomePage}  handleSwitchDisable={this.handleSwitchDisable}/>
        )}

        <div className={classes["form-buttons"]}>
          <Button
            onClick={this.onSwitchMode}
            variant="outlined"
            disabled={this.state.disableButton}
          >
            {this.state.mode == "register"
              ? "Switch to login"
              : "Switch to Register"}
          </Button>
        </div>
      </div>
    );
  }
}
export default Auth;
