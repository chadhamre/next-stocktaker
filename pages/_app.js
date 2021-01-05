import '@shopify/polaris/dist/styles.css'
import ApolloClient from 'apollo-boost'
import App from 'next/app'
import Cookies from 'js-cookie'
import Head from 'next/head'
import translations from '@shopify/polaris/locales/en.json'
import React from 'react'

import { ApolloProvider } from 'react-apollo'
import { AppProvider } from '@shopify/polaris'
import { Provider } from '@shopify/app-bridge-react'

const client = new ApolloClient({
  fetchOptions: {
    credentials: 'include',
  },
})

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    const config = {
      apiKey: API_KEY,
      shopOrigin: Cookies.get('shopOrigin'),
      forceRedirect: true,
    }
    return (
      <React.Fragment>
        <Head>
          <title>Sample App</title>
          <meta charSet="utf-8" />
        </Head>
        <Provider config={config}>
          <AppProvider i18n={translations}>
            <ApolloProvider client={client}>
              <Component {...pageProps} />
            </ApolloProvider>
          </AppProvider>
        </Provider>
      </React.Fragment>
    )
  }
}

export default MyApp
