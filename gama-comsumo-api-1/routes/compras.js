var express = require('express');
var router = express.Router();
var cielo = require('../lib/cielo.js');
/* POST criação de compras. */
router.post('/', function (req, res, next) {
  cielo.compra(req.body).then(result => {
    cielo.captura(result.Payment.PaymentId).then(result => {
      if (result.Status == 2) {
        res.status(201).send({
          Status: 'Ok',
          Message: 'Compra realizada com sucesso!'
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
router.get('/:compra_id/status', function (req, res, next) {
  res.send('Compra realizada com sucesso!');
});

module.exports = router;
