import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root";
import Login from "../Credentials/Login";
import SignUp from "../Credentials/SignUp";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                path: "login",
                element: <Login></Login>,
            },
            {
                path: "signup",
                element: <SignUp></SignUp>,
              },
        ]
    },
]);


export default router