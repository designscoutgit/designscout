<script setup>
const storyblokApi = useStoryblokApi();
const { data } = await storyblokApi.get("cdn/stories/config", {
  version: useRoute().query._storyblok ? "draft" : "published",
  resolve_links: "url",
});

const footerMenuCol1 = ref(null);
footerMenuCol1.value = data.story.content.footer_nav_1;

const footerMenuCol2 = ref(null);
footerMenuCol2.value = data.story.content.footer_nav_2;

const footerMenuCol3 = ref(null);
footerMenuCol3.value = data.story.content.footer_nav_3;
</script>
 
<template>
  <div class="col">
    <h5>ABOUT</h5>
    <ul>
      <li
        v-for="blok in footerMenuCol1"
        :key="blok._uid"
      >
        <a :href="'/' + blok.link.story.url">
          {{ blok.link.story.name }}
        </a>
      </li>
    </ul>
  </div>
  <div class="col">
    <h5>GET IN TOUCH</h5>
    <ul>
      <li
        v-for="blok in footerMenuCol2"
        :key="blok._uid"
      >
        <a :href="'/' + blok.link.story.url">
          {{ blok.link.story.name }}
        </a>
      </li>
    </ul>
  </div>
  <div class="col">
    <h5>EXTRAS</h5>
    <ul>
      <li
        v-for="blok in footerMenuCol3"
        :key="blok._uid"
      >
        <a :href="'/' + blok.link.story.url">
          {{ blok.link.story.name }}
        </a>
      </li>
    </ul>
  </div>
</template>