<template>
  <div
    ref="vimeoPlayer"
    class="vimeo-player"
    v-editable="blok"
    :style="{ paddingTop: padding }"
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
import { onMounted, ref, computed, onUnmounted, watch } from "vue";
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
let aspectRatio = ref(0);
let portraitMaxHeight = 600; // Maximum acceptable height for portrait videos. Adjust as needed.
let windowWidth = ref(window.innerWidth);

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(async () => {
  window.addEventListener("resize", updateWindowWidth);

  const player = new Player(vimeoIframe.value);

  player.ready().then(async () => {
    const videoWidth = await player.getVideoWidth();
    const videoHeight = await player.getVideoHeight();

    aspectRatio.value = videoHeight / videoWidth;
  });
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWindowWidth);
});

const padding = computed(() => {
  if (windowWidth.value <= 768) {
    // Mobile breakpoint
    if (aspectRatio.value > 1) {
      // Reduce padding for portrait videos on larger screens
      return Math.min(aspectRatio.value * 100, window.innerHeight * 0.8) + "%"; // 80% of window height
    } else {
      // Default padding for square and landscape videos
      return aspectRatio.value * 100 + "%";
    }
  } else {
    // Default padding for landscape videos on desktop
    return "56.25%";
  }
});
</script>

<style scoped>
.vimeo-player {
  width: 100%;
  position: relative;
  overflow: hidden;
}

.vimeo-player iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

@media (min-width: 769px) {
  .vimeo-player {
    height: auto;
  }
}
</style>
