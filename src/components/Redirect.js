import React from "react";
import { Link } from "react-router-dom";

const Redirect = () => {
  return (
    <div className="flex justify-center h-[92vh] items-center  bg-[#A7BCFF]">
      <h2 className="text-[32px] font-semibold">
        Please Login to View WatchList{" "}
        <b>
          {" "}
          <Link to="/login"> Login</Link>{" "}
        </b>{" "}
      </h2>
    </div>
  );
};

export default Redirect;
