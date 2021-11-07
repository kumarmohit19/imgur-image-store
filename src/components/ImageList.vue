<template>
  <div>
    <div v-if="isLoggedIn" class="image-container">
      <img
        v-for="image in allImages"
        :key="image.id"
        :src="image.link"
        :alt="image.name"
      />
    </div>
    <h2 v-else>Log in to get started!</h2>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ImageList',
  methods: mapActions(['fetchImages']),
  created() {
    this.fetchImages()
  },
  computed: mapGetters(['allImages', 'isLoggedIn']),
}
</script>

<style scoped>
.image-container {
  column-count: 3;
  column-gap: 0;
}

img {
  max-width: 100%;
  padding: 5px;
}
</style>
