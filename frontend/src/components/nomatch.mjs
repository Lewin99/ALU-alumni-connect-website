import React from "react";
import { Link } from "react-router-dom";
import "./Styles/nomatch.css";
import Header from "./header.mjs";

function Nomatch() {
  return (
    <div className="nomatch-wrapper">
      <Header />

      <div className="addev-header">
        <img
          src="https://i.ibb.co/60bCpw4/ALU-logo.webp"
          alt="ALU-logo"
          border="0"
        />
        <h3 className="addev-heading">ALU ALUMNI CONNECT</h3>
      </div>
      <div className="all text-danger">
        <h1 className="text-warning">404 Not Found</h1>
        <p>The page you're looking for does not exist.</p>
        <div></div>
        <Link to="/">
          <h3 className="all-link">Go back to home page</h3>
        </Link>
      </div>
    </div>
  );
}

export default Nomatch;
