<template>
  <div class="app_content">
    <watch-list-quotes
      :listen-quotes="listenQuotes"
      @remove-quote="removeQuote"
    />
    <all-list-quotes 
      :quotes="quotes" 
      :listen-quotes="listenQuotes" 
    />
  </div>
</template>
            
            
<script setup>
import WatchListQuotes from "../objects/WatchListQuotes";
import AllListQuotes from "../objects/AllListQuotes.vue";
import { ref, onMounted } from "vue";
import api from "@/services/api";

const quotes = ref({});
const listenQuotes = ref([]);

//event click removeQuote
function removeQuote(code) {
  listenQuotes.value = listenQuotes.value.filter((key) => key !== code);
}

//getting all api list
onMounted(async () => {
  const response = await api.all();
  quotes.value = response.data;
});
</script>
                  
