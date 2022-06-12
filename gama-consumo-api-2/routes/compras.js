var express = require('express');
var router = express.Router();
var pagarme = require('../lib/pagarme');
/* POST criação de compras. */
router.post('/', function (req, res, next) {
  pagarme
    .compra(req.body)
    .then(result => {
      const statusPagarme = result.data.status;
      const paymentId = result.data.id;
      const amount = result.data.amount;
      console.log(statusPagarme, paymentId, amount);

      // pagarme
      //   .captura(paymentId, amount)
      //   .then(result => {
      //     if (statusPagarme == 'paid') {
      //       res.status(201).send({
      //         Status: 'Ok',
      //         Message: 'Compra realizada com sucesso!',
      //         CompraId: paymentId
      //       });
      //     } else {
      //       res.status(402).send({
      //         Status: 'Falhou',
      //         Message:
      //           'Compra não realizada, problema na cobrança com cartão de crédito =('
      //       });
      //     }
      //   })
      //   .catch(err => {
      //     // console.log(er);
      //   });
    })
    .catch(function (error) {
      console.log(error);
    });
});

/* GET status de compras. */
router.get('/:compra_id/status/', function (req, res, next) {
  pagarme.consulta(req.params.compra_id).then(result => {
    const statusPagarme = result.Payment.Status;
    let message = {};

    switch (result.Payment.Status) {
      case 1:
        message = {
          Status: 'Código ' + statusPagarme + ' - Pagamento autorizado!'
        };
        break;
      case 2:
        message = {
          Status:
            'Código ' + statusPagarme + ' - Pagamento concluído com sucesso!'
        };
        break;
      case 12:
        message = {
          Status: 'Código ' + statusPagarme + ' - Pagamento pendente.'
        };
        break;
      default:
        message = {
          Status: 'Código ' + statusPagarme + ' - Pagamento falhou.'
        };
    }
    res.send(message);
  });
});

module.exports = router;
