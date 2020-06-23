import { Layout, Page, TextStyle } from '@shopify/polaris'
import { TitleBar } from '@shopify/app-bridge-react'
import store from 'store-js'
import AuthenticationCode from '../components/AuthenticationCode'

class Index extends React.Component {
  static async getInitialProps() {
    const secretCode = store.get('secretCode')
    return { secretCode }
  }

  render() {
    return (
      <Page>
        <TitleBar />
        <AuthenticationCode secretCode={this.props.secretCode} />
      </Page>
    )
  }
}
export default Index
