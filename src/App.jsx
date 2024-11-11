import React, { useState } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Login from "./pages/login";
import Contact from "./pages/contact/contact";
import BookPage from "./pages/book/BookPage";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import HomePage from "./components/Home/HomePage";

const Layout = () => {
  return (
    <div className="layout-app">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <div>404. Not Found</div>,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "book",
          element: <BookPage />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
