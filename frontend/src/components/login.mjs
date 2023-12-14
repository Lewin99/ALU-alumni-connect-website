import { React, useState } from "react";
import "./Styles/loginSignup.css";
import { useNavigate } from "react-router-dom";
import Header from "./header.mjs";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth.mjs";
import Footer from "./footer.mjs";

function Login() {
  const { setAuth } = useAuth();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://alumini-connect.onrender.com/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const statusCode = response.status;

      const responseData = await response.json();
      const accessToken = responseData.Access_token;
      const role = responseData.role;
      const expires = responseData.expiresIn;

      if (statusCode === 200) {
        const authData = {
          accessToken: accessToken,
          role: role,
          expiresIn: expires,
        };

        setAuth(authData);
        window.localStorage.setItem("auth", JSON.stringify(authData));
        navigate("/loggedinuser");
        setEmail("");
        setPassword("");
      } else {
        setLoginError(responseData.error);
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
            <h1 className="text-light">Login</h1>
          </div>
          <div className="FormElement">
            <form className="formy">
              <div className="form-group">
                <label className="text-dark">Email:</label>
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

              <div className="form-group">
                <label className="text-dark">Password:</label>
                <input
                  className="form-control"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {loginError && (
                <div className="loginfailed d-flex justify-content-center align-items-center text-danger p-3">
                  <h5>{loginError}!!!!!</h5>
                </div>
              )}
              <div className="SubmitButton">
                <div className="p-1 ">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="btn mt-2 btn-dark"
                  >
                    Login
                  </button>

                  <Link to="/signup" className="nav-link">
                    <h5 className="text-dark pt-4">
                      New here? Click to Sign Up
                    </h5>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <br></br> <br></br> <br></br>
      <div className="pt-3">
        <Footer />
      </div>
    </div>
  );
}

export default Login;
