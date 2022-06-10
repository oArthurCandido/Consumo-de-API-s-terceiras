const axios = require('axios');

class Pagarme {
  static compra(params) {
    return axios.post('https://api.pagar.me/1/transactions', params, {
      headers: {
        'content-type': 'application.json'
      }
    });
  }

  static captura(paymentId) {}
  static consulta(paymentId) {}
}

module.exports = Pagarme;
