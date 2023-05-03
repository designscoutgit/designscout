<script setup>
defineProps({ blok: Object });
</script>

<template>
  <div
    v-editable="blok"
    class="img-wrapper"
  >
    <div
      v-for="(file, index) in blok.files"
      :key="index"
    >
      <template v-if="file.fieldtype === 'asset' && file.filename.endsWith('.mp4')">
        <video
          :src="file.filename"
          autoplay="true"
          loop="true"
          muted="true"
        ></video>
      </template>
      <template v-else>
        <img
          :src="file.filename"
          :alt="file.alt"
          :title="file.alt"
        />
      </template>
    </div>
  </div>
</template>

