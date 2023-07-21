import React, {useEffect, useState} from 'react'
import axios from "axios";

export default {
  title: 'TASKS API'
}

const settings = {
  withCredentials: true,
}

const todolistId: string = "06d35705-5c98-41e0-9f1d-76aa6f78a81b"

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)

  const count: number = 10
  const page: number = 1

  useEffect(() => {
    axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks?${count}&${page}`, settings)
      .then(response => {
      setState(response.data)
    })
      .catch(error => console.warn(error))
  }, [])
  return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
  const [state, setState] = useState<any>(null)

  const title = 'I\'ll kill you!'

  useEffect(() => {
    axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`, {title}, settings)
      .then(response => setState(response.data))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {

  const [state, setState] = useState<any>(null)

  const taskId: string = "8e846a7e-b395-4034-b122-38587c0afea5"

  useEffect(() => {
    axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`, settings)
      .then(response => setState(state))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const UpdateTaskTitle = () => {

  const [state, setState] = useState<any>(null)

  const title = 'It\'ll be soon'

  const taskId: string = "4fa6e977-5458-4178-840c-9da3ded40e1f"


  useEffect(() => {
    axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`, {title}, settings)
      .then(response => setState(state))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

