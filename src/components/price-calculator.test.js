// @flow
import React from 'react'
import { render, Simulate } from 'react-testing-library'
import { ThemeProvider } from 'emotion-theming'
import { theme } from '../theme'
import PriceCalculator from './price-calculator'

const { price } = require('../../gatsby-config').siteMetadata

const renderWithTheme = element =>
  render(<ThemeProvider theme={theme}>{element}</ThemeProvider>)

describe('price calculator', () => {
  describe('participation fee', () => {
    it('applies discounts for children based on age and order', () => {
      const { getByTestId, unmount } = renderWithTheme(
        <PriceCalculator price={price} days={14} />,
      )
      const countField = getByTestId('people-count')
      Simulate.change(countField, { target: { value: '5' } })
      const peopleIndices = ['2', '3', '4', '5']
      peopleIndices.forEach(index => {
        const isChildCheckbox = getByTestId(`person-is-child-${index}`)
        Simulate.change(isChildCheckbox, { target: { checked: true } })
        const ageField = getByTestId(`person-age-${index}`)
        Simulate.change(ageField, {
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
      unmount()
    })

    it('applies discount for the 2nd twin', () => {
      const { getByTestId, unmount } = renderWithTheme(
        <PriceCalculator price={price} days={14} />,
      )
      const countField = getByTestId('people-count')
      Simulate.change(countField, { target: { value: '3' } })
      const peopleIndices = ['2', '3']
      peopleIndices.forEach(index => {
        const isChildCheckbox = getByTestId(`person-is-child-${index}`)
        Simulate.change(isChildCheckbox, { target: { checked: true } })
        const ageField = getByTestId(`person-age-${index}`)
        Simulate.change(ageField, { target: { value: '6' } })
      })
      const totalParticipationFee = Number(
        getByTestId('total-participation-fee').textContent,
      )
      expect(totalParticipationFee).toBe(
        price.participationFee +
          price.participationFee +
          price.participationFee * 0.8,
      )
      unmount()
    })
  })
})
