import fetch from 'node-fetch'

const base = 'https://www.themealdb.com/api/json/v1/1'

const meals = {
  categories: async (request, response) => {
    const data = await fetch(`${base}/categories.php`)
    const result = await data.json()
    response.json(result)
  },
  all: async (request, response) => {
    try {
      const {categories} = await (await fetch(`${base}/categories.php`)).json()
      
      categories.map(({strCategory}) => {
        console.log(strCategory)
      })
      
      response.json({true: true})
    } catch (error) {
      console.error(error)
    }
  }
}

export default meals
