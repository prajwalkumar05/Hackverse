import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";
import Friends from "./components/Friends";
import Profile from "./components/Profile";
import Events from "./components/EventsPage";
import Layout from "./components/Layout";
import Signup from "./components/Signup";
import EmergencyContacts from "./components/EmergencyContacts";
import SignIn from "./components/Signin";
import ChatApp from "./components/ChatApp";
import NGOPage from "./components/NGOPage";
import NavigationTabs from "./components/NavigationTabs";

const router = createBrowserRouter([
  { path: "/signin", element: <SignIn /> },
  { path: "/signup", element: <Signup /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "friends", element: <Friends /> },
      { path: "profile", element: <Profile /> },
      { path: "events", element: <Events /> },
      { path: "emergency", element: <EmergencyContacts /> },

      // Navigate Page as Parent
      {
        path: "navigate",
        element: <NavigationTabs />,
        children: [
          { path: "chat", element: <ChatApp /> },
          { path: "ngopage", element: <NGOPage /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
