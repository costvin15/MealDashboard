import {api} from '../../helpers'

export const Provider = {
  getCategories: async () => {
    const {data} = await api.get('/meals/categories')
    return data
  }
}

export default Provider
