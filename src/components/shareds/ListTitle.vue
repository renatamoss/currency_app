<template>
  <div class="card-header">
    <div class="h4">{{ listTitle }}</div>
    <cite class="text-bold">
      {{ citeTitle }}
      <slot />
    </cite>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  listTitle: {
    type: String,
    required: true,
  },
  citeTitle: {
    type: String,
    required: true,
  },
});

</script>   

                        
<style lang= scoped>
</style>