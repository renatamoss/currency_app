<template>
  <div class="container grid-lg my-2 py-2">
    <!--AppHeader-->
    <div class="card mb-2">
      <div class="columns mb-2">
        <div class="column col-3">
          <img src="../public/a.png" class="img-responsive" alt="img" />
        </div>
        <div class="column col-9">
          <h1 class="text-left text-dark p-2 m-0"><em>Currency App</em></h1>
        </div>
      </div>
    </div>

    <!--AppContent-->
    <!--watch-list-quotes-->
    <watch-list-quotes
      :listen-quotes="listenQuotes"
      @remove-quote="removeQuote"
    />

    <!--all-quotes-->
    <div class="card mb-2 bg-gray">

      <!--<title-card-list>-->
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

    <!--AppFooter-->
    <div class="card mt-2">
      <p class="text-center text-small p-2 mb-0">
        Copyright © 2022 Renata Marques | Desenvolvido com ♥ Vue.js
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api";
import ListQuotes from "./components/ListQuotes";
import WatchListQuotes from "./components/WatchListQuotes";

const quotes = ref({});
const listenQuotes = ref([]);

//events coming(emits) from component listenQuotes
//code = key coming from emit
function addQuote(code) {
  listenQuotes.value.push(code);
}

function removeQuote(code) {
  listenQuotes.value = listenQuotes.value.filter((key) => key !== code);
}

//getting all api list
onMounted(async () => {
  const response = await api.all();
  quotes.value = response.data;
});
</script>

<style>
.columns {
  display: flex;
  align-items: flex-end;
}

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


