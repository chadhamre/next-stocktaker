import {
  Card,
  Page,
  Layout,
  Banner,
  TextContainer,
  Spinner,
} from '@shopify/polaris'
var QRCode = require('qrcode.react')
import store from 'store-js'
import Cookies from 'js-cookie'

class AuthenticationCode extends React.Component {
  constructor(props) {
    super(props)
    this.state = { secret: null }
  }

  componentDidMount() {
    const code = this.props.secretCode
      ? this.props.secretCode
      : Cookies.get('secretCode')
    this.setState({ secret: code })
  }
  render() {
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
              {this.state.secret ? (
                <QRCode value={this.state.secret} size={200} />
              ) : (
                <Spinner
                  accessibilityLabel="Loading"
                  size="large"
                  color="teal"
                />
              )}
            </TextContainer>
          </Card>
        </Layout.AnnotatedSection>
      </Page>
    )
  }
}

export default AuthenticationCode
