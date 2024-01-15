import { useContext } from "react";
import AuthProvider from "@/context/auth/Provider";

function useAuth() {
  return useContext(AuthProvider);
}

export default useAuth;
