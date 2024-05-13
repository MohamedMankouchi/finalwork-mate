import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import { Login } from "../auth/Login";
import { Register } from "../auth/Register";
import { ResetPassword } from "../auth/ResetPassword";
import { Classrooms, getToken } from "../classrooms/Classrooms";
import { Room } from "../classrooms/Room";
import { Filelibrary } from "../filelibrary/Filelibrary";
import { Forum } from "../forum/Forum";
import { Question } from "../forum/Question";
import { Goal } from "../goals/Goal";
import { Goals } from "../goals/Goals";
import { GroupGoal } from "../goals/GroupGoal";
import { Map } from "../map/Map";
import { Messages } from "../messages/Messages";
import { Notifications } from "../notifications/Notifications";
import { Profile } from "../profile/Profile";
import { UserProfile } from "../profile/UserProfile";
export const router = createBrowserRouter([
  {
    children: [
      {
        element: <Forum />,
        path: "/forum",
      },

      {
        element: <Messages />,
        path: "/messages",
      },

      {
        element: <Room />,
        loader: getToken,
        path: "/classrooms/:id",
      },

      {
        element: <Profile />,
        path: "/profile",
      },

      {
        element: <UserProfile />,
        path: "/user/:id",
      },
      {
        element: <Notifications />,
        path: "/notifications",
      },

      {
        element: <ResetPassword />,
        path: "/reset-password",
      },

      {
        element: <Question />,
        path: "/forum/:questionId",
      },

      {
        element: <Map />,
        path: "/map",
      },
      {
        element: <Classrooms />,
        loader: getToken,
        path: "/classrooms",
      },

      {
        element: <Goals />,
        path: "/goals",
      },

      {
        element: <Goal />,
        path: "/goals/private/:goalId",
      },
      {
        element: <GroupGoal />,
        path: "/goals/group/:goalId",
      },
      {
        element: <Filelibrary />,
        path: "/filelibrary",
      },

      {
        element: <Login />,
        path: "/login",
      },

      {
        element: <Register />,
        path: "/register",
      },
    ],
    element: <App />,
    loader: getToken,
    path: "/",
  },
]);
