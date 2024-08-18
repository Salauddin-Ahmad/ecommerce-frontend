import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root";
import Login from "../Credentials/Login";
import SignUp from "../Credentials/SignUp";
import DataPage from "../Components/DataPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                path: "/",
                element: <DataPage></DataPage>,
            },
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