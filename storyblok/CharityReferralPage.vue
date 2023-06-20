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

useSeoMeta({
  title: props.blok.metatags.title,
  ogTitle: props.blok.metatags.title,
  description: props.blok.metatags.description,
  ogDescription: props.blok.metatags.description,
  ogImage: props.blok.metatags.og_image,
  twitterCard: "summary_large_image",
});

definePageMeta({
  title: props.blok.metatags.title,
  ogTitle: props.blok.metatags.title,
  description: props.blok.metatags.description,
  ogDescription: props.blok.metatags.description,
  ogImage: props.blok.metatags.og_image,
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
