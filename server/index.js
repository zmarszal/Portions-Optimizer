const path = require('path')
const express = require('express')
const morgan = require('morgan')
const compression = require('compression')
const PORT = process.env.PORT || 8080
const {resolvers, typeDefs} = require('./schema')
const {ApolloServer} = require('apollo-server-express')
const app = express()
module.exports = app

if (process.env.NODE_ENV !== 'production') require('../secrets')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true
})

server.applyMiddleware({app})

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(compression())

app.use(express.static(path.join(__dirname, '..', 'public')))

app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found')
    err.status = 404
    next(err)
  } else {
    next()
  }
})

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
})

app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})

app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))
