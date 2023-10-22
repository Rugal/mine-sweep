import { createBrowserRouter, } from "react-router-dom";
import HomePage from "@page/HomePage";
import GamePage from "@page/GamePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: "",
        element: <GamePage />
      },
    ],
  },
]);
