import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer.mjs";
import Home from "./components/home.mjs";
import Login from "./components/login.mjs";
import Signup from "./components/signup.mjs";
import AboutUs from "./components/about us.mjs";
import LoggedInUser from "./components/loggedInUser.mjs";
import LoggedInHome from "./components/loggedinHome.mjs";
import LoggedInAddEvents from "./components/loggedinAddevents.mjs";
import LoggedInMyEvents from "./components/loggedinMyevents.mjs";
import LoggedInAdimPage from "./components/loggedinAdimpage.mjs";
import Nomatch from "./components/nomatch.mjs";
import RequireAuth from "./hooks/requireAuth.mjs";
import useAuth from "./hooks/useAuth.mjs";

function App() {
  const { setAuth } = useAuth();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const storedAuthData = JSON.parse(window.localStorage.getItem("auth"));

    if (storedAuthData) {
      setAuth(storedAuthData);
    }
    setAuthReady(true);
  }, [setAuth]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<AboutUs />} />
        {authReady && (
          <Route element={<RequireAuth />}>
            <Route path="/loggedinuser" element={<LoggedInUser />}>
              <Route index element={<LoggedInHome />} />
              <Route path="add-events" element={<LoggedInAddEvents />} />
              <Route path="my-events" element={<LoggedInMyEvents />} />
              <Route path="AdminPage" element={<LoggedInAdimPage />} />
            </Route>
          </Route>
        )}
        <Route path="*" element={<Nomatch />} />
        <Footer />
      </Routes>
    </div>
  );
}

export default App;
