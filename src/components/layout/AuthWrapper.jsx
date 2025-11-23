import React from "react";
import auth from "../../assets/auth.png";

const AuthWrapper = ({ children }) => {
  return (
    <div className=" bg-[#fbfbfb] ">
      <div className="flex  lg:justify-between lg:gap-2.5 h-full  bg-[#fbfbfb] p-2">
        <div className=" lg:p-[50px] p-[30px] lg:pl-[100px]">
          <div>{children}</div>
        </div>

        <img
          src={auth}
          alt="logo"
          className="lg:max-w-[779px] hidden lg:block h-full rounded-[8px]"
        />
      </div>
    </div>
  );
};

export default AuthWrapper;
