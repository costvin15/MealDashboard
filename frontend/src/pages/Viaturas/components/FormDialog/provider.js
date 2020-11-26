import {api, user} from '../../../../helpers'

export const Provider = {
  getTiposDeArmas: async () => {
    const {empresa, token} = user.getInfo()
    const {data} = await api.get(`/tipoArmas/${empresa}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(data)
    return data
  },
  performRegister: async ({
    modelo,
    marca,
    calibre,
    tipo,
  }) => {
    const {empresa, token} = user.getInfo()
    await api.post(`/armas/${empresa}`, {
      tipo_arma_id: tipo,
      modelo,
      marca,
      calibre,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
}

export default Provider
