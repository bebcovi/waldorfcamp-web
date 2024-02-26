// @flow
import * as React from 'react'
import styled from 'styled-components'
import ordinal from 'ordinal'
import Container from '../components/container'
import Text from '../components/text'
// import { Button } from '../components/button'
// import Modal from '../components/modal'
// import PriceCalculator from '../components/price-calculator'
// import * as Icon from '../components/icons'
import { capitalize } from '../utils/string'
import type { Price } from '../types'
import site from '../site'

const Heading = styled.div`
  ${props => props.theme.mq.sm} {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`

// const CalculateButton = styled(Button)`
//   ${props => props.theme.mqMax.sm} {
//     margin-bottom: 1rem;
//   }
// `

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

type State = {
  calculatorOpen: boolean,
}

class PricingPage extends React.Component<{}, State> {
  // state = {
  //   calculatorOpen: false,
  // }

  render() {
    // const { calculatorOpen } = this.state
    const price: Price = site.price
    const lunchDiscounts: string[] = price.discounts.lunch.byAge.map(
      ({ age, amount }) => {
        let text
        if (age.min === 0) {
          text = `for children up to ${age.max} years old the price is ${amount} EUR`
        } else {
          text = `for children aged from ${age.min} to ${age.max} the price is ${amount} EUR`
        }
        return text
      },
    )
    return (
      <main>
        <Container>
          {/* <Modal
            isOpen={calculatorOpen}
            title="Calculate Your Cost"
            onRequestClose={() => {
              this.setState({ calculatorOpen: false })
            }}
          >
            <PriceCalculator price={price} days={site.durationInDays} />
          </Modal> */}
          <Text>
            <Heading>
              <h1>Pricing</h1>
              {/* <CalculateButton
                type="button"
                onClick={() => {
                  this.setState({ calculatorOpen: true })
                }}
              >
                <Icon.Calculator size={24} />
                <div>Calculate your cost</div>
              </CalculateButton> */}
            </Heading>
            <h2>Participation Fee</h2>
            <p>
              The participation fee for the two weeks is{' '}
              <strong>{price.participationFee} €*</strong> per person(regardless of how long the participant will stay) whose deadline is 01.06.2024. and in that way participant will confirm his arrival.
              <br></br><br></br>We reserve the right to change or modify conditions(price etc.).<br></br><br></br>Families with children have following discounts:
            </p>
            <ol>
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
              <li>etc.</li>
            </ol>
            <p>
              In cases where multiple discounts are applicable to the same
              child, e.g. when a child is 5 years old and also the 2nd child,
              apply whichever discount is bigger—in our example that would be
              50% instead of 20%.
            </p>
            <p>
              Before payment you need to
              <a href={site.links.register}> register</a>, afterwards you can pay
              the participation fee to Kvija's bank account:
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
              so it’s cca.{' '}
              <strong>
              {price.accommodation.min}-{price.accommodation.max} €*
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
                restaurant called “Gostionica Olib” wich is also our meeting
                point. The price for lunch will be{' '}
                <strong>{price.lunch} EUR*</strong> including soup, main dish,
                salad and dessert.{' '}
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
            {/*<p>The participation fee, accommodation and lunch price and all important information will be soon announced.  </p>*/}
            <p>* The participation fee, accommodation and lunch prices may change slightly.  </p>
          </Text>
          <Spacer />
        </Container>
      </main>
    )
  }
}

export default PricingPage
