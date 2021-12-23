import { Switch, Route, Redirect } from "react-router-dom";

import Home from "../pages/Home/Home";
import Auth from "../pages/Auth/Auth";
import Posts from "../pages/Posts/Posts";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
const Routes = () => {
  return (
    <Switch>
      <Redirect from="/" to="/home" exact />

      <Route path="/auth" component={Auth} />
      <Route path="/home" component={Home} />
      <Route path="/posts" component={Posts} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  );
};
export default Routes;
