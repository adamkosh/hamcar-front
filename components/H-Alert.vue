<template>
  <div :class="['alert', `alert-${type}`]">
    <div v-if="showIcon" style="display: inline">
      <icons-warning
        class="alert-icon"
        v-if="type == 'warning'"
        :width="24"
        :height="24"
        hash-color="var(--color-orange)"
      />
      <icons-close-box
        class="alert-icon"
        v-else-if="type == 'error'"
        hash-color="var(--color-white)"
        :width="24"
        :height="24"
      />
      <icons-check-circle v-if="type == 'success'" class="alert-icon" />
    </div>

    <slot />
  </div>
</template>

<script setup lang="ts">
const { type = "warning", showIcon = false } = defineProps<{
  type: string;
  showIcon?: boolean;
}>();
</script>
<style scoped>
@media screen and (max-width: 768px) {
  .alert {
    font-size: var(--t5-font-size) !important;
    font-family: var(--t5-font-size) !important;
    font-weight: 700 !important;
    padding: 0.5rem 1rem 14px 1rem !important;
  }
}
.alert {
  width: 100%;
  display: block;
  align-items: center;
  padding: 1rem 2rem 14px 1.5rem;
  text-align: center;
  border-radius: 9px;
  font-size: var(--t3-font-size);
  font-family: var(--t3-font-size);
}
.alert-warning {
  background: rgba(255, 220, 170, 0.2);
  border: 1px solid var(--color-orange);
  color: var(--color-orange) !important;
  font-weight: 500;
}

.alert-error {
  background: red;
  color: var(--color-white);
}
.alert-success {
  color: var(--color-green-600);
  border: 1px solid #02ada6;
  border-radius: 16px;
  background: #f0fefd;
}
.alert-icon {
  top: 6px;
  position: relative;
  margin-left: 7px;
}
</style>