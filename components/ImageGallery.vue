<template>
  <div class="image-gallery">
    <div
      v-for="image in images"
      :key="image.src"
      :class="{ 'portrait': image.isTall, 'landscape': !image.isTall, 'wide': image.isWide }"
    >
      <img
        :src="image.src"
        :alt="image.alt"
        :title="image.alt"
        :width="computedImageWidth(image)"
        :height="computedImageHeight(image)"
      >
    </div>
  </div>
</template>
  
  <script>
export default {
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
  methods: {
    // Computes the appropriate width for the image based on its aspect ratio
    computedImageWidth(image) {
      const img = new Image();
      img.src = image.src;
      return img.width / 2;
    },

    // Computes the appropriate height for the image based on its aspect ratio
    computedImageHeight(image) {
      const img = new Image();
      img.src = image.src;
      return img.height / 2;
    },
  },
};
</script>
  