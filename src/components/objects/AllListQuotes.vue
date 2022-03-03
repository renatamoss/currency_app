<template>
  <div class="card mb-2 bg-gray">
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
</template>
            
            
<script setup>
import ListTitle from "../shareds/ListTitle.vue";
import ListQuotes from "../objects/ListQuotes";
import { ref } from "vue";

const props = defineProps({
  quotes: {
    type: Object,
    requiered: true,
  },
  listenQuotes: {
    type: Array,
    requiered: true,
  },
});

//List Title
const listTitle = ref("Cotações das Moedas");
const citeTitle = ref("Selecione a moeda que deseja acompanhar em tempo real.");

//events coming(emits) from component listenQuotes
//code = key coming from emit
function addQuote(code) {
  props.listenQuotes.push(code);
}

function removeQuote(code) {
  props.listenQuotes = props.listenQuotes.filter((key) => key !== code);
}
</script>


