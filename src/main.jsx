import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AOS from "aos";
import "aos/dist/aos.css"; 
import { RouterProvider } from "react-router-dom"; //  FIXED
import { router } from "./router/router";
import AuthProvider from "./Context/Authcontex/AuthProvider";

AOS.init();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="max-w-7xl mx-auto">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  </StrictMode>
);
