<template>
  <h3 v-editable="blok">
    {{ blok.name }}
  </h3>
</template>

<script setup>
defineProps({ blok: Object });
</script>
