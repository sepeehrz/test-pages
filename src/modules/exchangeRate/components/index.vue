<template>
  <div class="wrapper">
    <v-row>
      <v-col cols="4">
        <v-select
          v-model="currency"
          clearable
          label="نوع ارز"
          :items="selectItems"
          variant="outlined"
          @update:modelValue="changeCurrency"></v-select>
      </v-col>
    </v-row>

    <section class="items" v-if="!loading.loading">
      <v-card v-for="(item, index) in items.rates" :key="index">
        <v-card-title>{{ formatCurrency(index) }}</v-card-title>

        <v-card-text class="text-left">
          {{ item }}
        </v-card-text>
      </v-card>
    </section>
  </div>
</template>
<script lang="ts" setup>
  import {onMounted, ref} from 'vue';
  import {currencyNamesFa} from '../helpers/currencyNamesFa';
  import GlobalRepository from '@remote/global/Repository/index';
  import type {CurrencyCode, IExchangeRatesResponse} from '../types';
  import {useLoading} from '@app/composables/loading';

  const loading = useLoading();

  const items = ref<IExchangeRatesResponse>({});
  const currency = ref('USD');
  const selectItems = ref(['USD', 'EUR', 'GBP', 'AUD', 'CAD']);

  onMounted(async () => {
    getExchangerate(currency.value);
  });

  async function getExchangerate(currency: string) {
    loading.setLoading(true);

    items.value = await GlobalRepository.getExchangerate(currency);

    loading.setLoading(false);
  }
  function formatCurrency(code: number | string) {
    return currencyNamesFa[code as CurrencyCode] || code;
  }

  function changeCurrency() {
    getExchangerate(currency.value);
  }
</script>
<style lang="scss" scoped>
  .wrapper {
    height: 100vh;
  }
  .items {
    display: flex;
    flex-wrap: wrap;
    margin-left: -8px;
    margin-top: 19px;
    > div {
      flex: 0 0 calc(25% - 8px);
      margin-left: 8px;
      margin-bottom: 8px;
    }
  }
</style>
