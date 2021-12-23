import AppBar from "@material-ui/core/AppBar";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import HeaderLink from "./HeaderLink";
import classes from "./Header.module.css";

import { withRouter } from "react-router-dom";
import { PinDropSharp } from "@material-ui/icons";

function Header(props) {
  const onLogout = () => {
    props.history.push("/auth");
  };
  return (
    <AppBar position="static">
      <Toolbar className={classes["app-bar"]}>
        <Typography variant="h6" className={classes.logo}>
          Logo
        </Typography>
        <HeaderLink path="Home" pathName="/home" />
        <HeaderLink path="Conditional" pathName="/Conditional" />
        <HeaderLink path="Posts" pathName="/Posts" />
        <Button
          variant="outlined"
          color="inherit"
          style={{ position: "absolute", right: "20px" }}
          onClick={onLogout}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(Header);
