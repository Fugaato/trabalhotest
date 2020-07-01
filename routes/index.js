var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Enklima' });
});

router.get('/dashADM', function(req, res, next) {
  res.render('dashADM', { title: 'DashBoard ADM' });
});

router.get('/dashPadrao', function(req, res, next) {
  res.render('dashPadrao', { title: 'DashBoard Padrao' });
});

router.get('users/register', function(req, res, next) {
  res.render('register', { title: 'Registrar' });
});

router.get('ocorrencia/registrar', function(req, res, next) {
  res.render('ocorrenciaReg', { title: 'Registrar' });
});

module.exports = router;
