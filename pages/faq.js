import {
  Card,
  Heading,
  Layout,
  List,
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
            <Heading element="h1">How do you use StockTaker?</Heading>
            <p>
              <List type="bullet">
                <List.Item>
                  Download StockTaker mobile app from the iOS and Google app
                  stores.
                </List.Item>
                <List.Item>
                  Install StockTaker on your Shopify store, this will generate a
                  QR code.
                </List.Item>
                <List.Item>
                  Scan this QR code sign into your StockTaker account.
                </List.Item>
                <List.Item>
                  Select your inventory location for the stock count.
                </List.Item>
                <List.Item>
                  Scan barcodes using the camera on your mobile device.
                </List.Item>
                <List.Item>
                  Once your'e done scanning, decide if you want to Add, Subtract
                  or Overwrite inventory counts.
                </List.Item>
                <List.Item>
                  Also decide if you want to include all related variants in the
                  count.
                </List.Item>
                <List.Item>
                  Press OK to update you inventory on Shopify.
                </List.Item>
                <List.Item>
                  After completing, you'll be emailed a CSV report of all the
                  changes made.
                </List.Item>
              </List>
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
