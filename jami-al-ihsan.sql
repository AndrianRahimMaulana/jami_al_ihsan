-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: masjid-jami-al-ihsan
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `banners`
--

DROP TABLE IF EXISTS `banners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banners` (
  `banner` int NOT NULL AUTO_INCREMENT,
  `category` enum('beranda','layanan','kegiatan_masjid','kegiatan_talim','kegiatan_madrasah') DEFAULT NULL,
  `judul` varchar(100) DEFAULT NULL,
  `deskripsi` varchar(100) DEFAULT NULL,
  `gambar` int DEFAULT NULL,
  `datecreate` datetime DEFAULT NULL,
  PRIMARY KEY (`banner`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banners`
--

LOCK TABLES `banners` WRITE;
/*!40000 ALTER TABLE `banners` DISABLE KEYS */;
INSERT INTO `banners` VALUES (1,'beranda','Haloo mas bro di kemudian hari','Selamat datang lagi',57,'2024-07-05 01:17:04'),(17,'beranda','Tingkatkan Gizi!','Ayo tingkatkan gizi bersama kita',38,'2024-07-05 01:42:42'),(33,'beranda','Test','halo',71,'2024-07-10 19:21:10'),(34,'kegiatan_masjid','Kegiatan Masjid 1 - revisi','Halo ini kegiatan masjid - revisi',81,'2024-07-15 19:53:10'),(35,'kegiatan_masjid','Kegiatan masjid 2','Kegiatan masjid 2',80,'2024-07-15 19:54:48'),(36,'kegiatan_madrasah','Kegiatan Madrasah 2','Kegiatan Madrasah Deskripsi 2',83,'2024-07-15 20:17:05'),(37,'kegiatan_madrasah','Kegiatan madrasah lagi','Deskripsi kegiatan madrasah lagi',84,'2024-07-15 20:19:40'),(39,'layanan','Layanan','Layanan',86,'2024-07-15 21:01:48'),(40,'kegiatan_talim','Judul test','Deskripsi test',88,'2024-07-15 21:02:30');
/*!40000 ALTER TABLE `banners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `codes`
--

DROP TABLE IF EXISTS `codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `codes` (
  `code` int NOT NULL AUTO_INCREMENT,
  `nama_gambar` varchar(255) DEFAULT NULL,
  `ekstensi` varchar(45) DEFAULT NULL,
  `ukuran` int DEFAULT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `datetime` datetime DEFAULT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `codes`
--

LOCK TABLES `codes` WRITE;
/*!40000 ALTER TABLE `codes` DISABLE KEYS */;
INSERT INTO `codes` VALUES (1,'Masjid_Al_Ihsan','image/jpg',255900,'Masjid_Al_Ihsan.jpg','2024-07-04 12:20:03'),(2,'Masjid_Al_Ihsan','image/jpg',255900,'Masjid_Al_Ihsan-2.jpg','2024-07-04 12:20:03'),(3,'banner-1','image/jpg',255900,'banner-1.jpg','2024-07-04 12:20:03'),(4,'banner-2','image/jpg',255900,'banner-2.jpg','2024-07-04 12:20:03'),(5,'banner-3','image/jpg',255900,'banner-3.jpg','2024-07-04 12:20:03'),(6,'banner-layanan-1','image/jpg',255900,'banner-layanan-1.jpg','2024-07-04 12:20:03'),(7,'banner-layanan-2','image/jpg',255900,'banner-layanan-2.jpg','2024-07-04 12:20:03'),(8,'banner-layanan-3','image/jpg',255900,'banner-layanan-3.jpg','2024-07-04 12:20:03'),(9,'person-1','image/jpg',255900,'person-1.jpg','2024-07-04 12:20:03'),(10,'person-2','image/jpg',255900,'person-2.jpg','2024-07-04 12:20:03'),(11,'person-3','image/jpg',255900,'person-3.jpg','2024-07-04 12:20:03'),(38,'linus-mimietz-gvptKmonylk-unsplash','image/jpeg',205307,'20240704183954027_linus-mimietz-gvptKmonylk-unsplash.jpg','2024-07-05 01:42:42'),(39,'c5f2c39c-ae60-4944-8f2f-2eb53bafbef1','image/jpeg',131556,'20240704183954027_c5f2c39c-ae60-4944-8f2f-2eb53bafbef1.jpg','2024-07-05 01:48:25'),(40,'769cdd56-02be-4299-acfb-ba229a7e5243','image/jpeg',287238,'20240704183954027_769cdd56-02be-4299-acfb-ba229a7e5243.jpg','2024-07-05 01:50:58'),(41,'Icon','image/png',1281,'20240704190105730_Icon.png','2024-07-05 02:01:21'),(42,'769cdd56-02be-4299-acfb-ba229a7e5243','image/jpeg',287238,'20240706085658213_769cdd56-02be-4299-acfb-ba229a7e5243.jpg','2024-07-06 15:58:31'),(43,'Screenshot 2024-06-19 at 08.24.24','image/png',266718,'20240706085658213_Screenshot 2024-06-19 at 08.24.24.png','2024-07-06 16:01:36'),(44,'c5f2c39c-ae60-4944-8f2f-2eb53bafbef1','image/jpeg',131556,'20240706085658213_c5f2c39c-ae60-4944-8f2f-2eb53bafbef1.jpg','2024-07-06 16:01:47'),(45,'769cdd56-02be-4299-acfb-ba229a7e5243','image/jpeg',287238,'20240706090331951_769cdd56-02be-4299-acfb-ba229a7e5243.jpg','2024-07-06 16:04:10'),(46,'linus-mimietz-gvptKmonylk-unsplash','image/jpeg',205307,'20240706090331951_linus-mimietz-gvptKmonylk-unsplash.jpg','2024-07-06 16:05:00'),(47,'linus-mimietz-gvptKmonylk-unsplash','image/jpeg',205307,'20240706090331951_linus-mimietz-gvptKmonylk-unsplash.jpg','2024-07-06 16:05:41'),(48,'769cdd56-02be-4299-acfb-ba229a7e5243','image/jpeg',287238,'20240706090331951_769cdd56-02be-4299-acfb-ba229a7e5243.jpg','2024-07-06 16:06:46'),(49,'769cdd56-02be-4299-acfb-ba229a7e5243','image/jpeg',287238,'20240706090331951_769cdd56-02be-4299-acfb-ba229a7e5243.jpg','2024-07-06 16:08:43'),(50,'769cdd56-02be-4299-acfb-ba229a7e5243','image/jpeg',287238,'20240706090331951_769cdd56-02be-4299-acfb-ba229a7e5243.jpg','2024-07-06 16:11:12'),(51,'linus-mimietz-gvptKmonylk-unsplash','image/jpeg',205307,'20240706090331951_linus-mimietz-gvptKmonylk-unsplash.jpg','2024-07-06 16:11:27'),(52,'c5f2c39c-ae60-4944-8f2f-2eb53bafbef1','image/jpeg',131556,'20240706090331951_c5f2c39c-ae60-4944-8f2f-2eb53bafbef1.jpg','2024-07-06 16:12:21'),(53,'linus-mimietz-gvptKmonylk-unsplash','image/jpeg',205307,'20240706090331951_linus-mimietz-gvptKmonylk-unsplash.jpg','2024-07-06 16:13:02'),(54,'769cdd56-02be-4299-acfb-ba229a7e5243','image/jpeg',287238,'20240706090331951_769cdd56-02be-4299-acfb-ba229a7e5243.jpg','2024-07-06 16:33:40'),(55,'c5f2c39c-ae60-4944-8f2f-2eb53bafbef1','image/jpeg',131556,'20240706090331951_c5f2c39c-ae60-4944-8f2f-2eb53bafbef1.jpg','2024-07-06 16:34:19'),(56,'linus-mimietz-gvptKmonylk-unsplash','image/jpeg',205307,'20240706090331951_linus-mimietz-gvptKmonylk-unsplash.jpg','2024-07-06 16:34:34'),(57,'c5f2c39c-ae60-4944-8f2f-2eb53bafbef1','image/jpeg',131556,'20240708132033669_c5f2c39c-ae60-4944-8f2f-2eb53bafbef1.jpg','2024-07-09 00:05:28'),(58,'linus-mimietz-gvptKmonylk-unsplash','image/jpeg',205307,'20240709120341278_linus-mimietz-gvptKmonylk-unsplash.jpg','2024-07-09 19:25:18'),(59,'c5f2c39c-ae60-4944-8f2f-2eb53bafbef1','image/jpeg',131556,'20240709154503269_c5f2c39c-ae60-4944-8f2f-2eb53bafbef1.jpg','2024-07-09 22:50:27'),(60,'769cdd56-02be-4299-acfb-ba229a7e5243','image/jpeg',287238,'20240709154503269_769cdd56-02be-4299-acfb-ba229a7e5243.jpg','2024-07-09 22:51:37'),(61,'769cdd56-02be-4299-acfb-ba229a7e5243','image/jpeg',287238,'20240709155336278_769cdd56-02be-4299-acfb-ba229a7e5243.jpg','2024-07-09 22:54:20'),(62,'linus-mimietz-gvptKmonylk-unsplash','image/jpeg',205307,'20240709155336278_linus-mimietz-gvptKmonylk-unsplash.jpg','2024-07-09 22:57:40'),(63,'769cdd56-02be-4299-acfb-ba229a7e5243','image/jpeg',287238,'20240709155336278_769cdd56-02be-4299-acfb-ba229a7e5243.jpg','2024-07-09 23:08:27'),(64,'769cdd56-02be-4299-acfb-ba229a7e5243','image/jpeg',287238,'20240709161157636_769cdd56-02be-4299-acfb-ba229a7e5243.jpg','2024-07-09 23:12:12'),(65,'linus-mimietz-gvptKmonylk-unsplash','image/jpeg',205307,'20240709161157636_linus-mimietz-gvptKmonylk-unsplash.jpg','2024-07-09 23:13:29'),(66,'769cdd56-02be-4299-acfb-ba229a7e5243','image/jpeg',287238,'20240709161157636_769cdd56-02be-4299-acfb-ba229a7e5243.jpg','2024-07-09 23:17:16'),(67,'769cdd56-02be-4299-acfb-ba229a7e5243','image/jpeg',287238,'20240709161157636_769cdd56-02be-4299-acfb-ba229a7e5243.jpg','2024-07-09 23:19:51'),(68,'linus-mimietz-gvptKmonylk-unsplash','image/jpeg',205307,'20240709161157636_linus-mimietz-gvptKmonylk-unsplash.jpg','2024-07-09 23:20:43'),(69,'8cc3f7d4a328eb4e1faf53ac617ca83aa7ec166b3f8e18032e4dd9f70294c9dc97aff09279c824555bdcd0f8ea2da009.png','image/png',98305,'20240709173638882_8cc3f7d4a328eb4e1faf53ac617ca83aa7ec166b3f8e18032e4dd9f70294c9dc97aff09279c824555bdcd0f8ea2da009.png.png','2024-07-10 00:37:04'),(70,'769cdd56-02be-4299-acfb-ba229a7e5243','image/jpeg',287238,'20240710122058111_769cdd56-02be-4299-acfb-ba229a7e5243.jpg','2024-07-10 19:21:10'),(71,'linus-mimietz-gvptKmonylk-unsplash','image/jpeg',205307,'20240710122058111_linus-mimietz-gvptKmonylk-unsplash.jpg','2024-07-10 19:21:29'),(72,'769cdd56-02be-4299-acfb-ba229a7e5243','image/jpeg',287238,'20240710132108407_769cdd56-02be-4299-acfb-ba229a7e5243.jpg','2024-07-10 20:22:32'),(73,'linus-mimietz-gvptKmonylk-unsplash','image/jpeg',205307,'20240710132108407_linus-mimietz-gvptKmonylk-unsplash.jpg','2024-07-10 20:26:53'),(74,'c5f2c39c-ae60-4944-8f2f-2eb53bafbef1','image/jpeg',131556,'20240710142551048_c5f2c39c-ae60-4944-8f2f-2eb53bafbef1.jpg','2024-07-10 21:27:46'),(75,'769cdd56-02be-4299-acfb-ba229a7e5243','image/jpeg',287238,'20240714045050148_769cdd56-02be-4299-acfb-ba229a7e5243.jpg','2024-07-14 12:04:22'),(76,'769cdd56-02be-4299-acfb-ba229a7e5243','image/jpeg',287238,'20240714053446653_769cdd56-02be-4299-acfb-ba229a7e5243.jpg','2024-07-14 12:36:49'),(77,'c5f2c39c-ae60-4944-8f2f-2eb53bafbef1','image/jpeg',131556,'20240714053446653_c5f2c39c-ae60-4944-8f2f-2eb53bafbef1.jpg','2024-07-14 12:38:51'),(78,'769cdd56-02be-4299-acfb-ba229a7e5243','image/jpeg',287238,'20240714054048554_769cdd56-02be-4299-acfb-ba229a7e5243.jpg','2024-07-14 12:44:35'),(79,'linus-mimietz-gvptKmonylk-unsplash','image/jpeg',205307,'20240715125225408_linus-mimietz-gvptKmonylk-unsplash.jpg','2024-07-15 19:53:10'),(80,'769cdd56-02be-4299-acfb-ba229a7e5243','image/jpeg',287238,'20240715125225408_769cdd56-02be-4299-acfb-ba229a7e5243.jpg','2024-07-15 19:54:48'),(81,'c5f2c39c-ae60-4944-8f2f-2eb53bafbef1','image/jpeg',131556,'20240715125225408_c5f2c39c-ae60-4944-8f2f-2eb53bafbef1.jpg','2024-07-15 20:10:04'),(82,'c5f2c39c-ae60-4944-8f2f-2eb53bafbef1','image/jpeg',131556,'20240715125225408_c5f2c39c-ae60-4944-8f2f-2eb53bafbef1.jpg','2024-07-15 20:17:05'),(83,'linus-mimietz-gvptKmonylk-unsplash','image/jpeg',205307,'20240715125225408_linus-mimietz-gvptKmonylk-unsplash.jpg','2024-07-15 20:18:34'),(84,'c5f2c39c-ae60-4944-8f2f-2eb53bafbef1','image/jpeg',131556,'20240715125225408_c5f2c39c-ae60-4944-8f2f-2eb53bafbef1.jpg','2024-07-15 20:19:40'),(85,'linus-mimietz-gvptKmonylk-unsplash','image/jpeg',205307,'20240715125225408_linus-mimietz-gvptKmonylk-unsplash.jpg','2024-07-15 20:53:40'),(86,'linus-mimietz-gvptKmonylk-unsplash','image/jpeg',205307,'20240715125225408_linus-mimietz-gvptKmonylk-unsplash.jpg','2024-07-15 21:01:48'),(87,'linus-mimietz-gvptKmonylk-unsplash','image/jpeg',205307,'20240715125225408_linus-mimietz-gvptKmonylk-unsplash.jpg','2024-07-15 21:02:30'),(88,'769cdd56-02be-4299-acfb-ba229a7e5243','image/jpeg',287238,'20240715125225408_769cdd56-02be-4299-acfb-ba229a7e5243.jpg','2024-07-15 21:05:06'),(89,'linus-mimietz-gvptKmonylk-unsplash','image/jpeg',205307,'20240721165031540_linus-mimietz-gvptKmonylk-unsplash.jpg','2024-07-21 23:54:40');
/*!40000 ALTER TABLE `codes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jadwal_sholat`
--

DROP TABLE IF EXISTS `jadwal_sholat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jadwal_sholat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `jadwal` enum('subuh','dzuhur','ashar','maghrib','isya') NOT NULL,
  `waktu` time NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jadwal_sholat`
--

LOCK TABLES `jadwal_sholat` WRITE;
/*!40000 ALTER TABLE `jadwal_sholat` DISABLE KEYS */;
INSERT INTO `jadwal_sholat` VALUES (1,'subuh','10:50:00'),(2,'dzuhur','13:56:00'),(3,'ashar','19:18:00'),(4,'maghrib','17:52:00'),(5,'isya','19:05:00');
/*!40000 ALTER TABLE `jadwal_sholat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kontak`
--

DROP TABLE IF EXISTS `kontak`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kontak` (
  `alamat` varchar(200) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `telepon` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kontak`
--

LOCK TABLES `kontak` WRITE;
/*!40000 ALTER TABLE `kontak` DISABLE KEYS */;
INSERT INTO `kontak` VALUES ('Jalan Masjid No. 123, Kota, Provinsi, Negara sa','info@masjidkami.co','(021) 12345678');
/*!40000 ALTER TABLE `kontak` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `laporan_keuangan`
--

DROP TABLE IF EXISTS `laporan_keuangan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `laporan_keuangan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `keterangan` varchar(255) DEFAULT NULL,
  `tanggal` date DEFAULT NULL,
  `pemasukkan` int DEFAULT NULL,
  `pengeluaran` int DEFAULT NULL,
  `saldo` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `laporan_keuangan`
--

LOCK TABLES `laporan_keuangan` WRITE;
/*!40000 ALTER TABLE `laporan_keuangan` DISABLE KEYS */;
INSERT INTO `laporan_keuangan` VALUES (9,'Infaq Jum\'at','2024-07-21',4000000,0,4000000);
/*!40000 ALTER TABLE `laporan_keuangan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `members` (
  `member` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `refresh_token` text,
  `role` enum('super_user','admin') NOT NULL,
  `datecreate` timestamp NOT NULL,
  PRIMARY KEY (`member`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES (1,'admin','$2a$10$59qWANQaiCrXj87bRlhlUucmYNwp5V/6TvND6HNu5QDXdLnjBkrRm','Admin','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXIiOjEsImlhdCI6MTcyMTU3NDE1MiwiZXhwIjoxNzIxNjYwNTUyfQ.k6TmOdKdcZqyrKA0ihMPryF73x606Ij4ZU6Av_qXjm8','super_user','2024-07-02 12:32:01'),(2,'test','$2a$10$59qWANQaiCrXj87bRlhlUucmYNwp5V/6TvND6HNu5QDXdLnjBkrRm','Jajang Manteman',NULL,'admin','2024-07-02 12:32:01');
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sejarah`
--

DROP TABLE IF EXISTS `sejarah`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sejarah` (
  `judul` varchar(255) DEFAULT NULL,
  `deskripsi` text,
  `gambar` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sejarah`
--

LOCK TABLES `sejarah` WRITE;
/*!40000 ALTER TABLE `sejarah` DISABLE KEYS */;
INSERT INTO `sejarah` VALUES ('SEJARAH BERDIRINYA MASJID JAMI AL IHSAN','Setelah pembangunan rumah eropa tersebut selesai, tukang-tukang dan ahli bangunan tersebut langsung diarahkan untuk pemugaran masjid. Hal tersebut digagas oleh Datuk H. Muhammad Arief, Datuk Bokagh, orang-orang kaya kampung lainnya, dan masyarakat. Konon kabarnya biaya pembangunan masjid berasal dari tokoh-tokoh tersebut dan telah dibagi perpetaknya. Selama pemugaran berlangsung telah menewaskan satu orang tukang dari Malaya tersebut karena terjatuh dari kubah masjid.',62);
/*!40000 ALTER TABLE `sejarah` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `struktur_dkm`
--

DROP TABLE IF EXISTS `struktur_dkm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `struktur_dkm` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) DEFAULT NULL,
  `jabatan` varchar(100) DEFAULT NULL,
  `gambar` int DEFAULT NULL,
  `datecreate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `struktur_dkm`
--

LOCK TABLES `struktur_dkm` WRITE;
/*!40000 ALTER TABLE `struktur_dkm` DISABLE KEYS */;
INSERT INTO `struktur_dkm` VALUES (1,'Suprapto','Ketua DKM',9,'2024-07-10 00:37:04'),(4,'Herman','Pengelola',73,'2024-07-10 00:37:04');
/*!40000 ALTER TABLE `struktur_dkm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `struktur_remaja`
--

DROP TABLE IF EXISTS `struktur_remaja`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `struktur_remaja` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) DEFAULT NULL,
  `jabatan` varchar(100) DEFAULT NULL,
  `gambar` int DEFAULT NULL,
  `datecreate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `struktur_remaja`
--

LOCK TABLES `struktur_remaja` WRITE;
/*!40000 ALTER TABLE `struktur_remaja` DISABLE KEYS */;
INSERT INTO `struktur_remaja` VALUES (3,'Eko','Ketua',78,'2024-07-14 12:44:35');
/*!40000 ALTER TABLE `struktur_remaja` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tentang_kami`
--

DROP TABLE IF EXISTS `tentang_kami`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tentang_kami` (
  `deskripsi` text,
  `gambar` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tentang_kami`
--

LOCK TABLES `tentang_kami` WRITE;
/*!40000 ALTER TABLE `tentang_kami` DISABLE KEYS */;
INSERT INTO `tentang_kami` VALUES ('Masjid kami adalah tempat ibadah dan berkumpulnya umat muslim untuk',59);
/*!40000 ALTER TABLE `tentang_kami` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visi_misi`
--

DROP TABLE IF EXISTS `visi_misi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visi_misi` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` enum('visi','misi') DEFAULT NULL,
  `visi_misi` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visi_misi`
--

LOCK TABLES `visi_misi` WRITE;
/*!40000 ALTER TABLE `visi_misi` DISABLE KEYS */;
INSERT INTO `visi_misi` VALUES (1,'visi','“Terwujudnya Masjid Jami Al Ihsan sebagai Lembaga Pemberdayaan Umat”'),(3,'misi','1. Memelihara dan meningkatkan kualitas Pelayanan Ibadah\n2. Meningkatkan kualitas Sumber Daya Umat melalui Pendidikan dan Pelatihan yang berbasis Keislaman, Keindonesiaan dan Global\n3. Menerapkan Pengelolaan Masjid yang Modern dan berwawasan Lingkungan\n4. Memberdayakan Masyarakat melalui pengembangan Ekonomi Umat, menumbuhkan Kepedulian Sosial dan menjaga Harmoni Umat\n5. Menyelenggarakan Manajemen Masjid yang Modern, Amanah, Akuntabel dan Profesional\n6. Membangun Kerjasama dengan Lembaga Lain di Dalam dan Luar Negeri\n7, Halooo');
/*!40000 ALTER TABLE `visi_misi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'masjid-jami-al-ihsan'
--

--
-- Dumping routines for database 'masjid-jami-al-ihsan'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-22 22:26:10
