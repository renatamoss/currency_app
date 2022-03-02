<template>
  <div class="app_content">
    <watch-list-quotes
      :listen-quotes="listenQuotes"
      @remove-quote="removeQuote"
    />

    <!--all-list-quotes-->
    <div class="card mb-2 bg-gray">
      <!--<title-card-list>-->
      <list-title 
      :listTitle="listTitle" 
      :citeTitle="citeTitle" 
      />

      <div class="card-body">
        <list-quotes
          :quotes="quotes"
          :listen-quotes="listenQuotes"
          @add-quote="addQuote"
          @remove-quote="removeQuote"
        />
      </div>
    </div>
  </div>
</template>
            
            
<script setup>
import WatchListQuotes from "../objects/WatchListQuotes";
import ListTitle from "../shareds/ListTitle.vue";
import ListQuotes from "../objects/ListQuotes";
import { ref, onMounted } from "vue";
import api from "@/services/api";

const quotes = ref({});
const listenQuotes = ref([]);

const listTitle = ref("Cotações das Moedas");
const citeTitle = ref("Selecione a moeda que deseja acompanhar.");

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
                  
<style >
@media (max-width: 768px) {
  * {
    font-size: 0.8rem !important;
  }

  .icon,
  .icon-plus {
    height: 0.6rem !important;
    vertical-align: 0 !important;
    width: 0.6rem !important;
  }
}
</style>