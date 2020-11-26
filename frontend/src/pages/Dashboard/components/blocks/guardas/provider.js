import {api, user} from '../../../../../helpers'

export const Provider = {
  getLength: async () => {
    const {empresa, token} = user.getInfo()
    const {data} = await api.get(`/usuarios/${empresa}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return data.count;
  }
}

export default Provider
