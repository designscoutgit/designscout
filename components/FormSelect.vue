<template>
  <div class="custom-dropdown">
    <div
      class="custom-dropdown-selected"
      :class="{ 'open': isOpen }"
      @click="toggleDropdown"
    >{{ selectedOption.label }}
      <span><svg
          width="16"
          height="11"
          viewBox="0 0 16 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 11L0.20577 0.5L15.7942 0.500002L8 11Z"
            fill="#706D5F"
          />
        </svg>
      </span>
    </div>
    <div
      class="custom-dropdown-options"
      :class="{ 'open': isOpen }"
    >
      <div
        v-for="(option, index) in options"
        :class="['custom-dropdown-option', { 'selected': option.value === selectedOption.value }]"
        :key="index"
        @click="handleOptionClick(option)"
      >
        {{ option.label }}
      </div>
    </div>
    <input
      type="hidden"
      :name="inputName"
      v-model="selectedOption.value"
    >
  </div>
</template>
  
<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: String,
      default: "",
    },
    inputName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selectedOption: process.client ?
        this.options.find((option) => option.value === this.modelValue) ||
        this.options[0] : {},
      isOpen: false,
    };
  },
  methods: {
    reset() {
      this.selectedOption = this.options[0];
      this.$emit("update:modelValue", this.selectedOption.value);
    },
    handleOptionClick(option) {
      this.selectedOption = option;
      this.$emit("update:modelValue", this.selectedOption.value);
      this.toggleDropdown();
    },
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>