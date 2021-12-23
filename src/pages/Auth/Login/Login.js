import { useState, useEffect } from "react";
import classes from "../Auth.module.css";
import { TextField, MenuItem, Button } from "@material-ui/core";
import { checkIfUserExists } from "../../../utils/users";
import {
  setUserInStorage,
  getUserFromStorage,
} from "../../../services/storage";

import { loginUser } from "../../../services/auth-services";

const INITIAL_STATE = {
  userName: "",
  password: "",
  role: "admin",

  userNameError: "",
  passwordError: "",
  formError: "",
};

function Login(props) {
  const [userState, setUserState] = useState(INITIAL_STATE);
  const [loggingUser, setLoggingUser] = useState(false);

  useEffect(() => {
    const user = getUserFromStorage();
    if (user) {
      setUserState({ ...userState, userName: user.userName, role: user.role });
    }
  }, []);

  const setUserHandler = (e) => {
    console.log(e.target.value);
    setUserState({
      ...userState,
      [e.target.name]: e.target.value,
      [`${e.target.name}Error`]: "",
      formError: "",
    });
  };

  const onInputBlur = (e, label) => {
    const { name, value, required } = e.target;
    if (!value && required) {
      setUserState({ ...userState, [`${name}Error`]: `${label} is required ` });
    }
  };

  const onLogin = async (e) => {
    e.preventDefault();
    const { userName, password, role } = userState;
    const user = { userName, token: password, role };
    props.handleSwitchDisable(true);
    setLoggingUser(true);

    try {
      await loginUser(user);

      if (checkIfUserExists(user)) {
        setUserInStorage(user);
        props.goToHomePage(user);
      } else {
        alert("User does not exist");
        setUserState(INITIAL_STATE);
      }
    } catch (err) {
      alert(err);
      setUserState({ ...INITIAL_STATE, formError: err.message });
    } finally {
      setLoggingUser(false);
      props.handleSwitchDisable(false);
    }

    props.goToHomePage();
  };

  console.log(userState);

  return (
    <div className={classes["auth-form"]}>
      <h4>Login form</h4>
      <form noValidate autoComplete="off" onSubmit={onLogin}>
        <TextField
          label="User Name"
          type="text"
          margin="normal"
          variant="outlined"
          value={userState.userName}
          onChange={setUserHandler}
          name="userName"
          onBlur={(e) => onInputBlur(e, "User Name")}
          required
        />

        {userState.userNameError && (
          <small className="input-error"> {userState.userNameError}</small>
        )}
        <TextField
          label="password"
          type="password"
          margin="normal"
          variant="outlined"
          value={userState.password}
          name="password"
          onChange={setUserHandler}
          onBlur={(e) => onInputBlur(e, "password")}
          required
        />
        {userState.passwordError && (
          <small className="input-error"> {userState.passwordError}</small>
        )}
        <TextField
          select
          variant="outlined"
          label="Role"
          name="role"
          value={userState.role}
          onChange={setUserHandler}
        >
          <MenuItem value="admin">Administrator</MenuItem>
          <MenuItem value="dev">Developer</MenuItem>
          <MenuItem value="guest">Guest</MenuItem>
        </TextField>
        {userState.formError && (
          <small className="input-error"> {userState.formError}</small>
        )}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!userState.userName || !userState.password}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
export default Login;
