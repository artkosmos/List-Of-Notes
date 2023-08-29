import axios from 'axios'

export const instance = axios.create({
  baseURL: `https://social-network.samuraijs.com/api/1.1`,
  withCredentials: true,
})
// instance экземпляр класса axios с начальными настройками
// для укорочения (пишем только endpoints и payload) и возможно взаимодействие с несколькими API
