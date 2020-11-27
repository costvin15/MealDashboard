import {api} from '../../../../helpers'

export const Provider = {
  getCategory: async category => {
    const {data: {meals}} = await api.get(`/meals/category/${category}`)
    return meals
  }
}

export default Provider
