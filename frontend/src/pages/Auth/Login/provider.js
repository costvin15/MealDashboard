import {api, user} from '../../../helpers'

export const Provider = {
  performLogin: async ({email, password}) => {
    const {data: {token, ...data}} = await api.post('/auth/login', {email, password})
    user.renewToken({token, data})
  }
}

export default Provider
