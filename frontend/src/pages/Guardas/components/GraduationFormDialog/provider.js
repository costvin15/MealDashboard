import {api, user} from '../../../../helpers'

export const Provider = {
  performRegister: async ({nome}) => {
    const {empresa, token} = user.getInfo()
    await api.post(`/graduacoes/${empresa}`, {
      descricao: nome,
      empresa_id: empresa,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
}

export default Provider
