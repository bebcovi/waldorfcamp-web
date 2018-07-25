// @flow
import React from 'react'
import { render, cleanup, fireEvent } from 'react-testing-library'
import { ThemeProvider } from 'emotion-theming'
import { theme } from '../theme'
import PriceCalculator from './price-calculator'
import config from '../../gatsby-config'

const { price } = config.siteMetadata

const renderWithTheme = element =>
  render(<ThemeProvider theme={theme}>{element}</ThemeProvider>)

describe('price calculator', () => {
  afterEach(cleanup)

  describe('participation fee', () => {
    it.skip('applies discounts for children based on age and order', () => {
      const { getByTestId } = renderWithTheme(
        <PriceCalculator price={price} days={14} />,
      )
      const countField = getByTestId('people-count')
      fireEvent.change(countField, { target: { value: '5' } })
      const peopleIndices = ['2', '3', '4', '5']
      peopleIndices.forEach(index => {
        const isChildCheckbox = getByTestId(`person-is-child-${index}`)
        fireEvent.change(isChildCheckbox, { target: { checked: true } })
        const ageField = getByTestId(`person-age-${index}`)
        fireEvent.change(ageField, {
          target: {
            value: {
              '2': '4',
              '3': '5',
              '4': '6',
              '5': '7',
            }[index],
          },
        })
      })
      const totalParticipationFee = Number(
        getByTestId('total-participation-fee').textContent,
      )
      expect(totalParticipationFee).toBe(
        price.participationFee +
          price.participationFee * 0 +
          price.participationFee * 0.5 +
          price.participationFee * 0.6 +
          price.participationFee * 0.2,
      )
    })

    it('applies discount for the 2nd twin', async () => {
      const { getByTestId } = renderWithTheme(
        <PriceCalculator price={price} days={14} />,
      )
      const countField = getByTestId('people-count')
      countField.value = '3'
      fireEvent.change(countField)
      const peopleIndices = ['2', '3']
      peopleIndices.forEach(index => {
        const isChildCheckbox = getByTestId(`person-is-child-${index}`)
        isChildCheckbox.checked = true
        fireEvent.change(isChildCheckbox)
        const ageField = getByTestId(`person-age-${index}`)
        ageField.value = '6'
        fireEvent.change(ageField)
      })
      const totalParticipationFee = Number(
        getByTestId('total-participation-fee').textContent,
      )
      expect(totalParticipationFee).toBe(
        price.participationFee +
          price.participationFee +
          price.participationFee * 0.8,
      )
    })
  })
})
