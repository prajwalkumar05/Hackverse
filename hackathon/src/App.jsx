import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";
import Friends from "./components/Friends";
import Profile from "./components/Profile";
import Events from "./components/EventsPage";
import Layout from "./components/Layout"; // Layout wraps TopNavbar & BottomNavbar

const router = createBrowserRouter([
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
