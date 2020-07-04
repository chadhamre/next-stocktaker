require('isomorphic-fetch')

const { Account } = require('./db.js')
const { ApiVersion } = require('@shopify/koa-shopify-graphql-proxy')
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth')
const { default: graphQLProxy } = require('@shopify/koa-shopify-graphql-proxy')
const { v4: uuidv4 } = require('uuid')
const { verifyRequest } = require('@shopify/koa-shopify-auth')
const dotenv = require('dotenv')
const Koa = require('koa')
const logger = require('koa-logger')
const next = require('next')
const session = require('koa-session')
const store = require('store-js')

dotenv.config()
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY } = process.env

app.prepare().then(() => {
  const server = new Koa()

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
          store.set('secretCode', secretCode)
        } catch (err) {
          console.log(err)
        }

        ctx.redirect('/')
      },
    })
  )

  server.use(graphQLProxy({ version: ApiVersion.October19 }))
  server.use(verifyRequest())
  server.use(async (ctx) => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
    ctx.res.statusCode = 200
    return
  })

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})
