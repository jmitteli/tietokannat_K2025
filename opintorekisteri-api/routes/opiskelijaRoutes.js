const express = require('express');
const router = express.Router();
const opiskelijaController = require('../controllers/opiskelijaController');

module.exports = router;

router.get('/', opiskelijaController.haeKaikkiOpiskelijat);
router.get('/suoritukset/yhteenveto', opiskelijaController.haeSuorituksienYhteenveto);//Hakee kaikkien opiskelijoiden suorituksien yhteen vedon. Opintopisteet keskiarvot yms

router.post('/', opiskelijaController.lisaaOpiskelija);//Kutsuu lisaaOpiskelija toimintoa controllerilta

router.delete('/:id', opiskelijaController.poistaOpiskelija);//Kutsuu toimintoa poistaOpiskelija controller tiedostossa

router.put('/:id', opiskelijaController.paivitaOpiskelija);