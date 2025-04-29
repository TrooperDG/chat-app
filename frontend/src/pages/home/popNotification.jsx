import toast from "react-hot-toast";

export const popNotification = (sender, message) => {
  toast(
    <div className="flex items-center gap-3">
      <img
        src={sender?.avatar}
        alt={sender?.username}
        className="w-10 h-10 rounded-full"
      />
      <div className="w-62 overflow-hidden ">
        <div className="flex justify-between">
          <h4 className="font-semibold text-gray-800  ">{sender?.username}</h4>
          <small>now</small>
        </div>
        <p className="truncate">{message}</p>
      </div>
    </div>
  );
};
