<template>
  <DataGrid
    :headers="headers"
    :query-service="queryService"
    :title="title"
    :with-add="false"
    :with-action="false"
    :with-recycle-bin="false"
    :with-excel-download="false"
    :with-server-pagination="false"
    :with-query-search="true"
    :filters="filters">
    <template #data="{item}">
      <td>
        <v-avatar :image="item.image"></v-avatar>
      </td>
      <td>
        {{ item.name }}
      </td>
      <td>
        {{ item.symbol }}
      </td>
      <td>(USD) {{ filterAmount(item.current_price) }}</td>
      <td
        :class="
          item.price_change_percentage_24h > 0 ? 'text-green' : 'text-red'
        ">
        {{ item.price_change_percentage_24h.toFixed(2) }}%
      </td>
      <td>{{ filterAmount(item.total_volume) }}</td>
      <td>{{ filterAmount(item.market_cap) }}</td>
      <td>
        {{
          filterDateToOptionalFormat(
            item.last_updated,
            'HH:MM:SS jYYYY/jMM/jDD '
          )
        }}
      </td>
    </template>
  </DataGrid>
</template>
<script lang="ts" setup>
  import {ref} from 'vue';
  import {useHeaders} from '../../composables/tableHeader';
  import CryptoCurrencyPriceRepository from '../../api/Repository/index';
  import {filterAmount, filterDateToOptionalFormat} from '@app/utils';

  const {headers} = useHeaders();

  const title = ref({
    text: 'لیست قیمت رمزارزها',
    icon: 'mdi-currency-btc'
  });

  const filters = ref([
    {
      name: 'searchField',
      model: 'querySerach',
      label: 'جستجو کنید',
      type: 'querySearch',
      hint: 'بعد تایپ کلمه مورد نظر اینتر بزنید'
    }
  ]);

  async function queryService(params: {page: number; pageSize: number}) {
    return CryptoCurrencyPriceRepository.getCurrency(params);
  }
</script>
<style lang="scss" scoped></style>
