import React, {useEffect, useState} from 'react'
import axios from "axios";
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
      setState(response.data)
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
      .then(response => setState(response.data))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {

  const [state, setState] = useState<any>(null)

  const todolistId = "e42e436f-ec53-4b00-9820-2b824d1da940"

  useEffect(() => {
    todolistAPI.deleteTodo(todolistId)
      .then(response => setState(state))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {

  const [state, setState] = useState<any>(null)

  const todolistId = "9fe78139-e994-4c82-b6e1-e96465076a44"

  const title = 'It\'s SPARTA!'


  useEffect(() => {
    todolistAPI.updateTodo(todolistId, title)
      .then(response => setState(state))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

