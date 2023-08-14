<script setup>
defineProps({ blok: Object });
</script>

<template>
  <div
    v-editable="blok"
    class="grid"
  >
    <div class="grid-row">
      <client-only>
      <StoryblokComponent
        v-for="blok in blok.columns"
        :key="blok._uid"
        :blok="blok"
        class="grid-col"
      />
    </client-only>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.applyFullWidthClass();
  },

  methods: {
    applyFullWidthClass() {
      if(process.client){
        const rows = document.querySelectorAll(".grid-row");
        rows.forEach((row) => {
          const cols = row.querySelectorAll(".grid-col");
          if (cols.length === 1) {
            cols[0].classList.add("full-width");
          }
        });
      }
    },
  },
};
</script>