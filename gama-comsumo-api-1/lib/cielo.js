const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

class Cielo {
  static compra(params) {
    return fetch('https://apisandbox.cieloecommerce.cielo.com.br/1/sales/', {
      method: 'post',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json',
        MerchantId: '82630627-4677-44a3-a96b-371334997e0f',
        MerchantKey: 'FVIBVSZKJZQIHGPLIJEVEWFMEAPLEDOMAMXNHUJF'
      }
    }).then(res => res.json());
  }

  static captura(paymentId) {
    return fetch(
      'https://apisandbox.cieloecommerce.cielo.com.br/1/sales/' +
        paymentId +
        '/capture',
      {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          MerchantId: '82630627-4677-44a3-a96b-371334997e0f',
          MerchantKey: 'FVIBVSZKJZQIHGPLIJEVEWFMEAPLEDOMAMXNHUJF'
        }
      }
    ).then(res => res.json());
  }
  static consulta(paymentId) {
    return fetch(
      'https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/' +
        paymentId,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          MerchantId: '82630627-4677-44a3-a96b-371334997e0f',
          MerchantKey: 'FVIBVSZKJZQIHGPLIJEVEWFMEAPLEDOMAMXNHUJF'
        }
      }
    ).then(res => res.json());
  }
}

module.exports = Cielo;
