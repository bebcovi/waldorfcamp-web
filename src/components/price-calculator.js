// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'
import { shade, transparentize } from 'polished'
import { updateIn, setIn, removeIn } from 'immutable'
import { range } from 'lodash'
import uuid from 'uuid'
import * as Icon from './icons'
import type { Price } from '../types'

const MAX_NUMBER_OF_PEOPLE = 25

const createPerson = () => ({
  id: uuid(),
  isChild: false,
  age: 0,
  isAgeBlank: false,
})

const Person = styled.div`
  position: relative;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
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
  margin: 0;
  padding: 0;
  appearance: button;
  user-select: none;

  display: block;
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.25rem;
  transform: translate(50%, -50%);
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
  ${props =>
    props.disabled
      ? css`
          opacity: 0.5;
        `
      : null} &:last-child {
    margin-bottom: 0;
  }
`
const Field = styled.input`
  padding: 0.5rem;
  border: 0;
  background: ${shade(0.85, '#fff')};
  border-radius: 0.25rem;
  ${props =>
    props.fullWidth
      ? css`
          display: block;
          width: 100%;
          margin-top: 0.25rem;
        `
      : null};
`
const ValidationMessage = styled.div`
  height: 1.35rem;
  line-height: 1.35rem;
  font-size: 0.85rem;
  color: ${props => props.theme.colors[props.type]};
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
`

type Props = {
  price: Price,
  days: number,
}

type State = {
  isNumberOfPeopleBlank: boolean,
  exceededMaxPeople: boolean,
  people: Array<{
    id: string,
    isChild: boolean,
    age: number,
    isAgeBlank: boolean,
  }>,
}

class PriceCalculator extends React.Component<Props, State> {
  state = {
    isNumberOfPeopleBlank: false,
    exceededMaxPeople: false,
    people: [createPerson()],
  }

  render() {
    const { price, days } = this.props
    const { isNumberOfPeopleBlank, exceededMaxPeople, people } = this.state

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
            (price.participationFee * (1 * 10 - biggerDiscount * 10)) / 10
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
        let amount
        if (isChild) {
          amount =
            price.discounts.lunch.byAge.find(
              discount => age >= discount.age.min && age <= discount.age.max,
            )?.amount || price.lunch
        } else {
          amount = price.lunch
        }
        return total + amount
      }, 0) * days

    const totalBase = participationFee + touristTax + lunch
    const totalMin = totalBase + accommodationMin
    const totalMax = totalBase + accommodationMax
    const total = `${Math.round(totalMin)}-${Math.round(totalMax)}`

    return (
      <>
        <Label>
          <div>Number of members of your family</div>
          <Field
            fullWidth
            type="number"
            value={isNumberOfPeopleBlank ? '' : people.length}
            data-testid="people-count"
            onChange={event => {
              const originalValue = event.target.value
              const convertedValue = Number(originalValue)
              if (!Number.isNaN(convertedValue) && convertedValue >= 0) {
                this.setState(state => ({
                  ...state,
                  isNumberOfPeopleBlank: originalValue === '',
                  exceededMaxPeople: originalValue > MAX_NUMBER_OF_PEOPLE,
                  people:
                    convertedValue > people.length
                      ? people
                          .concat(
                            range(convertedValue - people.length).map(
                              createPerson,
                            ),
                          )
                          .slice(
                            0,
                            Math.min(convertedValue, MAX_NUMBER_OF_PEOPLE),
                          )
                      : people.slice(
                          0,
                          Math.min(convertedValue, MAX_NUMBER_OF_PEOPLE),
                        ),
                }))
              }
            }}
          />
          <ValidationMessage type="warning">
            {exceededMaxPeople
              ? `Maximum number of people is ${MAX_NUMBER_OF_PEOPLE}.`
              : null}
          </ValidationMessage>
        </Label>

        {people.map(({ id, isChild, age, isAgeBlank }, i) => (
          <Person key={id} data-testid={`person-${i + 1}`}>
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
                data-testid={`person-is-child-${i + 1}`}
                onChange={event => {
                  const { checked } = event.target
                  this.setState(state =>
                    setIn(state, ['people', i, 'isChild'], checked),
                  )
                }}
              />
              <div>Is this a child?</div>
            </Label>

            <Label disabled={!isChild}>
              <div>Age</div>
              <Field
                disabled={!isChild}
                fullWidth
                type="number"
                value={isAgeBlank ? '' : age}
                data-testid={`person-age-${i + 1}`}
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
          </Person>
        ))}

        {people.length > 0 ? (
          <>
            <CostBreakdown>
              <CostItem>
                <b>Participation fee</b>:{' '}
                <span data-testid="total-participation-fee">
                  {participationFee}
                </span>{' '}
                €
              </CostItem>
              <CostItem>
                <b>Accommodation</b>: about {accommodation} €
              </CostItem>
              <CostItem data-testid="lunch-total">
                <b>Lunch</b>: {Math.round(lunch)} €
              </CostItem>
              <CostItem>
                <b>Tourist tax</b>: {Math.round(touristTax)} €
              </CostItem>
            </CostBreakdown>
            <TotalCost>
              <b>Total</b>: about <span data-testid="total-cost">{total}</span>{' '}
              €
            </TotalCost>
          </>
        ) : null}
      </>
    )
  }
}

export default PriceCalculator
