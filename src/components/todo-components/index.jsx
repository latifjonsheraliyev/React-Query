import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";

const TodoComponents = ({deleteMutation}) => {
    const queryClient = useQueryClient();
    const data = queryClient.getQueryData(["TODO"]);
    const [newTodo , setNewTodo] = useState("")
    const [editText, setEditText] = useState("")
    const [isEdit , setIsEdit] = useState(null)
    const addTodoMutation = useMutation({
      mutationFn:(newData)=> axios({url:`https://6715fa1733bc2bfe40bbca78.mockapi.io/Azizakam`,
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        data:newData
      }).then((data) => data.data),
      onSuccess: () => queryClient.invalidateQueries(["TODO"])
    },)
    const addTodo =()=>{
      addTodoMutation.mutate({task_text:newTodo,id:Date.now(),task_time:Date.now()})
      setNewTodo("")
    }

    const editTodoMutation = useMutation({
      mutationFn:({id,editText})=> axios({url:`https://6715fa1733bc2bfe40bbca78.mockapi.io/Azizakam/${id}`,
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        },
        data:{task_text:editText}
      }).then((data) => data.data),
      onSuccess: ()=> queryClient.invalidateQueries(["TODO"])
    })

    const editTodo = (id,newtask) =>{
      editTodoMutation.mutate({id:id,editText:newtask })
    }


  return (
    <section className="todo h-[100vh] bg-blue-200 flex items-center justify-center">
      <div className=" w-[35%] p-[20px] bg-white min-h-[500px] rounded-[5px] ">
        <h2 className="text-[24px] text-center font-bold text-todo">TODO </h2>
        <div className="new-todo mb-[15px]">
          <form
            onSubmit={ (e) =>{e.preventDefault()}} 
            action=""
            className="flex rounded-[7px] w-[70%] m-auto h-[40px] items-center justify-between border-[2px] border-[solid] border-[black]"
          >
            <input
              type="text"
              value={newTodo}
              onChange={(e)=>{setNewTodo(e.target.value)}}
              className="w-[80%] rounded-[7px] h-full outline-none p-[10px]"
              placeholder="add new todo"
            />
            <button onClick={addTodo} className="w-[20%]">Add</button>
          </form>
        </div>
        <div className="todo-tasks flex flex-col gap-3">
          {data?.map((item) => (
            <div key={item.id} className="todo-items rounded-[4px] flex items-center justify-between p-[10px] h-[50px] w-full todo todo-container">
              <input type="checkbox" />
              
              {
                isEdit === item.id ? <input className="bg-transparent"  onChange={(e)=> setEditText(e.target.value)} value={editText}></input>:<label htmlFor="">{item.task_text}</label>
              }
              
              <div className="btns flex items-center gap-3">
                <button onClick={()=> deleteMutation.mutate(item.id)} className="w-[30px] h-full bg-red-600">del</button>

                {
                  isEdit === item.id ?(
                <button onClick={()=>{editTodo(item.id,editText),setIsEdit(null)}} className="w-[30px] h-full bg-green-600">Save</button>

                  ):(
                <button onClick={()=>{setIsEdit(item.id),setEditText(item.task_text)}} className="w-[30px] h-full bg-orange-600">edit</button>
                  ) 
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TodoComponents;
