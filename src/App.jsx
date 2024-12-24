import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Todo from "./pages/todo-page";
import {notification} from 'antd'

const App = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["TODO"],
    queryFn: () =>
      axios
        .get("https://6715fa1733bc2bfe40bbca78.mockapi.io/Azizakam")
        .then((data) => data.data),
  });

  
  const deleteMutation = useMutation({
    mutationFn: (id) =>
      axios({
        url: `https://6715fa1733bc2bfe40bbca78.mockapi.io/Azizakam/${id}`,
        method:"DELETE"
      }).then((data) => data.data),
      onSuccess:()=> {queryClient.invalidateQueries(["TODO"]),
        notification.success({message:"Delete ToDo"})
      }
      
  });

  return (
    <>
      <Todo deleteMutation = {deleteMutation} />
    </>
  );
};

export default App;
