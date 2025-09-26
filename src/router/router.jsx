import { createBrowserRouter } from "react-router";
import Rootelayout from "../Layout/Rootelayout";
import Home from "../Pages/Home/Home/Home";
 export const router = createBrowserRouter([
  {
    path: "/",
    Component:Rootelayout,
    children:[
      {
        index:true,
        Component:Home
       },]
  },
]);
