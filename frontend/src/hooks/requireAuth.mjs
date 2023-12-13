import React, { useEffect, useState } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth.mjs";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();
  const [isAccessTokenValid, setIsAccessTokenValid] = useState(false);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const checkValidity = () => {
      if (auth?.expiresIn) {
        const currentTime = Date.now();
        const expirationTime = auth.expiresIn;
        const isValid = expirationTime > currentTime;
        setIsAccessTokenValid(isValid);
      } else {
        setIsAccessTokenValid(false);
      }
    };

    checkValidity();

    const validityInterval = setInterval(() => {
      checkValidity();
    }, 60 * 60 * 1000);

    setAuthReady(true);

    return () => {
      clearInterval(validityInterval);
    };
  }, [auth?.expiresIn]);

  if (!authReady) {
    return null;
  }

  if (isAccessTokenValid) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default RequireAuth;
