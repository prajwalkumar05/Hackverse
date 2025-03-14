import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";
import Friends from "./components/Friends";
import Profile from "./components/Profile";
import Events from "./components/EventsPage";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Signup from "./components/Signup";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  {
    path: "/",
    element: <Layout />, // Wraps all pages with TopNavbar & BottomNavbar
    children: [
      { index: true, element: <HomePage /> },
      { path: "friends", element: <Friends /> },
      { path: "profile", element: <Profile /> },
      { path: "events", element: <Events /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

