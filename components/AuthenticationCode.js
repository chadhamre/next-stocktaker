import { Card, Page, Layout, Banner, TextContainer } from '@shopify/polaris'
var QRCode = require('qrcode.react')
import store from 'store-js'
import Cookies from 'js-cookie'

function AuthenticationCode({ secretCode }) {
  const code = secretCode ? secretCode : Cookies.get('secretCode')
  if (secretCode)
    return (
      <Page>
        <Layout.Section>
          <Banner title="Installation" status="success">
            <p>StockTaker is installed successfully is ready to use.</p>
          </Banner>
        </Layout.Section>
        <Layout.AnnotatedSection
          title="Welcome to Stock Taker"
          description="To complete a stock count, download our mobile app on the Apple or Google app stores."
        >
          <Card title="Your QR Code" sectioned>
            <TextContainer spacing="loose">
              <p>
                Scan this code with the StockTaker App on your Phone or Tablet
                to sign in.
              </p>
              <QRCode value={secretCode} size={200} />
            </TextContainer>
          </Card>
        </Layout.AnnotatedSection>
      </Page>
    )
  else return <Card>Problemo</Card>
}

export default AuthenticationCode
