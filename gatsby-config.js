module.exports = {
  siteMetadata: {
    title: 'International Waldorf Camp Croatia',
    tagline: 'An active and dynamic vacation',
    registrations: {
      accepting: true,
      deadline: '2019-04-15',
    },
    startDate: '2019-08-03',
    durationInDays: 14,
    email: 'contact@waldorfcamp.net',
    areWorkshopsWip: true,
    price: {
      participationFee: 130,
      accommodation: {
        min: 15,
        max: 20,
      },
      touristTax: 0.8,
      lunch: 70,
      discounts: {
        participationFee: {
          byAge: [
            { age: { min: 0, max: 4 }, discount: 1.0 },
            { age: { min: 5, max: 5 }, discount: 0.5 },
          ],
          byOrder: [
            { order: 2, discount: 0.2 },
            { order: 3, discount: 0.4 },
            { order: 4, discount: 0.8 },
            { order: 5, discount: 1.0 },
          ],
        },
        lunch: {
          byAge: [{ age: { min: 0, max: 12 }, amount: 55 }],
        },
      },
    },
    links: {
      navigation: [
        { name: 'Home', path: '/' },
        { name: 'Workshops', path: '/workshops' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Contact', path: '/contact' },
      ],
      newsletter: 'http://eepurl.com/M7N7T',
      register: 'https://goo.gl/forms/XMlrk9M30vbzGYDl1',
      ferry: 'https://www.jadrolinija.hr/en',
      catamaran: 'https://www.miatours.hr/en',
    },
  },
  plugins: [
    'gatsby-plugin-emotion',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/workshops`,
        name: 'workshops',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: ['gatsby-remark-smartypants'],
      },
    },
    'gatsby-plugin-netlify',
  ],
}
