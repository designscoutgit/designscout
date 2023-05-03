<script setup>
defineProps({ blok: Object });
</script>

<template>
  <div class="back-to-top">
    <a
      href="#"
      @click.prevent="scrollToTop"
    >
      <svg
        width="16"
        height="20"
        viewBox="0 0 16 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.70711 0.611252C8.31658 0.220728 7.68342 0.220728 7.29289 0.611252L0.928932 6.97521C0.538408 7.36574 0.538408 7.9989 0.928932 8.38943C1.31946 8.77995 1.95262 8.77995 2.34315 8.38943L8 2.73257L13.6569 8.38943C14.0474 8.77995 14.6805 8.77995 15.0711 8.38943C15.4616 7.9989 15.4616 7.36574 15.0711 6.97521L8.70711 0.611252ZM9 19.3184L9 1.31836H7L7 19.3184H9Z"
          fill="#303A3E"
        />
      </svg>
      {{ blok.text }}
    </a>
  </div>
</template>

<script>
import ShareIcon from "~/components/ShareIcon.vue";
import VueScrollTo from "vue-scrollto";

export default {
  components: {
    ShareIcon,
    VueScrollTo,
  },

  methods: {
    scrollToTop() {
      VueScrollTo.scrollTo("body", 500, { easing: "easeInOutCubic" });
    },
  },
};
</script>