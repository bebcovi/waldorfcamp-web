// @flow
import * as React from 'react'
import { graphql } from 'gatsby'
import styled from 'react-emotion'
import ordinal from 'ordinal'
import Layout from '../components/layout'
import Container from '../components/container'
import Text from '../components/text'
import { Button } from '../components/button'
import Modal from '../components/modal'
import PriceCalculator from '../components/price-calculator'
import * as Icon from '../components/icons'
import { fromHrkToEur } from '../utils/currency'
import { capitalize } from '../utils/string'
import type { Price } from '../types'

const Heading = styled.div`
  ${props => props.theme.mq.sm} {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`

const CalculateButton = styled(Button)`
  ${props => props.theme.mqMax.sm} {
    margin-bottom: 1rem;
  }
`

const Address = styled.address`
  margin: 1rem 0;
  font-style: normal;
  border-left: 0.25rem solid ${props => props.theme.colors.secondary};
  padding-left: 1rem;
  color: rgba(0, 0, 0, 0.5);
  strong {
    color: ${props => props.theme.colors.secondary};
  }
`

const Spacer = styled.div`
  height: 1rem;
`

type Props = {
  data: {
    site: {
      siteMetadata: {
        durationInDays: number,
        price: Price,
        links: {
          register: string,
        },
      },
    },
  },
}

type State = {
  calculatorOpen: boolean,
}

class PricingPage extends React.Component<Props, State> {
  state = {
    calculatorOpen: false,
  }

  render() {
    const { durationInDays, price, links } = this.props.data.site.siteMetadata
    const { calculatorOpen } = this.state
    const lunchDiscounts: string[] = price.discounts.lunch.byAge.map(
      ({ age, amount }) => {
        let text
        if (age.min === 0) {
          text = `for children up to ${
            age.max
          } years old the price is ${amount} HRK`
        } else {
          text = `for children aged from ${age.min} to ${
            age.max
          } the price is ${amount} HRK`
        }
        return text
      },
    )
    return (
      <Layout>
        <Container>
          <Modal
            isOpen={calculatorOpen}
            title="Calculate Your Cost"
            onRequestClose={() => {
              this.setState({ calculatorOpen: false })
            }}
          >
            <PriceCalculator price={price} days={durationInDays} />
          </Modal>
          <Text>
            <Heading>
              <h1>Pricing</h1>
              <CalculateButton
                type="button"
                onClick={() => {
                  this.setState({ calculatorOpen: true })
                }}
              >
                <Icon.Calculator size={24} />
                <div>Calculate your cost</div>
              </CalculateButton>
            </Heading>
            <h2>Participation Fee</h2>
            <p>
              The participation fee for the two weeks is{' '}
              <strong>{price.participationFee} €</strong> per person, but
              families with children have following discounts:
            </p>
            <ol>
              {price.discounts.participationFee.byAge.map(
                ({ age, discount }) => {
                  const suffix =
                    discount === 1
                      ? 'do not pay the participation fee'
                      : `have a ${discount * 100}% discount`
                  let content
                  if (age.min === 0) {
                    content = `children under ${age.max} years old ${suffix}`
                  } else if (age.min === age.max) {
                    content = `${age.min}-year-old children ${suffix}`
                  } else {
                    content = `children aged from ${age.min} to ${
                      age.max
                    } ${suffix}`
                  }
                  return <li key={`${age.min}-${age.max}`}>{content}</li>
                },
              )}
              {price.discounts.participationFee.byOrder.map(
                ({ order, discount }) => {
                  let suffix
                  if (discount === 1) {
                    suffix = `does not pay the participation fee`
                  } else {
                    suffix = `has a ${discount * 100}% discount`
                  }
                  return (
                    <li key={order}>
                      the {ordinal(order)} child {suffix}
                    </li>
                  )
                },
              )}
            </ol>
            <p>
              In cases where multiple discounts are applicable to the same
              child, e.g. when a child is 5 years old and also the 2nd child,
              apply whichever discount is bigger—in our example that would be
              50% instead of 20%.
            </p>
            <p>
              Before payment you need to <a href={links.register}>register</a>,
              afterwards you can pay the participation fee to Kvija's bank
              account:
            </p>
            <Address>
              <div>
                <strong>Udruga Kvija</strong>
              </div>
              <div>Gundulićeva 3</div>
              <div>10000 Zagreb</div>
              <div>2402006-1100625588</div>
              <div>
                <abbr title="International Bank Account Number">IBAN</abbr>:
                HR0424020061100625588
              </div>
              <div>
                <abbr title="Bank Identifier Code">BIC</abbr>: ESBC HR 22
              </div>
            </Address>
            <h2>Accommodation</h2>
            <p>
              The accommodation is organized in family apartments on the island.
              We are placed in several houses with bath and kitchen. The price
              per bed depends on the apartment and the number of people staying,
              so it’s{' '}
              <strong>
                {price.accommodation.min}-{price.accommodation.max} €
              </strong>{' '}
              per person per night. The accommodation should be booked by
              organizers in order for you to be regarded as a Waldorf Camp
              participant. Tourist tax should be paid separately to the tourist
              office the very first day of the camp:{' '}
              <strong>{price.touristTax} €</strong> per day per person older
              than 12 years.
            </p>
            <p>
              Accommodation needs to be paid directly to the landlord within the
              first two days upon arriving to Olib!
            </p>
            <h2>Food</h2>
            <p>
              <>
                Lunch is obligatory and is organized in the main Olib’s
                restaurant called “Zadruga” wich is also our meeting point. The
                price for lunch will be <strong>{price.lunch} HRK</strong>{' '}
                (approximately <strong>{fromHrkToEur(price.lunch)} €</strong>)
                including soup, main dish, salad and dessert.{' '}
              </>
              {lunchDiscounts.length > 1 ? (
                <>Children have the following discounts:</>
              ) : (
                `${capitalize(lunchDiscounts[0] || '')}.`
              )}
            </p>
            {lunchDiscounts.length > 1 ? (
              <ol>
                {lunchDiscounts.map(content => (
                  <li key={content}>{content}</li>
                ))}
              </ol>
            ) : null}
          </Text>
          <Spacer />
        </Container>
      </Layout>
    )
  }
}

export const query = graphql`
  query PricingPageQuery {
    site {
      siteMetadata {
        durationInDays
        price {
          participationFee
          accommodation {
            min
            max
          }
          touristTax
          lunch
          discounts {
            participationFee {
              byAge {
                age {
                  min
                  max
                }
                discount
              }
              byOrder {
                order
                discount
              }
            }
            lunch {
              byAge {
                age {
                  min
                  max
                }
                amount
              }
            }
          }
        }
        links {
          register
        }
      }
    }
  }
`

export default PricingPage
