class NavigationMenu {
  get() {
    return [
      {
        title: 'داشبرد',
        icon: 'mdi-view-dashboard',
        value: 'dashboard',
        to: '/'
      },
      {
        title: 'لیست قیمت رمزارزها',
        icon: 'mdi-currency-btc',
        value: 'cryptocurrency-price',
        to: '/cryptocurrency-price'
      },
      {
        title: 'لیست نرخ تبدیل',
        icon: 'mdi-swap-horizontal',
        value: 'exchange-rate',
        to: '/exchange-rate'
      }
    ];
  }
}
export default new NavigationMenu();
