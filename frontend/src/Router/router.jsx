// React Router DOM থেকে createBrowserRouter import করা
import {createBrowserRouter} from "react-router-dom";
// Layout এবং সব Pages import করা
import Root from "../Layout/Root";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Rooms from "../Pages/Rooms/Rooms";
import MyBookings from './../Pages/My Bookings/MyBookings';
import Login from "../Pages/Login/Login";
import Register from "../Pages/Login/Register";
import RoomDetails from "../Pages/Rooms/RoomDetails";
import PrivetRoute from "./privateRoute"; // Protected routes এর জন্য
import Update from "../Pages/Update/Update";
import Review from "../Pages/Review/Review";
import Dashboard from "../Dashboard/Dashboard";

// Application এর সব routes define করা
const router = createBrowserRouter([
    {
      path: "/", // Root path
      element:<Root></Root>, // Main layout component
      errorElement: <ErrorPage></ErrorPage>, // Error page যদি কোনো route না পাওয়া যায়
      children: [ // Nested routes
        {
            path: "/", // Home page route
            element:<Home></Home>
        },
        {
            path: "/rooms", // All rooms page
            element:<Rooms></Rooms>,
            loader :()=> fetch('http://localhost:5000/rooms') // Page load হওয়ার আগে rooms data fetch করা
        },
        {
            path: "/rooms/:id", // Individual room details page (dynamic route)
            element:<RoomDetails></RoomDetails>,
            loader :({params})=> fetch(`http://localhost:5000/rooms/${params.id}`) // Specific room data fetch করা
        },
        {
            path: "/myBookings", // User এর bookings page (protected)
            element:<PrivetRoute><MyBookings></MyBookings></PrivetRoute> // Login required
        },
        {
            path: "/update/:id", // Booking update page (protected)
            element:<PrivetRoute><Update></Update></PrivetRoute>, // Login required
           
        },
        {
            path: "/review/:id", // Review write করার page (protected)
            element:<PrivetRoute><Review></Review></PrivetRoute>, // Login required
           
        },
        {
            path: "/login", // Login page (public)
            element:<Login></Login>
        },
        {
            path: "/register", // Registration page (public)
            element:<Register></Register>
        },
        {
            path: "/dashboard", // Admin dashboard (protected)
            element:<PrivetRoute><Dashboard></Dashboard></PrivetRoute> // Login required
        }
      ]
    },
  ]);

// Router export করা যাতে main.jsx এ use করা যায়
export default router;