import React, { useEffect, useState } from "react"
import { todolistAPI } from "../api/todolist-api"

export default {
  title: "API",
}

const settings = {
  withCredentials: true,
}

const todolistIdForTasks: string = "b113e060-8e2b-4802-b21a-acd637df261f"

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)

  useEffect(() => {
    todolistAPI
      .getTodo()
      .then((response) => {
        setState(response.data.map((item) => ({ ...item, country: "Belarus" })))
      })
      .catch((error) => console.warn(error))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)

  const title = "What's the fuck?"

  useEffect(() => {
    todolistAPI
      .addTodo(title)
      .then((response) => setState(response.data.data.item))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)

  const todolistId = "5f241374-bb69-461c-9baf-e89a3fe7a978"

  useEffect(() => {
    todolistAPI.deleteTodo(todolistId).then((response) => setState(state))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)

  const todolistId = "b113e060-8e2b-4802-b21a-acd637df261f"

  const title = "Important meetings"

  useEffect(() => {
    todolistAPI
      .updateTodo(todolistId, title)
      .then((response) => setState(state))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)

  const count: number = 10
  const page: number = 1

  useEffect(() => {
    todolistAPI
      .getTasks(todolistIdForTasks)
      .then((response) => {
        setState(response.data.items)
      })
      .catch((error) => console.warn(error))
  }, [])
  return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
  const [state, setState] = useState<any>(null)

  const title = "meeting at 9 AM"

  useEffect(() => {
    todolistAPI
      .addTask(todolistIdForTasks, title)
      .then((response) => setState(response.data.data.item))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null)

  const taskId: string = "9979f0be-15ec-4ce4-a1c0-6a87e7daed63"

  useEffect(() => {
    todolistAPI
      .deleteTask(todolistIdForTasks, taskId)
      .then((response) => setState(state))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

// export const UpdateTaskTitle = () => {
//
//   const [state, setState] = useState<any>(null)
//
//   const title: string = 'It\'ll be soon'
//
//   const taskId: string = "4fa6e977-5458-4178-840c-9da3ded40e1f"
//
//
//   useEffect(() => {
//     todolistAPI.updateTask(todolistIdForTasks, taskId, title)
//       .then(response => setState(response.data.data.item))
//   }, [])
//
//   return <div>{JSON.stringify(state)}</div>
// }
