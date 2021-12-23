import { Component } from "react";
import { TextField, MenuItem, Button } from "@material-ui/core";
import { addUser } from "../../../utils/users";
import classes from "../Auth.module.css";
import { registerUser } from "../../../services/auth-services";

class Register extends Component {
  state = {
    userName: "",
    password: "",
    role: "admin",
    registeringUser: false,
    registerErrorMsg: "",
    userNameError: "",
    passwordError: "",
  };

  onChangeHandler = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      registerErrorMsg: "",
      [`${e.target.name}Error`]: "",
    });
  };

  onInputBlur = (e, label) => {
    const { name, value, required, minLength } = e.target;

    console.log(name);
    console.log(value);
    console.log(required);
    console.log(minLength);
    console.log(!value && required);

    if (!value && required) {
      this.setState({
        ...this.state,
        [`${name}Error`]: `${label} is required`,
      });
    } else if (value && minLength > -1 && value.length < minLength) {
      this.setState({
        ...this.state,
        [`${name}Error`]: `${label} must have ${minLength} charachters`,
      });
    }
  };

  onRegister = async (e) => {
    e.preventDefault();
    const { userName, password, role } = this.state;
    if (!userName || !password) {
      return;
    }

    const user = { userName: userName.toLowerCase(), password, role };

    this.setState({
      registeringUser: true,
      registerErrorMsg: "",
    });

    this.props.handleSwitchDisable(true);

    try {
      await registerUser(user);
      const responce = await addUser(user);

      this.props.onRegisteration();

      this.setState({
        userName: "",
        password: "",
        role: "admin",
        registeringUser: false,
        registerErrorMsg: "",
      });
    } catch (err) {
      this.setState({ registeringUser: false, registerErrorMsg: err });
    } finally {
      this.props.handleSwitchDisable(false);
    }
  };

  render() {
    console.log(this.state);
    return (
      <div className={classes["auth-form"]}>
        <h4>Registeration Form</h4>
        <form noValidate autoComplete="off" onSubmit={this.onRegister}>
          <TextField
            label="User Name"
            type="text"
            margin="normal"
            variant="outlined"
            name="userName"
            value={this.state.userName}
            onChange={this.onChangeHandler}
            onBlur={(e) => this.onInputBlur(e, "User Name")}
            autoComplete="off"
            required
            InputProps={{
              inputProps: {
                minLength: 4,
              },
            }}
          />
          {this.state.userNameError && (
            <small className="input-error"> {this.state.userNameError}</small>
          )}

          <TextField
            label="Password"
            type="password"
            margin="normal"
            variant="outlined"
            name="password"
            value={this.state.password}
            onChange={this.onChangeHandler}
            onBlur={(e) => this.onInputBlur(e, "Password")}
            autoComplete="off"
            required
            InputProps={{
              inputProps: {
                minLength: 8,
              },
            }}
          />

          {this.state.passwordError && (
            <small className="input-error"> {this.state.passwordError}</small>
          )}
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

          {this.state.registerErrorMsg ? (
            <small style={{ color: "red" }}>
              {this.state.registerErrorMsg}
            </small>
          ) : null}

          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={this.state.registeringUser}
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

export default Register;
