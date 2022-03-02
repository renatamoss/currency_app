<template>
  <div class="card mb-2 bg-gray" v-if="listenQuotes.length > 0">
    <list-title :listTitle="listTitle" :citeTitle="citeTitle">
      <cite class="text-bold">
        Atualizará novamente em {{ nextUpDateTime }} Segundos.
      </cite>
    </list-title>

    <div class="card-body">
      <list-quotes
        :quotes="quotes"
        :listen-quotes="listenQuotes"
        @remove-quote="removeQuote"
      />
    </div>
  </div>
</template>

<script setup>
import ListTitle from "../shareds/ListTitle.vue";
import ListQuotes from "./ListQuotes";
import { onMounted, onUnmounted, ref, watch } from "vue";
import api from "@/services/api";

const props = defineProps({
  listenQuotes: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["removeQuote"]);

const listTitle = ref("Acompanhamento");
const citeTitle = ref(null);

const CURRENT_UPDATE_TIME = 60;

const data = ref(null);

const nextUpDateTime = ref(CURRENT_UPDATE_TIME);
const interval = ref(null);
const quotes = ref({});

//count down 1 second
//call refresh() later 60 second
const restartInterval = () => {
  clearInterval(interval.value);
  nextUpDateTime.value = CURRENT_UPDATE_TIME;

  interval.value = setInterval(() => {
    nextUpDateTime.value -= 1;
    if (nextUpDateTime.value === 0) {
      nextUpDateTime.value = CURRENT_UPDATE_TIME;
      refresh();
    }
  }, 1000);
};

//event click removeQuote
const removeQuote = (code) => {
  emit("removeQuote", code);
};

//update listenQuotes
async function refresh() {
  const { data } = await api.listen(props.listenQuotes);
  quotes.value = data;
}

//When update props
watch(props, () => {
  refresh();
  restartInterval();
});

onMounted(() => {
  refresh();
  restartInterval();
});

onUnmounted(() => {
  clearInterval(interval.value);
});
</script>
