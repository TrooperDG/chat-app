import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

// icons --------------------------
import { MdOutlinePhotoCamera } from "react-icons/md";
import { EditableInput } from "../../common";
import { updateUserThunk } from "../../../store/slices/user/user.thunk";
import Logout from "../../Auth/Logout";

function Account() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userReducer);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { dirtyFields, isDirty },
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

  const handleSave = (data) => {
    const currentValues = getValues(); // get all current values
    const changedData = {};
    // Loop through dirtyFields to pick only changed values
    for (const field in dirtyFields) {
      changedData[field] = currentValues[field];
      resetField(field, { defaultValue: currentValues[field] });
    }

    // sending to backend
    if (Object.keys(changedData)?.length !== 0) {
      dispatch(updateUserThunk({ data: changedData }));
      // console.log( changedData);
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
          {isDirty && (
            <button
              type="submit"
              className="btn btn-success btn-sm absolute right-0 "
            >
              Save
            </button>
          )}
          <div id="user-avatar" className="relative inline-block">
            <img
              className="w-20 h-20 border-2 border-primary rounded-full"
              src={userData?.avatar}
              alt="user-avatar"
            />
            <button className="group  absolute inset-0 rounded-full flex justify-center items-center hover:bg-black/60 transition-opacity duration-100 ">
              <MdOutlinePhotoCamera
                size={20}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              />
            </button>
          </div>

          <div id="user-details" className="mt-1 ">
            <EditableInput
              className="w-full mb-3 outline-0 border-b-2 text-xl font-semibold "
              {...register("username", { required: true })}
            />
            <EditableInput
              isDisabled={true} // in future email will be editable
              label="email"
              className="w-full mb-2 outline-0 border-b-2 "
              {...register("email", { required: true })}
            />

            <EditableInput
              label="phone"
              className="w-full mb-2 outline-0 border-b-2 "
              {...register("phone", { required: true })}
            />
            <EditableInput
              label="about"
              className="w-full mb-2 outline-0 border-b-2 "
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
