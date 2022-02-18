<template>
  <div class="container grid-lg my-2 py-2">
    <!--Acompanhando-->
    <div class="card mb-2" v-if="listenQuotes.length > 0">
      <div class="card-header">
        <div class="h4">Acompanhando</div>
      </div>
      <div class="card-body">
        <watch-list-quotes :listen-quotes="listenQuotes" @unListen="onUnListen" />
      </div>
    </div>

    <!--Todas as moedas -->
    <div class="card">
      <div class="card-header">
        <div class="h4">Cotações</div>
      </div>
      <div class="card-body">
        <list-quotes
          :quotes="quotes"
          :listen-quotes="listenQuotes"
          @listen="onListen"
          @unListen="onUnListen"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import api from "@/services/api";
import ListQuotes from "./components/ListQuotes";
import WatchListQuotes from "./components/WatchListQuotes";

export default {
  components: { ListQuotes, WatchListQuotes },

  setup() {
    const data = reactive({
      quotes: {},
      listenQuotes: [],
    });

    function onListen(code) {
      data.listenQuotes.push(code);
      console.log(code);
    }

    function onUnListen(code) {
      // data.listenQuotes.pop(code);
      data.listenQuotes = data.listenQuotes.filter((key) => key !== code);
    }

    //trazendo a lista completa da api
    onMounted(async () => {
      const response = await api.all();
      data.quotes = response.data;
    });

    return { ...toRefs(data), onListen, onUnListen };
  },
};
</script>


