import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import Layout from "./Layout/Layout";

import HomePage from "./Pages/HomePage";

import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";

import GenerateQuizPage from "./Pages/QuizPages/GenerateQuizPage";
import SubjectPage from "./Pages/QuizPages/SubjectPage";

import { AuthProvider } from "./Context/AuthContext";
import QuizAttemptPage from "./Pages/QuizPages/QuizAttemptPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },

      {
        path: "user/login",
        element: <Login />,
      },

      {
        path: "user/signup",
        element: <Signup />,
      },

      {
        path: "all-quizzes",
        element: <GenerateQuizPage />,
      },

      {
        path: "subjects/:slug",
        element: <SubjectPage />,
      },
      {
        path: "subjects/attempt/:quizId",
        element: <QuizAttemptPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
