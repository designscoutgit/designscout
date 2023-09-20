<script setup>
defineProps({ blok: Object });
const { slug } = useRoute().params;

const story = await useAsyncStoryblok(
  slug && slug.length > 0 && slug !== "/" ? slug.join("/") : "home",
  {
    version: useRoute().query._storyblok ? "draft" : "published",
  }
);

const caseStudies = ref(null);
const storyblokApi = useStoryblokApi();
const { data } = await storyblokApi.get("cdn/stories", {
  version: useRoute().query._storyblok ? "draft" : "published",
  starts_with: "case-studies",
  is_startpage: false,
});

if (data && data.stories) {
  caseStudies.value = data.stories.filter(
    (story) => story.full_slug !== "case-studies/gallery"
  );
}
</script>

<template>
  <!-- START STORYBLOK CONTENT -->
  <div class="case-study-carousel">
    <div class="case-study-carousel-top">
      <h3>CASE STUDIES</h3>
      <div class="carousel-navigation">
        <button
          class="carousel-arrow carousel-prev"
          :disabled="currentIndex === 0"
          @click="slideCarousel(-1)"
        >
          <svg
            width="30"
            height="24"
            viewBox="0 0 30 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.939341 10.9393C0.353554 11.5251 0.353554 12.4749 0.939341 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97919 12.6066 1.3934C12.0208 0.807611 11.0711 0.807611 10.4853 1.3934L0.939341 10.9393ZM30 10.5L2 10.5V13.5L30 13.5V10.5Z"
              fill="#706D5F"
            />
          </svg>

        </button>
        <button
          class="carousel-arrow carousel-next"
          :disabled="caseStudies && currentIndex + itemsPerSlide >= caseStudies.length"
          @click="slideCarousel(1)"
        >
          <svg
            width="30"
            height="24"
            viewBox="0 0 30 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M29.0607 13.0607C29.6464 12.4749 29.6464 11.5251 29.0607 10.9393L19.5147 1.3934C18.9289 0.807613 17.9792 0.807613 17.3934 1.3934C16.8076 1.97919 16.8076 2.92893 17.3934 3.51472L25.8787 12L17.3934 20.4853C16.8076 21.0711 16.8076 22.0208 17.3934 22.6066C17.9792 23.1924 18.9289 23.1924 19.5147 22.6066L29.0607 13.0607ZM-1.31134e-07 13.5L28 13.5L28 10.5L1.31134e-07 10.5L-1.31134e-07 13.5Z"
              fill="#706D5F"
            />
          </svg>

        </button>
      </div>
    </div>

    <div
      class="case-study-cards"
      ref="carousel"
    >
      <CaseStudyCard
        v-for="(caseStudy, index) in caseStudies"
        :key="caseStudy.uuid"
        :caseStudy="caseStudy.content"
        :slug="caseStudy.full_slug"
        class="carousel-slide"
        :class="{ active: !hovering && index === 0 }"
        @mouseover="handleMouseOver"
        @mouseout="handleMouseOut"
      />

    </div>
  </div>
  <!-- END STORYBLOK CONTENT -->
</template>

<script>
import CaseStudyCard from "~/components/CaseStudyCard.vue";

export default {
  name: "Case Studies Carousel",

  components: {
    CaseStudyCard,
  },

  data() {
    return {
      currentIndex: 0,
      itemsPerSlide: 5,
      hovering: false,
    };
  },

  mounted() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },

  methods: {
    handleResize() {
      if (window.innerWidth < 768) {
        this.itemsPerSlide = 2;
      }
    },
    slideCarousel(amount) {
      if(process.client){
      const carousel = this.$refs.carousel;
      const slideWidth = carousel.clientWidth / this.itemsPerSlide;
      this.currentIndex += amount;
      if (this.caseStudies && this.caseStudies.length > 0) {
        this.currentIndex = Math.max(
          0,
          Math.min(this.currentIndex, this.caseStudies.length - 1)
        );
      }
      carousel.style.transform = `translateX(${
        -this.currentIndex * slideWidth
      }px)`;
    }
    },
    handleMouseOver() {
      this.hovering = true;
    },
    handleMouseOut() {
      this.hovering = false;
    },
  },
};
</script>
