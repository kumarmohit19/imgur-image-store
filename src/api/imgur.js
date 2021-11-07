import qs from 'qs'
import axios from 'axios'

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

    window.location = query
  },

  fetchImages(token) {
    return axios.get(`${ROOT_URL}/3/account/me/images`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },

  upload(images, token) {
    const promises = Array.from(images).map((image) => {
      const formData = new FormData()
      formData.append('image', image)

      return axios.post(`${ROOT_URL}/3/image`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    })

    return Promise.all(promises)
  },
}
