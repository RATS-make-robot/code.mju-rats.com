require('dotenv-flow').config()

const Koa = require('koa')
const koaLogger = require('koa-logger')
const bodyparser = require('koa-body')
const staticServe = require('koa-static')
const path = require('path')
const session = require('koa-session')
const send = require('koa-send')
const config = require('./config')
const router = require('./routes')
const logger = require('./utils/logger')
const setup = require('./config/setup')
require('./config/db')
config.port = 8888;

const app = new Koa()

// Log, Method, Router 표시
app.use(koaLogger())

app.keys = [config.secretKey]

app.use(session({
  key: 'koa:oj:sess',
  maxAge: 7 * 24 * 60 * 60 * 60 * 1000, // ms
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true /** (boolean) signed or not (default true) */
}, app))

app.use(bodyparser({
  formidable: {
    uploadDir: path.resolve(__dirname, 'public/uploads')
  },
  multipart: true,
  urlencoded: true
}))

app.use(staticServe(path.join(__dirname, 'public'), {
  maxage: 7 * 24 * 60 * 60 // 캐시 (7일)
}))

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = {
      error: err.message
    }
    logger.error(`${err.status} -- ${err.message}\n${err.stack}`)
  }
})

app.use(async (ctx, next) => {
  await next()
  if (ctx.status === 404) {
    return send(ctx, 'public/index.html')
  }
})

app.use(router.routes()).use(router.allowedMethods())

// do not start on 'test'
if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, async () => {
    await setup()
    logger.info('The server is running at http://localhost:' + config.port)
  })
}

module.exports = app
