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
