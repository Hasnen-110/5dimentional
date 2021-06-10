import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Main from "./pages/main";
import Signin from "./pages/signin/signin";

const Routes = (props) => {
    return (
        <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          
          <Route path={["/signin", "/signup"]}>
            <Signin/>
          </Route> 

          <Route path="*">
            <Main />
          </Route>  
                 
        </Switch>
    </Router>
    )
};

export default Routes;