import {api, user} from '../../../helpers'

export const Provider = {
  performLogin: async ({email, password}) => {
    const {data: {token, ...data}} = await api.post('/signin', {email, senha: password})
    user.renewToken({token, data})
  }
}

export default Provider
