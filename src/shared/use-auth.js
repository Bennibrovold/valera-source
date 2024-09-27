import axios from "axios";
import { useEffect, useState } from "react";
import { setUser } from "./models/user.js";

export const useAuth = () => {
  const [isAuth, setAuth] = useState(false);
  useEffect(() => {
    const $ = axios.create({
      withCredentials: true,
    });
    $.get("http://localhost:5000/auth/get_me")
      .then(function (response) {
        if (response.data) {
          setUser(response.data);
          setAuth(true);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return isAuth;
};