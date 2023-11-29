//react
import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//atom
import { useAtom } from "jotai";
import { tokenAtom, userInfo } from "./atoms/atomsFile.jsx";

import axios from "axios";
import axiosInstance from "../exios/axiosInstance.js";
import urlPage from "../url/urlPath.js";

//pages
import AppLayout from "./components/AppLayout.jsx";
import NotFound from "./components/NotFound.jsx";
import SignUp from "./components/login/signup.jsx";
import SignIn from "./components/login/signin.jsx";
import { GetCode } from "./components/login/getCodeByEmail.jsx";
import WheelWaitingLogo from "./components/Features/wheelWaitingLogo.jsx";
import Forgot from "./components/forgetPassword/forgot.jsx";
import ErrorConection from "./components/Features/errorConection.jsx";


//out routers

let RouterSpecs;
let RouterPro;
let RouterMessage;



export default function App() {
  const [token, setToken] = useAtom(tokenAtom);
  const [info, setUserInfo] = useAtom(userInfo);

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

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <p>Dashboard</p>,
        },
        {
          path: "Specs",
          children: RouterSpecs,
        },
        {
          path: "Board",
          element: RouterPro ,
        },
        {
          path: "AddUser",
          element: <p>Add User</p>,
        },
        {
          path: "Messages",
          element: RouterMessage,
        },
        {
          path: "Settings",
          element: <p>Settings</p>,
        },
        {
          path: "Info",
          element: <p>Info</p>,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  const routerLogin = createBrowserRouter([
    {
      path: "/",
      element: <SignIn />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/getcode",
      element: <GetCode />,
    },
    {
      path: "/forgot",
      element: <Forgot />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  const routerDefult = createBrowserRouter([
    {
      path: "*",
      element: <WheelWaitingLogo open={true} />,
    },
  ]);

  return (
    <div style={{ backgroundColor: "blue.main" }}>
      <RouterProvider
        router={token ? router : token == false ? routerLogin : routerDefult}
      />
    </div>
  );
}
