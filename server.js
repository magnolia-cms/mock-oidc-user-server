const assert = require('assert')
const camelCase = require('camelcase')

const Provider = require('oidc-provider')

const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 3000

const config = ['CLIENT_ID', 'CLIENT_SECRET', 'CLIENT_REDIRECT_URI', 'CLIENT_LOGOUT_REDIRECT_URI'].reduce((acc, v) => {
  assert(process.env[v], `${v} config missing`)
  acc[camelCase(v)] = process.env[v]
  return acc
}, {})

const oidcConfig = {
  clients: [{
    client_id: config.clientId,
    client_secret: config.clientSecret,
    redirect_uris: [config.clientRedirectUri],
    post_logout_redirect_uris: [config.clientLogoutRedirectUri]
  }]
}

const oidc = new Provider(`http://${host}:${port}`, oidcConfig)

oidc.callback()

oidc.listen(port, () => {
  console.log(`oidc-provider listening on port ${port}, check http://localhost:${port}/.well-known/openid-configuration`)
})
