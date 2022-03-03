<template>
  <div class="card-header">
    <div class="h4">{{ listTitle }}</div>
    <cite class="text-bold">
      {{ citeTitle }}
    </cite>
  </div>
</template>


<script setup>

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
