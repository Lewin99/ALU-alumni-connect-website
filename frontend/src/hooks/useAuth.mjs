import { useContext } from "react";
import AuthContext from "../contexts/AuthProvider.mjs";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
