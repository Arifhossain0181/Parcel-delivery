import { createBrowserRouter } from "react-router-dom"; // make sure it's react-router-dom
import Rootelayout from "../Layout/Rootelayout";
import Home from "../Pages/Home/Home/Home";
import Rider from "../Pages/Home/Rider/Rider";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Rootelayout,
    children: [
      {
        index: true, // default route when path is "/"
        Component: Home,
      },
      {
        path: "Rider", // now accessible via "/Rider"
        Component: Rider,
      },
    ],
  },
]);
