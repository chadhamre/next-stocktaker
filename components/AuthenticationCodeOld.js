import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Card } from '@shopify/polaris'
var QRCode = require('qrcode.react')

const GET_SHOP_INFO = gql`
  query {
    shop {
      id
      name
      myshopifyDomain
    }
  }
`
class AuthenticationCode extends React.Component {
  render() {
    return (
      <Query query={GET_SHOP_INFO}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading…</div>
          if (error) return <div>{error.message}</div>
          return (
            <Card>
              <p>{data.shop.name}</p>
              <p>
                <QRCode value="http://facebook.github.io/react/" size="300" />
              </p>
            </Card>
          )
        }}
      </Query>
    )
  }
}

export default AuthenticationCode
