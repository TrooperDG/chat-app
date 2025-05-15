import React, { useEffect, useState } from "react";

function LoadingScreen() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);
  return (
    <div className="fixed inset-0 bg-white/10 flex justify-center items-center">
      <div className="flex items-center flex-col">
        <h1 className="text-2xl">
          Loading {seconds > 5 && "Server"}
          <span className=" ml-2 loading loading-spinner loading-sm"></span>
        </h1>

        {seconds > 5 && (
          <div className="mt-2 text-gray-400 text-center">
            {seconds < 20 ? (
              seconds < 10 ? (
                <p>Server is cold-starting might take a few seconds</p>
              ) : (
                <p>Please Wait!</p>
              )
            ) : (
              <p>
                Please wait a little more, sometimes it takes about 40 to 50 sec
              </p>
            )}
            <p className="text-2xl">{seconds - 5}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoadingScreen;
