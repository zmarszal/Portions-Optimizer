const router = require('express').Router()
const Request = require('request')

router.get('/', (req, res, next) => {
  try {
    const {search} = req.body
    const queryString = `?query=${search}`
    Request.get(
      {
        headers: {
          'content-type': 'application/json',
          'x-app-id': process.env.NUTRITIONIX_ID,
          'x-app-key': process.env.NUTRITIONIX_KEY
        },
        url: 'https://trackapi.nutritionix.com/v2/search/instant' + queryString
      },
      (error, response, body) => {
        if (error) console.log(err)
        else {
          const newBody = JSON.parse(body)
          res.json(newBody)
        }
      }
    )
  } catch (err) {
    next(err)
  }
})

module.exports = router
