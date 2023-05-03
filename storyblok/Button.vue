<template>
  <a
    v-editable="blok"
    class="btn dark"
    :href="blok.link.url"
    :target="blok.link.target"
  >
    <svg
      width="12"
      height="11"
      viewBox="0 0 12 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.917 1C11.917 0.454801 11.4636 0.0128299 10.9043 0.0128304L1.79033 0.0128302C1.23105 0.0128302 0.777666 0.454801 0.777666 1C0.777666 1.5452 1.23105 1.98717 1.79033 1.98717L9.89168 1.98717L9.89168 9.88452C9.89168 10.4297 10.3451 10.8717 10.9043 10.8717C11.4636 10.8717 11.917 10.4297 11.917 9.88452L11.917 1ZM2.38794 10.698L11.6204 1.69803L10.1883 0.301965L0.95581 9.30197L2.38794 10.698Z"
        fill="#303A3E"
      />
    </svg>

    {{ blok.title }}
  </a>
</template>

<script setup>
defineProps({ blok: Object });
</script>
