<template>
  <list-quotes :quotes="quotes" />
  <div class="mt-2 text-right">
    <cite class="text-small">
      Atualizará novamente em <b> {{ nextUpDateTime }} Segundos </b>
    </cite>
  </div>
</template>

<script>
import ListQuotes from "./ListQuotes";
import { ref } from "vue";

export default {
  components: { ListQuotes },
  setup() {
    const quotes = ref({});
    const nextUpDateTime = ref(30);

    return { quotes, nextUpDateTime };
  },
};
</script>
