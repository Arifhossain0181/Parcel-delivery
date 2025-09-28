import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
import { RouterProvider } from "react-router/dom";
import { router } from "./router/router";


AOS.init();
createRoot(document.getElementById("root")).render(
  <StrictMode>
   <div className="max-w-7xl mx-auto">
     <RouterProvider router={router} />,
   </div>
  </StrictMode>
);
