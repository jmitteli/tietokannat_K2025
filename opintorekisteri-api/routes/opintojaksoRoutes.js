const express = require('express');
const router = express.Router();
const opintojaksoController = require('../controllers/opintojaksoController');

module.exports = router;

router.get('/', opintojaksoController.haeKaikkiOpintojaksot);

router.post('/', opintojaksoController.lisaaOpintojakso);//Kutsuu lisaaOpintojakso toimintoa controllerilta

router.delete('/:id', opintojaksoController.poistaOpintojakso);//Kutsuu toimintoa poistaOpintojakso controller tiedostossa

router.put('/:id', opintojaksoController.paivitaOpintojakso);