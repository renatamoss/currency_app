<template>
  <cite class="text-small">
    Atualizará novamente em <b> {{ nextUpDateTime }} Segundos </b>
  </cite>
  <list-quotes
    :quotes="quotes"
    :listen-quotes="listenQuotes"
    @remove-quote="removeQuote"
  />
  <div class="mt-2 text-right"></div>
</template>

<script>
import ListQuotes from "./ListQuotes";
import { onMounted, onUnmounted, reactive, ref, toRefs, watch } from "vue";
import api from "@/services/api";

const CURRENT_UPDATE_TIME = 60;

export default {
  components: { ListQuotes },
  props: {
    listenQuotes: {
      type: Array,
      required: true,
    },
  },
  emits: ["removeQuote"],

  setup(props, { emit }) {
    const interval = ref(null);
    const quotes = ref({});
    const nextUpDateTime = ref(CURRENT_UPDATE_TIME);

    const methods = reactive({
      removeQuote(code) {
        emit("removeQuote", code);
      },

      restartInterval() {
        clearInterval(interval.value);
        nextUpDateTime.value = CURRENT_UPDATE_TIME;
        interval.value = setInterval(() => {
          nextUpDateTime.value -= 1;
          if (nextUpDateTime.value === 0) {
            nextUpDateTime.value = CURRENT_UPDATE_TIME;
            this.refresh();
          }
        }, 1000);
      },

      async refresh() {
        const { data } = await api.listen(props.listenQuotes);
        quotes.value = data;
      },
    });

    watch(props, () => {
      methods.refresh();
      methods.restartInterval();
    });

    onMounted(() => {
      methods.refresh();
      methods.restartInterval();
    });

    onUnmounted(() => {
      clearInterval(interval.value);
    });

    return { ...toRefs(methods), quotes, nextUpDateTime };
  },
};
</script>
