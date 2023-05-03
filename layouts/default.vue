<template>
  <div :class="[pageName, { dark: dark }]">
    <!-- NAV -->
    <Menu />
    <!-- CONTENT -->
    <main>
      <slot />
    </main>
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

  data() {
    return {
      pageName: "",
    };
  },

  mounted() {
    this.pageName = this.$route.name;
  },
};
</script>