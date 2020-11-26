import {api, user} from '../../../helpers'

export const Provider = {
  performSignUp: async ({name, email, password}) => {
    const {data: {token, ...data}} = await api.post('/auth/register', {name, email, password})
    user.renewToken({token, data})
  }
}

export default Provider
