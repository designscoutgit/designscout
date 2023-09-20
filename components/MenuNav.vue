<script setup>
const storyblokApi = useStoryblokApi();
const { data } = await storyblokApi.get("cdn/stories/config", {
  version: useRoute().query._storyblok ? "draft" : "published",
  resolve_links: "url",
});

storyblokApi
  .get("cdn/stories/config", {
    version: useRoute().query._storyblok ? "draft" : "published",
    resolve_links: "url",
  })
  .then(({ data }) => {
    // Your code that uses the data
  });

const headerNav = ref(null);
headerNav.value = data.story.content.header_nav;

const emits = defineEmits(["close-nav"]);

const closeNav = () => {
  // Emit the 'close-nav' event to the parent component
  emits("close-nav");
};
</script>
 
<template>
  <ul>
    <li
      v-for="blok in headerNav"
      :key="blok._uid"
    >
      <NuxtLink
        :to="'/' + blok.link.cached_url"
        @click="closeNav"
      >
        {{ blok.link.story.name }}
      </NuxtLink>
    </li>
  </ul>
</template>