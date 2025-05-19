import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUserThunk } from "../../store/slices/user/user.thunk";

import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userLoading } = useSelector((state) => state.userReducer);
  const [isInvalid, setisInvalid] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  async function submit(loginData) {
    const response = await dispatch(loginUserThunk(loginData));
    if (response?.payload?.success) {
      setisInvalid(false);
      navigate("/");
    } else {
      setisInvalid(true);
    }
  }
  return (
    <div className=" w-md flex flex-col justify-center items-center bg-base-300 p-6 rounded-2xl">
      <h1
        className="text-3xl font-semibold text-gray-6
      00 dark:text-gray-300 mb-2.5"
      >
        Login
      </h1>
      <form className="flex gap-2 flex-col w-full">
        {isInvalid && (
          <div className=" text-red-500 text-center">
            Enter valid Email or Password
          </div>
        )}
        <div>
          <label className="input  w-full ">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input
              type="email"
              placeholder="mail@site.com"
              required
              {...register("email", { required: true })}
            />
          </label>
        </div>

        <div className="relative">
          <label className="input  w-full ">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Password"
              autoComplete="current-password"
              title="Can not be empty"
              {...register("password", { required: true })}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute  right-2 top-1 cursor-pointer p-1"
            >
              {showPassword ? (
                <FaEye
                  size={20}
                  className="text-gray-500 dark:text-gray-400 "
                />
              ) : (
                <FaEyeSlash
                  size={20}
                  className="text-gray-400 dark:text-gray-500"
                />
              )}
            </button>
          </label>
        </div>

        <button
          onClick={handleSubmit(submit)}
          type="submit"
          className="btn  btn-primary"
        >
          {userLoading ? (
            <p>
              Loging in...{" "}
              <span className="loading loading-spinner loading-xs"></span>
            </p>
          ) : (
            "Login"
          )}
        </button>

        <p className="text-gray-700 dark:text-gray-300 text-center">
          Don't have an account? &nbsp;
          <Link
            to="/signup"
            className="text-primary font-semibold duration-75  hover:underline hover:text-indigo-400"
          >
            Sign up.
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
