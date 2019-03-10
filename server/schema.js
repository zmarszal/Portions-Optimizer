const {gql} = require('apollo-server-express')
const fetch = require('node-fetch')
const {URLSearchParams} = require('url')

typeDefs = gql`
  type FoodList {
    tag_id: ID
    food_name: String
    nf_calories: Float
    nf_total_carbohydrate: Float
    nf_total_fat: Float
    nf_protein: Float
    serving_qty: Float
    serving_unit: String
  }

  type Query {
    foods(search: String): [FoodList]
    foodByName(name: String!): FoodList
  }
`

const resolvers = {
  Query: {
    foods: async function(parent, {search}) {
      let obj
      const queryString = `?query=${search}`

      const res = await fetch(
        'https://trackapi.nutritionix.com/v2/search/instant' + queryString,
        {
          headers: {
            'content-type': 'application/json',
            'x-app-id': process.env.NUTRITIONIX_ID,
            'x-app-key': process.env.NUTRITIONIX_KEY
          }
        }
      )

      obj = await res.json()
      return obj.common
    },
    foodByName: async function(parent, {name}) {
      const params = new URLSearchParams()
      params.append('query', name)
      const res = await fetch(
        'https://trackapi.nutritionix.com/v2/natural/nutrients',
        {
          headers: {
            'x-app-id': process.env.NUTRITIONIX_ID,
            'x-app-key': process.env.NUTRITIONIX_KEY
          },
          method: 'post',
          body: params
        }
      )

      obj = await res.json()
      return obj.foods[0]
    }
  }
}

module.exports = {
  typeDefs,
  resolvers
}
