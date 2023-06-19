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

  head() {
    return {
      title: "DesignScout | Chicago Branding Agency | Ego-Free Since 2003™",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "We build brave brands. DesignScout is a Chicago Branding Agency that builds bold identities for rule-bending hospitality and disruptor B2B brands.",
        },
        {
          hid: "og:title",
          property: "og:title",
          content:
            "DesignScout | Chicago Branding Agency | Ego-Free Since 2003™",
        },
        {
          hid: "og:image",
          property: "og:image",
          content:
            "https://a.storyblok.com/f/200165/1500x821/cf2a979912/designscout-featured-image.webp",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "Ego-Free Since 2003 | Looking for an iconic brand that stands the test of time? Our 100% Woman-owned and operated creative studio is the answer.",
        },
        {
          hid: "og:url",
          property: "og:url",
          content: "https://designscout.com/",
        },
        {
          hid: "og:type",
          property: "og:type",
          content: "website",
        },
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content:
            "DesignScout | Chicago Branding Agency | Ego-Free Since 2003™",
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content:
            "Ego-Free Since 2003 | Looking for an iconic brand that stands the test of time? Our 100% Woman-owned and operated creative studio is the answer.",
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content:
            "https://a.storyblok.com/f/200165/1500x821/cf2a979912/designscout-featured-image.webp",
        },
      ],
    };
  },

  data() {
    return {
      pageName: "",
      dark: false,
    };
  },

  mounted() {
    this.pageName = this.$route.name;
  },
};
</script>
