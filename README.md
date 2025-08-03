# tietokannat_K2025
Kes� 2025 Tietokannat ja rajapinnat kurssin harjoitusty�.

Ty�n suoritti: Jussi Mitteli

Harjoituksen tavoitteena oli rakentaa tietokantayhteys MySQL-opintorekisteri -tietokantaan Node.js- ja Express-teknologioita k�ytt�en. Testasin toiminnot k�ytt�en Postman ohjelmaa. MySQL palvelimena k�ytin Uniserveri� joka oli kurssin materiaaleissa my�s k�yt�ss�. T�ss� harjoituksen ohjelmoinnissa ja dokumentaatiossa k�ytin kielen� suomea koska se on helpompi oppimiseen ja asioiden sis�ist�miseen. Oikeassa projektissa k�ytt�isin kuitenkin englannin kielt�, joka on kansainv�lisesti parempi kieli ja ammattimaisempi.

Opin t�m�n harjoituksen my�t� paljon ja ty�t� tehdess� tuli paljon ideoita miten jatkossa rakentaisin vastaavan ohjelmiston. Haluaisin viel� lis�t� muutamia automaattisia toimintoja ohjelmistoon joilla voidaan suodattaa dataa paremmin ja tietokannan k�ytett�vyys paranisi huomattavasti. Haluaisin lis�t� t�h�n viel� enemm�n yksitt�isten taulujen datan yhdistelemist�, mutta aika loppui kesken ja en ehtinyt lis�t� kaikkea mit� olisin halunnut. T�m�n hetkisess� versiossa on mahdollista hakea kaikkien opiskelijoiden yhteenveto k�ytt�en Stored Proceduresia SQL palvelimella, mutta haluan viel� lis�t� siihen lis�� toimintoja yksitt�isten opiskelijoiden tietojen hallintaan ja ker�ykseen.

Arvioinnit tauluun olisi viel� hyv� lis�t� p�iv�m��r� kun opiskelija on lis�tty kurssille arvosanan anto p�iv�m��r�n lis�ksi.

Suurimmassa osassa toimintoja tietojen muokkaukseen ja poistamiseen k�ytet��n kyseisten tietojen asiaankuuluvia ID numeroita, opiskelija_id, arviointi_id, opintojakso_id jne.

Tietokanta koostuu kolmesta taulusta opiskelija, arviointi ja opintojakso.

Jos kuvat eiv�t n�y ne l�ytyv�t kansiosta /opintorekisteri-api/kuvat

Video linkki:
https://youtu.be/O9SHEtMHnk4

## Tietokantakaavio

![Tietokantakaavio](opintorekisteri-api/kuvat/tietokantakaavio.png)


```
+---------------------------+
| Tables_in_opintorekisteri |
+---------------------------+
| arviointi                 |
| opintojakso               |
| opiskelija                |
+---------------------------+

```


Opiskelija-taulun rakenne:
```
+---------------+--------------+------+-----+---------+----------------+
| Field         | Type         | Null | Key | Default | Extra          |
+---------------+--------------+------+-----+---------+----------------+
| opiskelija_id | int          | NO   | PRI | NULL    | auto_increment |
| nimi          | varchar(100) | NO   |     | NULL    |                |
| email         | varchar(100) | NO   |     | NULL    |                |
+---------------+--------------+------+-----+---------+----------------+

```
Opintojakso-taulun rakenne:

```
+----------------+--------------+------+-----+---------+----------------+
| Field          | Type         | Null | Key | Default | Extra          |
+----------------+--------------+------+-----+---------+----------------+
| opintojakso_id | int          | NO   | PRI | NULL    | auto_increment |
| nimi           | varchar(100) | NO   |     | NULL    |                |
| opintopisteet  | int          | NO   |     | NULL    |                |
+----------------+--------------+------+-----+---------+----------------+

```
Arviointi-taulun rakenne:

```
+----------------+------+------+-----+---------+----------------+
| Field          | Type | Null | Key | Default | Extra          |
+----------------+------+------+-----+---------+----------------+
| arviointi_id   | int  | NO   | PRI | NULL    | auto_increment |
| opiskelija_id  | int  | NO   | MUL | NULL    |                |
| opintojakso_id | int  | NO   | MUL | NULL    |                |
| arvosana       | int  | YES  |     | NULL    |                |
| pvm            | date | YES  |     | NULL    |                |
+----------------+------+------+-----+---------+----------------+

```
Opiskelijat ja opintojaksot yhdistet��n toisiinsa arviointi taulun kautta k�ytt�en opiskelija_id ja opintojakso_id tietueita. Taulujen tietoja voidaan lukea, lis�t�, p�ivitt�� ja poistaa (CRUD) http rajapinnan kautta esimerkiksi postmanilla tai suoraan selaimesta.

# Ohjelmiston toiminta on seuraavanlainen:

Selain/testiohjelma l�hett�� pyynn�n GET/POST/PUT/DELETE Express serverille joka k�sittelee pyynn�n, l�hett�� sen Routesissa m��ritellylle toiminnolle(controller) joka sitten suorittaa toiminnolle modelissa m��ritettyj� SQL-kielen komentoja mySQL palvelimen konsolissa. Ohjelma palauttaa onnistuneen pyynn�n k�sittelyn seurauksena pyydetyt tiedot, poistaa tiedot, p�ivitt�� tiedot tai lis�� uusia tietoja. Stored Procedure toimintojen avulla voidaan suorittaa yhteenveto esimerkiksi kaikkien tietokannassa olevien opiskelijoiden opintosuorituksista opintopistein� ja keskiarvoista. Stored Procedures ovat toimintoja jotka on tallennettu tavallaan funktiona SQL palvelimelle ja niit� voidaan kutsua mysql konsolissa CALL funktiolla.

# Postman testikomennot

Postmanissa testi komentojen alussa on palvelimen osoite joka itsell�ni oli http://localhost:3000/ siit� syyst� ett� palvelin py�rii samalla koneella josta testi komennot l�hetet��n ja kuuntelee porttia 3000.
K�yt� osoitetta selaimessa tai Postmanissa komennon osoitteen alussa ja lis�� siihen haluamasi toiminnon osoite. Esimerkiksi http://localhost:3000/opiskelijat hakee kaikkien tietokannassa olevien opiskelijoiden nimen ja s�hk�postiosoitteen GET toiminnolla.

## Opiskelija (GET, POST, PUT, DELETE)

### Hae kaikki opiskelijat (GET)
GET /opiskelijat


![Testimage](opintorekisteri-api/kuvat/postman_test_image3.png)


### Lis�� opiskelija (POST)
POST /opiskelijat

Body (JSON):
```
{
  "nimi": "Testi Testaaja",
  "email": "testi.testaaja@students.com"
}
```
![Testimage](opintorekisteri-api/kuvat/postman_test_image4.png)


### P�ivit� opiskelijan tiedot (PUT)
PUT /opiskelijat/:id

Body (JSON):
```
{
  "nimi": "P�ivitetty Nimi",
  "email": "paivitetty.email@students.com"
}
```
![Testimage](opintorekisteri-api/kuvat/postman_test_image5.png)


### Poista opiskelija (DELETE)
DELETE /opiskelijat/:id


![Testimage](opintorekisteri-api/kuvat/postman_test_image6.png)


***************************************


## Opintojakso (GET, POST, PUT, DELETE)

Hae kaikki opintojaksot (GET)
GET /opintojaksot


![Testimage](opintorekisteri-api/kuvat/postman_test_image12.png)


### Lis�� opintojakso (POST)
POST /opintojaksot

Body (JSON):
```
{
  "nimi": "Tietokannat ja Rajapinnat",
  "opintopisteet": 5
}
```

![Testimage](opintorekisteri-api/kuvat/postman_test_image13.png)


### P�ivit� opintojakso (PUT)
PUT /opintojaksot/:id

Body (JSON):
```
{
  "nimi": "P�ivitetty Jakso",
  "opintopisteet": 10
}
```

![Testimage](opintorekisteri-api/kuvat/postman_test_image14.png)


### Poista opintojakso (DELETE)
DELETE /opintojaksot/:id


![Testimage](opintorekisteri-api/kuvat/postman_test_image15.png)


**********************************


## Arviointi (GET, POST, PUT, DELETE)

### Hae kaikki arvioinnit (GET)
GET /arvioinnit


![Testimage](opintorekisteri-api/kuvat/postman_test_image7.png)



### Hae kaikki arvioinnit yksitt�iselle opiskelijalle ID mukaan (GET)
arvioinnit/opiskelija/:id


![Testimage](opintorekisteri-api/kuvat/postman_test_image1.png)



### Lis�� arviointi (POST)
POST /arvioinnit

Body (JSON):
```
{
  "opiskelija_id": 1,
  "opintojakso_id": 2
}
```
Huom: Arvosana ja pvm lis�t��n PUT:lla my�hemmin.

![Testimage](opintorekisteri-api/kuvat/postman_test_image8.png)

### Hae opiskelijan arvioinnit (GET)
GET /arvioinnit/opiskelija/:id

![Testimage](opintorekisteri-api/kuvat/postman_test_image9.png)

### Lis�� arvosana ja p�iv�m��r� arviointiin (PUT)
PUT /arvioinnit/:id

Body (JSON):

```
{
  "arvosana": 4,
  "pvm": "2025-08-03"
}
```

![Testimage](opintorekisteri-api/kuvat/postman_test_image10.png)


### Poista arviointi (DELETE)
DELETE /arvioinnit/:id


![Testimage](opintorekisteri-api/kuvat/postman_test_image11.png)


*******************************************************************************************************************************
# Stored Procedure komennot:

![Testimage](opintorekisteri-api/kuvat/postman_test_image2.png)

Kaikkien opiskelijoiden yhteenvedon haku tietokannasta:
```sql
CREATE PROCEDURE hae_opiskelijoiden_suoritukset()
BEGIN
    SELECT
        o.opiskelija_id,
        o.nimi,
        COUNT(a.arvosana) AS suorituksia,
        ROUND(AVG(a.arvosana), 2) AS keskiarvo,
        COALESCE(SUM(oj.opintopisteet), 0) AS suoritetut_opintopisteet
    FROM opiskelija o
    LEFT JOIN arviointi a 
        ON o.opiskelija_id = a.opiskelija_id AND a.arvosana IS NOT NULL
    LEFT JOIN opintojakso oj 
        ON a.opintojakso_id = oj.opintojakso_id
    GROUP BY o.opiskelija_id, o.nimi;
END $$
```
*******************************************************************************************************************************
