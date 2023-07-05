<template>
  <div :class="[pageName, { dark: dark }]">
    <!-- NAV -->
    <Menu />
    <!-- CONTENT -->
    <main ref="mainContent">
      <slot />
    </main>
    <div
      class="error-page large-width"
      :class="[{ errorPage: errorPage }]"
    >
      <h2 class="size-2 center">404</h2>
      <h3 class="center">PAGE NOT FOUND.</h3>
      <h3 class="center">IN THE MEANTIME TAKE A LOOK AROUND.</h3>
      <div class="spacer small"></div>
      <div class="button-row">
        <a
          href="/case-studies"
          class="btn dark"
        ><svg
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 1C11 0.447715 10.5523 -3.74211e-07 10 4.72575e-08L1 -1.63477e-07C0.447715 -1.63477e-07 2.8711e-07 0.447715 2.8711e-07 1C2.8711e-07 1.55228 0.447715 2 1 2L9 2L9 10C9 10.5523 9.44772 11 10 11C10.5523 11 11 10.5523 11 10L11 1ZM1.70711 10.7071L10.7071 1.70711L9.29289 0.292893L0.292893 9.29289L1.70711 10.7071Z"
              fill="#303A3E"
            />
          </svg>
          CASE STUDIES</a>
        <a
          href="https://www.instagram.com/designscout/"
          class="btn dark"
          target="_blank"
        ><svg
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 1C11 0.447715 10.5523 -3.74211e-07 10 4.72575e-08L1 -1.63477e-07C0.447715 -1.63477e-07 2.8711e-07 0.447715 2.8711e-07 1C2.8711e-07 1.55228 0.447715 2 1 2L9 2L9 10C9 10.5523 9.44772 11 10 11C10.5523 11 11 10.5523 11 10L11 1ZM1.70711 10.7071L10.7071 1.70711L9.29289 0.292893L0.292893 9.29289L1.70711 10.7071Z"
              fill="#303A3E"
            />
          </svg>
          INSTAGRAM</a>
        <a
          href="/camp-diary"
          class="btn dark"
        ><svg
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 1C11 0.447715 10.5523 -3.74211e-07 10 4.72575e-08L1 -1.63477e-07C0.447715 -1.63477e-07 2.8711e-07 0.447715 2.8711e-07 1C2.8711e-07 1.55228 0.447715 2 1 2L9 2L9 10C9 10.5523 9.44772 11 10 11C10.5523 11 11 10.5523 11 10L11 1ZM1.70711 10.7071L10.7071 1.70711L9.29289 0.292893L0.292893 9.29289L1.70711 10.7071Z"
              fill="#303A3E"
            />
          </svg>
          CAMP DIARY</a>
      </div>
    </div>
    <!-- FOOTER -->
    <Footer />
  </div>
</template>

<script>
import Menu from "~/components/Menu.vue";
import Footer from "~/components/Footer.vue";

export default {
  name: "DefaultTemplate",

  components: {
    Menu,
    Footer,
  },

  head() {
    return {
      title: "DesignScout | Chicago Branding Agency | Ego-Free Since 2003™",
      meta: [
        // ... your existing meta tags
      ],
    };
  },

  data() {
    return {
      pageName: "",
      dark: false,
      isContentLoaded: false,
      errorPage: false,
    };
  },

  mounted() {
    this.pageName = this.$route.name;
    this.errorPage = false;
  },

  updated() {
    this.checkContent();
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      this.errorPage = false;
    });
  },

  methods: {
    checkContent() {
      if (
        this.$refs.mainContent &&
        Array.from(this.$refs.mainContent.getElementsByTagName("div"))
          .length === 0
      ) {
        this.errorPage = true;
      } else {
        this.errorPage = false;
      }
    },
  },
};
</script>
