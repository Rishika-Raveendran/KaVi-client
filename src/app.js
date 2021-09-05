import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import Login from "views/Login";
import CCDashboard from "components/Pages/Dashboards/ccDashboard";
import UserProfile from "components/Pages/userProfile";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    console.log(window);
    if (
      window.sessionStorage.getItem("user") ||
      window.localStorage.getItem("user")
    ) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  let route;
//If logged in, the dashboard will be shown, otherwise, the login page
  if (isLoggedIn) {
    route = (
      <Switch>
        <Route
          exact
          path="/"
          component={() => <CCDashboard setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          exact
          path="/user-profile"
          component={() => <UserProfile setIsLoggedIn={setIsLoggedIn} />}
        />
        <Redirect to="/" path="*" />
      </Switch>
    );
  } else {
    //Planning to have different set of routes for each role based 
    //on an additional variable 'role' that will be obtained from user data from database.
    //Only collection centre set of routes are defined here
    route = (
      <Switch>
        <Route
          path="/login"
          exact
          render={() => <Login setIsLoggedIn={setIsLoggedIn} />}
        />

        <Redirect to="/login" />
      </Switch>
    );
  }
  return route;
};

export default App;
