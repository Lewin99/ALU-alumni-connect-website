import React from "react";
import { Link } from "react-router-dom";
import "./Styles/header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Header() {
  return (
    <nav className="navbar navbar-expand-md HeaderBackColor">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <Link className="navbar-brand" to="/">
            <div className="container-fluid" id="brand-logo">
              <img
                src="https://i.ibb.co/kmP8qcf/aluLogo.png"
                alt="aluLogo"
                border="0"
                className="logo-img"
              />
            </div>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon bg-light"></span>
          </button>
        </div>

        {/* Navigation links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Account
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
