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
</script>

<template>
  <div
    v-editable="blok"
    class="charity-referral-page large-width"
  >

    <Head>
      <Title>{{ blok.metatags.title }}</Title>
      <Meta
        name="description"
        :content="blok.metatags.description"
      />
      <Meta
        property="og:title"
        :content="blok.metatags.og_title"
      />
      <Meta
        property="og:image"
        :content="blok.metatags.og_image"
      />
      <Meta
        property="og:description"
        :content="blok.metatags.og_description"
      />
      <Meta
        property="og:url"
        :content="blok.metatags.og_url"
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
        :content="blok.metatags.og_title"
      />
      <Meta
        name="twitter:description"
        :content="blok.metatags.og_description"
      />
      <Meta
        name="twitter:image"
        :content="blok.metatags.og_image"
      />
    </Head>

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
