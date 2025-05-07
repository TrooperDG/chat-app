import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUserThunk } from "../../store/slices/user/user.thunk";

function Logout() {
  const dispatch = useDispatch();
  const [showPopUp, setShowPopUp] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    await dispatch(logoutUserThunk());
    setShowPopUp(false);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLogout) {
      handleLogout();
    }
  }, [isLogout]);

  return (
    <div>
      <button
        onClick={() => setShowPopUp(true)}
        className="btn btn-sm btn-soft btn-error"
      >
        Logout
      </button>

      {showPopUp && (
        <div
          id="popup-container"
          className="bg-primary-content/30 fixed inset-0 flex justify-center items-center
         "
        >
          {isLoading ? (
            <div>Loading....</div>
          ) : (
            <div className="bg-base-300 p-3 rounded-md   ">
              <h2 className="text-center mb-3 text-lg font-semibold">
                Are you sure ?
              </h2>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    setIsLogout(true);
                  }}
                  className="btn btn-soft btn-sm btn-success"
                >
                  Yes
                </button>
                <button
                  onClick={() => {
                    setIsLogout(false);
                    setShowPopUp(false);
                  }}
                  className="btn btn-soft btn-sm btn-error"
                >
                  No
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Logout;
