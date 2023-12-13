import React from "react";
import { Outlet } from "react-router-dom";
import "./Styles/logedinuser.css";
import LoggedInHeader from "./loggedheader.mjs";
import Footer from "./footer.mjs";

function LoggedInUser() {
  return (
    <div>
      <LoggedInHeader />
      <Outlet />
      <Footer />
    </div>
  );
}

export default LoggedInUser;
