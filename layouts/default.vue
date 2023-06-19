<template>

  <Head>
    <Title>DesignScout | Chicago Branding Agency | Ego-Free Since 2003™</Title>
    <Meta
      name="description"
      content="We build brave brands. DesignScout is a Chicago Branding Agency that builds bold identities for rule-bending hospitality and disruptor B2B brands."
    />
    <Meta
      property="og:title"
      content="DesignScout | Chicago Branding Agency | Ego-Free Since 2003™"
    />
    <Meta
      property="og:image"
      content="https://designscout.com/public/site_image.webp"
    />
    <Meta
      property="og:description"
      content="Ego-Free Since 2003 |  Looking for an iconic brand that stand the test of time? Our 100% Woman owned and operated creative studio is the answer."
    />
    <Meta
      property="og:url"
      content="https://designscout.com/"
    />
    <Meta
      property="og:type"
      content="website"
    />
    <Meta
      name="twitter:card"
      content="summary_large_image"
    />
    <Meta
      name="twitter:title"
      content="DesignScout | Chicago Branding Agency | Ego-Free Since 2003™"
    />
    <Meta
      name="twitter:description"
      content="Ego-Free Since 2003 |  Looking for an iconic brand that stand the test of time? Our 100% Woman owned and operated creative studio is the answer."
    />
    <Meta
      name="twitter:image"
      content="https://designscout.com/public/site_image.webp"
    />
  </Head>

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