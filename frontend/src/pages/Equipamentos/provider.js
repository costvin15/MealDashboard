import {api, user} from '../../helpers'

export const Provider = {
  getEquipamentos: async () => {
    const {empresa, token} = user.getInfo()
    const {data} = await api.get(`/municoesEquipamentos/${empresa}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return data
  },
}

export default Provider
