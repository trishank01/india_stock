import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import {  signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";

const Login = () => {
  const [isLaoding, setIsLaoding] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/watchlist")
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.message)
      });
  };
  return (
    <div className="h-screen  flex items-center justify-center bg-[#a7bcff] ">
      <div className="bg-white py-6 px-10 flex flex-col gap-5 items-center">
        <span className="text-[#5d5b8d] font-semibold text-[22px]">India Stock</span>
        <span className="text-[#5d5b8d] font-semibold text-[18px]">Login</span>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            className="p-3 md:min-w-[250px] border-0 border-b-2 border-solid focus:outline-none"
            type="email"
            placeholder="Email"
          />
          <input
            className="p-3 md:min-w-[250px] border-0 border-b-2 border-solid focus:outline-none"
            type="password"
            placeholder="Password"
          />
          <button className="p-3 text-white border-none bg-[#7b96ec] font-semibold cursor-pointer">
            {isLaoding ? <Loader /> : "Sing in"}
          </button>
          <div>
            <p className="text-[#5d5b8d] text-[12px] mt-1">
              You dont have an account{" "}
              <b className="cursor-pointer">
                {" "}
                <Link to="/register">Register</Link>{" "}
              </b>{" "}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
