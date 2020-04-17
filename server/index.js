import Koa from 'koa'
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

import mongoose from 'mongoose'
import bodyParser from 'koa-bodyparser' // 处理post相关的请求, 不安装的话users接口中post请求的参数拿不到
import session from 'koa-generic-session' // 处理session相关
import Redis from 'koa-redis'
import json from 'koa-json'
import dbConfig from './dbs/config'
import passport from './interface/utils/passport'
import users from './interface/users'

const app = new Koa()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

/**
 * session 配置
 */
app.keys = ['mt', 'keyskeys'] 
app.proxy = true
app.use(session({
  key: 'mt',
  prefix: 'mt:uid',
  store: new Redis()
}))

/**
 * post 处理
 */
app.use(bodyParser({
  extendTypes: ['json', 'form', 'text']
}))
app.use(json())

/**
 * mongoose 数据库连接
 */
mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true
})

/**
 * passport
 */
app.use(passport.initialize())
app.use(passport.session())

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server



  await nuxt.ready()
  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  /**
   * 使用路由
   */
  app.use(users.routers()).use(users.allowedMethods())

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
