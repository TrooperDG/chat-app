import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

// icons --------------------------
import { MdOutlinePhotoCamera } from "react-icons/md";
import { EditableInput } from "../../common";
import {
  updateUserAvatarThunk,
  updateUserThunk,
} from "../../../store/slices/user/user.thunk";
import Logout from "../../Auth/Logout";

function Account() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userReducer);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // for mobile view ---------------------------------------------------------
  const { isMobile } = useSelector(
    (state) => state.settingsReducer?.UISettings
  );

  const {
    register,
    handleSubmit,
    formState: { dirtyFields },
    getValues,
    resetField,
  } = useForm({
    defaultValues: {
      username: userData?.username || "kigo",
      avatar: userData?.avatar || "",
      phone: userData?.phone || "+91 9967345472",
      about: userData?.about || "Hey what's up!",
      email: userData?.email || "",
    },
  });

  const handleSave = async (data) => {
    setLoading(true);

    let avatarFormData = null; // for avatar upload
    if (data.images.length > 0) {
      avatarFormData = new FormData();
      avatarFormData.append("avatar", data.images[0]);
      delete data.images;
    }

    //--------------------------------

    const currentValues = getValues(); // get all current values
    const changedData = {};
    // Loop through dirtyFields to pick only changed values
    for (const field in dirtyFields) {
      changedData[field] = currentValues[field];
      resetField(field, { defaultValue: currentValues[field] });
    }

    // sending to backend
    if (Object.keys(changedData)?.length !== 0) {
      await dispatch(
        updateUserThunk({
          data: changedData,
        })
      );
      if (avatarFormData)
        await dispatch(updateUserAvatarThunk({ avatarFormData }));
    }

    setLoading(false);
  };

  const handleAvatarPreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="px-2.5 py-3 h-full  overflow-y-scroll">
      <h1 className="text-xl font-semibold">Account</h1>
      {userData && (
        <form
          onSubmit={handleSubmit(handleSave)}
          className="mt-5 p-2 relative "
        >
          {Object.keys(dirtyFields).length > 0 || loading ? (
            <button
              type="submit"
              className="btn btn-success btn-sm absolute right-0 "
            >
              {loading ? (
                <span>
                  Saving
                  <span className="ml-2 loading loading-spinner loading-xs text-white"></span>
                </span>
              ) : (
                "Save"
              )}
            </button>
          ) : null}
          <div
            id="user-avatar"
            className={`relative  ${isMobile ? "w-full" : "inline-block"} `}
          >
            <img
              className="w-20 h-20 border-2 border-primary rounded-full"
              src={imagePreview || userData?.avatar}
              alt="user-avatar"
            />
            <label
              className={`group  absolute ${
                isMobile
                  ? "right-0 top-4 bottom-4  flex items-center"
                  : "inset-0"
              }  rounded-full flex justify-center items-center hover:bg-black/60 transition-opacity duration-100 `}
            >
              <MdOutlinePhotoCamera
                size={20}
                className="opacity-50 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              />
              <input
                type="file"
                accept="image/*"
                {...register("images", {
                  onChange: (e) => handleAvatarPreview(e),
                })}
                className="hidden"
              />
            </label>
          </div>

          <div id="user-details" className="mt-1 ">
            <EditableInput
              autoSize={true}
              className="w-full  outline-0 border-b-2 text-xl font-semibold "
              parentClass="mb-6"
              {...register("username", { required: true })}
            />
            <EditableInput
              isDisabled={true} // in future email will be editable
              label="email"
              className="w-full  outline-0 border-b-2 "
              parentClass="mb-2.5"
              {...register("email", { required: true })}
            />

            <EditableInput
              label="phone"
              className="w-full  outline-0 border-b-2 "
              parentClass="mb-2.5"
              {...register("phone", { required: true })}
            />
            <EditableInput
              label="about"
              autoSize={true}
              className="w-full  outline-0 border-b-2 "
              parentClass="mb-3"
              {...register("about", { required: true })}
            />
          </div>
        </form>
      )}
      <hr className="text-gray-600" />
      <div className="p-2">
        <Logout />
      </div>
    </div>
  );
}

export default Account;
