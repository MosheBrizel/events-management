//react
import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//atom
import {
  useDataRegistered,
  useToken,
  useUserInfo,
} from "./atoms/atomsFile.jsx";

import axios from "axios";
import axiosInstance from "../exios/axiosInstance.js";
import urlPage from "../url/urlPath.js";

import router from "./routers/router.jsx";

export default function App() {
  const [token, setToken] = useToken();
  const [info, setUserInfo] = useUserInfo();
  const [dataRegist, setdataRegist] = useDataRegistered();

  useEffect(() => {
    async function tokencheck() {
      const localStorageToken = localStorage.getItem("jsonwebtoken");
      const localStorageUser = localStorage.getItem("user");

      if (!localStorageToken || !localStorageUser) {
        setToken(false);
        return;
      } else {
        try {
          const sendData = { token: localStorageToken };
          const response = await axios.post(urlPage + "users/token", sendData, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.status === 200) {
            setdataRegist(response.data.data.map((item) => item.eventId))
            setToken(true);
            setUserInfo(JSON.parse(localStorageUser));
            try {
              axiosInstance.interceptors.request.use((config) => {
                config.headers["x-auth-token"] = localStorageToken;
                return config;
              });
            } catch (error) {
              console.error(error);
            }
          } else {
            setToken(false);
          }
        } catch (error) {
          setToken(false);
        }
      }
    }
    tokencheck();
  }, []);

  return (
    <div style={{ backgroundColor: "blue.main" }}>
      <RouterProvider router={createBrowserRouter(router)} />
    </div>
  );
}
