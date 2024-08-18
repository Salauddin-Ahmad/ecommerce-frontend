import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Root = () => {
    return (
        <div>
        <div className="mb-4">
        <Navbar></Navbar>
        </div>
         <Outlet></Outlet>
         <Footer></Footer>
        </div>
    );
};

export default Root;