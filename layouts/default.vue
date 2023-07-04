<template>
  <div :class="[pageName, { dark: dark }]">
    <!-- NAV -->
    <Menu />
    <!-- CONTENT -->
    <main ref="mainContent">
      <slot />
    </main>
    <div
      v-show="errorPage"
      class="error-page large-width"
    >
      <h2 class="size-2 center">404</h2>
      <h3 class="center">PAGE NOT FOUND.</h3>
      <h3 class="center">IN THE MEANTIME TAKE A LOOK AROUND.</h3>
      <div class="spacer small"></div>
      <div class="button-row">
        <a
          href="/case-studies"
          class="btn dark"
        >
          <!-- CASE STUDIES button content -->
        </a>
        <a
          href="https://www.instagram.com/designscout/"
          class="btn dark"
          target="_blank"
        >
          <!-- INSTAGRAM button content -->
        </a>
        <a
          href="/camp-diary"
          class="btn dark"
        >
          <!-- CAMP DIARY button content -->
        </a>
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

    setTimeout(() => {
      this.isContentLoaded = true;
      this.checkContent();
    }, 2000);
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.checkContent();
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
        console.log("error page!");
      } else {
        this.errorPage = false;
        console.log("not the error page!");
      }
    },
  },
};
</script>
