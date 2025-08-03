const arviointiModel = require('../models/arviointiModel');
//Kaikkien opiskelijoiden haku
exports.haeKaikkiArvioinnit = (req, res) => {
    arviointiModel.haeKaikki((err, tulos) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(tulos);
        }
    });
};

// Haetaan tietyn opiskelijan arvioinnit
exports.haeOpiskelijanArvioinnit = (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ message: 'Virheellinen opiskelija_id' });
    }

    arviointiModel.haeOpiskelijanArvioinnit(id, (err, tulos) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (tulos.length === 0) {
            res.status(404).json({ message: 'Opiskelijalla ei ole arviointeja' });
        } else {
            res.json(tulos);
        }
    });
};

//arvioinnin lisäys
exports.lisaaArviointi = (req, res) => {
    const uusi = {
        opiskelija_id: req.body.opiskelija_id,
        opintojakso_id: req.body.opintojakso_id,
    };

    arviointiModel.lisaaArviointi(uusi, (err, tulos) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'Arviointi lisätty', id: tulos.insertId });
        }
    });
};

// arvioinnin poisto
exports.poistaArviointi = (req, res) => {
    const id = Number(req.params.id); //  Muunna ensin numeroksi

    // Tarkistetaan että id on numero
    if (isNaN(id)) {
        return res.status(400).json({ message: 'Virheellinen arviointi_id' });
    }

    arviointiModel.poistaArviointi(id, (err, tulos) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (tulos.affectedRows === 0) {
            res.status(404).json({ message: 'Arviointia ei löydetty' });
        } else {
            res.json({ message: 'Arvioinnin tiedot poistettu' });
        }
    });
};

//Arvioinnin tietojen päivitys PUT metodi
exports.paivitaArviointi = (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ message: 'Virheellinen arviointi_id' });
    }

    const paivitetty = {
        arvosana: req.body.arvosana,
        pvm: req.body.pvm
    };

    arviointiModel.paivitaArviointi(id, paivitetty, (err, tulos) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (tulos.affectedRows == 0) {
            res.status(404).json({ message: 'Arviointia ei löydetty' });
        } else {
            res.json({ message: 'Arvioinnin tiedot päivitetty tietokantaan' });
        }
    });
};