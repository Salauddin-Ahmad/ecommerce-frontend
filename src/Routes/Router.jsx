import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
    },
]);


export default router