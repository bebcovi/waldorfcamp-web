import queryString from 'query-string'
import 'isomorphic-fetch'

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'http://api.waldorfcamp.net'
    : 'http://localhost:9292'

export default (url, query) =>
  // eslint-disable-next-line no-undef
  fetch(`${API_URL}${url}?${queryString.stringify(query)}`, {
    headers: {
      'content-type': 'application/json',
    },
  })
