// @flow
import * as React from 'react'
import styled, { css } from 'react-emotion'
import { shade, transparentize } from 'polished'
import { update, updateIn, setIn, removeIn } from 'immutable'
import { range } from 'lodash'
import uuid from 'uuid'
import * as Icon from '../components/icons'
import type { Price } from '../types'

const createPerson = () => ({
  id: uuid(),
  eatsDinner: false,
  isChild: false,
  age: 0,
  isAgeBlank: false,
})

const Person = styled.div`
  position: relative;
  margin-top: 1.5rem;
  padding: 1rem 0.75rem 0.75rem;
  border: 1px dashed ${shade(0.7, '#fff')};
  border-radius: 0.25rem;
`
const PersonTitle = styled.h4`
  position: absolute;
  top: -0.6rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0 0.5rem;
  background: ${shade(0.9, '#fff')};
  border: 1px solid ${shade(0.7, '#fff')};
  border-radius: 10px;
  white-space: nowrap;
  text-transform: lowercase;
  font-variant: small-caps;
  font-size: 0.75rem;
`
const PersonClose = styled.button`
  background: none;
  border: 0;
  color: inherit;
  font: inherit;
  line-height: normal;
  overflow: visible;
  padding: 0;
  appearance: button;
  user-select: none;

  display: block;
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  cursor: pointer;
  background: ${shade(0.5, '#fff')};
  border-radius: 50%;
  line-height: 0;
  color: #fff;
  &:hover,
  &:focus {
    background: ${shade(0.25, '#fff')};
  }
`

const inlineLabel = css`
  display: flex;
  align-items: center;
  [type='checkbox'] {
    margin-right: 0.5rem;
  }
`
const blockLabel = css`
  display: block;
`
const Label = styled.label`
  ${props => (props.inline ? inlineLabel : blockLabel)};
  &:last-child {
    margin-bottom: 0;
  }
`
const Field = styled.input`
  padding: 0.5rem;
  border: 0;
  background: ${shade(0.85, '#fff')};
  border-radius: 0.25rem;
  ${props =>
    props.fullWidth &&
    css`
      display: block;
      width: 100%;
      margin-top: 0.25rem;
    `};
`

const CostBreakdown = styled.ul`
  display: block;
  list-style: disc;
  padding-left: 1rem;
  margin-top: 1rem;
  color: rgba(0, 0, 0, 0.5);
  b {
    font-weight: normal;
    color: #000;
  }
`
const CostItem = styled.li``
const TotalCost = styled.div`
  margin-top: 1rem;
  padding: 0.25rem;
  border: 0.25rem solid
    ${props => transparentize(0.75, props.theme.colors.secondary)};
  border-left: 0;
  border-right: 0;
  font-size: 1.25rem;
  color: ${props => props.theme.colors.secondary};
  text-align: center;
  text-transform: uppercase;
`

type Props = {
  price: Price,
  days: number,
}
type State = {
  people: Array<{
    id: string,
    eatsDinner: boolean,
    isChild: boolean,
    age: number,
    isAgeBlank: boolean,
  }>,
}

class PriceCalculator extends React.Component<Props, State> {
  state = {
    people: [createPerson()],
  }

  render() {
    const { price, days } = this.props
    const { people } = this.state

    const participationFee: number = people.reduce(
      (total, { isChild, age }, i) => {
        if (isChild) {
          const order =
            people.filter(
              (person, j) =>
                person.isChild &&
                (person.age < age || (person.age === age && j < i)),
            ).length + 1
          const {
            discount: discountByAge,
          } = price.discounts.participationFee.byAge.find(
            discount => age >= discount.age.min && age <= discount.age.max,
          ) || { discount: 0 }
          const {
            discount: discountByOrder,
          } = price.discounts.participationFee.byOrder.find(
            discount => order === discount.order,
          ) || { discount: 0 }
          const biggerDiscount = Math.max(discountByAge, discountByOrder)
          const participationFee =
            price.participationFee * (1 * 10 - biggerDiscount * 10) / 10
          return total + participationFee
        }
        return total + price.participationFee
      },
      0,
    )

    const accommodationMin = people.length * price.accommodation.min * days
    const accommodationMax = people.length * price.accommodation.max * days
    const accommodation = `${Math.round(accommodationMin)}-${Math.round(
      accommodationMax,
    )}`

    const touristTax =
      people.filter(({ isChild, age }) => !isChild || age > 12).length *
      price.touristTax *
      days

    const lunch =
      people.reduce((total, { isChild, age }) => {
        if (isChild) {
          const { discount } = price.discounts.lunch.byAge.find(
            discount => age >= discount.age.min && age <= discount.age.max,
          ) || { discount: 1 }
          const lunchPrice = price.lunch * (1 * 10 - discount * 10) / 10
          return total + lunchPrice
        }
        return total + price.lunch
      }, 0) * days

    const dinner =
      people.reduce((total, { eatsDinner }) => {
        if (eatsDinner) {
          return total + price.dinner
        }
        return total
      }, 0) * days

    const totalBase = participationFee + touristTax + lunch + dinner
    const totalMin = totalBase + accommodationMin
    const totalMax = totalBase + accommodationMax
    const total = `${Math.round(totalMin)}-${Math.round(totalMax)}`

    return (
      <React.Fragment>
        <Label>
          <div>Number of members of your family</div>
          <Field
            fullWidth
            type="number"
            value={people.length}
            data-test="people-count"
            onChange={event => {
              const value = Number(event.target.value)
              if (!Number.isNaN(value) && value >= 0) {
                this.setState(state =>
                  update(state, 'people', people => {
                    if (value < people.length) {
                      return people.slice(0, value)
                    } else if (value > people.length) {
                      return people.concat(
                        range(value - people.length).map(createPerson),
                      )
                    }
                    return people
                  }),
                )
              }
            }}
          />
        </Label>

        {people.map(({ id, eatsDinner, isChild, age, isAgeBlank }, i) => (
          <Person key={id} data-test="person">
            <PersonClose
              onClick={() => {
                this.setState(state => removeIn(state, ['people', i]))
              }}
            >
              <Icon.Close size={16} />
            </PersonClose>

            <PersonTitle>Family member {i + 1}</PersonTitle>

            <Label inline>
              <Field
                type="checkbox"
                value={isChild}
                style={{ marginRight: '0.5rem' }}
                data-test="person-is-child"
                onChange={event => {
                  const { checked } = event.target
                  this.setState(state =>
                    setIn(state, ['people', i, 'isChild'], checked),
                  )
                }}
              />
              <div>Is this a child?</div>
            </Label>

            <Label inline>
              <Field
                type="checkbox"
                value={eatsDinner}
                data-test="person-eats-dinner"
                onChange={event => {
                  const { checked } = event.target
                  this.setState(state =>
                    setIn(state, ['people', i, 'eatsDinner'], checked),
                  )
                }}
              />
              <div>Will they eat dinner?</div>
            </Label>

            {isChild ? (
              <Label>
                <div>Age</div>
                <Field
                  fullWidth
                  type="number"
                  value={isAgeBlank ? '' : age}
                  data-test="person-age"
                  onChange={event => {
                    const originalValue = event.target.value
                    const convertedValue = Number(originalValue)
                    if (!Number.isNaN(convertedValue) && convertedValue >= 0) {
                      this.setState(state =>
                        updateIn(state, ['people', i], person => ({
                          ...person,
                          age: convertedValue,
                          isAgeBlank: originalValue === '',
                        })),
                      )
                    }
                  }}
                />
              </Label>
            ) : null}
          </Person>
        ))}

        {people.length > 0 ? (
          <React.Fragment>
            <CostBreakdown>
              <CostItem>
                <b>Participation fee</b>:{' '}
                <span data-test="total-participation-fee">
                  {participationFee}
                </span>{' '}
                €
              </CostItem>
              <CostItem>
                <b>Accommodation</b>: about {accommodation} €
              </CostItem>
              <CostItem>
                <b>Lunch</b>: {Math.round(lunch)} €
              </CostItem>
              <CostItem>
                <b>Dinner</b>: {Math.round(dinner)} €
              </CostItem>
              <CostItem>
                <b>Tourist tax</b>: {Math.round(touristTax)} €
              </CostItem>
            </CostBreakdown>
            <TotalCost>
              <b>Total</b>: about <span data-test="total-cost">{total}</span> €
            </TotalCost>
          </React.Fragment>
        ) : null}
      </React.Fragment>
    )
  }
}

export default PriceCalculator
