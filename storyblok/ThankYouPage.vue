<script setup>
const props = defineProps({ blok: Object });

const storyblokApi = useStoryblokApi();
const { data } = await storyblokApi.get("cdn/stories", {
  version: "published",
  is_startpage: false,
  starts_with: "contact",
});

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
    v-for="blok in data.stories"
    :key="blok.id"
    v-editable="blok"
    class="contact-page compact-width"
  >
    <!-- <pre>{{ data.stories }}</pre> -->
    <h2 class="size-2 center">{{ blok.content.headline_copy }}</h2>
    <h3 class="center">{{ blok.content.subheadline_copy }}</h3>
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
</template>
