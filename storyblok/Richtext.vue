<template>
  <div v-editable="blok">
    <div
      v-html="richText"
      class="richtext"
    ></div>
  </div>
</template>
  
<script setup>
const props = defineProps({ blok: Object });

const richText = computed(() => renderRichText(props.blok.content));
</script>
  