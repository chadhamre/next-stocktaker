import { Layout, Page, TextStyle } from '@shopify/polaris'
import { TitleBar } from '@shopify/app-bridge-react'
import store from 'store-js'
import AuthenticationCode from '../components/AuthenticationCode'

class Index extends React.Component {
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
        <AuthenticationCode />
      </Page>
    )
  }
}
export default Index
