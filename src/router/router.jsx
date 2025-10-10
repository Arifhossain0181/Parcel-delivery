import { createBrowserRouter } from "react-router-dom"; // make sure it's react-router-dom
import Rootelayout from "../Layout/Rootelayout";
import Home from "../Pages/Home/Home/Home";
import Rider from "../Pages/Home/Rider/Rider";
import About from "../Pages/Home/About/About";
import AuthLayout from "../Layout/Authlayout/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import REgister from "../Pages/Authentication/Register/REgister";
import Coverage from "../Pages/Coverage/Coverage";
import Privateroutes from "../../src/Routes/Privateroutes";
import  SendParcel from "../Pages/SeendParcel/SendParcel";
import Dashboardlayout from "../Layout/Dashboardlayout";
import Payment from "../Pages/Dashboard/MyParcel/Payment/Payment";
import  TrackParcel from '../Pages/Dashboard/TrackParcel/TrackParcel'

import MyParcel from "../Pages/Dashboard/MyParcel/MyParcel";
import Paymenthistory from '../Pages/Dashboard/MyParcel/Payment/Paymenthistory'
import Pendingriders from '../Pages/Dashboard/Pendingriders/Pendingriders'
import  ActiveRiders  from '../Pages/Dashboard/Activeriders/ActiveRiders'
import MakeAdmin from '../Pages/Dashboard/MakeAdmin/Makeadmin'
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
        element: <Privateroutes><Rider></Rider></Privateroutes>,
         loader: () => fetch("../../public/servicesenter.json"),
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "register",
        Component: REgister,
      },
      {
        path: "login",
        Component: Login,
      },

      {
        path: "Coverage",
        Component: Coverage,
        loader: () => fetch("../../public/servicesenter.json"),
      },
      {
        path: "sendPercel",
        element: <Privateroutes> < SendParcel></ SendParcel></Privateroutes>,
      },
     
    ],
  },
  {
    path: '/dashboard',
    element: <Privateroutes><Dashboardlayout></Dashboardlayout></Privateroutes>,
    children: [
      {
        path:'MyParcel',
        Component: MyParcel,
      },
      {
        path:'Payment/:id',
        Component: Payment,
      },
      {
        path:'Paymenthistory',
        Component:Paymenthistory

      },{
        path:'Track',
        Component: TrackParcel
      },
      {
        path:'PendingRiders',
        Component:Pendingriders,
      },
      {
        path:'ActiveRiders',
        Component: ActiveRiders ,
      },
      {
        path:'makeadmin',
        Component:MakeAdmin
      }

    ]
  }
]);
