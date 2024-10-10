import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "./LayOut/Main";
import Home from "./Pages/Home";
import ErrorPage from "./Pages/ErrorPage";
import SignInPage from "./Pages/SignInPage";
import RegisterPage from "./Pages/RegisterPage";
import Politics from "./Pages/Politics";
import AllNews from "./Pages/AllNews";
import NewsApp from "./Pages/NewsApp";
import Latest from "./Pages/Latest";
import Entertainment from "./Pages/Entertainment";
import Contact from "./Pages/Contact";
import Business from "./Pages/Business";
import Feature from "./Pages/Feature";
import Opinion from "./Pages/Opinion";
import Sport from "./Pages/Sport";
import Gallery from "./Pages/Gallery";
import PrivateRoute from "./Routes/PrivateRoute";
import NewsDetail from "./Pages/NewsDetails";
//import Dashboard from "./LayOut/Dashboard";
import Profile from "./Pages/Dashboard/Profile";
import AllUsers from "./Pages/Dashboard/AllUsers";
import NewsForm from "./Pages/NewsForm";
import DashboardLayout from "./LayOut/DashboardLayout";
import ReporterRequestManagement from "./Pages/Dashboard/AdminPages/ReporterRequestManagement";
import BanSuspendUsers from "./Pages/Dashboard/AdminPages/BanSuspendUsers";
import ManageNewsArticles from "./Pages/Dashboard/AdminPages/ManageNewsArticles";
import SubmittedArticles from "./Pages/Dashboard/ReporterPages/SubmittedArticles";
import EditArticles from "./Pages/Dashboard/ReporterPages/EditArticles";
import DeleteArticles from "./Pages/Dashboard/ReporterPages/DeleteArticles";
import SavedArticles from "./Pages/Dashboard/NormalUser/SavedArticles";
import ManageBookmarks from "./Pages/Dashboard/NormalUser/ManageBookmarks";
import ManageNews from "./Pages/Dashboard/ManageNews";
import PopularDetails from "./Pages/PopularDetails";
import Technology from "./Pages/Technology";

const Root = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/category/:popularId",
        element: <PopularDetails></PopularDetails>,
        loader: ({ params }) =>
          fetch(`https://global-news-server-phi.vercel.app/news/${params.popularId}`),
      },
      {
        path: "/category/politics",
        element: <Politics />,
      },
      {
        path: "/login",
        element: <SignInPage></SignInPage>,
      },
      {
        path: "/register",
        element: <RegisterPage></RegisterPage>,
      },
      {
        path: "/all-news",
        element: <AllNews />,
      },
      {
        path: "/newsapp",
        element: <NewsApp />,
      },
      {
        path: "/latest",
        element: <Latest />,
      },
      {
        path: "/category/entertainment",
        element: <Entertainment />,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      // {
      //   path: "/gallery",
      //   element: <Gallery></Gallery>,
      // },
      {
        path: "/category/business",
        element: <Business />,
      },
      {
        path: "/category/technology",
        element: <Technology />,
      },
      {
        path: "/category/feature",
        element: <Feature />,
      },
      {
        path: "/category/opinion",
        element: <Opinion />,
      },
      {
        path: "/category/sports",
        element: <Sport />,
      },
      {
        path: "/category/gallery",
        element: <Gallery />,
      },
      {
        path: "/news/:id",
        element: (
          <PrivateRoute>
            <NewsDetail />
          </PrivateRoute>
        ),
      },
    ],
  },
  // DASHBOARD ROUTE START ----------------------------------------
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/dashboard/news-post",
        element: <NewsForm></NewsForm>,
      },

      //For Admin
      {
        path: "/dashboard/allUsers",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "/dashboard/reporter-request",
        element: <ReporterRequestManagement />,
      },
      {
        path: "/dashboard/ban-suspend-users",
        element: <BanSuspendUsers />,
      },
      {
        path: "/dashboard/manage-news-articles",
        element: <ManageNews />,
      },
      //Reporter Dashboard
      {
        path: "/dashboard/submitted-articles",
        element: <SubmittedArticles />,
      },
      {
        path: "/dashboard/edit-articles/:articleId",
        element: <EditArticles />,
      },

      //Normal User Dashboard
      {
        path: "/dashboard/saved-articles",
        element: <SavedArticles />,
      },
      {
        path: "/dashboard/manage-bookmarks",
        element: <ManageBookmarks />,
      },
    ],
  },
]);
export default Root;
