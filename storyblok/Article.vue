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

const categories = ref(null);
const authors = ref(null);
const storyblokApi = useStoryblokApi();
const { data } = await storyblokApi.get("cdn/stories", {
  starts_with: "insights",
  resolve_relations: "category,author",
});
categories.value = data.stories;
authors.value = data.stories;

const bodyCopy1RichText = computed(() =>
  renderRichText(props.blok.body_copy_1)
);
const bodyCopy2RichText = computed(() =>
  renderRichText(props.blok.body_copy_2)
);
const keypointsRichText = computed(() => renderRichText(props.blok.keypoints));
</script>

<template>
  <!-- START STORYBLOK CONTENT -->
  <div
    v-editable="blok"
    class="article-container container"
  >
    <div class="article-container-padded">
      <!-- resolve_relations for article category -->
      <div
        v-for="(categories, index) in data.rels"
        :key="index"
      >

        <div
          v-for="(category, index) in blok.category"
          :key="index"
        >
          <h3
            v-if="category === categories.uuid"
            class="uppercase"
          >
            {{ categories.name }}
          </h3>

        </div>
      </div>

      <ul class="tag-list">
        <li
          v-for="(tag, index) in story.tag_list"
          :key="index"
          class="tag"
        >
          {{ tag }}
        </li>
      </ul>
      <div class="spacer medium"></div>
      <h2 class="size-2">{{ blok.title }}</h2>
      <div class="keypoints-container">
        <h3>
          {{ blok.keypoints_title }}
        </h3>
        <div
          v-html="keypointsRichText"
          class="prose"
        ></div>
      </div>
    </div>
    <div class="article-cols">
      <!-- LEFT COL -->
      <div class="left-col">
        <img
          v-if="blok.featured_image?.filename"
          :src="blok.featured_image.filename"
          :alt="blok.featured_image.alt"
          class="featured-image small-only"
        />
        <div class="article-container-padded">
          <h3>
            {{ blok.headline_1 }}
          </h3>
          <div
            v-html="bodyCopy1RichText"
            class="prose"
          ></div>
          <div class="spacer medium small-only"></div>
        </div>
        <div class="images-container small-only">
          <div
            v-for="(image, index) in blok.additional_images"
            :key="index"
          >
            <img
              :src="image.filename"
              :alt="image.alt"
              :title="image.alt"
            >
          </div>
        </div>
        <div class="article-container-padded">
          <div v-if="blok?.headline_2">
            <h3>
              {{ blok.headline_2 }}
            </h3>
          </div>
          <div
            v-if="blok.body_copy_2"
            v-html="bodyCopy2RichText"
            class="prose"
          ></div>
        </div>
      </div>

      <!-- RIGHT COL -->
      <div class="right-col large-only">
        <img
          v-if="blok.featured_image?.filename"
          :src="blok.featured_image.filename"
          :alt="blok.featured_image.alt"
          class="featured-image"
        />
        <div class="images-container">
          <div
            v-for="(image, index) in blok.additional_images"
            :key="index"
            class="large-only"
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

    <!-- START SOCIAL SECTION -->
    <div class="button-row">
      <a
        href="#"
        class="btn dark round"
        @click.prevent="copyLink"
      >
        <div
          v-if="showAlert"
          class="copied alert dark"
        >URL COPIED!</div>
        <div>
          <ShareIcon />
        </div>
      </a>

      <a
        href="/contact"
        class="btn dark small-only"
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
        CONTACT US</a>

      <div class="large-only">
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
    </div>
    <!-- END SOCIAL SECTION -->

    <!-- <div class="article-container container">
    <h2 class="size-2">More like this</h2>
    <div class="related-articles">
      [RELATED ARTICLES HERE]
    </div>
  </div>
  <div class="divider dark"></div> -->

    <div class="author-container">
      <div v-if="blok.author">

        <!-- resolve_relations for article author -->
        <div
          v-for="(author, index) in data.rels"
          :key="index"
        >
          <div
            v-if="blok.author === author.uuid"
            class="author-container"
          >
            <div class="photo large-only">
              <img
                :src="author.content.profile_pic.filename"
                :alt="author.content.profile_pic.title"
                :title="author.content.profile_pic.title"
              >
            </div>

            <div class="author-main">
              <div class="author-row">
                <div class="photo small-only">
                  <img
                    :src="author.content.profile_pic.filename"
                    :alt="author.content.profile_pic.title"
                    :title="author.content.profile_pic.title"
                  >
                </div>
                <div class="author-meta">
                  <div class="author-name">
                    {{ author.content.name }}
                  </div>
                  <div class="author-title">
                    {{ author.content.title }}
                  </div>
                  <div class="author-linkedin">
                    FOLLOW ON <a
                      :href="author.content.linkedin_url.url"
                      target="_blank"
                    >LINKEDIN</a>
                  </div>
                </div>
              </div>
              <div class="author-bio">
                <p>{{ author.content.bio }}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
      <h3
        class="author-main bold"
        v-else
      >
        AUTHOR DATA IS NOT AVAILABLE.
      </h3>
    </div>
  </div>
  <!-- END STORYBLOK CONTENT -->
</template>

<script>
import ShareIcon from "~/components/ShareIcon.vue";
// import StoryblokClient from "storyblok-js-client";

export default {
  data() {
    return {
      showAlert: false,
    };
  },

  components: {
    ShareIcon,
  },

  methods: {
    async copyLink() {
      try {
        const url = window.location.href;
        await navigator.clipboard.writeText(url);
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 1500);
      } catch (error) {
        console.error("Failed to copy URL: ", error);
      }
    },
  },

  // async asyncData({ params, app }) {
  //   const client = new StoryblokClient({
  //     accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
  //   });

  // const { data } = await client.get(`cdn/stories/articles/${params.slug}`);

  // Resolve author relation
  // const authorId = data.story.content.author[0];
  // const authorRes = await client.get(`cdn/stories/authors/${authorId}`);
  // const author = authorRes.data.story.content;

  // const res = await app.$storyapi.get("cdn/stories", {
  //   starts_with: "insights/",
  //   resolve_relations: "author",
  // });

  // Let's convert content.date from a String to a Date
  // const articles = res.data.stories.map((story) => {
  //   story.content.date = new Date(story.content.date);
  //   return story;
  // });

  // return {
  // article: data.story.content,
  // author,
  // articles,
  //   };
  // },
};
</script>
