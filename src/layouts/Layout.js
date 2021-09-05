/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import Header from "components/Headers/Header";
import routes from "pageRoutes";

const Layout = (props) => {


  return (
    <>      
      <Sidebar
        routes={routes}
        setIsLoggedIn={props.setIsLoggedIn}
          logo={{
          innerLink: "/",
          imgSrc: require("../assets/img/brand/kv_logo.png").default,
          imgAlt: "...",
        }}
      />
      <div className="main-content">
        <AdminNavbar
         setIsLoggedIn={props.setIsLoggedIn}
          brandText={props.pageName}
        />
        <Header />
        {props.children}
        <AdminFooter />    
      </div>
    </>
  );
};

export default Layout;
