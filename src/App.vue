<template>
  <div class="container grid-lg my-2 py-2">
    <div class="card mb-2">
      <h1 class="text-center bg-secondary p-2 mb-0">Currency App</h1>
    </div>

    <!--Acompanhando-->
    <div class="card mb-2 bg-gray" v-if="listenQuotes.length > 0">
      <div class="card-header">
        <div class="h4">Acompanhando</div>
      </div>
      <div class="card-body pt-0">
        <watch-list-quotes
          :listen-quotes="listenQuotes"
          @remove-quote="removeQuote"
        />
      </div>
    </div>

    <!--Todas as moedas -->
    <div class="card bg-gray">
      <div class="card-header">
        <div class="h4">Cotações das Moedas</div>
        <cite class="text-small">
          Selecione a moeda que deseja <b> acompanhar.</b>
        </cite>
      </div>
      <div class="card-body">
        <list-quotes
          :quotes="quotes"
          :listen-quotes="listenQuotes"
          @add-quote="addQuote"
          @remove-quote="removeQuote"
        />
      </div>
    </div>
    <div class="card mt-2">
      <p class="text-center text-small text-italic bg-secondary p-2 mb-0">
        Copyright © 2022 Renata Marques | Desenvolvido com ♥ Vue.js  
      </p>
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

    function addQuote(code) {
      data.listenQuotes.push(code);
    }

    function removeQuote(code) {
      // data.listenQuotes.pop(code);
      data.listenQuotes = data.listenQuotes.filter((key) => key !== code);
    }

    //trazendo a lista completa da api
    onMounted(async () => {
      const response = await api.all();
      data.quotes = response.data;
    });

    return { ...toRefs(data), addQuote, removeQuote };
  },
};
</script>

<style>
@media (max-width: 576px) {
  *,
  ::after,
  ::before {
    font-size: 0.8rem !important;
  }

  h1 {
    font-size: 2rem !important;
  }

  .icon,
  .icon-plus {
    height: 0.6rem !important;
    vertical-align: 0 !important;
    width: 0.6rem !important;
  }
}
</style>


