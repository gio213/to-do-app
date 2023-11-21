"use client";

import Link from "next/link";
import { use, useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Spinner } from "@/components/Spinner";
const SignUp = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("success sign up", response.data);
      toast.success(response.data.message);
    } catch (err: any) {
      console.log("singup failed", err.response);
      toast.error(err.data.message);
    } finally {
      setLoading(false);
      router.push("/login");
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.username.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className={`   modal  ${isOpen ? "modal-open   " : ""}`}>
      <div className="  flex flex-col w-full items-center justify-center gap-5 modal-box relative">
        <h3 className="font-bold text-lg text-center">
          {loading ? <Spinner /> : "Sign up"}
        </h3>
        <input
          type="email"
          placeholder="Enter Email"
          className="input input-bordered input-info w-full max-w-xs"
          value={user.email}
          onChange={(e) => {
            setUser({ ...user, email: e.target.value, username: "" });
          }}
        />
        <input
          type="text"
          placeholder="Enter username"
          className="input input-bordered input-info w-full max-w-xs"
          value={user.username}
          onChange={(e) => {
            setUser({ ...user, username: e.target.value });
          }}
        />
        <input
          type="password"
          placeholder="Enter password"
          className="input input-bordered input-info w-full max-w-xs"
          value={user.password}
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
        />
        <button onClick={onSignUp} className="btn btn-info  w-1/2 ">
          {buttonDisabled ? "No Sign up" : "Sign up"}
        </button>

        <div className="text-center">
          <p className="text-1xl text-black">Go to </p>
          <Link href="/login" className="text-blue-500 hover:underline">
            Login page
          </Link>
        </div>

        <button className="btn btn-outline">
          <FcGoogle /> Login with Google{" "}
        </button>

        <label
          onClick={() => {
            setIsOpen(false);
          }}
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          x
        </label>
      </div>
      <Toaster />
    </div>
  );
};

export default SignUp;
