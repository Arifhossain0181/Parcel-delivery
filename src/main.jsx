import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AOS from "aos";
import "aos/dist/aos.css"; 
import { RouterProvider } from "react-router-dom"; //  FIXED
import { router } from "./router/router";
import AuthProvider from "./Context/Authcontex/AuthProvider";
import {
  QueryClient,
  QueryClientProvider,

} from '@tanstack/react-query'
AOS.init();
const queryClient = new QueryClient()
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="max-w-7xl mx-auto">
     <QueryClientProvider client={queryClient}>
       <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      </QueryClientProvider>
    </div>
  </StrictMode>
);
