import qs from 'qs'

const CLIENT_ID = '3b625601e3eb40f'
const ROOT_URL = 'https://api.imgur.com'
// const CLIENT_SECRET = 'a0b69d071abe952b44c578221ff7650c4fe910ad'

export default {
  login() {
    const querystring = {
      client_id: CLIENT_ID,
      response_type: 'token',
    }

    const query = `${ROOT_URL}/oauth2/authorize?${qs.stringify(querystring)}`

    console.log(query)

    window.location = query
  },
}
