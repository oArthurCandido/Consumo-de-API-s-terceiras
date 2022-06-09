const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

class Cielo {
  static async compra(params) {
    const response = await fetch(
      'https://apisandbox.cieloecommerce.cielo.com.br/1/sales/',
      {
        method: 'post',
        body: JSON.stringify(params),
        headers: {
          'Content-Type': 'application/json',
          MerchantId: '82630627-4677-44a3-a96b-371334997e0f',
          MerchantKey: 'FVIBVSZKJZQIHGPLIJEVEWFMEAPLEDOMAMXNHUJF'
        }
      }
    );
    const data = await response.json();

    console.log(data);
  }
}

module.exports = Cielo;
