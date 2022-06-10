const axios = require('axios').default;

class Pagarme {
  static compra(params) {
    return axios.post('https://api.pagar.me/1/transactions', params, {
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  static captura(paymentId, amount) {
    console.log(paymentId, amount);
    return axios.post(
      'https://api.pagar.me/1/transactions/' + paymentId + '/capture',
      {
        amount: amount,
        api_key: 'pk_test_dJqwRN0UvAC5w3ky'
      },
      {
        headers: {
          'content-type': 'application/json'
        }
      }
    );
  }
  static consulta(paymentId) {}
}

module.exports = Pagarme;
