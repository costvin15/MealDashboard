import {api, user} from '../../../../helpers'
import moment from 'moment'

export const Provider = {
  getAllUsers: async () => {
    const {token, empresa} = user.getInfo()
    const {data: {data}} = await api.get(`/usuarios/${empresa}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return data
  },
  performEntry: async (guarda, entrada) => {
    const {token, empresa, id} = user.getInfo()
    const data = await api.post(`/registrosPontos/${empresa}`, {
      guarda_id: guarda,
      data_entrada: moment(entrada).format('YYYY-MM-DD'),
      hora_entrada: moment(entrada).format('HH:mm'),
      usuario_id: id,
      empresa_id: empresa
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(data)
  },
  performDeparture: async (guarda, saida) => {
    const {token, empresa} = user.getInfo()
    console.log({
      id: guarda,
      data_saida: moment(saida).format('YYYY-MM-DD'),
      hora_saida: moment(saida).format('HH:mm'),
    })
    const data = await api.put(`/registrosPontos/${empresa}`, {
      id: guarda,
      data_saida: moment(saida).format('YYYY-MM-DD'),
      hora_saida: moment(saida).format('HH:mm'),
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(data)
  }
}

export default Provider
