const opiskelijaModel = require('../models/opiskelijaModel');
//Kaikkien opiskelijoiden haku
exports.haeKaikkiOpiskelijat = (req, res) => {
    opiskelijaModel.haeKaikki((err, tulos) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(tulos);
        }
    });
};
//Haetaan kaikkien opiskelijoiden suorituksien yhteenveto
exports.haeSuorituksienYhteenveto = (req, res) => {
    opiskelijaModel.haeSuorituksienYhteenveto((err, tulos) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(tulos[0]);
    });
};

//Haetaan yksittäisen opiskelijan arvioinnit id perusteella. onkohan tämä väärässä paikassa?
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

//opiskelijan lisäys
exports.lisaaOpiskelija = (req, res) => {
    const uusi = {
        nimi: req.body.nimi,
        email: req.body.email
    };

    opiskelijaModel.lisaaOpiskelija(uusi, (err, tulos) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'Opiskelija lisätty', id: tulos.insertId });
        }
    });
};

// opiskelijan poisto
exports.poistaOpiskelija = (req, res) => {
    const id = Number(req.params.id); //  Muunna ensin numeroksi

    // Tarkistetaan että id on numero
    if (isNaN(id)) {
        return res.status(400).json({ message: 'Virheellinen opiskelija_id' });
    }

    opiskelijaModel.poistaOpiskelija(id, (err, tulos) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (tulos.affectedRows === 0) {
            res.status(404).json({ message: 'Emme löytäneet opiskelijaa tällä tunnuksella' });
        } else {
            res.json({ message: 'Opiskelijan tiedot poistettu' });
        }
    });
};

//Opiskelijan tietojen päivitys PUT metodi
exports.paivitaOpiskelija = (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ message: 'Virheellinen opiskelijan ID' });
    }

    const paivitetty = {
        nimi: req.body.nimi,
        email: req.body.email
    };

    opiskelijaModel.paivitaOpiskelija(id, paivitetty, (err, tulos) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (tulos.affectedRows == 0) {
            res.status(404).json({ message: 'Opiskelijaa ei löydetty' });
        } else {
            res.json({ message: 'Opiskelijan tiedot päivitetty tietokantaan' });
        }
    });
};