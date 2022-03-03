<template>
  <table class="table">
    <thead>
      <tr>
        <td><u>Código</u></td>
        <td><u>Moeda</u></td>
        <td><u>Máximo</u></td>
        <td><u>Mínimo</u></td>
        <td><u>Variação</u></td>
      </tr>
    </thead>
    <tbody>
      <tr class="active" v-for="(quote, key) in quotes" :key="key">
        <td>{{ key }}</td>
        <td>{{ quote.name }}</td>
        <td>{{ quote.high }}</td>
        <td>{{ quote.low }}</td>
        <td>
          <span
            class="label label-rounded text-small text-center"
            :class="{
              'label-error': quote.pctChange < 0,
              'label-success': quote.pctChange > 0,
            }"
          >
            {{ quote.pctChange }} %
          </span>
        </td>
        <td>
          <a
            v-if="!listenQuotes.includes(key)"
            class="btn btn-success btn-sm tooltip tooltip-left"
            data-tooltip="Seguir"
            @click="$emit('addQuote', key)"
          >
            <i class="icon icon-plus"></i>
          </a>
          <a
            v-else
            class="btn btn-success bg-warning btn-sm tooltip tooltip-left"
            data-tooltip="Remover"
            @click="$emit('removeQuote', key)"
          >
            <i class="icon icon-minus"></i>
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  quotes: {
    type: Object,
    required: true,
  },
  listenQuotes: {
    type: Array,
    required: true,
  },
});

//event click addQuote e removeQuote
defineEmits(["addQuote", "removeQuote"]);
</script>


<style >
/*Responsive*/
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
