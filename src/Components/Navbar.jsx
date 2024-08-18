import { Link, NavLink } from "react-router-dom";
import useAuth from "../Hooks/UseAuth";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const navLinks = (
        <>
            <ul>
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? "text-blue-500 rounded-lg border[#58d4db77]  font-bold  "
                                : "font-bold "
                        }
                    >
                        <span className="p-2 text-lg font-bold">Home</span>
                    </NavLink>
                </li>
            </ul>
        </>
    );

    return (
        <div>
            <div className="navbar bg-base-300">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {navLinks}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl"><Link to={'/'}>
                    Digitech </Link> </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className="flex-none">
                        {!user && (
                            <div className="hidden lg:block text-lg font-medium">
                               <NavLink to='login'>
                               Join Digitech
                               </NavLink>
                            </div>
                        )}

                        {user ? (
                            <div className="dropdown dropdown-end z-50">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="btn btn-ghost btn-circle avatar"
                                >
                                    <div title={user?.displayName} className="w-10 rounded-full">
                                        <img
                                            referrerPolicy="no-referrer"
                                            alt="User Profile Photo"
                                            src={user?.photoURL}
                                        />
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                                >
                                    <li className="mt-2">
                                        <button
                                            onClick={logOut}
                                            className="bg-gray-200 block text-center"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
