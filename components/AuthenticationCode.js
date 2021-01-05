import {
  Banner,
  Card,
  Heading,
  Layout,
  Page,
  Spinner,
  TextContainer,
} from '@shopify/polaris'
var QRCode = require('qrcode.react')
import store from 'store-js'
import Cookies from 'js-cookie'
import MobileStoreButton from 'react-mobile-store-button'

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
    console.log('STATE', this.state)
  }
  render() {
    const styles = {
      buttonHolder: {
        display: 'flex',
        backgroundColor: 'pink',
      },
      iosHolder: {
        marginTop: 26,
        paddingLeft: 10,
      },
    }
    const annotationDescription = (
      <div>
        <p>
          To complete a stock count, download our mobile app on the Apple or
          Google app stores.
        </p>
        <p>
          <div style={styles.iosHolder}>
            <MobileStoreButton
              height={40}
              store="ios"
              url="https://apps.apple.com/us/app/id1519697792"
              linkProps={{ title: 'iOS' }}
            />
          </div>
          <div>
            <MobileStoreButton
              height={60}
              store="android"
              url="https://play.google.com/store/apps/details?id=com.chadhamre.stocktaker"
              linkProps={{ title: 'Android' }}
            />
          </div>
        </p>
      </div>
    )
    return (
      <Page>
        <Layout.Section>
          <Banner title="Installation" status="success">
            <p>StockTaker is installed successfully is ready to use.</p>
          </Banner>
        </Layout.Section>
        <Layout.AnnotatedSection
          title="Welcome to StockTaker"
          description={annotationDescription}
        >
          <Card title="Use this QR code" sectioned>
            <TextContainer spacing="loose">
              <p>
                Scan this code with the StockTaker App on your Phone or Tablet.
              </p>
              {this.state.secret ? (
                <QRCode value={this.state.secret} size={220} />
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
