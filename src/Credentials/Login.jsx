import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
// import toast from "react-hot-toast";
// import axios from "axios";
// import { Helmet } from "react-helmet-async";

import Swal from "sweetalert2";
import useAxiosPublic from "../Hooks/UseAxiosPublic";
import { AuthContext } from "../Providers/Authprovider";
import { useForm } from "react-hook-form";

const Login = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signInWithGoogle, user, signInWithTwitter } =
    useContext(AuthContext);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  const from = location.state || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //   // Google Signin
  const handleGoogleSignIn = async () => {
    try {
      // 1. google sign in from firebase
      const result = await signInWithGoogle();
      console.log(result.user.email);

      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
      };
      const res = axiosPublic.post("/users", userInfo);
      console.log(res);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Successful!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Oops!",
        text: "Login failed: " + err.message,
        icon: "error",
      });
    }
  };
  const handleTwitterSignIn = async () => {
    try {
      // 1. google sign in from firebase
      const result = await signInWithTwitter();

      const userInfo = {
        email: result?.user?.email,
        name: result?.user?.displayName,
      };
      const res = axiosPublic.post("/users", userInfo);
      console.log(res);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Successful!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Oops!",
        text: "Login failed: " + err.message,
        icon: "error",
      });
    }
  };

  const handleSignIn = async (data) => {
    try {
      const { email, password } = data;
      const result = await signIn(email, password);
      console.log(result);
      navigate(from, { replace: true });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Successful!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      Swal.fire({
        position: "top-end",
        title: "Oops!",
        text: "Login failed: " + err.message,
        icon: "error",
      });
    }
  };

  return (
    <>
      {/* <Helmet>
        <title> UnityPlates | Login </title>
        <meta name="ManageFoods" content="Manage All the Foods." />
      </Helmet> */}

      <div className="flex justify-center items-center min-h-[calc(100vh-306px)] my-12">
        <div className="flex w-full max-w-base mx-auto overflow-hidden bg-white rounded-lg shadow-xl  lg:max-w-4xl border ">
          <div
            className="hidden bg-cover md:block lg:w-full"
            style={{
              backgroundImage: `url('https://i.ibb.co/mhs3tW9/Screenshot-2024-06-01-134031-png-1717228062499.png')`,
            }}
          ></div>

          <div className="w-full px-6 py-8 md:px-8 lg:w-1/2 bg-blue-300">
            <p className="mt-3 text-xl text-center text-gray-600 ">
              Sign in to your Digitech account
            </p>

            <div
              onClick={handleGoogleSignIn}
              className="flex cursor-pointer items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border border-blue-500 rounded-lg   hover:bg-yellow-300 "
            >
              <div className="px-4 py-2">
                <svg className="w-6 h-6" viewBox="0 0 40 40">
                  <path
                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                    fill="#FFC107"
                  />
                  <path
                    d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                    fill="#FF3D00"
                  />
                  <path
                    d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                    fill="#4CAF50"
                  />
                  <path
                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                    fill="#1976D2"
                  />
                </svg>
              </div>

              <span className="w-5/6 px-4 py-3 font-bold text-center">
                Sign in with Google
              </span>
            </div>

            {/* twitter login */}
            <div
              onClick={handleTwitterSignIn}
              className="flex cursor-pointer items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border border-blue-500 rounded-lg   hover:bg-yellow-300 "
            >
              <div className="px-4 py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="30"
                  height="30"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#03a9f4"
                    d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M36,17.12c-0.882,0.391-1.999,0.758-3,0.88c1.018-0.604,2.633-1.862,3-3	c-0.951,0.559-2.671,1.156-3.793,1.372C29.789,13.808,24,14.755,24,20v2c-4,0-7.9-3.047-10.327-6c-2.254,3.807,1.858,6.689,2.327,7	c-0.807-0.025-2.335-0.641-3-1c0,0.016,0,0.036,0,0.057c0,2.367,1.661,3.974,3.912,4.422C16.501,26.592,16,27,14.072,27	c0.626,1.935,3.773,2.958,5.928,3c-2.617,2.029-7.126,2.079-8,1.977c8.989,5.289,22.669,0.513,21.982-12.477	C34.95,18.818,35.342,18.104,36,17.12"
                  ></path>
                </svg>
              </div>

              <span className="w-5/6 px-4 py-3 font-bold text-center">
                Sign in with Twitter
              </span>
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b  lg:w-1/4"></span>

              <div className="text-xs text-center text-gray-500 uppercase  hover:underline">
                or login with email
              </div>

              <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
            </div>

            <form onSubmit={handleSubmit(handleSignIn)}>
              <div className="mt-4">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 "
                  htmlFor="LoggingEmailAddress"
                >
                  Email Address
                </label>
                <input
                  id="LoggingEmailAddress"
                  autoComplete="email"
                  name="email"
                  {...register("email", { required: true })}
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                  type="email"
                />
                {errors.email && (
                  <span className="text-zinc-100">Email is required</span>
                )}
              </div>

              <div className="mt-4">
                <div className="flex justify-between">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-600 "
                    htmlFor="loggingPassword"
                  >
                    Password
                  </label>
                </div>

                <input
                  id="loggingPassword"
                  autoComplete="current-password"
                  name="password"
                  {...register("password", { required: true })}
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                  type="password"
                />
                {errors.password && (
                  <span className="text-zinc-100">Password is required</span>
                )}
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                >
                  Sign In
                </button>
              </div>
            </form>

            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b  md:w-1/4"></span>

              <Link
                to="/signUp"
                className="text-xs text-gray-500 uppercase  hover:underline"
              >
                or sign up
              </Link>

              <span className="w-1/5 border-b  md:w-1/4"></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
