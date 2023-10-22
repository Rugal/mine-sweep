import { createBrowserRouter, } from "react-router-dom";
import HomePage from "@page/HomePage";
import Game from "@component/Game";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: "",
        element: <Game />
      },
    ],
  },
]);
