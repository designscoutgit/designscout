<template>
  <div
    class="tabbed-content-container"
    :class="{
        flex: variant === 'horizontal',
      }"
  >
    <ul
      class="tabbed-content-nav"
      :class="{
          flex: variant === 'vertical',
        }"
    >
      <li
        v-for="(tab, index) in tabList"
        :key="index"
        :class="{ active: index + 1 === activeTab }"
      >
        <label
          :for="`${_uid}${index}`"
          v-text="tab"
        />
        <input
          :id="`${_uid}${index}`"
          type="radio"
          :name="`${_uid}-tab`"
          :value="index + 1"
          v-model="activeTab"
        />
      </li>
    </ul>

    <template v-for="(tab, index) in tabList">
      <div
        :key="index"
        v-if="index + 1 === activeTab"
        class="tabbed-content"
      >
        <slot :name="`tabPanel-${index + 1}`" />
      </div>
    </template>
  </div>
</template>
  
  <script>
export default {
  props: {
    tabList: {
      type: Array,
      required: true,
    },
    variant: {
      type: String,
      required: false,
      default: () => "vertical",
      validator: (value) => ["horizontal", "vertical"].includes(value),
    },
  },
  data() {
    return {
      activeTab: 1,
    };
  },
};
</script>
  