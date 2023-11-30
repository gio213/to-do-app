"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Itask } from "@/types/tasksType";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";



import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { set } from "mongoose";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Profile = () => {
  const { isLogin: loggined, setIsLogin: setLoggined } = AuthContext();
  const [user, setUser] = useState<{ email: string; isVerifed: boolean; _id: string; verifayToken: string }>({
    email: "",
    isVerifed: false,
    _id: "",
    verifayToken: ""
  });
  const [tasks, setTasks] = useState<Itask[]>([

  ]);
  const [isVerifed, setIsVerifed] = useState<boolean>(false);
  const router = useRouter();
  const verify = async () => {
    try {
      await axios.post("api/users/verify", {
        token: user.verifayToken
      })
      toast.success("Your account has been verified")
      setIsVerifed(true)
    } catch (err: any) {
      console.log(err)
      toast.error("Your account could not be verified")
    } finally {
      router.refresh();
    }
  }




  useEffect(() => {
    if (isVerifed) {
      getUser();
    }
  }
    , [isVerifed]);


  const data = (tasks: any) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const taskCounts = [0, 0, 0, 0, 0, 0, 0];

    tasks.forEach((task: any) => {
      const createdDay = new Date(task.created_at).getDay();
      taskCounts[createdDay]++;
    });

    return { daysOfWeek, taskCounts };
  };


  useEffect(() => {
    data(tasks);
  }
    , [tasks])
























  const getTodos = async () => {
    try {
      const res = await axios.get("api/todos/gettodos");

      setTasks(res.data.todos);

    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user._id) {
      getTodos();
    }
  }
    , [user]);



  const getUser = async () => {
    try {
      const res = await axios.get("/api/users/me");

      setUser(res.data);

    } catch (err: any) {
      console.log(err.message);
    } finally {


    }

  };

  useEffect(() => {

    getUser();

  }
    , []);

  const verifyUser = async () => {
    try {

    } catch (err: any) {
      console.log(err.message)
    }
  }


  return user ? (

    <div className="  flex flex-col justify-center  items-center  gap-2 h-screen p-3">
      <div className="card  w-1/2 text-primary-content       "
      >
        <Bar className="card-body"

          data={{
            labels: data(tasks).daysOfWeek,
            datasets: [
              {
                label: 'Tasks',
                data: data(tasks).taskCounts,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
                borderWidth: 1,


              },
            ],
          }}
          options={{
            scales: {
              x: {
                beginAtZero: true,
              },
              y: {
                beginAtZero: true,

              },
            },
          }}
        />



      </div>

      <div className="card  w-1/2 bg-primary text-primary-content      ">
        <div className=" w-full card-body">
          <h2 className="card-title">User info</h2>
          <p>Email: {user.email}</p>
          <p>Verifed: {user.isVerifed ? "Verified" : <button onClick={() => {
            user.verifayToken ? verify() : null
          }} className="btn btn-active btn-ghost"  > Verify</button>}</p>
          <p>User ID: {user._id}</p>





        </div>


      </div>








    </div>


  ) : (
    null
  )


}


export default Profile