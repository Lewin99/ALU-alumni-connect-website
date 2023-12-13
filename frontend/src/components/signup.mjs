import React, { useState } from "react";
import "./Styles/loginSignup.css";
import { useNavigate } from "react-router-dom";
import Header from "./header.mjs";
import Footer from "./footer.mjs";

function Signup() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const body = {
      firstname,
      lastname,
      username,
      email,
      password,
      role: "alumini student",
    };

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        navigate("/login");
        setFirstName("");
        setLastName("");
        setUsername("");
        setEmail("");
        setPassword("");
      } else {
        const res = await response.json();
        if (res.email) {
          setEmailError(res.email);
        }
        if (response.status === 400) {
          setPasswordError(res.error);
        }
      }
    } catch (error) {
      console.error("An error occurred during the fetch:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="FormWrapper">
        <div className="Form">
          <div className="LoginIcon">
            <h1 className="text-light">Sign Up</h1>
          </div>

          <div className="signupFailed">
            <h3></h3>
          </div>

          <div className="FormElement mt-5">
            <form className="formy">
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter your first name"
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  style={{ width: "100%" }}
                />
              </div>

              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter your last name"
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  className="form-control"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ width: "100%" }}
                />
              </div>
              {emailError && (
                <div className="emailError text-danger p-1">
                  <h5>{emailError}</h5>
                </div>
              )}

              <div className="form-group">
                <input
                  className="form-control"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(null);
                  }}
                  required
                />
              </div>
              {passwordError && (
                <div className="passwordError text-danger p-2">
                  <h5>{passwordError}</h5>
                </div>
              )}

              <div className="SubmitButton">
                <div className="p-1">
                  <button
                    type="submit"
                    className="btn mt-2 btn-dark"
                    onClick={handleSignup}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Signup;
