import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function Login() {
  const { register, handleSubmit } = useForm();

  function submit(data) {
    console.log(data);
  }
  return (
    <div className="w-full flex flex-col justify-center items-center ">
      <h1
        className="text-2xl font-semibold text-gray-6
      00 dark:text-gray-300"
      >
        Login
      </h1>
      <form className="flex gap-2 flex-col w-md px-10 py-2 " action="">
        <div>
          <label className="input validator w-full">
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
          <div className="validator-hint hidden">Enter valid email address</div>
        </div>

        <div>
          <label className="input validator w-full">
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
              type="password"
              required
              placeholder="Password"
              minLength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              autoComplete="current-password"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              {...register("password", { required: true })}
            />
          </label>
          <p className="validator-hint hidden">
            Must be more than 8 characters, including
            <br />
            At least one number
            <br />
            At least one lowercase letter
            <br />
            At least one uppercase letter
          </p>
        </div>
        <button
          onClick={handleSubmit(submit)}
          type="submit"
          className="btn  btn-primary"
        >
          Login
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
