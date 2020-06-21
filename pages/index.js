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
        <Layout>
          <TextStyle variation="positive">
            Scan this to sign in with our app .
          </TextStyle>
          <AuthenticationCode secretCode={this.props.secretCode} />
        </Layout>
      </Page>
    )
  }
}
export default Index
