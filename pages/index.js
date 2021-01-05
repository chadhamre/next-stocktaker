import { Layout, Page, TextStyle } from '@shopify/polaris'
import { TitleBar } from '@shopify/app-bridge-react'
import store from 'store-js'
import AuthenticationCode from '../components/AuthenticationCode'

class Index extends React.Component {
  static async getInitialProps() {
    const secretCode = store.get('secretCode')
    console.log('STORE', store)
    return { secretCode }
  }

  render() {
    return (
      <Page>
        <TitleBar
          primaryAction={{
            content: 'Get Help',
            onAction: () => {
              window.open('mailto:hello@saskatoonlabs.com?subject=StockTaker')
            },
          }}
        />
        <AuthenticationCode secretCode={this.props.secretCode} />
      </Page>
    )
  }
}
export default Index
