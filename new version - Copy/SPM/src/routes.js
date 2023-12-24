import DisplayCodes from "components/code/DisplayCodes";
import Dashboard from "views/Dashboard.js";
import Metrics from "views/Metrics";
import UserProfile from "views/UserProfile.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: <Dashboard />,
    layout: "/admin",
  },

  {
    path: "/user-profile",
    name: "User Profile",
    icon: "tim-icons icon-single-02",
    component: <UserProfile />,
    layout: "/admin",
  },

  {
    path: "/savedcode",
    name: "Saved Code",
    icon: "tim-icons icon-align-center",
    component: <DisplayCodes/>,
    layout: "/admin",
  },
  {
    path: "/Metrics/",
    name: "Metrics",
    icon: "tim-icons icon-align-center",
    component: <Metrics/>,
    layout: "/admin",
  },
  
];
export default routes;
