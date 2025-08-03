const db = require('../db/database');
//Toiminto joka kyselee kaikki opiskelijat tietokannasta
exports.haeKaikki = (callback) => {
    const sql = 'SELECT * FROM Opiskelija';
    db.query(sql, callback);//Komento joka hakee kaikki taulusta opiskelija
};
//Toiminto joka kyselee kaikkien opiskelijoiden yhteenvedon tietokannasta
exports.haeSuorituksienYhteenveto = (callback) => {
    const sql = 'CALL opintorekisteri.hae_opiskelijoiden_suoritukset()';//Kutsuu yhteenvedon tallennettua toimintoa eli Stored Procedure
    db.query(sql, callback);//Komento joka hakee kaikki taulusta opiskelija
};
//Toiminto joka lisää opiskelijan tietokantaan
exports.lisaaOpiskelija = (opiskelija, callback) => {
    const sql = 'INSERT INTO Opiskelija (nimi, email) VALUES (?, ?)';//SQL komento
    db.query(sql, [opiskelija.nimi, opiskelija.email], callback);
};
//Toiminto joka poistaa opiskelijan taulusta
exports.poistaOpiskelija = (id, callback) => {
    const sql = 'DELETE FROM Opiskelija WHERE opiskelija_id = ?';//SQL komento joka poistaa opiskelijan opiskelija ID mukaisesti
    db.query(sql, [id], callback);
};

//Toiminto jolla päivitetään opiskelijan tietoja PUT metodi
exports.paivitaOpiskelija = (id, opiskelija, callback) => {
    const sql = 'UPDATE Opiskelija SET nimi = ?, email = ? WHERE opiskelija_id = ?';
    db.query(sql, [opiskelija.nimi, opiskelija.email, id], callback);
};