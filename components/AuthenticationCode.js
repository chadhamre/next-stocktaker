import { Card } from '@shopify/polaris'
var QRCode = require('qrcode.react')
import store from 'store-js'
import Cookies from 'js-cookie'

function AuthenticationCode({ secretCode }) {
  const code = secretCode ? secretCode : Cookies.get('secretCode')
  if (secretCode)
    return (
      <Card>
        <QRCode value={secretCode} size={300} />
      </Card>
    )
  else return <Card>Problemo</Card>
}

export default AuthenticationCode
