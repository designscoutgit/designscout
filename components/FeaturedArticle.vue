<script setup>
const props = defineProps({ blok: Object });

const storyblokApi = useStoryblokApi();
const { data } = await storyblokApi.get("cdn/stories", {
  version: "draft",
  starts_with: "insights",
  is_startpage: false,
  resolve_relations: "category",
});
</script>

<template>
  <!-- START STORYBLOK CONTENT -->
  <div v-editable="blok">

    <div
      v-for="(article, index) in data.stories.slice(0,1)"
      :key="index"
      class="article-card"
    >
      <div>
        <NuxtLink
          v-if="article.full_slug"
          :to="`/${article.full_slug}`"
        >
          <h3 class="uppercase">{{ article.name }}
            <svg
              width="28"
              height="24"
              viewBox="0 0 28 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M27.0607 13.0607C27.6464 12.4749 27.6464 11.5251 27.0607 10.9393L17.5147 1.3934C16.9289 0.807613 15.9792 0.807613 15.3934 1.3934C14.8076 1.97919 14.8076 2.92893 15.3934 3.51472L23.8787 12L15.3934 20.4853C14.8076 21.0711 14.8076 22.0208 15.3934 22.6066C15.9792 23.1924 16.9289 23.1924 17.5147 22.6066L27.0607 13.0607ZM-1.31134e-07 13.5L26 13.5L26 10.5L1.31134e-07 10.5L-1.31134e-07 13.5Z"
                fill="#303A3E"
              />
            </svg>
          </h3>
        </NuxtLink>
        <img
          :src="article.content.featured_image.filename"
          :alt="article.content.featured_image.alt"
          :title="article.content.featured_image.title"
        >
      </div>
    </div>
  </div>
  <!-- END STORYBLOK CONTENT -->
</template>

<script>
export default {
  name: "Insights",
};
</script>

<style scoped>
.article-card {
  padding-right: 50%;
  min-height: 0;
}
.article-card > div {
  padding: 0;
}

@media screen and (max-width: 767px) {
  .article-card {
    padding-right: 0;
    width: 80vw;
    margin: 0 auto;
  }
}
</style>
