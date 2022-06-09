var express = require('express');
var router = express.Router();
var cielo = require('../lib/cielo.js');
/* POST criação de compras. */
router.post('/', function (req, res, next) {
  res.send(cielo.compra(req.body));
});

/* GET status de compras. */
router.get('/:compra_id/status', function (req, res, next) {
  res.send('Compra realizada com sucesso!');
});

module.exports = router;
