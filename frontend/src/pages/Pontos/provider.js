import Moment from 'moment'
import {api, user} from '../../helpers'

export const Provider = {
  fetchData: async (selectedDate, page) => {
    const {empresa, token} = user.getInfo()
    const date = Moment(selectedDate).format('YYYY-MM-DD')
    const {data: {data, count}} = await api.get(`/buscaRegistrosPontos/${date}/${empresa}?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return {data, count}
  },
  performDeparture: async (id, saida) => {
    const {token, empresa} = user.getInfo()
    const data = await api.put(`/registrosPontos/${empresa}`, {
      id,
      data_saida: Moment(saida).format('YYYY-MM-DD'),
      hora_saida: Moment(saida).format('HH:mm'),
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(data)
  },
}

export default Provider
