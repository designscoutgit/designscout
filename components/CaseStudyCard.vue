<script setup>
defineProps({ caseStudy: Object, slug: String });
</script>

<template>
  <NuxtLink
    :to="'/' + slug"
    v-editable="caseStudy"
    class="case-study-card"
    :style="{
      backgroundImage: caseStudy.card_image && caseStudy.card_image.filename ? 'url(' + caseStudy.card_image.filename + ')' : '',
      backgroundPosition: caseStudy.card_image_background_position
    }"
  >
    <div class="card-overlay"></div>
    <div>
      <h2 class="size-3 navy large-only">
        {{ caseStudy.card_copy }}
      </h2>
      <h2 class="size-4 navy small-only">{{ caseStudy.card_copy }}</h2>
      <h3 class="uppercase navy">
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

        {{ caseStudy.title }}
      </h3>
    </div>
  </NuxtLink>
</template>