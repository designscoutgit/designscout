<script setup>
defineProps({ blok: Object });
</script>

<template>
  <h2
    v-editable="blok"
    class="coming-soon"
  >
    {{ blok.headline }}
  </h2>
</template>
