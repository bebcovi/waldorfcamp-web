// @flow
import * as Icon from './components/icons'

export default {
  title: 'International Waldorf Camp Croatia',
  tagline: 'An active and dynamic vacation',
  registrations: {
    accepting: true,
    deadline: '2022-05-15',
  },
  startDate: '2022-07-31',
  durationInDays: 14,
  email: 'contact@waldorfcamp.net',
  areWorkshopsWip: false,
  price: {
    participationFee: 160,
    accommodation: {
      min: 15,
      max: 20,
    },
    touristTax: 0.8,
    lunch: 12,
    discounts: {
      participationFee: {
        byAge: [],
        byOrder: [
          { order: 1, discount: 0.1 },
          { order: 2, discount: 0.2 },
          { order: 3, discount: 0.3 },
        ],
      },
      lunch: {
        byAge: [{ age: { min: 0, max: 4 }, amount: 0 }, { age: { min: 4, max: 8 }, amount: 6.6 }, { age: { min: 8, max: 12 }, amount: 10 }],
      },
    },
  },
  links: {
    navigation: [
      { name: 'Home', path: '/' },
      { name: 'Workshops', path: '/workshops' },
      { name: 'Gallery', path: '/gallery' },
      { name: 'Pricing', path: '/pricing' },
      { name: 'Contact', path: '/contact' },
    ],
    newsletter: 'http://eepurl.com/M7N7T',
    register: 'https://forms.gle/PEpX6UwNKu2G3TEQ9',
    ferry: 'https://www.jadrolinija.hr/en',
    catamaran: 'https://www.miatours.hr/en',
    social: [
      {
        name: 'Facebook',
        url:
          'https://web.facebook.com/Waldorf-Summer-Camp-Croatia-104320777592935',
        Icon: Icon.Facebook,
      },
      {
        name: 'Instagram',
        url: 'https://www.instagram.com/waldorfsummercamp',
        Icon: Icon.Instagram,
      },
    ],
  },
}
