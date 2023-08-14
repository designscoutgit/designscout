<script setup>
const props = defineProps({ blok: Object });
const { slug } = useRoute().params;

const story = await useAsyncStoryblok(
  slug && slug.length > 0 && slug !== "/" ? slug.join("/") : "home",
  {
    version: useRoute().query._storyblok ? "draft" : "published",
  }
);

const services = ref(null);
const storyblokApi = useStoryblokApi();
const { data } = await storyblokApi.get("cdn/stories", {
  starts_with: "services/",
  is_startpage: false,
});

if (data && data.stories) {
  services.value = data.stories;
}

setTimeout(() => {
  if (process.client) 
    document.body.classList.add("dark");
}, 550);

const defaultTitle =
  "DesignScout | Chicago Branding Agency | Ego-Free Since 2003™";
const defaultDescription =
  "We build brave brands. DesignScout is a Chicago Branding Agency that builds bold identities for rule-bending hospitality and disruptor B2B brands.";
const defaultOgImage =
  "https://a.storyblok.com/f/200165/1500x821/cf2a979912/designscout-featured-image.webp";

const metaTitle =
  props.blok.metatags && props.blok.metatags.title
    ? props.blok.metatags.title
    : defaultTitle;
const metaDescription =
  props.blok.metatags && props.blok.metatags.description
    ? props.blok.metatags.description
    : defaultDescription;
const ogImage =
  props.blok.metatags && props.blok.metatags.og_image
    ? props.blok.metatags.og_image
    : defaultOgImage;
    const ogMetaTitle = props?.blok?.metatags?.og_title || defaultTitle;
    const ogDescription = props?.blok?.metatags?.og_description || ""
    const twitterDescription = props?.blok?.metatags?.twitter_description || ""
    const twitterImage = props?.blok?.metatags?.twitter_image || ""
    const twitterTitle = props?.blok?.metatags?.twitter_title || ""

useSeoMeta({
  title: metaTitle,
  ogTitle: ogMetaTitle,
  description: metaDescription,
  ogDescription: ogDescription,
  image: ogImage,
  ogImage: ogImage,
  twitterCard: "summary_large_image",
  twitterDescription: twitterDescription,
  twitterImage: twitterImage,
  twitterTitle: twitterTitle,
});

definePageMeta({
  title: metaTitle,
  ogTitle: ogMetaTitle,
  description: metaDescription,
  ogDescription: ogDescription,
  image: ogImage,
  ogImage: ogImage,
  twitterCard: "summary_large_image",
  twitterDescription: twitterDescription,
  twitterImage: twitterImage,
  twitterTitle: twitterTitle,
});
</script>

<template>
  <div class="container">
    <!-- <pre>{{ blok.services_footer[0].columns }}</pre> -->
    <div class="row">
      <h2>{{blok.headline_copy}}</h2>
    </div>

    <div
      v-for="(service, index) in services"
      :key="index"
      class="service-row row"
    >
      <div class="left-col col">
        <h2 class="size-2">{{ service.content.title }}</h2>
        <div
          class="large-only"
          v-html="renderRichText(service.content.description)"
        ></div>
      </div>
      <div class="right-col col">
        <div v-html="renderRichText(service.content.list)"></div>
      </div>
    </div>

    <div class="services-disclaimer row">
      <div
        v-for="(column, index) in blok.services_footer[0].columns"
        :key="index"
        class="col"
      >
        <!-- <pre>{{ column.content }}</pre> -->
        <div v-html="renderRichText(column.content)"></div>
      </div>
    </div>
  </div>

  <div class="case-studies-carousel-container">
    <CaseStudiesCarousel />
  </div>

  <div class="container">
    <!-- <pre>{{ blok.contact_section }}</pre> -->
    <div
      class="contact-copy"
      v-html="renderRichText(blok.contact_section[0].content)"
    ></div>
    <a
      class="btn"
      href="/contact"
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
      CONTACT US</a>

    <!-- <div class="row">
      <div
        v-for="(column, index) in blok.services_footer[0].columns"
        :key="index"
        class="col"
      >
        <div v-html="renderRichText(column.content)"></div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "Services",

  mounted() {
    if (process.client) 
      document.querySelector(".contact-copy h2").classList.add("size-3");
  },
};
</script>