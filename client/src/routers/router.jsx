import AppLayout from "../components/AppLayout";
import DashboardCards from "../components/Dashboard/DashboardCards";
import DashbordRegisteredEvents from "../components/Dashboard/DashbordRegisteredEvents";
import NotFound from "../components/NotFound";
import FormCreateEvent from "../components/createEvent/FormCreateEvent";
import Forgot from "../components/forgetPassword/forgot";
import { GetCode } from "../components/login/getCodeByEmail";
import SignIn from "../components/login/signin";
import SignUp from "../components/login/signup";

const router = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DashboardCards />,
      },
      {
        path: "/SignIn",
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
        path: "/registeredEvents",
        element: <DashbordRegisteredEvents />,
      },
      {
        path: "/CreateEvent",
        element: <FormCreateEvent />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

export default router;
