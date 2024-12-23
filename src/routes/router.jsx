import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import PrivateRoute from "./PrivateRoute";
import MyTutorials from "../pages/MyTutorials";
import AddTutorials from "../pages/AddTutorials";
import MyBookedTutors from "../pages/MyBookedTutors";
import UpdateTutorial from "../pages/UpdateTutorial";
import FindTutors from "../pages/FindTutors";
import TutorDetails from "../pages/TutorDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: "404 not found",
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },

      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/find_tutors",
        element: <FindTutors></FindTutors>,
      },
      {
        path: "/my_tutorials",
        element: (
          <PrivateRoute>
            <MyTutorials></MyTutorials>
          </PrivateRoute>
        ),
      },
      {
        path: "/tutor_details/:id",
        element: (
          <PrivateRoute>
            <TutorDetails></TutorDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/add_tutorials",
        element: (
          <PrivateRoute>
            <AddTutorials></AddTutorials>
          </PrivateRoute>
        ),
      },
      {
        path: "/update_tutorials/:id",
        element: (
          <PrivateRoute>
            <UpdateTutorial></UpdateTutorial>
          </PrivateRoute>
        ),
      },
      {
        path: "/my_booked_tutors",
        element: (
          <PrivateRoute>
            <MyBookedTutors></MyBookedTutors>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
