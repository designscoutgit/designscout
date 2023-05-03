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
  width: 100%;
  overflow: hidden;
}

.vimeo-player iframe {
  width: 100%;
  aspect-ratio: 16 / 9;
  border: none;
}
</style>

