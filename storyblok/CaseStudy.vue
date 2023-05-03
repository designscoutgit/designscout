<script setup>
const props = defineProps({ blok: Object });
const { slug } = useRoute().params;

const story = await useAsyncStoryblok(
  slug && slug.length > 0 && slug !== "/" ? slug.join("/") : "home",
  { version: useRoute().query._storyblok ? "draft" : "published" }
);

definePageMeta({
  layout: "default",
});

async function setup() {
  return {
    story,
  };
}

const storyblokApi = useStoryblokApi();
const { data } = await storyblokApi.get("cdn/stories", {
  version: "draft",
  starts_with: "case-studies",
  is_startpage: false,
  resolve_relations: "case-study",
});

const caseStudies = ref([]);

const outputNames = () => {
  for (let i = 0; i < props.blok.related_case_studies.length; i++) {
    for (let j = 0; j < data.stories.length; j++) {
      if (props.blok.related_case_studies[i] === data.stories[j].uuid) {
        caseStudies.value.push(data.stories[j]);
      }
    }
  }
};
outputNames();

const strategiesRichText = computed(() =>
  renderRichText(props.blok.strategies)
);
const servicesRichText = computed(() => renderRichText(props.blok.services));
const linksRichText = computed(() => renderRichText(props.blok.links));

const list1RichText = computed(() => renderRichText(props.blok.list_copy_1));
const bodyCopy1RichText = computed(() =>
  renderRichText(props.blok.body_copy_1)
);

const BodyCopyLeft2RichText = computed(() =>
  renderRichText(props.blok.body_copy_left_2)
);
const BodyCopyRight2RichText = computed(() =>
  renderRichText(props.blok.body_copy_right_2)
);

const testimonialRichText = computed(() =>
  renderRichText(props.blok.testimonial_copy)
);

const resultsBodyCopyRichText = computed(() =>
  renderRichText(props.blok.results_body_copy)
);

const leftCol1RichText = computed(() => renderRichText(props.blok.left_col_1));
const rightCol1RichText = computed(() =>
  renderRichText(props.blok.right_col_1)
);

const leftCol2RichText = computed(() => renderRichText(props.blok.left_col_2));
const rightCol2RichText = computed(() =>
  renderRichText(props.blok.right_col_2)
);

const leftCol3RichText = computed(() => renderRichText(props.blok.left_col_3));
const rightCol3RichText = computed(() =>
  renderRichText(props.blok.right_col_3)
);
</script>

<template>
  <!-- START STORYBLOK CONTENT -->
  <div
    v-editable="blok"
    class="case-study-container container"
  >
    <!-- {{ blok }} -->
    <div
      class="case-study-hero"
      :style="{ backgroundImage: 'url(' + blok.background_image.filename + ')' }"
    >
      <div class="case-study-hero-container">
        <h2
          class="size-2"
          v-editable="blok.title"
        >{{ blok.title }}</h2>
        <p
          class="body-copy"
          v-editable="blok.description"
        >{{ blok.description }}</p>
        <div class="row">
          <!-- <div class="col">
            <div class="col-content-wrapper">
              <div
                class="col-toggle"
                :class="{ 'active': activeIndex === 0 }"
                @click="toggleActive(0)"
              >
                <h3>STRATEGY</h3>
                <div class="toggle-icon">
                  <svg
                    width="17"
                    height="15"
                    viewBox="0 0 17 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="8.75"
                      x2="8.75"
                      y2="15"
                      stroke="#303A3E"
                      stroke-width="1.5"
                      class="vertical-line"
                    />
                    <line
                      y1="7.25"
                      x2="17"
                      y2="7.25"
                      stroke="#303A3E"
                      stroke-width="1.5"
                      class="horizontal-line"
                    />
                  </svg>
                </div>
              </div>
              <div
                class="col-content"
                :class="{ 'active': activeIndex === 0 }"
              >
                <p class="callout">{{ blok.callout }}</p>
                <div
                  v-html="strategiesRichText"
                  class="prose"
                ></div>
              </div>
            </div>
          </div> -->
          <div class="col">
            <div class="col-content-wrapper">
              <div
                class="col-toggle"
                :class="{ 'active': activeIndex === 1 }"
                @click="toggleActive(1)"
              >
                <h3>INDUSTRY</h3>
                <div class="toggle-icon">
                  <svg
                    width="17"
                    height="15"
                    viewBox="0 0 17 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="8.75"
                      x2="8.75"
                      y2="15"
                      stroke="#303A3E"
                      stroke-width="1.5"
                      class="vertical-line"
                    />
                    <line
                      y1="7.25"
                      x2="17"
                      y2="7.25"
                      stroke="#303A3E"
                      stroke-width="1.5"
                      class="horizontal-line"
                    />
                  </svg>
                </div>
              </div>
              <div
                class="col-content"
                :class="{ 'active': activeIndex === 1 }"
              >
                <ul>
                  <li>
                    <p v-editable="blok.industry">{{ blok.industry }}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="col-content-wrapper">
              <div
                class="col-toggle"
                :class="{ 'active': activeIndex === 2 }"
                @click="toggleActive(2)"
              >
                <h3>LOCATION</h3>
                <div class="toggle-icon small-only">
                  <svg
                    width="17"
                    height="15"
                    viewBox="0 0 17 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="8.75"
                      x2="8.75"
                      y2="15"
                      stroke="#303A3E"
                      stroke-width="1.5"
                      class="vertical-line"
                    />
                    <line
                      y1="7.25"
                      x2="17"
                      y2="7.25"
                      stroke="#303A3E"
                      stroke-width="1.5"
                      class="horizontal-line"
                    />
                  </svg>
                </div>
              </div>
              <div
                class="col-content"
                :class="{ 'active': activeIndex === 2 }"
              >
                <ul>
                  <li>
                    <p v-editable="blok.location">{{ blok.location }}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- <div class="col">
            <div class="col-content-wrapper">
              <div
                class="col-toggle"
                :class="{ 'active': activeIndex === 3 }"
                @click="toggleActive(3)"
              >
                <h3>SERVICES</h3>
                <div class="toggle-icon small-only">
                  <svg
                    width="17"
                    height="15"
                    viewBox="0 0 17 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="8.75"
                      x2="8.75"
                      y2="15"
                      stroke="#303A3E"
                      stroke-width="1.5"
                      class="vertical-line"
                    />
                    <line
                      y1="7.25"
                      x2="17"
                      y2="7.25"
                      stroke="#303A3E"
                      stroke-width="1.5"
                      class="horizontal-line"
                    />
                  </svg>
                </div>
              </div>
              <div
                class="col-content"
                :class="{ 'active': activeIndex === 3 }"
              >
                <div
                  v-html="servicesRichText"
                  class="prose"
                ></div>
              </div>
            </div>
          </div> -->
          <!-- <div class="col">
            <div class="col-content-wrapper">
              <div
                class="col-toggle"
                :class="{ 'active': activeIndex === 4 }"
                @click="toggleActive(4)"
              >
                <h3>LINKS</h3>
                <div class="toggle-icon">
                  <svg
                    width="17"
                    height="15"
                    viewBox="0 0 17 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="8.75"
                      x2="8.75"
                      y2="15"
                      stroke="#303A3E"
                      stroke-width="1.5"
                      class="vertical-line"
                    />
                    <line
                      y1="7.25"
                      x2="17"
                      y2="7.25"
                      stroke="#303A3E"
                      stroke-width="1.5"
                      class="horizontal-line"
                    />
                  </svg>
                </div>
              </div>
              <div
                class="col-content"
                :class="{ 'active': activeIndex === 4 }"
              >
                <div
                  v-html="linksRichText"
                  class="prose"
                ></div>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>

    <div class="case-study-content-container">
      <div v-editable="blok">
        <StoryblokComponent
          v-for="blok in blok.body"
          :key="blok._uid"
          :blok="blok"
        />
      </div>
      <!-- 
      <div class="section-1">
        <div
          ref="grid"
          class="image-grid"
        >
          <div
            v-for="(image, index) in blok.images_1"
            :key="index"
          >
            <img
              :src="image.filename"
              :alt="image.alt"
              :title="image.alt"
            >
          </div>
        </div>
        <div class="content-container-wrapper row">
          <div
            v-if="blok.left_col_1.content[0].content"
            class="content-container-left col"
          >
            <div
              v-html="leftCol1RichText"
              class="prose"
            ></div>
            <h3>{{ blok.headline_copy_1 }}</h3>
            <p class="callout">{{ blok.callout_copy_1 }}</p>
            <div
              v-html="list1RichText"
              class="prose"
            ></div>
          </div>
          <div
            v-if="blok.right_col_1.content[0].content"
            class="content-container-right col"
          >
            <div
              v-html="rightCol1RichText"
              class="prose"
            ></div>

            <div
              v-html="bodyCopy1RichText"
              class="prose"
            ></div>
          </div>
        </div>
      </div>
      <div class="section-2">
        <div
          ref="grid"
          class="image-grid"
        >
          <div
            v-for="(image, index) in blok.images_2"
            :key="index"
          >
            <img
              :src="image.filename"
              :alt="image.alt"
              :title="image.alt"
            >
          </div>
        </div>
        <div class="content-container-wrapper row">
          <div
            v-if="blok.left_col_2.content[0].content"
            class="content-container-left col"
          >
            <div
              v-html="leftCol2RichText"
              class="prose"
            ></div>
            <h3>{{ blok.headline_copy_left_2 }}</h3>
            <div
              v-html="BodyCopyLeft2RichText"
              class="prose"
            ></div>
          </div>
          <div
            v-if="blok.right_col_2.content[0].content"
            class="content-container-right col"
          >
            <div
              v-html="rightCol2RichText"
              class="prose"
            ></div>
            <h3>{{ blok.headline_copy_right_2 }}</h3>
            <div
              v-html="BodyCopyRight2RichText"
              class="prose"
            ></div>
          </div>
        </div>
      </div>
      <div class="section-3">
        <div class="image-grid">
          <div
            v-for="(image, index) in blok.images_3"
            :key="index"
          >
            <img
              :src="image.filename"
              :alt="image.alt"
              :title="image.alt"
            >
          </div>
        </div>
        <div class="content-container-wrapper row">
          <div
            v-if="blok.left_col_3.content[0].content"
            class="content-container-left col"
          >
            <div
              v-html="leftCol3RichText"
              class="prose"
            ></div>
            <div class="testimonial-container">
              <svg
                width="39"
                height="31"
                viewBox="0 0 39 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.75556 4.42804C6.42222 6.1107 4.64444 8.39114 3.44444 11.2472C2.22222 14.1033 1.77778 17.1587 2.06667 20.4576C2.93333 19.0184 3.93333 17.9779 5.04444 17.3358C6.15556 16.7159 7.48889 16.3838 9.04445 16.3838C11.1778 16.3838 12.8667 16.9594 14.1333 18.1328C15.4 19.2841 16.0222 20.9446 16.0222 23.0701C16.0222 25.1956 15.3333 26.8782 13.9778 28.1402C12.6222 29.4022 10.8222 30.0221 8.6 30.0221C5.88889 30.0221 3.77778 29.0037 2.26667 26.9668C0.755556 24.9299 0 22.0295 0 18.2657C0.0222222 12.952 1.57778 8.56827 4.68889 5.13653C7.77778 1.72694 11.7556 0 16.6 0V1.88192C13.6889 1.88192 11.0667 2.72325 8.73333 4.42804H8.75556ZM31.1556 4.42804C28.8222 6.1107 27.0667 8.39114 25.8444 11.2472C24.6222 14.1033 24.1778 17.1587 24.4667 20.4576C25.3333 19.0184 26.3333 17.9779 27.4444 17.3358C28.5556 16.7159 29.8889 16.3838 31.4444 16.3838C33.5778 16.3838 35.2667 16.9594 36.5333 18.1328C37.8 19.3063 38.4222 20.9446 38.4222 23.0701C38.4222 25.1956 37.7333 26.8782 36.3778 28.1402C35.0222 29.4022 33.2222 30.0221 31 30.0221C28.2889 30.0221 26.1778 29.0037 24.6667 26.9668C23.1556 24.9299 22.4222 22.0295 22.4222 18.2657C22.4222 12.952 23.9778 8.56827 27.0667 5.13653C30.1778 1.7048 34.1556 0 39 0V1.88192C36.0889 1.88192 33.4667 2.72325 31.1333 4.42804H31.1556Z"
                  fill="#B6B3A2"
                />
              </svg>
              <div class="testimonial-content">
                <div v-html="testimonialRichText"></div>
              </div>
              <h3 class="testimonial-author">
                {{ blok.testimonial_author_name }} • {{ blok.testimonial_author_title }}
              </h3>
            </div>
          </div>
          <div
            v-if="blok.right_col_3.content[0].content"
            class="content-container-right col"
          >
            <div
              v-html="rightCol3RichText"
              class="prose"
            ></div>
            <h3>{{ blok.results_headline_copy }}</h3>
            <div
              v-html="resultsBodyCopyRichText"
              class="prose"
            ></div>
          </div>
        </div>
      </div>
      -->
      <div class="section-4">
        <!-- <div
          ref="grid"
          class="image-grid"
        >
          <div
            v-for="(image, index) in blok.images_4"
            :key="index"
          >
            <img
              :src="image.filename"
              :alt="image.alt"
              :title="image.alt"
            >
          </div>
        </div> -->
        <div class="credits-container-wrapper content-container-wrapper row">
          <div class="content-container-left col">
            <ul class="credits-container">
              <li
                v-for="credit in blok.credits"
                :key="credit._uid"
                class="credit-item"
              >
                <span class="credit-label">
                  {{ credit.credit_label }}
                </span>
                <a
                  :href="credit.credit_name_link.url"
                  target="_blank"
                  class="credit-name"
                >{{ credit.credit_name }}</a>
              </li>
            </ul>
          </div>
          <div
            v-editable="blok.links"
            class="content-container-right links"
            v-if="linksRichText"
          >
            <h3>LINKS</h3>
            <div v-html="linksRichText"></div>
          </div>
        </div>
      </div>

      <div v-if="caseStudies.length > 0">
        <h3>CASE STUDIES</h3>
        <div class="related-case-studies-container">
          <a
            v-for="(caseStudy, index) in caseStudies"
            :key="index"
            :href="caseStudy.slug"
            class="related-case-study"
          >
            <img
              :src="caseStudy.content.card_image.filename"
              :alt="caseStudy.content.card_image.alt"
              :title="caseStudy.content.card_image.alt"
            >
            <h3>{{ caseStudy.content.title }}</h3>
            <h2 class="size-3">{{ caseStudy.content.card_copy }}</h2>

          </a>
        </div>
      </div>
      <div class="homepage-articles-container">
        <h2 class="size-2">Let's talk about...</h2>
        <ArticlesBlock />
      </div>
    </div>
  </div>
  <!-- END STORYBLOK CONTENT -->

  <!-- BACK TO TOP LINK -->
  <BackToTop />
  <!-- [INSERT PAGINATION HERE] -->
</template>

<script>
import BackToTop from "~/components/BackToTop.vue";

export default {
  name: "Case Study",

  components: {
    BackToTop,
  },

  data() {
    return {
      isOpen: false,
      activeIndex: 0,
    };
  },

  mounted() {
    this.applyFullWidthClass();

    this.$nextTick(() => {
      this.equalizeCreditLabelWidths();

      const grids = document.querySelectorAll(".image-grid");
      grids.forEach((grid) => {
        const childCount = grid.childElementCount;
        grid.classList.add(`grid-layout-${childCount}`);
      });
    });
  },

  methods: {
    applyFullWidthClass() {
      const rows = document.querySelectorAll(".row");
      rows.forEach((row) => {
        const cols = row.querySelectorAll(".col");
        if (cols.length === 1) {
          cols[0].classList.add("full-width");
        }
      });
    },

    equalizeCreditLabelWidths() {
      this.$nextTick(() => {
        const creditLabels = this.$el.querySelectorAll(".credit-label");
        let maxWidth = 0;

        // Find the maximum width of credit-label elements
        creditLabels.forEach((label) => {
          const labelWidth = label.getBoundingClientRect().width;
          if (labelWidth > maxWidth) {
            maxWidth = labelWidth;
          }
        });

        // Set the width of all credit-label elements to the maximum width
        creditLabels.forEach((label) => {
          label.style.width = `${maxWidth}px`;
        });
      });
    },

    toggleActive(index) {
      if (this.activeIndex === index) {
        this.activeIndex = null;
      } else {
        this.activeIndex = index;
      }
    },
  },
};
</script>