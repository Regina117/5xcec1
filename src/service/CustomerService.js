export const CustomerService = {
  getData() {
    return [
      {
        user_id: 1000,
        user_name: 'James Butt',
        user_login: 'James',
        user_email: 'james@km.ru',
        proj_count: '132',
        user_created: '2015-09-13',
        actions: false,
      },
      {
        user_id: 1499,
        user_name: 'Chauncey Motley',
        user_login: 'Motley',
        user_email: 'mot@km.ru',
        proj_count: '13',
        user_created: '2019-04-23',
        actions: true,
      },
      {
        user_id: 1023,
        user_name: 'Tom Butt',
        user_login: 'Tom',
        user_email: 'tom@km.ru',
        proj_count: '12',
        user_created: '2015-09-13',
        actions: true,
      },
    ];
  },

  getCustomersSmall() {
    return Promise.resolve(this.getData().slice(0, 10));
  },

  getCustomersMedium() {
    return Promise.resolve(this.getData().slice(0, 50));
  },

  getCustomersLarge() {
    return Promise.resolve(this.getData().slice(0, 200));
  },

  getCustomersXLarge() {
    return Promise.resolve(this.getData());
  },

  getCustomers(params) {
    const queryParams = params
      ? Object.keys(params)
          .map(
            (k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
          )
          .join('&')
      : '';

    return fetch(
      'https://www.primefaces.org/data/customers?' + queryParams
    ).then((res) => res.json());
  },
};
