var express = require('express');
var router = express.Router();
var cielo = require('../lib/cielo.js');
/* POST criação de compras. */
router.post('/', function (req, res, next) {
  cielo.compra(req.body).then(result => {
    const statusCielo = result.Payment.Status;
    const paymentId = result.Payment.PaymentId;

    cielo.captura(paymentId).then(result => {
      if (statusCielo == 2) {
        res.status(201).send({
          Status: 'Ok',
          Message: 'Compra realizada com sucesso!',
          CompraId: paymentId
        });
      } else {
        res.status(402).send({
          Status: 'Falhou',
          Message:
            'Compra não realizada, problema na cobrança com cartão de crédito =('
        });
      }
    });
  });
});

/* GET status de compras. */
router.get('/:compra_id/status/', function (req, res, next) {
  cielo.consulta(req.params.compra_id).then(result => {
    const statusCielo = result.Payment.Status;
    let message = {};

    switch (result.Payment.Status) {
      case 1:
        message = {
          Status: 'Código ' + statusCielo + ' - Pagamento autorizado!'
        };
        break;
      case 2:
        message = {
          Status:
            'Código ' + statusCielo + ' - Pagamento concluído com sucesso!'
        };
        break;
      case 12:
        message = {
          Status: 'Código ' + statusCielo + ' - Pagamento pendente.'
        };
        break;
      default:
        message = {
          Status: 'Código ' + statusCielo + ' - Pagamento falhou.'
        };
    }
    res.send(message);
  });
});

module.exports = router;
