import React, { useEffect, useState } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Login from "./pages/login/login";
import Contact from "./pages/contact/contact";
import BookPage from "./pages/book/BookPage";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import HomePage from "./components/Home/HomePage";
import Register from "./pages/register/register";
import { fetchAccount } from "./services/authApi";
import { useDispatch, useSelector } from "react-redux";
import { doGetAccount } from "./redux/account/account.slice";
import LoadingPage from "./components/loading/Loading";
import NotFound from "./components/loading/NotFound";
import AdminPage from "./pages/admin/AdminPage";
import ProtectedRoute from "./components/protect route/ProtectedRoute";
import LayoutAdmin from "./components/admin/layoutAdmin";
import BookPageAdmin from "./pages/admin/BookPageAdmin";
import UserPageAdmin from "./pages/admin/UserPageAdmin";
import "./styles/reset.scss";

const Layout = () => {
  return (
    <div className="layout-app">
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};

// const LayoutAdmin = () => {
//   const isAdminRoute = window.location.pathname.startsWith("/admin");
//   const user = useSelector((state) => state.account.user);
//   const role = user.role;

//   return (
//     <div className="layout-app">
//       {isAdminRoute && role === "ADMIN" && <Header />}
//       <Outlet />
//       {isAdminRoute && role === "ADMIN" && <Footer />}
//     </div>
//   );
// };

export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.account.isLoading);

  const getAccount = async () => {
    if (
      window.location.pathname === "/login" ||
      window.location.pathname === "/register"
    )
      return;

    const res = await fetchAccount();
    if (res && res.data) {
      dispatch(doGetAccount(res.data));
    }
  };

  useEffect(() => {
    getAccount();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,
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
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/admin",
      element: <LayoutAdmin />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "user",
          element: <UserPageAdmin />,
        },
        {
          path: "book",
          element: <BookPageAdmin />,
        },
      ],
    },
  ]);

  return (
    <>
      {isLoading === false ||
      window.location.pathname === "/login" ||
      window.location.pathname === "/" ||
      window.location.pathname === "/register" ? (
        <RouterProvider router={router} />
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
