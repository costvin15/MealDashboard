import {api} from '../../helpers'

export const Provider = {
  getDetails: async id => {
    const {data: {meals}} = await api.get(`/meals/details/${id}`)
    const meal = meals[0]
    const ingredients = []
    for (let i = 0; i < 20 && meal[`strIngredient${i}`] !== ''; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push({
          ingredient: meal[`strIngredient${i}`],
          measure: meal[`strMeasure${i}`]
        })
      }
    }
    meal.ingredients = ingredients
    return meals[0]
  } 
}

export default Provider
