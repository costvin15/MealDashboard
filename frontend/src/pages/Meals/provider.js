import {api} from '../../helpers'

export const Provider = {
  getDetails: async id => {
    const {data: {meals}} = await api.get(`/meals/details/${id}`)
    return meals[0]
  } 
}

export default Provider
