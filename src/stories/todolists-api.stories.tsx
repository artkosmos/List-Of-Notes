import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
  title: 'API'
}

const settings = {
  withCredentials: true,
}

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)

  useEffect(() => {
    todolistAPI.getTodo()
      .then(response => {
      setState(response.data.map(item => ({...item, country: 'Belarus'})))
    })
      .catch(error => console.warn(error))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)

  const title = 'What\'s the fuck?'

  useEffect(() => {
    todolistAPI.addTodo(title)
      .then(response => setState(response.data.data.item))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {

  const [state, setState] = useState<any>(null)

  const todolistId = "5f241374-bb69-461c-9baf-e89a3fe7a978"

  useEffect(() => {
    todolistAPI.deleteTodo(todolistId)
      .then(response => setState(state))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {

  const [state, setState] = useState<any>(null)

  const todolistId = "0b3b62ab-b6ab-496f-b903-4fdcff5a2502"

  const title = 'It\'s SPARTA!'


  useEffect(() => {
    todolistAPI.updateTodo(todolistId, title)
      .then(response => setState(state))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

