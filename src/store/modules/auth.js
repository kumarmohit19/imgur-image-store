// import api from '../../api/google'
import api from '../../api/imgur'
import qs from 'qs' // to create url
import { router } from '../../main' // to navigate user around application w/o fullpage reload

const state = {
  token: window.localStorage.getItem('google_photos_token'),
}

const getters = {
  isLoggedIn: (state) => !!state.token,
}

const actions = {
  logout: ({ commit }) => {
    commit('setToken', null)

    // empty localStorage
    window.localStorage.removeItem('google_photos_token')
  },

  login: () => {
    api.login()
  },

  finalizeLogin: ({ commit }, hash) => {
    const query = qs.parse(hash.replace('#', ''))

    commit('setToken', query.access_token)

    // store token in local storage for persisting the token
    window.localStorage.setItem('google_photos_token', query.access_token)

    // navigate user to different pages
    router.push('/')
  },
}

const mutations = {
  setToken: (state, token) => {
    state.token = token
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
