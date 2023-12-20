import React from "react";
import "./Styles/loggedinHeader.css";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.mjs";
import "./Styles/logedinuser.css";

function LoggedInHeader() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    window.localStorage.removeItem("auth");
    setAuth({});
    navigate("/");
  };

  return (
    <div>
      <div className="HeaderBackColor p-3">
        <div
          className="container-fluid p-1 d-flex justify-content-between  align-items-center"
          id="headerWrapper"
        >
          <div className="brand-logo">
            <img
              src="https://i.ibb.co/kmP8qcf/aluLogo.png"
              alt="aluLogo"
              border="0"
            />
          </div>
          <div className="logoutDiv">
            <Link to="/" className="nav-link text-light" onClick={logout}>
              Logout
            </Link>
          </div>
        </div>
        <div className="nav">
          <nav className="navbar container-fluid min-nav navbar-expand">
            <div className="container-fluid d-flex">
              <div className="Links p-4 d-lg-flex p-1 d-sm-flex">
                <ul className="navbar-nav">
                  <li className="nav-item" id="li">
                    <Link to="/loggedinuser" className="nav-link text-light">
                      Home
                    </Link>
                  </li>

                  {auth?.role === "alumni admin" && (
                    <li className="nav-item">
                      <Link to="AdminPage" className="nav-link text-light">
                        Admin page
                      </Link>
                    </li>
                  )}

                  <li className="nav-item">
                    <Link to="add-events" className="nav-link text-light">
                      Add Events
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="my-events" className="nav-link text-light">
                      Manage Events
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default LoggedInHeader;
