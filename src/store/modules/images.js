import api from '../../api/google'

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
    commit('setImages', response.data.mediaItems)
  },

  uploadImages: async ({ commit }, images) => {
    commit('')
    console.log(images)
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
