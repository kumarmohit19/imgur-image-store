// import api from '../../api/google'
import api from '../../api/imgur'
import { router } from '../../main'

const state = {
  images: [],
}

const getters = {
  allImages: (state) => state.images,
}

const mutations = {
  setImages: (state, images) => {
    state.images = images
  },
}

const actions = {
  fetchImages: async ({ rootState, commit }) => {
    const { token } = rootState.auth
    const response = await api.fetchImages(token)
    console.log(response)
    // commit('setImages', response.data.mediaItems) for google images api
    commit('setImages', response.data.data) // for imgur images spi
  },

  uploadImages: async ({ rootState }, images) => {
    // get access token
    const { token } = rootState.auth

    // calling google api for uploading files
    // await api.upload(images, token)
    await api.upload(images, token)

    // redirect our user to ImageList page
    router.push('/')
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
