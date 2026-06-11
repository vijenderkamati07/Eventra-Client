import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import Layout from "./Layout/Layout";

import HomePage from "./Pages/Home/HomePage";

import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";

import GenerateQuizPage from "./Pages/QuizPages/GenerateQuizPage";
import SubjectPage from "./Pages/QuizPages/SubjectPage";

import { AuthProvider } from "./Context/AuthContext";
import QuizAttemptPage from "./Pages/QuizPages/QuizAttemptPage";
import QuizResultPage from "./Pages/QuizPages/QuizResultPage";
import HistoryPage from "./Pages/History/HistoryPage";

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
      {
        path: "/results/:quizId",
        element: <QuizResultPage />,
      },
      {
        path: "/submittion/history",
        element: <HistoryPage />,
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
