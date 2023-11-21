"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Itask } from "@/types/tasksType";
import toast,  { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Modal } from "@/components/Modal";


const page = () => {
  const [tasks, setTasks] = useState<Itask>();
  const [task, setTask] = useState<Itask>();
  const [loading, setLoading] = useState<boolean>(false);
  const [text , setText] = useState<string>("");
  const [openModaledit, setModalEdit] = useState<boolean>(false);
  const [openModalDelete, setModalDelete] = useState<boolean>(false);
  const [edit, setEdit] = useState<string>("");
  const [deleteTask, setDeleteTask] = useState<string>("");

  const [id, setId] = useState<string>("");
  const router = useRouter();



  const addTodo = async () =>{
    try{

      if(text.length === 0){

        return toast.error("Please write todo");
      }else{
        setLoading(true);
      const res = await axios.post("api/todos/addtodo",   {
        title: text,
      });
      console.log(res.data);
      toast.success('Task added successfully');
      setTask(res.data.todo)
      router.refresh();

      }

    }catch(err:any){
      console.log(err);
    }finally{
      setLoading(false);
      setText("");
    }
  }


  const getTodos = async () => {
    try{
      const res = await axios.get("api/todos/gettodos");
      console.log(res.data);
      setTasks(res.data.todos);

    }catch(err:any){
      console.log(err);
    }
  };

  const editTodo = async () => {
    try{
      const res = await axios.put("api/todos/edittodo", {
        title:edit,
        id: id,

      });
      console.log(res.data);
      setTask(res.data.todo)
      toast.success(res.data.message);

    }catch(err:any){
      console.log(err);
    }finally{
      setModalEdit(false);
      setEdit("");

    }
  }
  const deleteTodo = async () => {
    try{
      const res = await axios.delete(`api/todos/deletetodo/${id}`,);


      console.log(res.data);
      setTask(res.data.todo)
      toast.success(res.data.message);

    }catch(err:any){
      console.log(err);
    }finally{
      setModalDelete(false);
    }
  }


    const handleEditClicl = (id: string) => {
    setId(id);
    setModalEdit(true);

    }
    const handleDeleteClick = (id: string) => {
    setId(id);
    setModalDelete(true);
    //console.log(id);
    }

  useEffect(() => {

    getTodos();
  }
  , [task ]);





  return(

    <div className=" flex flex-col  w-full  items-center  gap-2   p-2 overflow-scroll" >
  <div className=" flex    justify-center p-10 gap-5 ">
    <input  value={ text}  onChange={ (e) => setText(e.target.value) }
    type="text" placeholder="Write todo" className="input input-bordered input-success w-full max-w-xs "  />

  <button onClick={addTodo} className="btn">
    {loading ?<span className="loading loading-spinner"></span>:""}

  Add task
</button>
  <Toaster />

  </div>

<div className="    overflow-x-auto">
      <table className="  table">
        {/* head */}
        <thead>
          <tr>
            <th>Tasks</th>
            <th>Actions </th>
          </tr>
        </thead>
        <tbody >
          {tasks?.map((task) => (


            <tr   key={task._id}>
              <td>{task.title}</td>
              <td className="flex gap-2">
                <button onClick={ () => handleEditClicl(task._id)} className="btn btn-sm btn-warning">
                  <FaEdit />
                </button>
                <button onClick={ () => handleDeleteClick(task._id)} className="btn btn-sm btn-error">
                  <MdDeleteForever  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

      {/* modal edit */}
      <Modal modalOpen={openModaledit}  setModalOpen={setModalEdit}>

        <div className="modal-box">
          <div className="flex flex-col gap-2">
            <label htmlFor="edit" className="label">Edit task</label>
            <input value={edit} onChange={ (e) => setEdit(e.target.value) }
              type="text" id="edit" className="input input-bordered input-success" />
          </div>
          <div className="modal-action">
            <button onClick={editTodo} className="btn btn-success">Edit</button>
            <button onClick={ () => setModalEdit(false)} className="btn btn-error">Cancel</button>
          </div>
        </div>
      </Modal>

      {/* modal delete */}
      <Modal modalOpen={openModalDelete}  setModalOpen={setModalDelete}>

        <div className="modal-box">
          <div className="flex flex-col gap-2">
            <label  htmlFor="delete" className="label">Are you sure you want to delete this task?</label>
          </div>
          <div className="modal-action">
            <button  onClick={deleteTodo}
                className="btn btn-success">Delete</button>
            <button onClick={ () => setModalDelete(false)} className="btn btn-error">Cancel</button>
          </div>
        </div>
      </Modal>




    </div>
  )

};

export default page;