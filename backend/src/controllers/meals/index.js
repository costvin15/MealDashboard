import fetch from 'node-fetch'

const base = 'https://www.themealdb.com/api/json/v1/1'

const meals = {
  categories: async (request, response) => {
    const data = await fetch(`${base}/categories.php`)
    const result = await data.json()
    response.json(result)
  },
  category: async (request, response) => {
    const {id} = request.params
    const data = await fetch(`${base}/filter.php?c=${id}`)
    const result = await data.json()
    response.json(result)
  },
  details: async (request, response) => {
    const {id} = request.params
    const data = await fetch(`${base}/lookup.php?i=${id}`)
    const result = await data.json()
    response.json(result)
  }
}

export default meals
