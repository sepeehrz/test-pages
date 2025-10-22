import {ref} from 'vue';

export function useHeaders() {
  const headers = ref([
    {
      title: 'لوگو',
      align: 'start',
      width: '5%',
      sortable: false
    },
    {
      title: 'نام',
      align: 'start',
      width: '5%',
      sortable: false
    },
    {
      title: 'نماد',
      align: 'start',
      width: '5%',
      sortable: false
    },
    {
      title: 'قیمت فعلی',
      align: 'start',
      width: '10%',
      sortable: false
    },
    {
      title: 'تغییر ۲۴ ساعته (%)',
      align: 'start',
      width: '10%',
      sortable: false
    },
    {
      title: 'حجم معاملات',
      align: 'start',
      width: '10%',
      sortable: false
    },
    {
      title: 'ارزش بازار',
      align: 'start',
      width: '10%',
      sortable: false
    },
    {
      title: 'آخرین به‌روزرسانی',
      align: 'start',
      width: '10%',
      sortable: false
    }
  ]);
  return {headers};
}
