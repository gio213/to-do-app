"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
 const Profile = () => {
    const [user, setUser] = useState<{ email: string; isVerifed: boolean; _id: string }>({
        email: "",
        isVerifed: false,
        _id: "",
    });


    const token = Cookies.get("token");
    console.log(token);



    const getUser = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setUser(res.data);
  };

    useEffect(() => {
        getUser();
        console.log(user);
    }, []);

  return user? (
    <div className=" flex  justify-center">

 <div className="card w-96 bg-primary text-primary-content    m-72   ">
  <div className="card-body">
    <h2 className="card-title">User info</h2>
    <p>Email: {user.email}</p>
    <p>Verifed: {user.isVerifed? "Verified":"Not verifed"}</p>
    <p>User ID: {user._id}</p>

  </div>
</div>
    </div>
    ) : (
  null
    )


}


export default Profile