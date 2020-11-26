import {api, user} from '../../helpers'

export const Provider = {
  validateSession: async () => {
    const {token} = user.getInfo()
    const {data} = await api.post('/validateToken', {
      token
    })
    if (!data) {
      user.logout()
      window.location.reload()
    }
  }
}

export default Provider
