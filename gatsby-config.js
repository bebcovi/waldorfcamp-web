module.exports = {
  siteMetadata: {
    title: 'International Waldorf Camp Croatia',
    tagline: 'An active and dynamic vacation',
    registrations: {
      accepting: true,
      deadline: '2018-04-15',
    },
    startDate: '2018-07-29',
    durationInDays: 14,
    email: 'contact@waldorfcamp.net',
    price: {
      participationFee: 120,
      accommodation: {
        min: 15,
        max: 20,
      },
      touristTax: 0.8,
      lunch: 8,
      dinner: 6,
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
          byAge: [
            { age: { min: 0, max: 5 }, discount: 0.5 },
            { age: { min: 6, max: 12 }, discount: 0.2 },
          ],
          byOrder: [],
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
      facebook: 'https://facebook.com/waldorfcamp',
      newsletter: 'http://eepurl.com/M7N7T',
      register: 'https://goo.gl/forms/FL8jOjALKUGYwcJq2',
      ferry:
        'http://www.jadrolinija.hr/docs/default-source/lokalne-linije-2018---red-plovidbe/310-mali-lo%C5%A1inj---srakane---unije---susakF8EDA1033A67AF7A8A22AE09.pdf?sfvrsn=2',
      catamaran:
        'http://www.agencija-zolpp.hr/Portals/12/download/9401%20Olib%20Silba%20Premuda%20Zadar.pdf',
    },
  },
  plugins: [
    'gatsby-plugin-emotion',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-react-next',
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
  ],
}
