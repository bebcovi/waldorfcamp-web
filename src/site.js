// @flow
import * as Icon from './components/icons'

export default {
  title: 'International Waldorf Camp Croatia',
  tagline: 'An active and dynamic vacation',
  registrations: {
    accepting: true,
    deadline: '2020-04-01',
  },
  startDate: '2020-08-02',
  durationInDays: 14,
  email: 'contact@waldorfcamp.net',
  areWorkshopsWip: false,
  price: {
    participationFee: 150,
    accommodation: {
      min: 15,
      max: 20,
    },
    touristTax: 0.8,
    lunch: 10,
    discounts: {
      participationFee: {
        byOrder: [
          { order: 1, discount: 0.1 },
          { order: 2, discount: 0.2 },
          { order: 3, discount: 0.3 },
          { order: 4, discount: 0.4 },
          { order: 5, discount: 0.5 },
        ],
      },
      lunch: {
        byAge: [{ age: { min: 0, max: 12 }, amount: 7.5 }],
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
    register: 'https://forms.gle/1EY1PkAV9rdqf6NG7',
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
