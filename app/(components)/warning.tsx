import React from "react";

function Warning() {
  return (
    <>
      <div className="absolute top-0 h-[5vh] w-full bg-white flex justify-center items-center">
        <p className="text-red-500 text-xl font-semibold">
          Under Construction! Only in Devnet
        </p>
      </div>
      <div className="h-[5vh]"></div>
    </>
  );
}

export default Warning;
