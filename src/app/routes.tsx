import { createBrowserRouter } from "react-router";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import DestinationDetail from "./pages/DestinationDetail";
import TripPlanner from "./pages/TripPlanner";
import Bookings from "./pages/Bookings";
import TravelGuides from "./pages/TravelGuides";
import MapServices from "./pages/MapServices";
import Faq from "./pages/Faq";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminHeroSettings from "./pages/AdminHeroSettings";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "destinations", Component: Destinations },
      { path: "destinations/:id", Component: DestinationDetail },
      { path: "trip-planner", Component: TripPlanner },
      { path: "bookings", Component: Bookings },
      { path: "guides", Component: TravelGuides },
      { path: "map", Component: MapServices },
      { path: "faq", Component: Faq },
      { path: "dashboard", Component: Dashboard },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "*", Component: NotFound },
    ],
  },
  {
    path: "/admin-login",
    Component: AdminLogin,
  },
  {
    path: "/admin",
    Component: AdminDashboard,
  },
  {
    path: "/admin/hero-settings",
    Component: AdminHeroSettings,
  },
]);
