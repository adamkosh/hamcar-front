<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :viewBox="`0 0 ${width} ${height}`"
    fill="none"
  >
    <path
      d="M5.25 9.75L0.75 5.25L5.25 0.75"
      :stroke="hashColor"
      :stroke-width="storkeWith"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup>
const props = defineProps({
  hashColor: {
    type: String,
    default: "#85858F",
  },
  width: {
    type: Number,
    default: 11,
  },
  height: {
    type: Number,
    default: 17,
  },
  storkeWith: {
    type: Number,
    default: 1.5,
  },
});
</script>