<script setup>
import "lazysizes";
const props = defineProps({ blok: Object });

const imageGroups = ref([]);

const loadImageDimensions = async (image) => {
  return new Promise((resolve, reject) => {
    if (!image) {
      reject(new Error("Image object is undefined"));
      return;
    }
    const img = new Image();
    img.src = image.filename;
    img.onload = () => {
      resolve({ ...image, width: img.width, height: img.height });
    };
  });
};

const loadImageGroups = async () => {
  const groups = [];
  let group = [];
  for (const item of props.blok.image_grid) {
    if (item.component === "Image") {
      if (group.length) {
        groups.push(group);
        group = [];
      }
      try {
        const img = await loadImageDimensions(item.file);
        groups.push([img]);
      } catch (error) {
        console.error(`Error loading image dimensions: ${error.message}`);
      }
    } else if (item.component === "Images") {
      try {
        const img1 = await loadImageDimensions(item.files[0]);
        const img2 = await loadImageDimensions(item.files[1]);
        group.push(img1, img2);
      } catch (error) {
        console.error(`Error loading image dimensions: ${error.message}`);
      }
    }
  }
  if (group.length) {
    groups.push(group);
  }
  imageGroups.value = groups;
};

onMounted(() => {
  loadImageGroups();
});

const imageOrientation = (image) => {
  if (image.height > image.width) {
    return "portrait";
  } else {
    return "landscape";
  }
};

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
  <div v-editable="blok">
    <h2>{{ blok.headline_copy }}</h2>
    <div class="image-gallery">
      <template
        v-for="(group, index) in imageGroups"
        :key="index"
      >
        <div
          v-if="group.length === 1"
          :class="imageOrientation(group[0])"
        >
          <img
            :src="group[0].filename"
            :alt="group[0].alt"
            :title="group[0].alt"
            loading="lazy"
            class="lazyload"
          >
        </div>
        <div
          v-else
          class="img-stack"
        >
          <img
            :src="group[0].filename"
            :alt="group[0].alt"
            :title="group[0].alt"
            loading="lazy"
            class="lazyload"
          >
          <img
            :src="group[1].filename"
            :alt="group[1].alt"
            :title="group[1].alt"
            loading="lazy"
            class="lazyload"
          >
        </div>
      </template>
    </div>
  </div>
</template>
