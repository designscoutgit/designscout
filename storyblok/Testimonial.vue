<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ref, onMounted, onUnmounted, watch } from "vue";

const modules = [Autoplay, Navigation, Pagination, Mousewheel, Keyboard];

const props = defineProps({ blok: Object });

const storyblokApi = useStoryblokApi();
const { data } = await storyblokApi.get("cdn/stories", {
  version: useRoute().query._storyblok ? "draft" : "published",
  starts_with: "testimonials",
  is_startpage: false,
  resolve_relations: "case_study",
});

const testimonialRichText = computed(() =>
  renderRichText(props.blok.testimonial_copy)
);

const slidesPerView = ref(2);

const updateSlidesPerView = () => {
  slidesPerView.value = window.innerWidth < 768 ? 1 : 2;
};

onMounted(() => {
  updateSlidesPerView();
  window.addEventListener("resize", updateSlidesPerView);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateSlidesPerView);
});
</script>

<template>
  <h2 class="size-2">What our clients <br />are saying</h2>
  <swiper
    ref="swiper"
    class="swiper testimonial-container"
    :slides-per-view="slidesPerView"
    :space-between="158"
    :navigation="true"
    :pagination="true"
    :modules="modules"
    :autoplay="{
      delay: 6000,
      disableOnInteraction: true,
    }"
  >
    <swiper-slide
      v-for="(testimonial, index) in data.stories"
      :key="index"
      class="testimonial"
    >
      <div class="testimonial-top">
        <div class="quote-copy">
          <svg
            class="quote"
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
          </svg>{{ testimonial.content.quote_copy }}
        </div>

        <div class="testimonial-content">
          <div
            v-html="renderRichText(testimonial.content.testimonial_copy)"
            class="prose"
          ></div>

        </div>

        <div
          v-for="(case_study, index) in data.rels"
          :key="index"
        >
          <div v-if="testimonial.content.case_study === case_study.uuid">

            <a
              :href="`/${case_study.full_slug}`"
              class="btn dark"
            >
              <svg
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

              VIEW CASE STUDY
            </a>
          </div>

        </div>
      </div>

      <div class="testimonial-case-study-name">
        <h3>{{ testimonial.content.case_study_name }}</h3>
      </div>

      <div class="testimonial-author">
        <div class="testimonial-author-image">
          <img
            :src="testimonial.content.testimonial_author_picture.filename"
            :alt="testimonial.content.testimonial_author_picture.alt"
            :title="testimonial.content.testimonial_author_picture.title"
          >
        </div>
        {{ testimonial.content.testimonial_author_name }} <br />{{ testimonial.content.testimonial_author_title }}
      </div>
    </swiper-slide>
  </swiper>
</template>