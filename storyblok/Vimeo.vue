<template>
  <div
    ref="vimeoPlayer"
    class="vimeo-player"
    v-editable="blok"
  >
    <iframe
      ref="vimeoIframe"
      :src="`https://player.vimeo.com/video/${blok.vimeo_id}?h=e38a7b4924&amp;player_id=0&amp;app_id=58479&amp;background=1`"
      frameborder="0"
      :allow="allow"
      title=""
      :key="blok._uid"
      :blok="blok"
    ></iframe>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Player from "@vimeo/player";

defineProps({
  blok: Object,
  url: {
    type: Text,
    required: true,
  },
});

const vimeoPlayer = ref(null);
const vimeoIframe = ref(null);
const allow = "autoplay;";

onMounted(async () => {
  const player = new Player(vimeoIframe.value);

  player.ready().then(async () => {
    const videoWidth = await player.getVideoWidth();
    const videoHeight = await player.getVideoHeight();

    if (videoWidth === videoHeight) {
      vimeoPlayer.value.classList.add("square");
    } else if (videoWidth > videoHeight) {
      vimeoPlayer.value.classList.add("landscape");
    } else {
      vimeoPlayer.value.classList.add("portrait");
    }
  });
});
</script>

<style scoped>
.vimeo-player {
  width: 100%;
  overflow: hidden;
}

.vimeo-player iframe {
  width: 100%;
  border: none;
}

.vimeo-player.square iframe {
  aspect-ratio: 1 / 1; /* 1:1 aspect ratio for square videos */
}

.vimeo-player.landscape iframe {
  aspect-ratio: 16 / 9; /* 16:9 aspect ratio for landscape videos */
}

.vimeo-player.portrait iframe {
  aspect-ratio: 3 / 3.5; /* 3:3.5 aspect ratio for portrait videos */
}
</style>
