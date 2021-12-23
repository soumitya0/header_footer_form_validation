import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";
function HeaderLink(props) {
  return (
    <NavLink activeClassName={classes.active} to={props.path}>
      <span style={{ marginLeft: "20px", cursor: "pointer" }}>
        {props.path}
      </span>
    </NavLink>
  );
}

export default HeaderLink;
