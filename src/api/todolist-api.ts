import axios from "axios";

const settings = {
  withCredentials: true
}

const instance = axios.create({
  baseURL: `https://social-network.samuraijs.com/api/1.1`,
  withCredentials: true
})

export const todolistAPI = {
  getTodo() {
    return instance.get(`/todo-lists`) // instance экземпляр класса с начальными настройками
  },                                       // для укорочения (пишем только endpoints и payload) и возможно взаимодействие с несколькими API
  addTodo(title: string) {
    return axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists`,{title}, settings)
  },
  deleteTodo(todolistId: string) {
    return axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
  },
  updateTodo(todolistId: string, title: string) {
    return  axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,{title}, settings)
  }

}