const opintojaksoModel = require('../models/opintojaksoModel');
//Kaikkien Opintojaksojen haku
exports.haeKaikkiOpintojaksot = (req, res) => {
    opintojaksoModel.haeKaikki((err, tulos) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(tulos);
        }
    });
};
//Opintojakson lis�ys
exports.lisaaOpintojakso = (req, res) => {
    const uusi = {
        nimi: req.body.nimi,
        opintopisteet: req.body.opintopisteet
    };

    opintojaksoModel.lisaaOpintojakso(uusi, (err, tulos) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'Opintojakso lis�tty', id: tulos.insertId });
        }
    });
};

// Opintojakso poisto
exports.poistaOpintojakso = (req, res) => {
    const id = Number(req.params.id); //  Muunna ensin numeroksi

    // Tarkistetaan ett� id on numero
    if (isNaN(id)) {
        return res.status(400).json({ message: 'Virheellinen opintojakso_id' });
    }

    opintojaksoModel.poistaOpintojakso(id, (err, tulos) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (tulos.affectedRows === 0) {
            res.status(404).json({ message: 'Emme l�yt�neet yht��n opintojaksoa t�ll� tunnuksella' });
        } else {
            res.json({ message: 'Opintojakson tiedot poistettu' });
        }
    });
};

//Opintojakson tietojen p�ivitys PUT metodi
exports.paivitaOpintojakso = (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ message: 'Virheellinen opintojakson ID' });
    }

    const paivitetty = {
        nimi: req.body.nimi,
        opintopisteet: req.body.opintopisteet
    };

    opintojaksoModel.paivitaOpintojakso(id, paivitetty, (err, tulos) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (tulos.affectedRows === 0) {
            res.status(404).json({ message: 'Opintojaksoa ei l�ydetty' });
        } else {
            res.json({ message: 'Opintojakson tiedot p�ivitetty tietokantaan' });
        }
    });
};