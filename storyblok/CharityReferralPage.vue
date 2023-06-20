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
  starts_with: "charity-referral/",
  is_startpage: false,
});

if (data && data.stories) {
  services.value = data.stories;
}

const bodyRichText = computed(() => renderRichText(props.blok.body_copy));

setTimeout(() => {
  document.body.classList.add("dark");
}, 150);

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

useSeoMeta({
  title: metaTitle,
  ogTitle: metaTitle,
  description: metaDescription,
  ogDescription: metaDescription,
  ogImage: ogImage,
  twitterCard: "summary_large_image",
});

definePageMeta({
  title: metaTitle,
  ogTitle: metaTitle,
  description: metaDescription,
  ogDescription: metaDescription,
  ogImage: ogImage,
  twitterCard: "summary_large_image",
});
</script>

<template>
  <div
    v-editable="blok"
    class="charity-referral-page large-width"
  >
    <h2>{{blok.headline_copy}}</h2>
    <h2 class="size-2">{{blok.subheadline_copy}}</h2>
    <div class="spacer small"></div>
    <div v-html="bodyRichText">
    </div>
    <div class="spacer medium"></div>
    <!-- CARDS FOR CHARITIES -->
    <div class="charity-card-container">
      <div>

      </div>
    </div>
  </div>
</template>
