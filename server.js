require('isomorphic-fetch')

const { Account } = require('./db.js')
const { ApiVersion } = require('@shopify/koa-shopify-graphql-proxy')
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth')
const { default: graphQLProxy } = require('@shopify/koa-shopify-graphql-proxy')
const { v4: uuidv4 } = require('uuid')
const { verifyRequest } = require('@shopify/koa-shopify-auth')
const { receiveWebhook } = require('@shopify/koa-shopify-webhooks')
const dotenv = require('dotenv')
const Koa = require('koa')
const logger = require('koa-logger')
const next = require('next')
const Router = require('koa-router')
const session = require('koa-session')

dotenv.config()
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev })
const handle = app.getRequestHandler()

const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY, HOST } = process.env

app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()

  server.use(logger())
  server.use(session({ secure: true, sameSite: 'none' }, server))
  server.keys = [SHOPIFY_API_SECRET_KEY]

  server.use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET_KEY,
      scopes: [
        'read_products',
        'read_inventory',
        'write_inventory',
        'read_locations',
      ],
      accessMode: 'offline',
      async afterAuth(ctx) {
        try {
          const { shop, accessToken, _expire } = ctx.session
          ctx.cookies.set('shopOrigin', shop, {
            httpOnly: false,
            secure: true,
            sameSite: 'none',
          })
          const secretCode = uuidv4()
          console.log('NEW SECRET CODE', shop, secretCode)
          ctx.cookies.set('secretCode', secretCode, {
            httpOnly: false,
            secure: true,
            sameSite: 'none',
          })
          const account = await Account.upsert({
            shopifyToken: accessToken,
            shopifyShop: shop,
            shopifyTokenExpiresAt: _expire,
            cycleToken: secretCode,
          })
        } catch (err) {
          console.log(err)
        }

        ctx.redirect('/')
      },
    })
  )

  const webhook = receiveWebhook({ secret: SHOPIFY_API_SECRET_KEY })

  router.post('/webhooks/customers/redact', webhook, (ctx) => {
    console.log('received webhook: ', ctx.state.webhook)
  })
  router.post('/webhooks/customers/data_request', webhook, (ctx) => {
    console.log('received webhook: ', ctx.state.webhook)
  })
  router.post('/webhooks/shop/redact', webhook, (ctx) => {
    console.log('received webhook: ', ctx.state.webhook)
  })

  server.use(graphQLProxy({ version: ApiVersion.July20 }))

  router.get('/(.*)', verifyRequest(), async (ctx) => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
    ctx.res.statusCode = 200
  })

  server.use(router.allowedMethods())
  server.use(router.routes())

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})
