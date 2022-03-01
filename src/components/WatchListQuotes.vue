<template>
  <div class="card mb-2 bg-gray" v-if="listenQuotes.length > 0">
    <!--<title-card-list>-->
    <div class="card-header">
      <div class="h4">Acompanhando</div>
      <cite class="text-small">
        Atualizará novamente em <b> {{ nextUpDateTime }} Segundos </b>
      </cite>
    </div>

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

const CURRENT_UPDATE_TIME = 60;

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
      this.refresh();
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
