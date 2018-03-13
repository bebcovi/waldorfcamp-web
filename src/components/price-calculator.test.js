// @flow
import React from 'react'
import { shallow } from 'enzyme'
import PriceCalculator from './price-calculator'

const { price } = require('../../gatsby-config').siteMetadata

describe('price calculator', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<PriceCalculator price={price} days={14} />)
  })

  describe('participation fee', () => {
    it('applies discounts for children based on age and order', () => {
      const countField = wrapper.find('[data-test="people-count"]')
      countField.simulate('change', { target: { value: '5' } })
      const isChildCheckboxes = wrapper.find('[data-test="person-is-child"]')
      isChildCheckboxes.slice(1).forEach(checkbox => {
        checkbox.simulate('change', { target: { checked: true } })
      })
      const ageFields = wrapper.find('[data-test="person-age"]')
      ageFields.forEach((field, i) => {
        field.simulate('change', { target: { value: ['4', '5', '6', '7'][i] } })
      })
      const totalParticipationFee = Number(
        wrapper.find('[data-test="total-participation-fee"]').text(),
      )
      expect(totalParticipationFee).toBe(
        price.participationFee +
          price.participationFee * 0 +
          price.participationFee * 0.5 +
          price.participationFee * 0.6 +
          price.participationFee * 0.2,
      )
    })

    it('applies discount for the 2nd twin', () => {
      const countField = wrapper.find('[data-test="people-count"]')
      countField.simulate('change', { target: { value: '3' } })
      const isChildCheckboxes = wrapper.find('[data-test="person-is-child"]')
      isChildCheckboxes.slice(1).forEach(checkbox => {
        checkbox.simulate('change', { target: { checked: true } })
      })
      const ageFields = wrapper.find('[data-test="person-age"]')
      ageFields.forEach(field => {
        field.simulate('change', { target: { value: '6' } })
      })
      const totalParticipationFee = Number(
        wrapper.find('[data-test="total-participation-fee"]').text(),
      )
      expect(totalParticipationFee).toBe(
        price.participationFee +
          price.participationFee +
          price.participationFee * 0.8,
      )
    })
  })
})
