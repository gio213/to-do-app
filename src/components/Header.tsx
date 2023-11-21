"use client";
import Link from "next/link";
import { ThemeController } from "./ThemeController";
import { use, useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

export const Header = () => {
  const router = useRouter();
  const [user, setUser] = useState<object>({});
  const [token, setToken] = useState(null);

  const {isLogin: loggined, setIsLogin: setLoggined} = AuthContext();

  const getUser = async () => {
    try{
      const {data} = await axios.get("/api/users/me");
      console.log(data);
      if(data){
        setUser(data);
        setLoggined(true);
      }

    }catch(err:any){
      console.log(err.message);
    }

  };

  useEffect(() => {
    getUser();
  }
  , []);

  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      toast.success(response.data.message);
    } catch (err: any) {
      console.log(err.message);
      toast.error(err.message);

    }finally{
      router.push("/login");
      setLoggined(false);
      setUser({});


    }
  };



  return (
    <div className="navbar  bg-base-100 shadow-xl  ">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href={"/"}>Homepage</Link>
            </li>
            <li>
              <Link href={"/profile"}>Profile</Link>
            </li>
            <li>
              <Link onClick={logout} href={"/login"}>
                Logout
              </Link>
              {/* <p onClick={logout}>Logout</p> */}
            </li>
          </ul>
        </div>
      </div>
      {loggined ? (
        <>
        <button onClick={logout} className="btn btn-ghost">Logout</button>
        <div  className="   flex gap-1 navbar-end">
        {loggined? <p>Hello {user?.username}</p>:""}
        <div className="avatar">
          <div className="w-10 mask mask-hexagon">
            <img src="https://avatars.dicebear.com/api/adventurer-neutral/mail%40ashallendesign.co.uk.svg" />
          </div>
        </div>
      </div>
      </>
      ) : (
        <div className=" flex gap-2 navbar-center">
          <Link href="/login">
            <button className="btn btn-ghost">Login</button>
          </Link>
          <Link href="/signup">
            <button className="btn btn-ghost">Sign up</button>
          </Link>
        </div>
      )}
      <ThemeController/>
      <Toaster />
    </div>
  );
};
