import {api, user} from '../../helpers'

export const Provider = {
  getArmas: async () => {
    const {empresa, token} = user.getInfo()
    const {data} = await api.get(`/armas/${empresa}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return data
  },
  getTiposDeArmas: async () => {
    const {empresa, token} = user.getInfo()
    const {data} = await api.get(`/tipoArmas/${empresa}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    return data
  },
}

export default Provider
