import qs from 'qs' // for query formation

const CLIENT_ID =
  '478018972401-m6dbvsq9r7hsn3thti0curbn88e1eunv.apps.googleusercontent.com'
const ROOT_URL = 'https://accounts.google.com/o/oauth2/v2/auth?'
// const PHOTOS_URL = 'https://photoslibrary.googleapis.com/v1/mediaItems'

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
    window.location = `${ROOT_URL}?${qs.stringify(querystring)}`
  },
}
