"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Itask } from "@/types/tasksType";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,

} from 'chart.js'
import { Bar, Chart } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)
const Profile = () => {
  const { isLogin: loggined, setIsLogin: setLoggined } = AuthContext();
  const [user, setUser] = useState<{ email: string; isVerifed: boolean; _id: string }>({
    email: "",
    isVerifed: false,
    _id: "",
  });
  const [tasks, setTasks] = useState<Itask[]>([

  ]);




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















  useEffect(() => {
    console.log(tasks);
  }, [tasks])








  const getTodos = async () => {
    try {
      const res = await axios.get("api/todos/gettodos");
      console.log(res.data);
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
      console.log(res.data);
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


  useEffect(() => {
    console.log(data);
  }
    , [data]);

  return user ? (

    <div className="  flex flex-col justify-center  items-center  gap-2 h-screen p-3">
      <div className="card  w-1/2 text-primary-content       "
      >
        <Chart className="card-body"
          type="bar"
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
          <p>Verifed: {user.isVerifed ? "Verified" : "Not verifed"}</p>
          <p>User ID: {user._id}</p>





        </div>


      </div>








    </div>


  ) : (
    null
  )


}


export default Profile