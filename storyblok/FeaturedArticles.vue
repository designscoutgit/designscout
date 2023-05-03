<script setup>
const props = defineProps({ blok: Object });

const tagsRichText = computed(() => renderRichText(props.blok.tags));
const keypointsRichText = computed(() => renderRichText(props.blok.keypoints));
</script>

<template>
  <!-- START STORYBLOK CONTENT -->
  <div
    v-editable="blok"
    class="article-container container"
  >
    <img
      v-if="blok.featured_image?.filename"
      :src="blok.featured_image.filename"
      :alt="blok.featured_image.alt"
      class="hidden"
    />
    <h3>{{ blok.category }}</h3>
    <div
      v-html="tagsRichText"
      class="prose"
    ></div>
    <div class="spacer medium"></div>
    <h2 class="size-2">{{ blok.title }}</h2>
    <h3>
      {{ blok.keypoints_title }}
    </h3>
    <div
      v-html="keypointsRichText"
      class="prose"
    ></div>
    <div class="article-cols">
      <!-- LEFT COL -->
      <div class="left-col">
        <h3>
          {{ blok.headline_1 }}
        </h3>
        <div class="spacer small"></div>
        <p>
          {{ blok.body_copy_1 }}
        </p>
        <div class="spacer medium"></div>
        <h3>
          {{ blok.headline_2 }}
        </h3>
        <div class="spacer small"></div>
        <p>
          {{ blok.body_copy_2 }}
        </p>
      </div>

      <!-- RIGHT COL -->
      <div class="right-col">
        <div
          v-for="(image, index) in blok.images"
          :key="index"
        >
          <img
            :src="image.filename"
            :alt="image.alt"
            :title="image.alt"
          >
        </div>
      </div>
    </div>
  </div>
  <!-- END STORYBLOK CONTENT -->

  <!-- START SOCIAL SECTION -->
  <div class="spacer"></div>
  <div class="divider dark"></div>
  <div class="button-row">
    <a
      href="#"
      class="btn dark round"
      @click.prevent="copyLink"
    >
      <div class="dark copied hidden">
        COPIED!
      </div>
      <ShareIcon />
    </a>
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
  <div class="spacer medium"></div>
  <div class="divider dark"></div>
  <div class="spacer"></div>
  <!-- END SOCIAL SECTION -->
</template>

<script>
import ShareIcon from "~/components/ShareIcon.vue";

export default {
  components: {
    ShareIcon,
  },

  methods: {
    copyLink() {
      const url = window.location.href;
      navigator.clipboard
        .writeText(url)
        .then(() => {
          console.log(`Copied ${url} to the clipboard`);
        })
        .catch((error) => {
          console.error(`Error copying ${url} to the clipboard: ${error}`);
        });
    },
  },
};
</script>
