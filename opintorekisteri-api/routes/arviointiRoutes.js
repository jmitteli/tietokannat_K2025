const express = require('express');
const router = express.Router();
const arviointiController = require('../controllers/arviointiController');

module.exports = router;
//GET
router.get('/', arviointiController.haeKaikkiArvioinnit);
router.get('/opiskelija/:id', arviointiController.haeOpiskelijanArvioinnit);//pyyt‰‰ kaikki tietyn opiskelijan arviontitiedot

//POST
router.post('/', arviointiController.lisaaArviointi);//Kutsuu lisaaArviointi toimintoa controllerilta

//DELETE
router.delete('/:id', arviointiController.poistaArviointi);//Kutsuu toimintoa poistaArviointi controller tiedostossa


//PUT
router.put('/:id', arviointiController.paivitaArviointi);//T‰ll‰ toiminnolla annetaan arvosana

