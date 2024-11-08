import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./create-trip/Index";
import Header from "./components/custom/Header";
import { Toaster } from "./components/ui/toaster";
import { GoogleOAuthProvider } from "@react-oauth/google";
import View from "./view-trip/[tripId]/View";
import MyTrip from "./My-Trips/MyTrip";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create-trip",
    element: <Index />,
  },
  {
    path: "/view-trip/:tripId",
    element: <View />,
  },
  {
    path: "/my-trips",
    element: <MyTrip />,
  },
]);

createRoot(document.getElementById("root")).render(
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Header />
      <Toaster />
      <RouterProvider router={router}></RouterProvider>
    </GoogleOAuthProvider>
);
