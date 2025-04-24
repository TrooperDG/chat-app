import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageThunk } from "../../store/slices/message/message.thunk";

function SendMessage() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { selectedUserData } = useSelector((state) => state.userReducer);
  // const { sound } = useSelector((state) => state.settingsReducer);

  const handleSendMessage = () => {
    dispatch(
      sendMessageThunk({
        receiverId: selectedUserData._id,
        message: message.trim(),
      })
    );
    //playing the send sound
    // if (sound.sendMessage) {
    // const sendSound = new Audio("/sounds/message-send.wav");
    // sendSound.play();
    // }

    setMessage("");
  };
  return (
    <div className="p-3 flex gap-2">
      <input
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && message.trim().length > 0) {
            handleSendMessage();
          }
        }}
        value={message}
        type="text"
        placeholder="Type here"
        className="input w-full"
      />
      <button
        className="btn btn-primary"
        disabled={message.trim().length > 0 ? false : true}
        onClick={handleSendMessage}
      >
        Send
      </button>
    </div>
  );
}

export default SendMessage;
