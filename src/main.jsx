import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AOS from "aos";
import "aos/dist/aos.css"; 
import { RouterProvider } from "react-router-dom"; //  FIXED
import { router } from "./router/router";
import AuthProvider from "./Context/Authcontex/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

AOS.init();
// Create a QueryClient with explicit defaultOptions and a tiny compatibility shim.
// Some older code or third-party packages may call legacy methods like
// `client.defaultMutationOptions()` or `client.defaultQueryOptions()` — those
// don't exist on newer QueryClient instances and can throw "is not a function".
// Adding these no-op functions prevents that runtime error while keeping
// QueryClient's normal behavior.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // sensible defaults for this app; adjust if you need polling/retries
      retry: false,
      refetchOnWindowFocus: false,
    },
    mutations: {},
  },
});

// Compatibility shim for legacy callers (no-ops that return empty options)
if (typeof queryClient.defaultMutationOptions !== "function") {
  // eslint-disable-next-line func-names
  queryClient.defaultMutationOptions = function () {
    return {};
  };
}
if (typeof queryClient.defaultQueryOptions !== "function") {
  // eslint-disable-next-line func-names
  queryClient.defaultQueryOptions = function () {
    return {};
  };
}
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
