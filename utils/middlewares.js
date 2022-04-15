const { isAdmin, isRoot } = require('./helper')
const { RateLimit } = require('koa2-ratelimit')

const login = async (ctx, next) => {
  if (!ctx.session || ctx.session.profile == null) ctx.throw(401, 'Login required')
  await next()
}

const admin = async (ctx, next) => {
  if (ctx.session.profile && isAdmin(ctx.session.profile)) {
    return next()
  } else {
    ctx.throw(403, 'Permission denied')
  }
}

const root = async (ctx, next) => {
  if (ctx.session.profile && isRoot(ctx.session.profile)) {
    return next()
  } else {
    ctx.throw(403, 'Permission denied')
  }
}

const handler = async function (ctx) {
  ctx.status = 429
  ctx.body = {
    error: '요청 횟수가 너무 높습니다. 잠시 후에 다시 시도해 보십시오.'
  }
  if (this.options && this.options.headers) {
    ctx.set('Retry-After', Math.ceil(this.options.interval / 1000))
  }
}

const solutionCreateRateLimit = RateLimit.middleware({
  interval: { min: 1 },
  max: 60,
  keyGenerator: async function (ctx) {
    const opt = ctx.request.body
    return `solutions/${opt.pid}| ${ctx.request.ip} `
  },
  handler
})

const userCreateRateLimit = RateLimit.middleware({
  interval: { min: 1 },
  max: 30,
  prefixKey: 'user',
  handler
})

module.exports = {
  solutionCreateRateLimit,
  userCreateRateLimit,
  auth: {
    login,
    admin,
    root
  }
}
