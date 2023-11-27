"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Spinner } from "@/components/Spinner";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "@/context/AuthContext";

const Login = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { setIsLogin } = AuthContext();

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("success login", response.data);
      setIsLogin(true);
      toast.success(response.data.message);
      router.push("/todos");
    } catch (err: any) {
      console.log("login failed", err.response);
      toast.error(err?.data?.message);
    } finally {
      setLoading(false);
      // router.push("/login");
    }
  };
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);





  return (
    <div className={`   modal  ${isOpen ? "modal-open   " : ""}`}>
      <div className="     flex flex-col w-full items-center justify-center gap-5 modal-box relative">
        <h3 className="font-bold text-lg text-center">
          {loading ? <Spinner /> : "Login"}
        </h3>
        <input
          type="email"
          placeholder="Enter email"
          className="input input-bordered input-info w-full max-w-xs"
          value={user.email}
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
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
        {buttonDisabled ? (
          <button
            className="btn btn-info w-full max-w-xs"
            disabled
          >
            Login
          </button>
        ) : (
          <button onClick={onLogin}
            className="btn btn-info w-full max-w-xs"

          >
            Login
          </button>
        )}


        <div className="text-center">
          <p className="text-1xl text-black">Don't have an account?</p>
          <Link href="signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </div>
        <button
          className="btn btn-outline">
          <FcGoogle /> Login with Google{" "}
        </button>

        <label
          onClick={() => {
            setIsOpen(false);
            router.push("/");
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

export default Login;
