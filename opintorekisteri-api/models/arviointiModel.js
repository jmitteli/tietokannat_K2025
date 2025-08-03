const db = require('../db/database');
//Toiminto joka kyselee kaikki arvioinnit tietokannasta
exports.haeKaikki = (callback) => {
    const sql =` 
        SELECT
                a.arviointi_id,
                o.nimi AS opiskelija_nimi,
                oj.nimi AS opintojakso_nimi,
                a.arvosana,
                a.pvm
        FROM arviointi a
        JOIN opiskelija o ON a.opiskelija_id = o.opiskelija_id
        JOIN opintojakso oj ON a.opintojakso_id= oj.opintojakso_id`;

    db.query(sql, callback);//Komento joka hakee kaikki taulusta arviointi ja yhdistää opiskelijoiden nimet ja opintojaksojen nimet
};

//Haetaan yksittäisen opiskelijan arvioinnit id perusteella
exports.haeOpiskelijanArvioinnit = (opiskelija_id, callback) => {
    const sql = `
        SELECT
                a.arviointi_id,
                o.nimi AS opiskelija_nimi,
                oj.nimi AS opintojakso_nimi,
                a.arvosana,
                a.pvm
        FROM arviointi a
        JOIN opiskelija o ON a.opiskelija_id = o.opiskelija_id
        JOIN opintojakso oj ON a.opintojakso_id = oj.opintojakso_id
        WHERE o.opiskelija_id = ?
    `;
    db.query(sql, [opiskelija_id], callback);
};



//Toiminto joka lisää opiskelijan tietylle opintojaksolle tietokantaan
exports.lisaaArviointi = (arviointi, callback) => {
    const sql = 'INSERT INTO arviointi (opiskelija_id, opintojakso_id) VALUES (?, ?)';//SQL komento
    db.query(sql, [arviointi.opiskelija_id, arviointi.opintojakso_id], callback);
};
//Toiminto joka poistaa opiskelijan arvioinnin taulusta
exports.poistaArviointi = (id, callback) => {
    const sql = 'DELETE FROM arviointi WHERE arviointi_id = ?';//SQL komento joka poistaa opiskelijan opiskelija ID mukaisesti
    db.query(sql, [id], callback);
};

//Toiminto jolla päivitetään opiskelijan arvosana ja sen anto pvm, PUT metodi
exports.paivitaArviointi = (id, arviointi, callback) => {
    const sql = 'UPDATE arviointi SET arvosana = ?, pvm = ? WHERE arviointi_id = ?';
    db.query(sql, [arviointi.arvosana, arviointi.pvm, id], callback);
};