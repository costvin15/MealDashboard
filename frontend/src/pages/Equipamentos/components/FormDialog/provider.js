import {api, user} from '../../../../helpers'

export const Provider = {
  performRegister: async ({
    descricao,
    estoque,
  }) => {
    const {empresa, token} = user.getInfo()
    await api.post(`/municoesEquipamentos/${empresa}`, {
      descricao,
      estoque,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
}

export default Provider
