import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUserThunk } from "../../store/slices/user/user.thunk";
function SignUp() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userLoading } = useSelector((state) => state.userReducer);
  // console.log(loading);
  async function submit(signUpData) {
    const response = await dispatch(registerUserThunk(signUpData));
    if (response.payload.success) {
      navigate("/");
    }
    // dispatch(getOtherUsersThunk());
  }
  return (
    <div className="w-md flex flex-col justify-center items-center bg-base-300 p-6 rounded-2xl">
      <h1
        className="text-3xl font-semibold text-gray-6
      00 dark:text-gray-300 mb-2.5"
      >
        Sign up
      </h1>
      <form className="flex gap-2 flex-col w-full ">
        <div>
          <label className="input validator  w-full">
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
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </g>
            </svg>
            <input
              type="input"
              required
              placeholder="Username"
              pattern="[A-Za-z][A-Za-z0-9\-]*"
              minLength="3"
              maxLength="30"
              title="Only letters, numbers or dash"
              {...register("username", { required: true })}
            />
          </label>
          <p className="validator-hint hidden">
            Must be 3 to 30 characters
            <br />
            containing only letters, numbers or dash
          </p>
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
          <p className="validator-hint hidden">Enter valid email address</p>
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

        <div className="flex gap-5">
          <label className="">
            <input
              type="radio"
              name="gender"
              value="male"
              className="radio radio-primary mr-1"
              defaultChecked
              {...register("gender", { required: true })}
            />
            male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              className="radio radio-primary mr-1"
              {...register("gender", { required: true })}
            />
            female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="other"
              className="radio radio-primary mr-1"
              {...register("gender", { required: true })}
            />
            other
          </label>
        </div>
        <button
          onClick={handleSubmit(submit)}
          type="submit"
          className="btn  btn-primary"
        >
          {userLoading ? (
            <p>
              {" "}
              Signing up...{" "}
              <span className="loading loading-spinner loading-xs"></span>
            </p>
          ) : (
            "Sign up"
          )}
        </button>
        <p className="text-gray-700 dark:text-gray-300 text-center">
          Already have an account? &nbsp;
          <Link
            to="/login"
            className="text-primary font-semibold duration-75  hover:underline hover:text-indigo-400"
          >
            Login.
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
