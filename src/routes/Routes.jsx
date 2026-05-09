import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Homepage from "../pages/Homepage";
import Stats from "../pages/Stats";
import Timeline from "../pages/Timeline";
import ErrorPage from "../pages/ErrorPage";
import FriendDetails from "../components/FriendDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "/timeline",
        element: <Timeline />,
      },
      {
        path: "/stats",
        element: <Stats />,
      },
      {
        path: "/friends/:id",
        element: <FriendDetails />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);
