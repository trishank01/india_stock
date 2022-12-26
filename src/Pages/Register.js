import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../Firebase";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [isLaoding, setIsLaoding] = useState(false);
  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault()
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateProfile(user , {
            displayName
        })
        setDoc(doc(db , "users" , user.uid), {
            id : user.uid,
            displayName ,
            email ,
            watchList : []
        })
        navigate("/watchlist")
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        // ..
      });

  };
  return (
    <div className="h-screen  flex items-center justify-center bg-[#a7bcff] ">
      <div className="bg-white py-6 px-10 flex flex-col gap-5 items-center">
        <span className="text-[#5d5b8d] font-semibold text-[22px]">India Stock</span>
        <span className="text-[#5d5b8d] font-semibold text-[18px]">
          Register
        </span>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            className="p-3 md:min-w-[250px] border-0 border-b-2 border-solid focus:outline-none"
            type="text"
            placeholder="Display Name"
          />
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
            {isLaoding ? <Loader /> : "Sign Up"}
          </button>
          {/* {err && <span>Something went Wrong</span>} */}
        </form>
        <div>
          <p className="text-[#5d5b8d] text-[12px] mt-1">
            You do have an account?{" "}
            <b className="cursor-pointer">
              {" "}
              <Link to="/login">Login</Link>{" "}
            </b>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
