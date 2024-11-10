import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Index from "./create-trip/Index";
import Header from "./components/custom/Header";
import { Toaster } from "./components/ui/toaster";
import { GoogleOAuthProvider } from "@react-oauth/google";
import View from "./view-trip/[tripId]/View";
import MyTrip from "./My-Trips/MyTrip";
import Footer from "./components/custom/Footer";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   {
//     path: "/create-trip",
//     element: <Index />,
//   },
//   {
//     path: "/view-trip/:tripId",
//     element: <View />,
//   },
//   {
//     path: "/my-trips",
//     element: <MyTrip />,
//   },
// ]);

// createRoot(document.getElementById("root")).render(
//     <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
//       <Header />
//       <Toaster />
//       <RouterProvider router={router}></RouterProvider>
//     </GoogleOAuthProvider>
// );

// createRoot(document.getElementById("root")).render(
//   <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
//     <BrowserRouter>
//       <Header />
//       <Toaster />
//       <RouterProvider router={router} />
//     </BrowserRouter>
//   </GoogleOAuthProvider>
// );

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <BrowserRouter>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/create-trip" element={<Index />} />
        <Route path="/view-trip/:tripId" element={<View />} />
        <Route path="/my-trips" element={<MyTrip />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
