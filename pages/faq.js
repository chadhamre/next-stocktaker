import {
  Card,
  Heading,
  Layout,
  Page,
  TextContainer,
  TextStyle,
} from '@shopify/polaris'
import { TitleBar } from '@shopify/app-bridge-react'

const Help = () => (
  <Page>
    <TitleBar
      primaryAction={{
        content: 'Get Help',
        onAction: () => {
          window.open('mailto:hello@saskatoonlabs.com?subject=StockTaker')
        },
      }}
    />
    <Layout>
      <Layout.AnnotatedSection
        title="FAQ"
        description="Frequently Asked Questions"
      >
        <Card sectioned>
          <TextContainer spacing="loose">
            <Heading element="h1">What does StockTaker do?</Heading>
            <p>
              StockTaker turns your mobile phone or tablet into a barcode
              scanning machine and helps you do effortless stock counts.
            </p>
            <Heading element="h1">How do I get help?</Heading>
            <p>
              If you need any assistance, please email hello@saskatoonlabs.com.
            </p>
          </TextContainer>
        </Card>
      </Layout.AnnotatedSection>
    </Layout>
  </Page>
)

export default Help
