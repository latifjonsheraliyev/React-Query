import React from 'react'
import TodoComponents from '../../components/todo-components'

const Todo = ({deleteMutation}) => {
  return (
    <>
        <TodoComponents deleteMutation={deleteMutation}/>
    </>
  )
}

export default Todo