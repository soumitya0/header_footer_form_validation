// MONIKA
import { Component } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

import { registerUser } from "../../../services/auth-service";
import { addUser } from "../../../utils/users";
import classes from "../Auth.module.css";

class Register extends Component {
  state = {
    userName: "",
    password: "",
    role: "admin",
    registerError: false,
    registeringUser: false,
  };

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onRegister = async (e) => {
    e.preventDefault();
    const { userName, password, role } = this.state;

    if (!userName || !password) {
      return;
    }
    this.setState({ registerError: false, registeringUser: true });
    this.props.handleSwitchDisable(true);
    const user = { userName: userName.toLowerCase(), password, role };

    try {
      await registerUser(user);
      const response = await addUser(user);
      console.log(response);

      this.setState({
        userName: "",
        password: "",
        role: "admin",
      });
      this.props.onRegistration();
    } catch (err) {
      // handle api error
      this.setState({
        registerError: true,
        registerErrorMsg: err,
        registeringUser: false,
      });
    } finally {
      this.props.handleSwitchDisable(false);
    }
  };

  render() {
    return (
      <div className={classes["auth-form"]}>
        <h4 className={classes["form-heading"]}>Registeration Form</h4>
        <form noValidate autoComplete="off" onSubmit={this.onRegister}>
          <TextField
            label="User Name"
            type="text"
            margin="normal"
            variant="outlined"
            name="userName"
            value={this.state.userName}
            onChange={this.onChangeHandler}
          />
          <TextField
            label="Password"
            type="password"
            margin="normal"
            variant="outlined"
            name="password"
            value={this.state.password}
            onChange={this.onChangeHandler}
          />
          <TextField
            select
            variant="outlined"
            label="Role"
            name="role"
            value={this.state.role}
            onChange={this.onChangeHandler}
          >
            <MenuItem value="admin">Administrator</MenuItem>
            <MenuItem value="dev">Developer</MenuItem>
            <MenuItem value="guest">Guest</MenuItem>
          </TextField>

          {this.state.registerError ? (
            <p style={{ color: "red" }}>
              <small>
                {this.state.registerErrorMsg
                  ? this.state.registerErrorMsg
                  : "Something went wrong!"}
              </small>
            </p>
          ) : null}

          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={this.state.registeringUser}
            style={{ margin: "24px 25% 0", width: "50%" }}
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

export default Register;
