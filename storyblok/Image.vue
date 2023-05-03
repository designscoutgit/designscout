<script setup>
defineProps({ blok: Object });
</script>

<template>
  <div v-editable="blok">
    <img
      v-if="blok.file?.filename"
      :src="blok.file.filename"
      :alt="blok.file.alt"
    />
  </div>
</template>
