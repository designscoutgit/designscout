<script setup>
defineProps({
  blok: Object,
  url: {
    type: Text,
    required: true,
  },
});
const allow = "autoplay;";
</script>

<template>
  <div
    class="vimeo-player"
    v-editable="blok"
  >
    <iframe
      :src="`https://player.vimeo.com/video/${blok.vimeo_id}?h=e38a7b4924&amp;player_id=0&amp;app_id=58479&amp;background=1`"
      frameborder="0"
      :allow="allow"
      title=""
      :key="blok._uid"
      :blok="blok"
    ></iframe>
  </div>
</template>

<style scoped >
.vimeo-player {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-bottom: 56.25%; /* for 16:9 aspect ratio */
}

.vimeo-player iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}
</style>

