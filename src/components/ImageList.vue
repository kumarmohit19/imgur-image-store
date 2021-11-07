<template>
  <div>
    <img
      v-for="image in allImages"
      :key="image.id"
      :src="image.baseUrl"
      :alt="image.filename"
    />
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
  computed: mapGetters(['allImages']),
}
</script>
