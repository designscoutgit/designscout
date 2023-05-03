<script setup>
const props = defineProps({ blok: Object });
const { slug } = useRoute().params;

const story = await useAsyncStoryblok(
  slug && slug.length > 0 && slug !== "/" ? slug.join("/") : "home",
  {
    version: useRoute().query._storyblok ? "draft" : "published",
    resolve_relations: "category,author",
  }
);

const bodyRichText = computed(() => {
  const richText = renderRichText(props.blok.richtext);
  const div = document.createElement("div");
  div.innerHTML = richText;

  // Get all the h2 tags inside the rich text
  const h2Tags = div.querySelectorAll("h2");

  // Add class of ".size-2" to each h2 tag
  h2Tags.forEach((h2) => {
    h2.classList.add("size-2");
  });

  // Return the modified HTML
  return div.innerHTML;
});
</script>

<template>
  <div class="default-page-content">
    <div
      v-editable="blok"
      class="content-left"
    >
      <img
        :src="blok.image.filename"
        :alt="blok.image.alt"
        :title="blok.image.title"
      />
    </div>
    <div
      v-editable="blok"
      class="content-right"
    >
      <div v-html="bodyRichText"></div>
      <div
        v-for="(block, index) in blok.additional_content"
        :key="index"
      >
        <component
          :is="block.component"
          :blok="block"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Button from "~/storyblok/Button.vue";

export default {
  components: {
    Button,
  },
};
</script>
