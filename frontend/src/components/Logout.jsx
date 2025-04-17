import React from "react";
import { useDispatch } from "react-redux";
import { logoutUserThunk } from "../store/slices/user/user.thunk";

function Logout() {
  const dispatch = useDispatch();
  return (
    <div>
      <button
        onClick={() => dispatch(logoutUserThunk())}
        className="btn btn-soft btn-primary"
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
