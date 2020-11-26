import {api, user} from '../../helpers'

export const Provider = {
  getData: async () => {
    const {empresa, token} = user.getInfo()
    const {data} = await api.get(`/usuarios/${empresa}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return data
  },
  deleteUser: async ({id: userId}) => {
    const {id, empresa, token} = user.getInfo()
    if (id === userId) {
      return false
    }

    await api.delete(`/usuarios/${userId}/${empresa}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return true
  }
}

export default Provider
