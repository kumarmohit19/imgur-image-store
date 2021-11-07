import qs from 'qs' // for query formation
import axios from 'axios' // for https request

const CLIENT_ID =
  '478018972401-m6dbvsq9r7hsn3thti0curbn88e1eunv.apps.googleusercontent.com'
const AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth?'
const ROOT_URL = 'https://photoslibrary.googleapis.com/v1'

export default {
  login() {
    const querystring = {
      include_granted_scopes: true,
      response_type: 'token',
      scope:
        'https://www.googleapis.com/auth/photoslibrary.readonly https://www.googleapis.com/auth/photoslibrary.appendonly https://www.googleapis.com/auth/photoslibrary.readonly.appcreateddata https://www.googleapis.com/auth/photoslibrary.edit.appcreateddata https://www.googleapis.com/auth/photoslibrary https://www.googleapis.com/auth/photoslibrary.sharing',
      client_id: CLIENT_ID,
      redirect_uri: 'http://localhost:8080/oauth2/callback',
    }
    window.location = `${AUTH_URL}?${qs.stringify(querystring)}`
  },

  fetchImages(token) {
    return axios.get(`${ROOT_URL}/mediaItems`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },

  upload(images, token) {
    const promises = Array.from(images).map((image) => {
      const formData = new FormData()
      formData.append('image', image)

      return axios.post(`${ROOT_URL}/uploads`, formData, {
        headers: {
          'Content-type': 'application/octet-stream',
          'X-Goog-Upload-Content-Type': 'mime-type',
          'X-Goog-Upload-Protocol': 'raw',
          Authorization: `Bearer ${token}`,
        },
      })
    })

    return Promise.all(promises)
  },

  uploadImages(images, token) {
    const promises = Array.from(images).map((image) => {
      return new Promise((r) => {
        axios
          .post('https://photoslibrary.googleapis.com/v1/uploads', image, {
            headers: {
              'Content-Type': 'application/octet-stream',
              'X-Goog-Upload-File-Name': image.name,
              'X-Goog-Upload-Protocol': 'raw',
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            r({
              description: 'item-description',
              simpleMediaItem: {
                fileName: image.name,
                uploadToken: response.data,
              },
            })
          })
      })
    })
    return Promise.all(promises).then((e) => {
      return new Promise((resolve, reject) => {
        axios
          .post(
            'https://photoslibrary.googleapis.com/v1/mediaItems:batchCreate',
            JSON.stringify({ newMediaItems: e }),
            {
              headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(resolve)
          .catch(reject)
      })
    })
  },
}
