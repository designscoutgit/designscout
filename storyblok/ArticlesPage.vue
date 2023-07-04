<script setup>
const props = defineProps({ blok: Object });
const { slug } = useRoute().params;

const story = await useAsyncStoryblok(
  slug && slug.length > 0 && slug !== "/" ? slug.join("/") : "home",
  {
    version: useRoute().query._storyblok ? "draft" : "published",
  }
);

const insights = ref(null);
const storyblokApi = useStoryblokApi();
const { data } = await storyblokApi.get("cdn/stories", {
  version: "draft",
  starts_with: "insights",
  is_startpage: false,
  resolve_relations: "category",
});

if (data && data.stories) {
  insights.value = data.stories;
}

const filterCriteria = ref(null);

function filterInsights() {
  if (!filterCriteria.value) {
    return insights.value;
  }
  return insights.value.filter((insight) => {
    // Replace "category" with the property you want to filter by
    return insight.content.category === filterCriteria.value;
  });
}

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
  image: ogImage,
  ogImage: ogImage,
  twitterCard: "summary_large_image",
});

definePageMeta({
  title: metaTitle,
  ogTitle: metaTitle,
  description: metaDescription,
  ogDescription: metaDescription,
  image: ogImage,
  ogImage: ogImage,
  twitterCard: "summary_large_image",
});
</script>

<template>
  <!-- START STORYBLOK CONTENT -->
  <div
    v-editable="blok"
    class="insights-page"
  >
    <h2>{{ blok.headline_copy }}</h2>
    <!-- <pre>{{ data.stories }}</pre> -->

    <div class="top-content">

      <div class="filters-container">
        <ul
          class="category-filter"
          v-if="data.rels"
        >
          <li class="category-filter-label">Category
            <svg
              class="right-arrow large-only"
              width="30"
              height="16"
              viewBox="0 0 30 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M29.6152 8.70711C30.0057 8.31658 30.0057 7.68342 29.6152 7.29289L23.2512 0.928932C22.8607 0.538408 22.2275 0.538408 21.837 0.928932C21.4465 1.31946 21.4465 1.95262 21.837 2.34315L27.4938 8L21.837 13.6569C21.4465 14.0474 21.4465 14.6805 21.837 15.0711C22.2275 15.4616 22.8607 15.4616 23.2512 15.0711L29.6152 8.70711ZM0 9H28.9081V7L0 7L0 9Z"
                fill="#303A3E"
              />
            </svg>
          </li>
          <li><a
              href="#"
              @click.prevent="filterCriteria = null"
            >All</a></li>

          <li
            v-for="(category, index) in data.rels"
            :key="index"
          >
            <a
              href="#"
              @click.prevent="filterCriteria = category.name"
            >{{ category.name }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div
      v-for="(article, index) in filterInsights()"
      :key="index"
      class="article-card"
    >
      <!-- <pre style="border-bottom: 20px solid red">{{ article.content.category }}</pre> -->
      <div>
        <div>
          <h2 class="size-3 navy">
            <span v-if="index === 0">Featured Article</span>
            <span v-else>
              <div v-if="data.rels[index - 1]">
                {{ data.rels[index - 1].name }}
              </div>
            </span>
          </h2>
          <a
            v-if="article.slug"
            :href="article.slug"
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
          </a>
        </div>
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
