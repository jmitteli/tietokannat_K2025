const db = require('../db/database');
//Toiminto joka kyselee kaikki opintojaksot tietokannasta
exports.haeKaikki = (callback) => {
    db.query('SELECT * FROM opintojakso', callback);//Komento joka hakee kaikki taulusta opintojakso
};
//Toiminto joka lisää opintojakson tietokantaan
exports.lisaaOpintojakso = (opintojakso, callback) => {
    const sql = 'INSERT INTO opintojakso (nimi, opintopisteet) VALUES (?, ?)';//SQL komento joka lisää opintojakson
    db.query(sql, [opintojakso.nimi, opintojakso.opintopisteet], callback);
};
//Toiminto joka poistaa opintojakson taulusta
exports.poistaOpintojakso = (id, callback) => {
    const sql = 'DELETE FROM opintojakso WHERE opintojakso_id = ?';//SQL komento joka poistaa opintojakson opintojakso_id mukaisesti
    db.query(sql, [id], callback);
};

//Toiminto jolla päivitetään opintojakson tietoja PUT metodi
exports.paivitaOpintojakso = (id, opintojakso, callback) => {
    const sql = 'UPDATE opintojakso SET nimi = ?, opintopisteet = ? WHERE opintojakso_id = ?';
    db.query(sql, [opintojakso.nimi, opintojakso.opintopisteet, id], callback);
};