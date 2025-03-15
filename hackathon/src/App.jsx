import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";
import Friends from "./components/Friends";
import Profile from "./components/Profile";
import Events from "./components/EventsPage";
import Layout from "./components/Layout";
// import Login from "./components/SignIn";
import Signup from "./components/Signup";
import EmergencyContacts from "./components/EmergencyContacts";
// import SignInSignUp from "./components/SignInSignUp";
import SignIn from "./components/Signin";
import ChatApp from "./components/ChatApp";
import NGOPage from "./components/NGOPage";

const router = createBrowserRouter([
  { path: "/signin", element: <SignIn/> },
  { path: "/signup", element: <Signup /> },
  {
    path: "/",
    element: <Layout />, // Wraps all pages with TopNavbar & BottomNavbar
    children: [
      { index: true, element: <HomePage /> },
      { path: "friends", element: <Friends /> },
      { path: "profile", element: <Profile /> },
      { path: "events", element: <Events /> },
      {path:"emergency",element:<EmergencyContacts/>},
      {path:"Chat",element:<ChatApp/>},
      {path:"NGOpage",element:<NGOPage/>}


    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

