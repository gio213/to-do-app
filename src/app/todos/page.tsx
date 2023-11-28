"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Itask } from "@/types/tasksType";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Modal } from "@/components/Modal";
import clsx from "clsx";


const page = () => {
  const [tasks, setTasks] = useState<Itask>();
  const [task, setTask] = useState<Itask>();
  const [loading, setLoading] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [openModaledit, setModalEdit] = useState<boolean>(false);
  const [openModalDelete, setModalDelete] = useState<boolean>(false);
  const [edit, setEdit] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const router = useRouter();



  const addTodo = async () => {
    try {

      if (text.length === 0) {

        return toast.error("Please write todo");
      } else {
        setLoading(true);
        const res = await axios.post("api/todos/addtodo", {
          title: text,



        });
        console.log(res.data);
        toast.success('Task added successfully');
        setTask(res.data.todo)
        router.refresh();

      }

    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
      setText("");
    }
  }


  const getTodos = async () => {
    try {
      const res = await axios.get("api/todos/gettodos");
      console.log(res.data);
      setTasks(res.data.todos);

    } catch (err: any) {
      console.log(err);
    }
  };

  const editTodo = async () => {
    try {
      const res = await axios.put("api/todos/edittodo", {
        title: edit,
        id: id,

      });
      console.log(res.data);
      setTask(res.data.todo)
      toast.success(res.data.message);

    } catch (err: any) {
      console.log(err);
    } finally {
      setModalEdit(false);
      setEdit("");

    }
  }
  const deleteTodo = async () => {
    try {
      const res = await axios.delete(`api/todos/deletetodo/`, { data: { _id: id } });

      if (res.status === 200) {
        // Todo was successfully deleted
        toast.success(res.data.message);

        setTask(res.data)
      } else {
        console.error("Unexpected status code:", res.status);
        toast.error("An error occurred while deleting the todo.");
      }
    } catch (err: any) {
      console.error(err);
      toast.error("An error occurred while deleting the todo.");
    } finally {
      setModalDelete(false);
      setId("");
      router.refresh();
    }
  };


  const completeTodo = async (task_id: string) => {
    try {
      setId(task_id);
      const res = await axios.put("api/todos/completed", {
        completed: true,
        _id: task_id,

      });
      console.log(res.data);
      setCompleted(true);

      setTask(res.data.todo)
      toast.success(res.data.message);

    } catch (err: any) {
      console.log(err);
    } finally {
      setModalEdit(false);
      setEdit("");

    }
  }


  const uncompleteTodo = async (task_id: string) => {
    try {
      setId(task_id);
      const res = await axios.put("api/todos/completed", {
        completed: false,
        _id: task_id,

      });
      console.log(res.data);
      setCompleted(true);
      setTask(res.data.todo)
      toast.success(res.data.message);

    } catch (err: any) {
      console.log(err);
    } finally {
      setModalEdit(false);
      setEdit("");

    }
  }



  const handleEditClicl = (id: string) => {
    setId(id);
    setModalEdit(true);
    console.log(id);

  }
  const handleDeleteClick = (id: string) => {
    setId(id);
    setModalDelete(true);
    //console.log(id);
  }

  useEffect(() => {

    getTodos();
  }
    , [task]);


  /// function which calculate the time between the creation of the task and the current time
  const timeAgo = (date: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) {
      return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  }






  return (

    <div className=" flex flex-col  w-full  items-center  gap-2   p-2 overflow-scroll" >
      <div className=" flex    justify-center p-10 gap-5 ">
        <input value={text} onChange={(e) => setText(e.target.value)}
          type="text" placeholder="Write todo" className="input input-bordered input-success w-full max-w-xs " />

        <button onClick={addTodo} className="btn">
          {loading ? <span className="loading loading-spinner"></span> : ""}

          Add task
        </button>
        <Toaster />

      </div>

      <div className=" h-screen overflow-x-auto    max-w-full">

        <table className="table ">
          {/* head */}
          <thead>
            <tr>
              <th>Tasks</th>
              <th>Created at </th>
              <th>Updated at </th>
              <th>Status</th>
              <th>Actions </th>
            </tr>
          </thead>
          <tbody>
            {tasks &&
              tasks.slice().reverse().map((task: any) => (



                <tr key={task._id}>
                  <td>{task.title}</td>
                  <td>{timeAgo(task.created_at)}</td>
                  <td>{task.updated ? timeAgo(task.updated_at) : "Never updated"}</td>
                  <td>
                    {task.completed ? (
                      <button className={clsx("btn btn-sm btn-success")}
                        onClick={() => uncompleteTodo(task._id)}
                      >
                        Completed
                      </button>
                    ) : (
                      <button className={clsx("btn btn-sm btn-error")}
                        onClick={() => completeTodo(task._id)}>
                        Not completed
                      </button>
                    )}
                  </td>
                  <td className="flex gap-2">
                    <button onClick={() => handleEditClicl(task._id)} className="btn btn-sm btn-warning">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDeleteClick(task._id)} className="btn btn-sm btn-error">
                      <MdDeleteForever />
                    </button>
                  </td>
                </tr>

              ))}
          </tbody>

        </table>
      </div>

      {/* modal edit */}
      <Modal modalOpen={openModaledit} setModalOpen={setModalEdit}>

        <div className="modal-box">
          <div className="flex flex-col gap-2">
            <label htmlFor="edit" className="label">Edit task</label>
            <input value={edit} onChange={(e) => setEdit(e.target.value)}
              type="text" id="edit" className="input input-bordered input-success" />
          </div>
          <div className="modal-action">
            <button onClick={editTodo} className="btn btn-success">Edit</button>
            <button onClick={() => setModalEdit(false)} className="btn btn-error">Cancel</button>
          </div>
        </div>
      </Modal>

      {/* modal delete */}
      <Modal modalOpen={openModalDelete} setModalOpen={setModalDelete}>

        <div className="modal-box">
          <div className="flex flex-col gap-2">
            <label htmlFor="delete" className="label">Are you sure you want to delete this task?</label>
          </div>
          <div className="modal-action">
            <button onClick={deleteTodo}
              className="btn btn-success">Delete</button>
            <button onClick={() => setModalDelete(false)} className="btn btn-error">Cancel</button>
          </div>
        </div>
      </Modal>




    </div>
  )

};

export default page;