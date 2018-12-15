const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'

    this.middlewares()
    this.views()
    this.routes()
  }

  middlewares () {
    this.express.use(express.urlencoded({ extended: false }))
    this.express.use(
      session({
        store: new RedisStore({
          host: '127.0.0.1',
          port: '6379'
        }),
        secret: 'SecretAPP',
        resave: false,
        saveUnitialized: true
      })
    )
  }

  views () {
    nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
      autoescape: true,
      express: this.express,
      watch: this.isDev
    })

    this.express.set('view engine', 'njk')
  }

  routes () {
    this.express.use(require('./routes'))
  }
}

module.exports = new App().express
