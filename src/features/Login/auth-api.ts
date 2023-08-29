import { instance } from 'api/api'
import { BaseResponseType, FormType, IsMeAuthResponseType } from 'common/types/api_types'

export const authAPI = {
  checkIsLogIn() {
    return instance.get<BaseResponseType<IsMeAuthResponseType>>('/auth/me')
  },
  logIn(data: FormType) {
    return instance.post<BaseResponseType<{ userId: number }>>('/auth/login', data)
  },
  logOut() {
    return instance.delete<BaseResponseType>('/auth/login')
  },
}
