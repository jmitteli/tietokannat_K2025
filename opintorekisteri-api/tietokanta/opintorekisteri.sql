-- MySQL dump 10.13  Distrib 8.2.0, for Win64 (x86_64)
--
-- Host: localhost    Database: opintorekisteri
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `opintorekisteri`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `opintorekisteri` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `opintorekisteri`;

--
-- Table structure for table `arviointi`
--

DROP TABLE IF EXISTS `arviointi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `arviointi` (
  `arviointi_id` int NOT NULL AUTO_INCREMENT,
  `opiskelija_id` int NOT NULL,
  `opintojakso_id` int NOT NULL,
  `arvosana` int DEFAULT NULL,
  `pvm` date DEFAULT NULL,
  PRIMARY KEY (`arviointi_id`),
  KEY `opiskelija_id` (`opiskelija_id`),
  KEY `opintojakso_id` (`opintojakso_id`),
  CONSTRAINT `arviointi_ibfk_1` FOREIGN KEY (`opiskelija_id`) REFERENCES `opiskelija` (`opiskelija_id`) ON DELETE CASCADE,
  CONSTRAINT `arviointi_ibfk_2` FOREIGN KEY (`opintojakso_id`) REFERENCES `opintojakso` (`opintojakso_id`) ON DELETE CASCADE,
  CONSTRAINT `arviointi_chk_1` CHECK ((`arvosana` between 0 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `arviointi`
--

LOCK TABLES `arviointi` WRITE;
/*!40000 ALTER TABLE `arviointi` DISABLE KEYS */;
INSERT INTO `arviointi` VALUES (1,1,1,4,'2025-08-03'),(2,1,2,3,'2025-08-03'),(3,2,2,4,'2025-08-03'),(5,4,2,NULL,NULL),(6,1,1,NULL,NULL),(7,2,1,NULL,NULL),(8,3,1,2,'2025-08-03'),(9,4,1,NULL,NULL),(10,1,6,NULL,NULL),(11,2,6,NULL,NULL),(12,3,6,NULL,NULL),(13,4,6,NULL,NULL);
/*!40000 ALTER TABLE `arviointi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `opintojakso`
--

DROP TABLE IF EXISTS `opintojakso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opintojakso` (
  `opintojakso_id` int NOT NULL AUTO_INCREMENT,
  `nimi` varchar(100) NOT NULL,
  `opintopisteet` int NOT NULL,
  PRIMARY KEY (`opintojakso_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `opintojakso`
--

LOCK TABLES `opintojakso` WRITE;
/*!40000 ALTER TABLE `opintojakso` DISABLE KEYS */;
INSERT INTO `opintojakso` VALUES (1,'Jääkiekon alkeet 1',5),(2,'Matematiikka 1',3),(3,'Ohjelmointi 1',5),(4,'Nyrkkeilyn alkeet',3),(5,'Yrittäjyys 1',5),(6,'Tietokannat',5),(7,'Käyttöliittymät 13',5);
/*!40000 ALTER TABLE `opintojakso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `opiskelija`
--

DROP TABLE IF EXISTS `opiskelija`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opiskelija` (
  `opiskelija_id` int NOT NULL AUTO_INCREMENT,
  `nimi` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`opiskelija_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `opiskelija`
--

LOCK TABLES `opiskelija` WRITE;
/*!40000 ALTER TABLE `opiskelija` DISABLE KEYS */;
INSERT INTO `opiskelija` VALUES (1,'Victor Motasenko','victor.motasenko@students.com'),(2,'Timothy Tirpasenko','timothy.tirpasenko@students.com'),(3,'Yokohama Humahuta','yokohama.humahuta@students.com'),(4,'Nathalie Loikhanova','nathalie.loikhanova@students.com'),(6,'Matti Martikainen','matti.martikainen@students.com'),(7,'Iiro Lieronen','iiro.lieronen@students.com'),(8,'Deletus Maximus','deletus.maximus@students.com');
/*!40000 ALTER TABLE `opiskelija` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-03 18:53:48
