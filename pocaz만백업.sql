-- MySQL dump 10.13  Distrib 8.0.33, for Linux (x86_64)
--
-- Host: database-2.cmyezn5gut8p.ap-northeast-2.rds.amazonaws.com    Database: pocaz
-- ------------------------------------------------------
-- Server version	8.0.30

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `Agency`
--

DROP TABLE IF EXISTS `Agency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Agency` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'auto_increment',
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Agency`
--

LOCK TABLES `Agency` WRITE;
/*!40000 ALTER TABLE `Agency` DISABLE KEYS */;
INSERT INTO `Agency` VALUES (1,'HYBE','2022-11-16 11:58:45',NULL),(2,'IST','2022-11-16 11:58:45',NULL),(3,'SM','2022-11-16 11:58:45',NULL);
/*!40000 ALTER TABLE `Agency` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Artist`
--

DROP TABLE IF EXISTS `Artist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Artist` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'auto_increment',
  `agency` int NOT NULL,
  `artistGroup` int DEFAULT NULL,
  `stageName` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `realName` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_Agency_TO_Artist_1` (`agency`),
  KEY `FK_ArtistGroup_TO_Artist_1` (`artistGroup`),
  CONSTRAINT `FK_Agency_TO_Artist_1` FOREIGN KEY (`agency`) REFERENCES `Agency` (`id`),
  CONSTRAINT `FK_ArtistGroup_TO_Artist_1` FOREIGN KEY (`artistGroup`) REFERENCES `ArtistGroup` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Artist`
--

LOCK TABLES `Artist` WRITE;
/*!40000 ALTER TABLE `Artist` DISABLE KEYS */;
INSERT INTO `Artist` VALUES (1,1,1,'김채원','김채원','2022-11-16 11:58:45',NULL),(2,1,1,'사쿠라','미야와키 사쿠라','2022-11-16 11:58:45',NULL),(3,1,1,'카즈하','나카무라 카즈하','2022-11-16 11:58:45',NULL),(4,1,1,'홍은채','홍은채','2022-11-16 11:58:45',NULL),(5,1,1,'허윤진','허윤진','2022-11-16 11:58:45',NULL),(6,3,2,'상연','이상연','2022-11-16 11:58:45',NULL),(7,3,2,'제이콥','배준영','2022-11-16 11:58:45',NULL),(8,3,2,'영훈','김영훈','2022-11-16 11:58:45',NULL),(9,3,2,'현재','이재현','2022-11-16 11:58:45',NULL),(10,3,2,'주연','이주연','2022-11-16 11:58:45',NULL),(11,3,2,'케빈','문형서','2022-11-16 11:58:45',NULL),(12,3,2,'뉴','최찬희','2022-11-16 11:58:45',NULL),(13,3,2,'큐','지창민','2022-11-16 11:58:45',NULL),(14,3,2,'주학년','주학년','2022-11-16 11:58:45',NULL),(15,3,2,'선우','김선우','2022-11-16 11:58:45',NULL),(16,3,2,'에릭','손영재','2022-11-16 11:58:45',NULL),(17,1,3,'민지','김민지','2022-11-16 11:58:45',NULL),(18,1,3,'하니','팜 응옥 헌','2022-11-16 11:58:45',NULL),(19,1,3,'다니엘','다니엘 마쉬','2022-11-16 11:58:45',NULL),(20,1,3,'해린','강해린','2022-11-16 11:58:45',NULL),(21,1,3,'혜인','이혜인','2022-11-16 11:58:45',NULL),(22,3,5,'카리나','유지민','2022-11-16 11:58:45',NULL),(23,3,5,'지젤','우치나가 애리','2022-11-16 11:58:45',NULL),(24,3,5,'윈터','김민정','2022-11-16 11:58:45',NULL),(25,3,5,'닝닝','닝이줘','2022-11-16 11:58:45',NULL),(26,2,4,'태일','문태일','2022-11-16 11:58:45',NULL),(27,2,4,'태용','이태용','2022-11-16 11:58:45',NULL),(28,2,4,'도영','김도영','2022-11-16 11:58:45',NULL),(29,2,4,'재현','정재현','2022-11-16 11:58:45',NULL),(30,2,4,'정우','김정우','2022-11-16 11:58:45',NULL),(31,2,4,'제노','이제노','2022-11-16 11:58:45',NULL),(32,2,4,'해찬','이동혁','2022-11-16 11:58:45',NULL),(33,2,4,'재민','나재민','2022-11-16 11:58:45',NULL),(34,2,4,'성찬','정성찬','2022-11-16 11:58:45',NULL),(35,2,4,'지성','박지성','2022-11-16 11:58:45',NULL),(36,2,4,'마크','이민형','2022-11-16 11:58:45',NULL),(37,2,4,'쟈니','서영호','2022-11-16 11:58:45',NULL),(38,2,4,'천러','종천러','2022-11-16 11:58:45',NULL);
/*!40000 ALTER TABLE `Artist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ArtistGroup`
--

DROP TABLE IF EXISTS `ArtistGroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ArtistGroup` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'auto_increment',
  `englishName` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `koreanName` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `grouplogoUrl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ArtistGroup`
--

LOCK TABLES `ArtistGroup` WRITE;
/*!40000 ALTER TABLE `ArtistGroup` DISABLE KEYS */;
INSERT INTO `ArtistGroup` VALUES (1,'LE SSERAFIM','르세라핌','https://media.discordapp.net/attachments/1039076920492560445/1040463357507014726/image.png','2022-11-16 11:58:45',NULL),(2,'THE BOYZ','더보이즈','https://media.discordapp.net/attachments/1039076920492560445/1040465090794766446/image.png','2022-11-16 11:58:45',NULL),(3,'newjeans','뉴진스','https://media.discordapp.net/attachments/1039076920492560445/1040463095157506088/image.png','2022-11-16 11:58:45',NULL),(4,'NCT','NCT','https://media.discordapp.net/attachments/1039076920492560445/1040461815060111410/image.png','2022-11-16 11:58:45',NULL),(5,'AESPA','에스파','https://media.discordapp.net/attachments/1039076920492560445/1040465507289157642/image.png','2022-11-16 11:58:45',NULL);
/*!40000 ALTER TABLE `ArtistGroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AuthorityCategory`
--

DROP TABLE IF EXISTS `AuthorityCategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AuthorityCategory` (
  `id` int NOT NULL COMMENT 'auto_increment',
  `name` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AuthorityCategory`
--

LOCK TABLES `AuthorityCategory` WRITE;
/*!40000 ALTER TABLE `AuthorityCategory` DISABLE KEYS */;
/*!40000 ALTER TABLE `AuthorityCategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Chat`
--

DROP TABLE IF EXISTS `Chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Chat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `chatRoom` int NOT NULL,
  `user` int NOT NULL COMMENT '회원번호',
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ChatRoom_TO_Chat_1` (`chatRoom`),
  KEY `FK_USER_TO_Chat_1` (`user`),
  CONSTRAINT `FK_ChatRoom_TO_Chat_1` FOREIGN KEY (`chatRoom`) REFERENCES `ChatRoom` (`id`),
  CONSTRAINT `FK_USER_TO_Chat_1` FOREIGN KEY (`user`) REFERENCES `User` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=210 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Chat`
--

LOCK TABLES `Chat` WRITE;
/*!40000 ALTER TABLE `Chat` DISABLE KEYS */;
INSERT INTO `Chat` VALUES (1,1,3,'포카삽니닷^^','2022-11-16 12:10:07',NULL),(2,1,3,'제시','2022-11-16 12:10:18',NULL),(3,1,2,'19만원 입니당','2022-11-16 12:10:35',NULL),(4,1,3,'너무비싼데요','2022-11-16 12:12:53',NULL),(5,1,2,'네고 안됩니당','2022-11-16 12:14:18',NULL),(6,2,3,'하마님','2022-11-16 12:18:10',NULL),(7,2,3,'다니엘 너무가지고싶어요...','2022-11-16 12:18:14',NULL),(8,3,7,'제발 팔아주세요 ㅠㅠㅠ','2022-11-16 12:39:50',NULL),(9,3,8,'빨리 거래하시죠','2022-11-16 12:40:08',NULL),(10,3,7,'직거래 할까요??','2022-11-16 12:40:15',NULL),(11,3,8,'네네~~~','2022-11-16 12:40:24',NULL),(12,4,6,'제발 사고싶어요진짜... 채원띄','2022-11-16 12:40:34',NULL),(13,5,4,'채원이 포카 사요!','2022-11-16 12:40:43',NULL),(14,4,6,'안파냐공','2022-11-16 12:44:38',NULL),(15,4,6,'진짤','2022-11-16 12:44:40',NULL),(16,4,6,'ㅈ발','2022-11-16 12:44:41',NULL),(17,4,6,'ㅏㄹ아주세요','2022-11-16 12:44:42',NULL),(18,4,8,'왜죠','2022-11-16 12:44:45',NULL),(19,4,6,'나도살래','2022-11-16 12:44:59',NULL),(20,4,6,'제발','2022-11-16 12:44:59',NULL),(21,4,6,'저한테파세요','2022-11-16 12:45:01',NULL),(22,5,4,'저좀','2022-11-16 12:45:02',NULL),(23,5,4,'저 바줘요','2022-11-16 12:45:06',NULL),(24,6,10,'사고프다','2022-11-16 12:53:23',NULL),(25,7,10,'사고픈데요','2022-11-16 15:10:44',NULL),(26,9,13,'ㅎㅇ','2022-11-17 01:32:30',NULL),(27,9,13,'안녕하슈','2022-11-17 01:32:46',NULL),(28,9,10,'누구세요','2022-11-17 01:32:47',NULL),(29,9,10,'배고프네요','2022-11-17 01:32:52',NULL),(30,9,10,'내려가눈데','2022-11-17 01:33:22',NULL),(31,9,13,'ㅎㅇ','2022-11-17 01:33:24',NULL),(32,9,13,'안녕','2022-11-17 01:33:34',NULL),(33,9,10,'ㅎㅇ','2022-11-17 01:33:50',NULL),(34,9,13,'되네','2022-11-17 01:33:54',NULL),(35,9,13,'ㅎㅇ','2022-11-17 04:36:35',NULL),(36,9,13,'알림은 없나보네','2022-11-17 04:36:42',NULL),(37,10,11,'저','2022-11-17 05:44:53',NULL),(38,10,11,'포카 사고 싶어요','2022-11-17 05:44:56',NULL),(39,10,11,'오만원으로 네고 가능한가요?','2022-11-17 05:45:06',NULL),(40,1,3,'누구세요>>..','2022-11-17 07:17:39',NULL),(41,10,10,'진짜 죄송','2022-11-17 07:19:10',NULL),(42,10,10,'애끼는거라','2022-11-17 07:19:12',NULL),(43,10,10,'열받게하지마세요','2022-11-17 07:19:16',NULL),(44,1,3,'바보','2022-11-17 08:27:24',NULL),(45,11,5,'ㅎㅇ','2022-11-17 08:27:34',NULL),(46,11,5,'채팅 되죠?','2022-11-17 08:27:40',NULL),(47,11,10,'gㅎ이하이','2022-11-17 08:27:55',NULL),(48,7,4,'하이하이','2022-11-17 08:27:57',NULL),(49,11,10,'카즈하 안팜','2022-11-17 08:27:58',NULL),(50,11,5,'안돼','2022-11-17 08:28:02',NULL),(51,11,5,'저에게 카즈하를 주세요','2022-11-17 08:28:08',NULL),(52,11,5,'르세라핌 최고!!','2022-11-17 08:28:16',NULL),(53,11,10,'배고픕닏.','2022-11-17 08:28:40',NULL),(54,11,10,'바ㅜ기져','2022-11-17 08:28:42',NULL),(55,11,10,'다해놨죠','2022-11-17 08:28:44',NULL),(56,12,5,'오','2022-11-17 08:29:46',NULL),(57,12,5,'별이님 가나요?','2022-11-17 08:29:50',NULL),(58,12,5,'굳','2022-11-17 08:29:55',NULL),(59,12,5,'^_^','2022-11-17 08:29:58',NULL),(60,12,11,'굿킹~','2022-11-17 08:30:05',NULL),(61,1,2,'네?','2022-11-17 08:32:43',NULL),(62,13,11,'저 구매하고 싶어요','2022-11-17 09:07:54',NULL),(63,13,15,'쿨거 합시다','2022-11-17 09:08:08',NULL),(64,13,11,'계좌번호 드릴게요~','2022-11-17 09:08:18',NULL),(65,13,15,'주소는 이거입니다~ 등기 보내시고 등기번호 꼭 보내 주세여ㅕㅕ여ㅗㄹ영','2022-11-17 09:08:31',NULL),(66,14,11,'포카 사고 싶어요 ㅜㅜ','2022-11-17 09:48:07',NULL),(67,14,15,'어떻게 구매하실래요','2022-11-17 09:48:22',NULL),(68,14,11,'계좌번호 보내주시면 바로 보내겠습니다','2022-11-17 09:48:33',NULL),(69,14,15,'네 알겟습니다','2022-11-17 09:48:38',NULL),(70,18,1,'포토카드 사러왔어요','2022-11-18 10:38:12',NULL),(71,19,10,'김베뤠쒸?','2022-11-19 01:20:02',NULL),(72,19,10,'뭐하십니까','2022-11-19 01:20:05',NULL),(73,20,3,'삽니다','2022-11-21 15:44:07',NULL),(74,7,4,'안녕하세요','2022-11-22 02:15:06',NULL),(75,21,2,'안녕하세요','2022-11-22 02:16:42',NULL),(76,21,4,'안녕하세요','2022-11-22 02:16:52',NULL),(77,2,6,'진짜 안파실건가요','2022-11-23 12:50:24',NULL),(78,2,6,'너무시고싶어요','2022-11-23 12:50:26',NULL),(79,2,6,'오늘 거래가능합니다.','2022-11-23 12:50:29',NULL),(80,2,6,'팔아주세요.','2022-11-23 12:50:31',NULL),(81,2,6,'배고파요','2022-11-23 12:50:33',NULL),(82,2,6,'진짜','2022-11-23 12:56:08',NULL),(83,2,3,'ㅇ안녕하세요','2022-11-23 12:56:19',NULL),(84,2,6,'제발','2022-11-23 12:56:21',NULL),(85,2,3,'팔아주세요!!!','2022-11-23 12:56:24',NULL),(86,2,3,'얼마에요?','2022-11-23 12:56:26',NULL),(87,2,6,'아뇨 제가 산다구요','2022-11-23 12:56:32',NULL),(88,2,6,'아.....','2022-11-23 12:56:35',NULL),(89,2,6,'포카즈 짱','2022-11-23 12:56:36',NULL),(90,2,6,'포카즈','2022-11-23 13:03:22',NULL),(91,2,3,'안녕하세요','2022-11-23 13:03:33',NULL),(92,2,3,'팔까요말까요','2022-11-23 13:03:35',NULL),(93,2,6,'제발','2022-11-23 13:03:38',NULL),(94,2,6,'팔아주세요','2022-11-23 13:03:39',NULL),(95,2,6,'하즈카님','2022-11-23 13:03:40',NULL),(96,2,6,'너무 가지고 싶어요','2022-11-23 13:03:45',NULL),(97,2,3,'고민해볼께요 ^^ㅋ','2022-11-23 13:03:50',NULL),(98,24,3,'사도될까요','2022-11-23 13:43:00',NULL),(99,25,11,'저 사고 싶어요','2022-11-24 05:06:19',NULL),(100,26,15,'저 사고 싶어요','2022-11-24 05:08:10',NULL),(101,26,11,'팝니다','2022-11-24 05:08:19',NULL),(102,28,20,'안녕하세요 ','2022-11-25 04:22:30',NULL),(103,28,3,'안녕하세요','2022-11-25 04:22:38',NULL),(104,28,20,'구매 원합니다 ','2022-11-25 04:22:44',NULL),(105,28,3,'잘먹겠습니다.','2022-11-25 04:22:51',NULL),(106,30,20,'넘 이뻐요!','2022-11-25 06:46:17',NULL),(107,30,20,'병냥이 님 포카 좋아하시나 봐요!','2022-11-25 06:46:32',NULL),(108,31,20,'정말 사고 싶어요! 2천원만 깍아 주세용','2022-11-25 06:48:26',NULL),(109,32,20,'몇 년도 포카예요?','2022-11-25 06:49:17',NULL),(110,32,20,'ㅋㅋ','2022-11-28 05:01:36',NULL),(111,29,3,'사요 제발','2022-11-29 13:11:02',NULL),(112,29,3,'채팅','2022-11-29 13:11:04',NULL),(113,29,3,'기능','2022-11-29 13:11:05',NULL),(114,29,3,'테스트','2022-11-29 13:11:06',NULL),(115,34,22,'안녕하세요','2022-12-06 00:05:31',NULL),(116,34,22,'하하','2022-12-06 00:05:34',NULL),(117,34,22,'호호','2022-12-06 00:05:34',NULL),(118,34,22,'두둔','2022-12-06 00:05:35',NULL),(119,34,22,'밑으로','2022-12-06 00:05:41',NULL),(120,34,22,'내려가','2022-12-06 00:05:42',NULL),(121,34,22,'이렇게','2022-12-06 00:05:53',NULL),(122,34,22,'저렇게','2022-12-06 00:05:54',NULL),(123,34,22,'카즈하','2022-12-06 00:05:55',NULL),(124,34,22,'하즈카','2022-12-06 00:05:56',NULL),(125,34,22,'하즈카인가요','2022-12-06 00:05:58',NULL),(126,34,22,'카즈하인가요','2022-12-06 00:06:00',NULL),(127,34,22,'한','2022-12-06 00:06:39',NULL),(128,34,22,'번에','2022-12-06 00:06:40',NULL),(129,34,22,'보','2022-12-06 00:06:41',NULL),(130,34,22,'이는','2022-12-06 00:06:42',NULL),(131,34,22,'메시지는','2022-12-06 00:06:44',NULL),(132,34,22,'몇개','2022-12-06 00:06:46',NULL),(133,34,22,'인가요','2022-12-06 00:06:47',NULL),(134,34,22,'1','2022-12-06 00:06:48',NULL),(135,34,22,'2','2022-12-06 00:06:49',NULL),(136,34,22,'3','2022-12-06 00:06:49',NULL),(137,34,22,'4','2022-12-06 00:06:50',NULL),(138,34,22,'5','2022-12-06 00:06:50',NULL),(139,34,22,'6','2022-12-06 00:06:51',NULL),(140,34,22,'7','2022-12-06 00:06:51',NULL),(141,34,22,'8','2022-12-06 00:06:51',NULL),(142,34,22,'9','2022-12-06 00:06:52',NULL),(143,34,22,'10','2022-12-06 00:06:53',NULL),(144,34,22,'11','2022-12-06 00:06:54',NULL),(145,34,22,'12','2022-12-06 00:06:55',NULL),(146,34,22,'13','2022-12-06 00:06:55',NULL),(147,34,22,'14','2022-12-06 00:06:56',NULL),(148,34,22,'15','2022-12-06 00:06:57',NULL),(149,34,22,'16','2022-12-06 00:06:57',NULL),(150,34,22,'17','2022-12-06 00:06:59',NULL),(151,34,22,'18','2022-12-06 00:07:00',NULL),(152,34,22,'19','2022-12-06 00:07:00',NULL),(153,34,22,'20','2022-12-06 00:07:01',NULL),(154,34,22,'21','2022-12-06 00:07:07',NULL),(155,34,22,'22','2022-12-06 00:07:08',NULL),(156,34,22,'23','2022-12-06 00:07:08',NULL),(157,34,22,'24','2022-12-06 00:07:09',NULL),(158,34,22,'25','2022-12-06 00:07:09',NULL),(159,34,22,'26','2022-12-06 00:07:10',NULL),(160,34,22,'27','2022-12-06 00:07:10',NULL),(161,34,22,'28','2022-12-06 00:07:11',NULL),(162,34,22,'29','2022-12-06 00:07:11',NULL),(163,34,22,'30','2022-12-06 00:07:12',NULL),(164,34,22,'모','2022-12-06 00:07:48',NULL),(165,34,22,'두','2022-12-06 00:07:48',NULL),(166,34,22,'보','2022-12-06 00:07:49',NULL),(167,34,22,'이','2022-12-06 00:07:49',NULL),(168,34,22,'는','2022-12-06 00:07:50',NULL),(169,34,22,'군','2022-12-06 00:07:50',NULL),(170,34,22,'바로이것','2022-12-06 00:07:54',NULL),(171,34,22,'최고야','2022-12-06 00:07:56',NULL),(172,34,22,'ㅅㅁㅅ','2022-12-06 00:12:12',NULL),(173,34,22,'위에서 채팅을 치면?','2022-12-06 00:13:58',NULL),(174,34,22,'맽 밑으로','2022-12-06 00:14:01',NULL),(175,34,22,'오는군','2022-12-06 00:14:04',NULL),(176,35,12,'dddd','2022-12-12 12:05:17',NULL),(177,36,23,'555','2022-12-13 05:34:44',NULL),(178,36,23,'456465','2022-12-13 05:34:47',NULL),(179,36,23,'123132','2022-12-13 05:34:49',NULL),(180,36,23,'123132','2022-12-13 05:34:50',NULL),(181,36,23,'23123123','2022-12-13 05:34:51',NULL),(182,36,23,'12312312313','2022-12-13 05:34:52',NULL),(183,36,23,'1','2022-12-13 05:34:52',NULL),(184,36,23,'1','2022-12-13 05:34:52',NULL),(185,36,23,'1','2022-12-13 05:34:52',NULL),(186,36,23,'1','2022-12-13 05:34:53',NULL),(187,36,23,'1','2022-12-13 05:34:53',NULL),(188,36,23,'1','2022-12-13 05:34:53',NULL),(189,36,23,'1','2022-12-13 05:34:53',NULL),(190,36,23,'1','2022-12-13 05:34:53',NULL),(191,36,23,'1','2022-12-13 05:34:54',NULL),(192,11,5,'ㅎㄹ','2022-12-22 03:15:26',NULL),(193,34,3,'채팅','2023-01-07 07:51:34',NULL),(194,7,4,'어떻게 거래 하실껀가요?','2023-01-12 01:18:06',NULL),(195,39,25,'안녕하세요','2023-01-18 07:04:43',NULL),(196,39,25,'네고 가능한가요~?','2023-01-18 07:04:56',NULL),(197,40,25,'안녕하세요!','2023-01-18 07:08:11',NULL),(198,40,25,'카즈하 사고싶어요!!','2023-01-18 07:08:15',NULL),(199,40,3,'ㅎㅇㅎㅇ','2023-01-18 07:08:17',NULL),(200,41,26,'저요','2023-01-18 07:08:18',NULL),(201,40,3,'안팔아요','2023-01-18 07:08:19',NULL),(202,41,26,'저요저요','2023-01-18 07:08:25',NULL),(203,41,3,'누구세요','2023-01-18 07:08:26',NULL),(204,41,3,'안팔아요','2023-01-18 07:08:27',NULL),(205,22,6,'안녕하세요','2023-02-07 14:11:08',NULL),(206,42,28,'저기여','2023-02-14 08:20:04',NULL),(207,42,28,'저 사고 싶어열~','2023-02-14 08:20:08',NULL),(208,43,20,'1','2023-02-14 14:48:44',NULL),(209,48,32,'하이염','2023-06-05 00:50:51',NULL);
/*!40000 ALTER TABLE `Chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ChatRoom`
--

DROP TABLE IF EXISTS `ChatRoom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ChatRoom` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'auto_increment',
  `sellarticleid` int DEFAULT NULL,
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_Chatroom_TO_PhotocardSellArticle_2` (`sellarticleid`),
  CONSTRAINT `FK_Chatroom_TO_PhotocardSellArticle_2` FOREIGN KEY (`sellarticleid`) REFERENCES `PhotocardSellArticle` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ChatRoom`
--

LOCK TABLES `ChatRoom` WRITE;
/*!40000 ALTER TABLE `ChatRoom` DISABLE KEYS */;
INSERT INTO `ChatRoom` VALUES (1,1,'2022-11-16 12:10:04',NULL),(2,3,'2022-11-16 12:18:07',NULL),(3,4,'2022-11-16 12:39:37',NULL),(4,4,'2022-11-16 12:40:27',NULL),(5,4,'2022-11-16 12:40:32',NULL),(6,3,'2022-11-16 12:53:20',NULL),(7,8,'2022-11-16 15:10:41',NULL),(8,8,'2022-11-16 15:35:29',NULL),(9,16,'2022-11-17 01:32:25',NULL),(10,16,'2022-11-17 05:44:51',NULL),(11,16,'2022-11-17 08:27:06',NULL),(12,18,'2022-11-17 08:29:44',NULL),(13,19,'2022-11-17 09:07:50',NULL),(14,20,'2022-11-17 09:48:00',NULL),(15,19,'2022-11-17 09:57:43',NULL),(16,20,'2022-11-18 10:14:56',NULL),(17,13,'2022-11-18 10:15:19',NULL),(18,20,'2022-11-18 10:38:07',NULL),(19,20,'2022-11-19 01:19:57',NULL),(20,20,'2022-11-21 15:44:04',NULL),(21,21,'2022-11-22 02:16:36',NULL),(22,17,'2022-11-23 13:40:24',NULL),(23,16,'2022-11-23 13:40:36',NULL),(24,21,'2022-11-23 13:42:56',NULL),(25,21,'2022-11-24 05:06:15',NULL),(26,22,'2022-11-24 05:08:06',NULL),(27,16,'2022-11-25 04:22:10',NULL),(28,17,'2022-11-25 04:22:25',NULL),(29,22,'2022-11-25 04:24:19',NULL),(30,22,'2022-11-25 06:46:08',NULL),(31,20,'2022-11-25 06:48:04',NULL),(32,18,'2022-11-25 06:48:58',NULL),(33,15,'2022-11-28 12:22:28',NULL),(34,17,'2022-12-06 00:05:27',NULL),(35,22,'2022-12-12 12:05:13',NULL),(36,22,'2022-12-13 05:34:40',NULL),(37,22,'2023-01-12 01:14:37',NULL),(38,20,'2023-01-12 01:17:50',NULL),(39,22,'2023-01-18 07:04:38',NULL),(40,17,'2023-01-18 07:08:07',NULL),(41,17,'2023-01-18 07:08:15',NULL),(42,22,'2023-02-14 08:20:00',NULL),(43,19,'2023-02-14 14:48:39',NULL),(44,21,'2023-03-14 01:05:17',NULL),(45,23,'2023-03-14 01:05:38',NULL),(46,24,'2023-03-14 01:05:50',NULL),(47,24,'2023-03-30 12:34:53',NULL),(48,24,'2023-06-05 00:50:45',NULL);
/*!40000 ALTER TABLE `ChatRoom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ChatUser`
--

DROP TABLE IF EXISTS `ChatUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ChatUser` (
  `chatRoom` int NOT NULL,
  `user` int NOT NULL,
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT NULL,
  `sellItemId` int DEFAULT NULL,
  PRIMARY KEY (`chatRoom`,`user`),
  KEY `FK_User_TO_ChatUser_1` (`user`),
  KEY `FK_Chatuser_TO_ChatRoom_3` (`sellItemId`),
  CONSTRAINT `FK_ChatRoom_TO_ChatUser_1` FOREIGN KEY (`chatRoom`) REFERENCES `ChatRoom` (`id`),
  CONSTRAINT `FK_Chatuser_TO_ChatRoom_3` FOREIGN KEY (`sellItemId`) REFERENCES `ChatRoom` (`sellarticleid`),
  CONSTRAINT `FK_User_TO_ChatUser_1` FOREIGN KEY (`user`) REFERENCES `User` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ChatUser`
--

LOCK TABLES `ChatUser` WRITE;
/*!40000 ALTER TABLE `ChatUser` DISABLE KEYS */;
INSERT INTO `ChatUser` VALUES (1,2,'2022-11-16 12:10:04',NULL,1),(1,3,'2022-11-16 12:10:04',NULL,1),(2,3,'2022-11-16 12:18:07',NULL,3),(2,6,'2022-11-16 12:18:07',NULL,3),(3,7,'2022-11-16 12:39:37',NULL,4),(3,8,'2022-11-16 12:39:37',NULL,4),(4,6,'2022-11-16 12:40:27',NULL,4),(4,8,'2022-11-16 12:40:27',NULL,4),(5,4,'2022-11-16 12:40:32',NULL,4),(5,8,'2022-11-16 12:40:32',NULL,4),(6,6,'2022-11-16 12:53:20',NULL,3),(6,10,'2022-11-16 12:53:20',NULL,3),(7,4,'2022-11-16 15:10:41',NULL,8),(7,10,'2022-11-16 15:10:41',NULL,8),(8,4,'2022-11-16 15:35:29',NULL,8),(8,5,'2022-11-16 15:35:29',NULL,8),(9,10,'2022-11-17 01:32:25',NULL,16),(9,13,'2022-11-17 01:32:25',NULL,16),(10,10,'2022-11-17 05:44:51',NULL,16),(10,11,'2022-11-17 05:44:51',NULL,16),(11,5,'2022-11-17 08:27:06',NULL,16),(11,10,'2022-11-17 08:27:06',NULL,16),(12,5,'2022-11-17 08:29:44',NULL,18),(12,11,'2022-11-17 08:29:44',NULL,18),(13,11,'2022-11-17 09:07:50',NULL,19),(13,15,'2022-11-17 09:07:50',NULL,19),(14,11,'2022-11-17 09:48:00',NULL,20),(14,15,'2022-11-17 09:48:00',NULL,20),(15,15,'2022-11-17 09:57:43',NULL,19),(15,16,'2022-11-17 09:57:43',NULL,19),(16,15,'2022-11-18 10:14:56',NULL,20),(16,18,'2022-11-18 10:14:56',NULL,20),(17,11,'2022-11-18 10:15:19',NULL,13),(17,18,'2022-11-18 10:15:19',NULL,13),(18,1,'2022-11-18 10:38:07',NULL,20),(18,15,'2022-11-18 10:38:07',NULL,20),(19,10,'2022-11-19 01:19:57',NULL,20),(19,15,'2022-11-19 01:19:57',NULL,20),(20,3,'2022-11-21 15:44:04',NULL,20),(20,15,'2022-11-21 15:44:04',NULL,20),(21,2,'2022-11-22 02:16:36',NULL,21),(21,4,'2022-11-22 02:16:36',NULL,21),(22,3,'2022-11-23 13:40:24',NULL,17),(22,6,'2022-11-23 13:40:24',NULL,17),(23,6,'2022-11-23 13:40:36',NULL,16),(23,10,'2022-11-23 13:40:36',NULL,16),(24,3,'2022-11-23 13:42:56',NULL,21),(24,4,'2022-11-23 13:42:56',NULL,21),(25,4,'2022-11-24 05:06:15',NULL,21),(25,11,'2022-11-24 05:06:15',NULL,21),(26,11,'2022-11-24 05:08:06',NULL,22),(26,15,'2022-11-24 05:08:06',NULL,22),(27,10,'2022-11-25 04:22:10',NULL,16),(27,20,'2022-11-25 04:22:10',NULL,16),(28,3,'2022-11-25 04:22:25',NULL,17),(28,20,'2022-11-25 04:22:25',NULL,17),(29,3,'2022-11-25 04:24:19',NULL,22),(29,11,'2022-11-25 04:24:19',NULL,22),(30,11,'2022-11-25 06:46:08',NULL,22),(30,20,'2022-11-25 06:46:08',NULL,22),(31,15,'2022-11-25 06:48:04',NULL,20),(31,20,'2022-11-25 06:48:04',NULL,20),(32,11,'2022-11-25 06:48:58',NULL,18),(32,20,'2022-11-25 06:48:58',NULL,18),(33,11,'2022-11-28 12:22:28',NULL,15),(33,20,'2022-11-28 12:22:28',NULL,15),(34,3,'2022-12-06 00:05:27',NULL,17),(34,22,'2022-12-06 00:05:27',NULL,17),(35,11,'2022-12-12 12:05:13',NULL,22),(35,12,'2022-12-12 12:05:13',NULL,22),(36,11,'2022-12-13 05:34:40',NULL,22),(36,23,'2022-12-13 05:34:40',NULL,22),(37,4,'2023-01-12 01:14:37',NULL,22),(37,11,'2023-01-12 01:14:37',NULL,22),(38,4,'2023-01-12 01:17:50',NULL,20),(38,15,'2023-01-12 01:17:50',NULL,20),(39,11,'2023-01-18 07:04:38',NULL,22),(39,25,'2023-01-18 07:04:38',NULL,22),(40,3,'2023-01-18 07:08:07',NULL,17),(40,25,'2023-01-18 07:08:07',NULL,17),(41,3,'2023-01-18 07:08:15',NULL,17),(41,26,'2023-01-18 07:08:15',NULL,17),(42,11,'2023-02-14 08:20:00',NULL,22),(42,28,'2023-02-14 08:20:00',NULL,22),(43,15,'2023-02-14 14:48:39',NULL,19),(43,20,'2023-02-14 14:48:39',NULL,19),(44,4,'2023-03-14 01:05:17',NULL,21),(44,33,'2023-03-14 01:05:17',NULL,21),(45,11,'2023-03-14 01:05:38',NULL,23),(45,33,'2023-03-14 01:05:38',NULL,23),(46,11,'2023-03-14 01:05:50',NULL,24),(46,33,'2023-03-14 01:05:50',NULL,24),(47,1,'2023-03-30 12:34:53',NULL,24),(47,11,'2023-03-30 12:34:53',NULL,24),(48,11,'2023-06-05 00:50:45',NULL,24),(48,32,'2023-06-05 00:50:45',NULL,24);
/*!40000 ALTER TABLE `ChatUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `File`
--

DROP TABLE IF EXISTS `File`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `File` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'auto_increment',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '업로드시 파일이름',
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '파일 전체경로',
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `File`
--

LOCK TABLES `File` WRITE;
/*!40000 ALTER TABLE `File` DISABLE KEYS */;
INSERT INTO `File` VALUES (1,'ë´ì§ì¤ í´ë¦°.jfif','166860057805415a4a980-00fe-4c64-8ac9-aa9bb84599e0.jfif','2022-11-16 12:09:38'),(2,'ê¹ì±ì í¬ì¹´.jfif','1668600650045791cd4cc-838a-498e-a5d0-2af1b9e29ffd.jfif','2022-11-16 12:10:50'),(3,'wts_le_sserafim_fearless_seale_1651133585_c9f6eee9_progressive.jpg','1668600830152ed8c62db-22ff-4df2-b1e5-df38e9727a39.jpg','2022-11-16 12:13:50'),(4,'chill-zen.gif','1668600837940f20a21d5-32b2-4448-9b0b-db05facc6923.gif','2022-11-16 12:13:57'),(5,'ë´ì§ì¤ ìë²ì¤ ì¨ë² Bë²ì  ë¤ëì2.jpg','166860089391509500591-8a18-4c8d-b83d-2ee573afa6ca.jpg','2022-11-16 12:14:53'),(6,'images.jfif','1668600929056ce5c101a-0252-4eae-99de-6dda788f1926.jfif','2022-11-16 12:15:29'),(7,'ë¤ì´ë¡ë.jfif','1668601036172fadad7c9-f563-4ac5-800c-f6607c16865f.jfif','2022-11-16 12:17:16'),(8,'37a85a6a6b844205dd12f45ae187071294d9aed1a753489aa538db030f32d206d54e67cfdc19dd3ecf9855f8611537bc3296','16686011460739ab1b29a-aca4-4ebe-8b48-b2b1b8d9e499.jpg','2022-11-16 12:19:06'),(9,'original.jpg','16686015271560696dbdd-ae6e-455f-91b1-81c73f6b0e0e.jpg','2022-11-16 12:25:27'),(10,'134450_125946_5126.jpg','1668601609530542300df-6086-47a9-8e6e-4556ea6dca29.jpg','2022-11-16 12:26:49'),(11,'sampleImg.png','1668602297660e0d9b1fc-97c4-432b-b3fa-aa34dc4e2c61.png','2022-11-16 12:38:17'),(12,'Chaewon.jpg','16686024816836910d2fa-0a85-4b99-8b22-b4769faa9a04.jpg','2022-11-16 12:41:21'),(13,'juyeon_maverick_id_01.png','166860401352728d37973-274b-486c-8670-f900941ea3ae.png','2022-11-16 13:06:53'),(14,'theboyzhyeon.jfif','1668604092668830d162a-853a-4ba4-9364-2fa39d85e80b.jfif','2022-11-16 13:08:12'),(15,'nuzis.jfif','1668604195904dac094a4-6837-44b1-8130-c4bb95453eae.jfif','2022-11-16 13:09:55'),(16,'doyoung.jpg','1668604291928683abe4a-f60f-465b-8056-dde89b8d615f.jpg','2022-11-16 13:11:31'),(17,'A33B6CED-01FA-414D-BD71-282B62CEC3FD.png','16686141636869292ab09-e0b5-4d4a-8941-f4967f9a5d62.png','2022-11-16 15:56:03'),(18,'PNG ì´ë¯¸ì§.png','16686147188617d618e84-9d3a-49aa-81aa-9656e72221c7.png','2022-11-16 16:05:18'),(19,'KakaoTalk_Photo_2022-11-14-20-50-33 001.jpeg','1668614819315bf731a75-af3f-4f0a-be9e-9cd01f7a8b4a.jpeg','2022-11-16 16:06:59'),(20,'KakaoTalk_Photo_2022-11-14-20-50-33 002.jpeg','166861494774071d4dab2-6123-48bd-952a-1adbb6f52af5.jpeg','2022-11-16 16:09:07'),(21,'KakaoTalk_Photo_2022-11-14-20-50-33 003.jpeg','166861499158940056c81-6f7e-421c-95f0-80e4c656a855.jpeg','2022-11-16 16:09:51'),(22,'KakaoTalk_Photo_2022-11-14-20-50-33 004.jpeg','16686150296704e60a734-971e-4886-86a6-13d858a562ee.jpeg','2022-11-16 16:10:29'),(23,'KakaoTalk_Photo_2022-11-14-20-50-33 005.jpeg','1668615073641fd3d6b34-0a55-4276-8da3-ab44c8c3ec08.jpeg','2022-11-16 16:11:13'),(24,'KakaoTalk_Photo_2022-11-14-20-50-33 006.jpeg','16686151005319bf17319-e433-4da7-a996-c597c47af9a2.jpeg','2022-11-16 16:11:40'),(25,'KakaoTalk_Photo_2022-11-14-20-50-34 007.jpeg','1668615156371bb0d94ad-bcde-4946-9909-cc302c809297.jpeg','2022-11-16 16:12:36'),(26,'KakaoTalk_Photo_2022-11-14-20-50-34 008.jpeg','16686151762131a79dcd2-7673-48b4-99a7-dc0b29445e3b.jpeg','2022-11-16 16:12:56'),(27,'KakaoTalk_Photo_2022-11-14-20-50-34 009.jpeg','1668615207229fe64266e-dfd5-4fb4-b160-64d16d8d09c9.jpeg','2022-11-16 16:13:27'),(28,'KakaoTalk_Photo_2022-11-14-20-50-34 011.jpeg','166861525221930564242-3c77-4080-807c-60f8157ab5a0.jpeg','2022-11-16 16:14:12'),(29,'KakaoTalk_Photo_2022-11-14-20-50-34 012.jpeg','1668615294653e09ab672-23ad-41af-9fef-e7851e61528f.jpeg','2022-11-16 16:14:54'),(30,'KakaoTalk_Photo_2022-11-14-20-50-34 013.jpeg','16686153364828aa54438-ee44-4664-8e33-057609fb04f7.jpeg','2022-11-16 16:15:36'),(31,'KakaoTalk_Photo_2022-11-14-20-50-35 021.jpeg','16686154859301c623d89-84d3-4328-aaee-3c0218199598.jpeg','2022-11-16 16:18:05'),(32,'KakaoTalk_Photo_2022-11-14-20-50-35 022.jpeg','1668615520036f82b5c07-a7c3-4688-ba76-c204bf29a232.jpeg','2022-11-16 16:18:40'),(33,'KakaoTalk_Photo_2022-11-14-20-50-35 020.jpeg','16686155590402ba5477d-beef-42ef-914d-cfb15a0b1b4d.jpeg','2022-11-16 16:19:19'),(34,'KakaoTalk_Photo_2022-11-14-20-50-35 019.jpeg','16686156612068fd1eb3e-7b0f-439f-89cb-61609e2d1fe6.jpeg','2022-11-16 16:21:01'),(35,'KakaoTalk_Photo_2022-11-14-20-50-35 018.jpeg','16686156854608c56de63-ac86-42d2-8e18-d3fe5bc476a7.jpeg','2022-11-16 16:21:25'),(36,'KakaoTalk_Photo_2022-11-14-20-50-34 010.jpeg','16686157276976581cb62-a1a8-47c5-8455-5abb5f4e6e97.jpeg','2022-11-16 16:22:07'),(37,'KakaoTalk_Photo_2022-11-14-20-50-35 017.jpeg','1668615753992b34452a3-8ec2-43ef-aba4-4f08065057bb.jpeg','2022-11-16 16:22:33'),(38,'KakaoTalk_Photo_2022-11-14-20-50-35 016.jpeg','16686157826771725db4c-65a7-4803-b699-7c6ba1f554d8.jpeg','2022-11-16 16:23:02'),(39,'KakaoTalk_Photo_2022-11-14-20-50-34 015.jpeg','1668615806044e9acb6b1-bb2e-4b4f-9d85-d36373337b0c.jpeg','2022-11-16 16:23:26'),(40,'MAVERICK ID CARD.jpeg','166861593373690f8a194-bc11-474d-9460-501c62ebeff5.jpeg','2022-11-16 16:25:33'),(41,'áá¡áá¡áá¡2.jpeg','1668616059146ef58f6c5-4f49-4767-b593-c82c5c8547c2.jpeg','2022-11-16 16:27:39'),(42,'ááµááªáá¡á¼áá¦áá©áá³ ááªááµá¯.jpeg','1668616174106626146ba-8ee4-4975-860d-049fb44d889d.jpeg','2022-11-16 16:29:34'),(43,'q.jpeg','1668616315826e8d58657-c372-454f-b4df-e932a63680a5.jpeg','2022-11-16 16:31:55'),(44,'FZuZzMAaAAERXYg.jpeg','16686164437228771cf13-751d-4268-9c1e-951873cdbc07.jpeg','2022-11-16 16:34:03'),(45,'ppp2.jpeg','1668616483718c2ae3b94-b4a4-4a9a-a269-f5de34219f6c.jpeg','2022-11-16 16:34:43'),(46,'ppp1.jpeg','166861651684619a634aa-e29c-4bbc-82c7-068e59f4b545.jpeg','2022-11-16 16:35:16'),(47,'KakaoTalk_Photo_2022-11-11-12-59-41.jpeg','166861663539620afa0c3-3aba-4297-b0e7-96e47041af50.jpeg','2022-11-16 16:37:15'),(48,'7.jpeg','1668616761720e8b529f5-d87a-418a-b44d-79594c69f1f1.jpeg','2022-11-16 16:39:21'),(49,'block_nonblock.png','1668616865487f09d308d-2168-41c4-9a49-ff21b357adaa.png','2022-11-16 16:41:05'),(50,'351135_575915_239.jpg','16686487369625ce68873-7f7b-4652-b7d3-ecb5c0802c20.jpg','2022-11-17 01:32:17'),(51,'photo-1633989464081-16ccd31287a1.jpg','1668649653181c72557cb-af1e-4b30-8f0b-ac1bf589e490.jpg','2022-11-17 01:47:33'),(52,'KakaoTalk_20220603_231548571.jpg','166866941816951f3ea8f-ceff-4650-8e5e-1c96e21c5553.jpg','2022-11-17 07:16:58'),(53,'ì¹´ì¦íí.jpg','166867170147907c3b4cf-a9e3-402a-b7b4-58263efb9058.jpg','2022-11-17 07:55:01'),(54,'ì¹´ì¦íí.jpg','1668671828310b5ba5006-7fa2-47c8-97ef-e19fb5882ea1.jpg','2022-11-17 07:57:08'),(55,'íì¬2.jpg','1668671905790eae9091d-5a3c-4df4-9a54-8cb9837210e2.jpg','2022-11-17 07:58:25'),(56,'KakaoTalk_Photo_2022-11-11-12-59-23.jpeg','16686737709433d95beaa-25d1-4ef0-9eec-8b8c59ff24f8.jpeg','2022-11-17 08:29:30'),(57,'Zustand.png','1668673882712a883a0f0-a395-4a26-97f0-a8bb078a5c61.png','2022-11-17 08:31:22'),(58,'vite logo.png','166867394413173475aa8-b4e3-49f4-94f9-7c1737da96e3.png','2022-11-17 08:32:24'),(59,'ca84160657d14eaba1437fdd30ac49a1.jpg','166867412612768600127-c72d-4d47-915c-185b221a43e7.jpg','2022-11-17 08:35:26'),(60,'nuzis.jfif','1668674334475859c7ca4-0276-4547-a4e5-3926af86272c.jfif','2022-11-17 08:38:54'),(61,'nuzis.jfif','16686743419666b5138af-5c1c-4244-bff3-46d222426564.jfif','2022-11-17 08:39:01'),(62,'nuzis.jfif','1668674342647ef6ad134-69dd-4f99-8189-090520b4ef1f.jfif','2022-11-17 08:39:02'),(63,'doyoung.jpg','166867448149895481f54-eb1a-4161-857a-9111ddc20a4f.jpg','2022-11-17 08:41:21'),(64,'codual.png','166867479208326b2325e-cf33-4dbd-8bea-84dfb90fce84.png','2022-11-17 08:46:32'),(65,'áá³áá¦áá¡ááµá·_áá¡á«ááµáá¢á¯áá¥á·_opal_áá¥áá²á«ááµá«.jpeg','166867602562193ae42f8-bba3-4cb2-a417-cbe39263a5aa.jpeg','2022-11-17 09:07:05'),(66,'áá³áá¦áá¡ááµá·_áá¡á«ááµáá¢á¯áá¥á·_onyx_áá¡áá®áá¡.jpeg','1668678466326ac969144-aafd-4798-b7b6-7897dfaa877a.jpeg','2022-11-17 09:47:46'),(67,'áá³áá¦áá¡ááµá·_áá¡á«ááµáá¢á¯áá¥á·_áá¡áá®áá¡áá¡ááµá«_áá','1668678562723613fc1df-64c9-4396-9f84-1d45d6ee86c9.jpeg','2022-11-17 09:49:22'),(68,'KakaoTalk_20180416_194221224.jpg','16690452760298b72dc3e-2160-43bf-a4ef-1bef858aa69c.jpg','2022-11-21 15:41:16'),(69,'ca84160657d14eaba1437fdd30ac49a1.jpg','1669083389898ba070b47-bc04-4f7d-becc-67673294caa9.jpg','2022-11-22 02:16:29'),(70,'original.jpg','166919959559207dfee4f-c897-44f2-b827-9f8482778831.jpg','2022-11-23 10:33:15'),(71,'sampleImg.png','166919961764514242695-6f7f-4fcc-9f1e-8646db8ad509.png','2022-11-23 10:33:37'),(72,'37a85a6a6b844205dd12f45ae187071294d9aed1a753489aa538db030f32d206d54e67cfdc19dd3ecf9855f8611537bc3296','1669199617645c62a4f4e-af35-457f-b304-6d928bcb3f99.jpg','2022-11-23 10:33:37'),(73,'1.jpeg','16692664166157862ed60-1eaf-467d-a5c7-46ac57f5c0bd.jpeg','2022-11-24 05:06:56'),(74,'ts_any.jpeg','1670067203329dcb1cb83-04df-4625-b460-666324ddba6b.jpeg','2022-12-03 11:33:23'),(75,'original.jpg','1670127759477b09b56aa-8f1e-46c1-ac1f-6cfa94fd0fd8.jpg','2022-12-04 04:22:39'),(76,'sampleImg.png','167012775947855303d17-24d5-46d4-bae7-b0ab4e5fe68d.png','2022-12-04 04:22:39'),(77,'aboutus_02.png','16701671604724a18859c-1a20-4928-810d-ad90aefef669.png','2022-12-04 15:19:20'),(78,'20170924_222524_1.gif','167028596723988bb1ba9-f898-4ebd-b861-7deade180d87.gif','2022-12-06 00:19:27'),(79,'star_profile2.png','167521322078306e2800c-1673-4ca6-9704-c5ed785ee7a6.png','2023-02-01 01:00:20'),(80,'img_011.png','167627581585567dcfb21-f068-45a4-b9f6-2798a0759942.png','2023-02-13 08:10:15'),(81,'img_013.png','16762758547082d0c334a-5280-4f05-9829-98d5dbfe9d26.png','2023-02-13 08:10:54'),(82,'KakaoTalk_Image_2023-01-31-14-09-18.jpeg','1676352464391bbd9a8d2-e656-49f7-8631-0d080dabd072.jpeg','2023-02-14 05:27:44'),(83,'586b56f80ada29375db50c319d2a9522aeda0494f23918781d1399450d2560807943395448b052394b805fb97a10160e916f','167772084928873fb7909-d18e-4546-9056-fc55d849bef5.png','2023-03-02 01:34:09'),(84,'MOKOKO_01.png','167809005752814b9c40f-8950-49a9-8bf5-a727cbee93f1.png','2023-03-06 08:07:37'),(85,'MOKOKO_02.png','1678090108165fb959a7f-86cf-48d6-84c7-b45526e21928.png','2023-03-06 08:08:28'),(86,'apple.png','1679045367644dd37ffd1-eefb-4208-9497-60290ea9b672.png','2023-03-17 09:29:27');
/*!40000 ALTER TABLE `File` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `GalmangPhotoCard`
--

DROP TABLE IF EXISTS `GalmangPhotoCard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `GalmangPhotoCard` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user` int NOT NULL COMMENT '회원번호',
  `photocard` int NOT NULL COMMENT '포토카드 고유id를 저장',
  PRIMARY KEY (`id`),
  KEY `FK_USER_TO_GalmangPhotoCard_1` (`user`),
  KEY `FK_Photocard_TO_GalmangPhotoCard_1` (`photocard`),
  CONSTRAINT `FK_Photocard_TO_GalmangPhotoCard_1` FOREIGN KEY (`photocard`) REFERENCES `Photocard` (`id`),
  CONSTRAINT `FK_USER_TO_GalmangPhotoCard_1` FOREIGN KEY (`user`) REFERENCES `User` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GalmangPhotoCard`
--

LOCK TABLES `GalmangPhotoCard` WRITE;
/*!40000 ALTER TABLE `GalmangPhotoCard` DISABLE KEYS */;
/*!40000 ALTER TABLE `GalmangPhotoCard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LikeManage`
--

DROP TABLE IF EXISTS `LikeManage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `LikeManage` (
  `post` int NOT NULL COMMENT 'auto_increment',
  `user` int NOT NULL COMMENT '회원번호',
  PRIMARY KEY (`post`,`user`),
  KEY `FK_USER_TO_LikeManage_1` (`user`),
  CONSTRAINT `FK_Post_TO_LikeManage_1` FOREIGN KEY (`post`) REFERENCES `Post` (`id`),
  CONSTRAINT `FK_USER_TO_LikeManage_1` FOREIGN KEY (`user`) REFERENCES `User` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LikeManage`
--

LOCK TABLES `LikeManage` WRITE;
/*!40000 ALTER TABLE `LikeManage` DISABLE KEYS */;
INSERT INTO `LikeManage` VALUES (8,1),(63,1),(83,1),(84,1),(7,2),(70,2),(16,3),(62,3),(83,3),(95,3),(97,3),(8,4),(10,4),(12,4),(63,4),(12,7),(87,8),(86,10),(87,10),(88,10),(8,11),(63,11),(64,11),(83,11),(93,11),(94,11),(63,12),(79,12),(56,14),(8,15),(62,15),(79,15),(55,20),(61,20),(72,20),(81,20),(84,20),(98,20),(61,26),(86,26),(95,28),(98,28);
/*!40000 ALTER TABLE `LikeManage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Photocard`
--

DROP TABLE IF EXISTS `Photocard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Photocard` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '포토카드 고유id를 저장auto_increment',
  `artist` int NOT NULL,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '포토카드 이름',
  `description` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_Artist_TO_Photocard_1` (`artist`),
  CONSTRAINT `FK_Artist_TO_Photocard_1` FOREIGN KEY (`artist`) REFERENCES `Artist` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=188 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Photocard`
--

LOCK TABLES `Photocard` WRITE;
/*!40000 ALTER TABLE `Photocard` DISABLE KEYS */;
INSERT INTO `Photocard` VALUES (1,1,'https://media.discordapp.net/attachments/1039076920492560445/1039083845749833758/opal_.jpeg?width=392&height=625','antifragile_iridiscent_opal_1','antifragile_iridiscent_opal','2022-11-16 11:58:45',NULL),(2,1,'https://media.discordapp.net/attachments/1039076920492560445/1039092870235291698/unknown.png?width=397&height=625','antifragile_midnight_onyx_1','antifragile_midnight_onyx','2022-11-16 11:58:45',NULL),(3,1,'https://media.discordapp.net/attachments/1039076920492560445/1039093241754173471/unknown.png?width=399&height=625','antifragile_frozen_aquamarine_1','antifragile_frozen_aquamarine','2022-11-16 11:58:45',NULL),(4,1,'https://media.discordapp.net/attachments/1039076920492560445/1039100568704135168/image.png?width=403&height=625','antifragile_musickorea_1','antifragile_musickorea','2022-11-16 11:58:45',NULL),(5,1,'https://media.discordapp.net/attachments/1039076920492560445/1039083960422121492/FgP0JSJagAENpFj.png?width=401&height=625','m2_showcase_1','m2_showcase','2022-11-16 11:58:45',NULL),(6,1,'https://media.discordapp.net/attachments/1039076920492560445/1039094571310796800/unknown.png?width=415&height=625','yes24_fansign_1','yes24_fansign','2022-11-16 11:58:45',NULL),(7,1,'https://media.discordapp.net/attachments/1039076920492560445/1039102556284137553/image.png?width=406&height=624','shopee_1st_1','shopee_1st','2022-11-16 11:58:45',NULL),(8,1,'https://media.discordapp.net/attachments/1039076920492560445/1039111337726455918/image.png?width=404&height=625','broadcast_2ndweek_1','broadcast_2ndweek','2022-11-16 11:58:45',NULL),(9,1,'https://media.discordapp.net/attachments/1039076920492560445/1039112767589863486/image.png?width=404&height=625','broadcast_1stweek_1','broadcast_1stweek','2022-11-16 11:58:45',NULL),(10,1,'https://media.discordapp.net/attachments/1039076920492560445/1040537428315881502/image.png?width=405&height=626','antifragile_compact_1','antifragile_compact','2022-11-16 11:58:45',NULL),(11,2,'https://media.discordapp.net/attachments/1039076920492560445/1039083845368164473/onyx_.jpeg?width=392&height=624','antifragile_midnight_onyx_1','antifragile_midnight_onyx','2022-11-16 11:58:45',NULL),(12,2,'https://media.discordapp.net/attachments/1039076920492560445/1039097440160202783/unknown.png?width=393&height=625','antifragile_iridiscent_opal_1','antifragile_iridiscent_opal','2022-11-16 11:58:45',NULL),(13,2,'https://media.discordapp.net/attachments/1039076920492560445/1039100568381177886/image.png?width=406&height=624','antifragile_musickorea_1','antifragile_musickorea','2022-11-16 11:58:45',NULL),(14,2,'https://media.discordapp.net/attachments/1039076920492560445/1039083959675539526/FgP0JSJagAENpFj_3.png?width=402&height=625','m2_showcase_1','m2_showcase','2022-11-16 11:58:45',NULL),(15,2,'https://media.discordapp.net/attachments/1039076920492560445/1039102555852128326/image.png?width=407&height=625','shopee_1st_1','shopee_1st','2022-11-16 11:58:45',NULL),(16,2,'https://media.discordapp.net/attachments/1039076920492560445/1039111336573030430/image.png?width=404&height=625','broadcast_2ndweek_1','broadcast_2ndweek','2022-11-16 11:58:45',NULL),(17,2,'https://media.discordapp.net/attachments/1039076920492560445/1039112767216566303/image.png?width=404&height=625','broadcast_1stweek_1','broadcast_1stweek','2022-11-16 11:58:45',NULL),(18,3,'https://media.discordapp.net/attachments/1039076920492560445/1039083845183602708/3a7400014db9a07e.jpeg?width=410&height=625','antifragile_compact_1','antifragile_compact','2022-11-16 11:58:45',NULL),(19,3,'https://media.discordapp.net/attachments/1039076920492560445/1039083844978085989/75e349c72c1ab2be.jpeg?width=389&height=625','antifragile_weverse_1','antifragile_weverse','2022-11-16 11:58:45',NULL),(20,3,'https://media.discordapp.net/attachments/1039076920492560445/1039083844659327006/a9ceba984e1ad0c6.jpeg?width=401&height=624','antifragile_frozen_aquamarine_1','antifragile_frozen_aquamarine','2022-11-16 11:58:45',NULL),(21,3,'https://media.discordapp.net/attachments/1039076920492560445/1039094340225613824/unknown.png?width=395&height=625','antifragile_midnight_onyx_1','antifragile_midnight_onyx','2022-11-16 11:58:45',NULL),(22,3,'https://media.discordapp.net/attachments/1039076920492560445/1039100569425555466/image.png?width=409&height=625','antifragile_musickorea_1','antifragile_musickorea','2022-11-16 11:58:45',NULL),(23,3,'https://media.discordapp.net/attachments/1039076920492560445/1039083959356768296/FgP0JSJagAENpFj_2.png?width=417&height=625','m2_showcase_1','m2_showcase','2022-11-16 11:58:45',NULL),(24,3,'https://media.discordapp.net/attachments/1039076920492560445/1039097848253399080/unknown.png?width=407&height=625','yes24_fansign_1','yes24_fansign','2022-11-16 11:58:45',NULL),(25,3,'https://media.discordapp.net/attachments/1039076920492560445/1039102557257203712/image.png?width=406&height=625','shopee_1st_1','shopee_1st','2022-11-16 11:58:45',NULL),(26,3,'https://media.discordapp.net/attachments/1039076920492560445/1039111338334638110/image.png?width=405&height=624','broadcast_2ndweek_1','broadcast_2ndweek','2022-11-16 11:58:45',NULL),(27,3,'https://media.discordapp.net/attachments/1039076920492560445/1039112768860725299/image.png?width=405&height=624','broadcast_1stweek_1','broadcast_1stweek','2022-11-16 11:58:45',NULL),(28,4,'https://media.discordapp.net/attachments/1039076920492560445/1039083845548511293/onyx_.jpeg?width=404&height=625','antifragile_midnight_onyx_1','antifragile_midnight_onyx','2022-11-16 11:58:45',NULL),(29,4,'https://media.discordapp.net/attachments/1039076920492560445/1039096240689922078/unknown.png?width=404&height=625','antifragile_midnight_onyx_1','antifragile_midnight_onyx','2022-11-16 11:58:45',NULL),(30,4,'https://media.discordapp.net/attachments/1039076920492560445/1039096241545551883/unknown.png?width=397&height=624','antifragile_iridiscent_opal_1','antifragile_iridiscent_opal','2022-11-16 11:58:45',NULL),(31,4,'https://media.discordapp.net/attachments/1039076920492560445/1039096241189048361/unknown.png?width=396&height=624','antifragile_frozen_aquamarine_1','antifragile_frozen_aquamarine','2022-11-16 11:58:45',NULL),(32,4,'https://media.discordapp.net/attachments/1039076920492560445/1039100569861767178/image.png?width=406&height=625','antifragile_musickorea_1','antifragile_musickorea','2022-11-16 11:58:45',NULL),(33,4,'https://media.discordapp.net/attachments/1039076920492560445/1039083960027848714/FgP0JSJagAENpFj_4.png?width=411&height=625','m2_showcase_1','m2_showcase','2022-11-16 11:58:45',NULL),(34,4,'https://media.discordapp.net/attachments/1039076920492560445/1039097847863332895/unknown.png?width=412&height=625','yes24_fansign_1','yes24_fansign','2022-11-16 11:58:45',NULL),(35,4,'https://media.discordapp.net/attachments/1039076920492560445/1039102557966053386/image.png?width=405&height=625','shopee_1st_1','shopee_1st','2022-11-16 11:58:45',NULL),(36,4,'https://media.discordapp.net/attachments/1039076920492560445/1039111338645008454/image.png?width=405&height=624','broadcast_2ndweek_1','broadcast_2ndweek','2022-11-16 11:58:45',NULL),(37,4,'https://media.discordapp.net/attachments/1039076920492560445/1039112768407752744/image.png?width=405&height=624','broadcast_1stweek_1','broadcast_1stweek','2022-11-16 11:58:45',NULL),(38,5,'https://media.discordapp.net/attachments/1039076920492560445/1039083845959561246/opal_.jpeg?width=395&height=625','antifragile_iridiscent_opal_1','antifragile_iridiscent_opal','2022-11-16 11:58:45',NULL),(39,5,'https://media.discordapp.net/attachments/1039076920492560445/1039095965136728074/unknown.png?width=396&height=625','antifragile_midnight_onyx_1','antifragile_midnight_onyx','2022-11-16 11:58:45',NULL),(40,5,'https://media.discordapp.net/attachments/1039076920492560445/1039095965560356874/unknown.png?width=394&height=624','antifragile_frozen_aquamarine_1','antifragile_frozen_aquamarine','2022-11-16 11:58:45',NULL),(41,5,'https://media.discordapp.net/attachments/1039076920492560445/1039100569069043762/image.png?width=402&height=624','antifragile_musickorea_1','antifragile_musickorea','2022-11-16 11:58:45',NULL),(42,5,'https://media.discordapp.net/attachments/1039076920492560445/1039083959029604402/FgP0JSJagAENpFj_1.png?width=409&height=624','m2_showcase_1','m2_showcase','2022-11-16 11:58:45',NULL),(43,5,'https://media.discordapp.net/attachments/1039076920492560445/1039094571612778557/unknown.png?width=407&height=625','yes24_fansign_1','yes24_fansign','2022-11-16 11:58:45',NULL),(44,5,'https://media.discordapp.net/attachments/1039076920492560445/1039102556745515070/image.png?width=406&height=624','shopee_1st_1','shopee_1st','2022-11-16 11:58:45',NULL),(45,5,'https://media.discordapp.net/attachments/1039076920492560445/1039111338036838400/image.png?width=404&height=625','broadcast_2ndweek_1','broadcast_2ndweek','2022-11-16 11:58:45',NULL),(46,5,'https://media.discordapp.net/attachments/1039076920492560445/1039112768042844160/image.png?width=404&height=625','broadcast_1stweek_1','broadcast_1stweek','2022-11-16 11:58:45',NULL),(47,17,'https://media.discordapp.net/attachments/1039076920492560445/1039205605967143015/B_.jpg?width=389&height=583','위버스_앨범_B버전_1','위버스_앨범_B버전','2022-11-16 11:58:45',NULL),(48,17,'https://media.discordapp.net/attachments/1039076920492560445/1039206623698243705/B_2.jpg?width=389&height=583','위버스_앨범_B버전_2','위버스_앨범_B버전','2022-11-16 11:58:45',NULL),(49,17,'https://media.discordapp.net/attachments/1039076920492560445/1039205605069561926/A_.jpg?width=381&height=584','위버스_앨범_A버전_1','위버스_앨범_A버전','2022-11-16 11:58:45',NULL),(50,17,'https://cdn.discordapp.com/attachments/1039076920492560445/1039808158199201802/1.jpeg','공방_포카_1','공방_포카','2022-11-16 11:58:45',NULL),(51,18,'https://media.discordapp.net/attachments/1039076920492560445/1039205604767576165/B_4.jpg?width=389&height=583','위버스_앨범_B버전_1','위버스_앨범_B버전','2022-11-16 11:58:45',NULL),(52,18,'https://media.discordapp.net/attachments/1039076920492560445/1039205604440416347/B_3.jpg?width=389&height=583','위버스_앨범_B버전_2','위버스_앨범_B버전','2022-11-16 11:58:45',NULL),(53,19,'https://media.discordapp.net/attachments/1039076920492560445/1039205605728063599/B_.jpg?width=389&height=583','위버스_앨범_B버전_1','위버스_앨범_B버전','2022-11-16 11:58:45',NULL),(54,19,'https://media.discordapp.net/attachments/1039076920492560445/1039205605384138752/B_2.jpg?width=389&height=583','위버스_앨범_B버전_2','위버스_앨범_B버전','2022-11-16 11:58:45',NULL),(55,20,'https://media.discordapp.net/attachments/1039076920492560445/1039205603500888074/B_2.jpg?width=389&height=583','위버스_앨범_B버전_1','위버스_앨범_B버전','2022-11-16 11:58:45',NULL),(56,20,'https://media.discordapp.net/attachments/1039076920492560445/1039205603156963369/B_.jpg?width=389&height=583','위버스_앨범_B버전_2','위버스_앨범_B버전','2022-11-16 11:58:45',NULL),(57,21,'https://media.discordapp.net/attachments/1039076920492560445/1039205604071313469/B_2.jpg?width=389&height=583','위버스_앨범_B버전_1','위버스_앨범_B버전','2022-11-16 11:58:45',NULL),(58,21,'https://media.discordapp.net/attachments/1039076920492560445/1039205603760939028/B_.jpg?width=389&height=583','위버스_앨범_B버전_2','위버스_앨범_B버전','2022-11-16 11:58:45',NULL),(59,20,'https://cdn.discordapp.com/attachments/1039076920492560445/1039807905244925952/FbtivTdagAAHg8y.jpeg','New_Jeans_Bluebook.ver_HAERIN.VER_1','New_Jeans_Bluebook.ver_HAERIN.VER','2022-11-16 11:58:45',NULL),(60,20,'https://cdn.discordapp.com/attachments/1039076920492560445/1039808930970345472/Fe3i9l9WIAI_Aky.jpeg','위버스_앨범_위버스_앨범_1','위버스_앨범_위버스_앨범','2022-11-16 11:58:45',NULL),(61,20,'https://cdn.discordapp.com/attachments/1039076920492560445/1039808983545950249/Fe3i80FX0AENlMB.jpeg','위버스_앨범_위버스_앨범_1','위버스_앨범_위버스_앨범','2022-11-16 11:58:45',NULL),(62,9,'https://cdn.discordapp.com/attachments/1039076920492560445/1039105096430141480/86f65322c2f18109.jpeg','우리_식구_됐어요_우리_식구_됐어요_1','우리_식구_됐어요_우리_식구_됐어요','2022-11-16 11:58:45',NULL),(63,9,'https://cdn.discordapp.com/attachments/1039076920492560445/1039105259383033856/2.jpeg','우리_식구_됐어요_우리_식구_됐어요_2','우리_식구_됐어요_우리_식구_됐어요','2022-11-16 11:58:45',NULL),(64,9,'https://cdn.discordapp.com/attachments/1039076920492560445/1039105659985215528/a983aed7ccbe334b.jpeg','MAVERICK_팬싸_메이크_스타_1차_1','MAVERICK_팬싸_메이크_스타_1차','2022-11-16 11:58:45',NULL),(65,9,'https://cdn.discordapp.com/attachments/1039076920492560445/1039106009895030814/2.jpeg','CHASE_영상통화_팬싸_마뮤테_2차_1','CHASE_영상통화_팬싸_마뮤테_2차','2022-11-16 11:58:45',NULL),(66,9,'https://cdn.discordapp.com/attachments/1039076920492560445/1039106382340837437/00111bb47aa57978.jpeg','떴다 더보이즈_갓생편_폰탭_스트랩_세트_1','떴다_더보이즈_갓생편_폰탭_스트랩_세트','2022-11-16 11:58:45',NULL),(67,9,'https://cdn.discordapp.com/attachments/1039076920492560445/1039106785040146452/6135a5ed43127cc6.jpeg','라포티셀_카카오_쇼핑_라이브_특전_1','라포티셀_카카오_쇼핑_라이브_특전','2022-11-16 11:58:45',NULL),(68,9,'https://cdn.discordapp.com/attachments/1039076920492560445/1039107808651653120/79e2711c85379b47.jpeg','THE_FILM_FESTIVAL_트레카_4_1','THE_FILM_FESTIVAL_트레카_4','2022-11-16 11:58:45',NULL),(69,9,'https://cdn.discordapp.com/attachments/1039076920492560445/1039108330515353610/2.jpeg','CHASE_영상통화_팬싸_위드드라마_2차_1','CHASE_영상통화_팬싸_위드드라마_2차','2022-11-16 11:58:45',NULL),(70,9,'https://cdn.discordapp.com/attachments/1039076920492560445/1039108657205493810/4fb6fc76db9a5dfd.jpeg','BE_AWARE_앨범_KTOWN4U_1차_1','BE_AWARE_앨범_KTOWN4U_1차','2022-11-16 11:58:45',NULL),(71,9,'https://cdn.discordapp.com/attachments/1039076920492560445/1039109178003828766/DMC.jpeg','CHASE_영상통화_팬싸_DMC_1차_1','CHASE_영상통화_팬싸_DMC_1차','2022-11-16 11:58:45',NULL),(72,9,'https://cdn.discordapp.com/attachments/1039076920492560445/1039112951287791676/MAVERICK_ID_CARD.jpeg','MAVERICK_앨범_ID_CARD_1','MAVERICK_앨범_ID_CARD','2022-11-16 11:58:45',NULL),(73,8,'https://cdn.discordapp.com/attachments/1039076920492560445/1039109726270664724/881729275ea595a2.jpeg','MAVERICK_앨범_DOOM.ver_1','MAVERICK_앨범_DOOM.ver','2022-11-16 11:58:45',NULL),(74,8,'https://cdn.discordapp.com/attachments/1039076920492560445/1039113451244625960/2.jpeg','MAVERICK_앨범_DOOM.ver_2','MAVERICK_앨범_DOOM.ver','2022-11-16 11:58:45',NULL),(75,8,'https://cdn.discordapp.com/attachments/1039076920492560445/1039113631012507668/MAVERICK_ID_CARD.jpeg','MAVERICK_앨범_ID_CARD_1','MAVERICK_앨범_ID_CARD','2022-11-16 11:58:45',NULL),(76,8,'https://cdn.discordapp.com/attachments/1039076920492560445/1039114044776398849/5d48b14015d6f01c.jpeg','디어_마이_뮤즈_홈키트_2_1','디어_마이_뮤즈_홈키트_2','2022-11-16 11:58:45',NULL),(77,8,'https://cdn.discordapp.com/attachments/1039076920492560445/1039114331842949160/2.jpeg','CHASE_영상통화_팬싸_마뮤테_2차_1','CHASE_영상통화_팬싸_마뮤테_2차','2022-11-16 11:58:45',NULL),(78,8,'https://cdn.discordapp.com/attachments/1039076920492560445/1039114606905413632/823e554c543067d8.jpeg','스쿨룩스_스쿨룩스_1','스쿨룩스_스쿨룩스','2022-11-16 11:58:45',NULL),(79,10,'https://cdn.discordapp.com/attachments/1039076920492560445/1039116123939020840/MAVERICK_ID_CARD.jpeg','MAVERICK_앨범_ID_CARD_1','MAVERICK_앨범_ID_CARD','2022-11-16 11:58:45',NULL),(80,10,'https://cdn.discordapp.com/attachments/1039076920492560445/1039116388662517831/48f771a1ba85faea.jpeg','스쿨룩스_스쿨룩스_1','스쿨룩스_스쿨룩스','2022-11-16 11:58:45',NULL),(81,10,'https://cdn.discordapp.com/attachments/1039076920492560445/1039116723095355462/dc5248eb1a488ab6.jpeg','THE_FIRST_앨범_Fresh.ver_1','THE_FIRST_앨범_Fresh.ver','2022-11-16 11:58:45',NULL),(82,10,'https://cdn.discordapp.com/attachments/1039076920492560445/1039117146183184474/4a2aa96cb5ac7799.jpeg','MAVERICK_팬싸_메이크_스타_1차_1','MAVERICK_팬싸_메이크_스타_1차','2022-11-16 11:58:45',NULL),(83,10,'https://cdn.discordapp.com/attachments/1039076920492560445/1039117575801548890/8f12017233ba3f68.jpeg','CHASE_영상통화_팬싸_조은뮤직_특전_1','CHASE_영상통화_팬싸_조은뮤직_특전','2022-11-16 11:58:45',NULL),(84,10,'https://cdn.discordapp.com/attachments/1039076920492560445/1039117931302359040/dce579ed8377d5d3.jpeg','CHASE_영상통화_팬싸_미화당_특전_1','CHASE_영상통화_팬싸_미화당_특전','2022-11-16 11:58:45',NULL),(85,10,'https://cdn.discordapp.com/attachments/1039076920492560445/1039118204217348156/2.jpeg','CHASE_영상통화_팬싸_메이크스타_2차_1','CHASE_영상통화_팬싸_메이크스타_2차','2022-11-16 11:58:45',NULL),(86,10,'https://cdn.discordapp.com/attachments/1039076920492560445/1039118442210533407/a52cde1960fbba36.jpeg','CHASE_영상통화_팬싸_뮤직코리아_특전_1','CHASE_영상통화_팬싸_뮤직코리아_특전','2022-11-16 11:58:45',NULL),(87,10,'https://cdn.discordapp.com/attachments/1039076920492560445/1039118673547374592/1da9c6f5516ff722.jpeg','CHASE_영상통화_팬싸_에버라인_특전_1','CHASE_영상통화_팬싸_에버라인_특전','2022-11-16 11:58:45',NULL),(88,13,'https://cdn.discordapp.com/attachments/1039076920492560445/1039421246321991722/MAVERICK_ID_CARD.jpeg','MAVERICK_앨범_ID_CARD_1','MAVERICK_앨범_ID_CARD','2022-11-16 11:58:45',NULL),(89,13,'https://cdn.discordapp.com/attachments/1039076920492560445/1039421658160693270/4a2d87f325042850.jpeg','CHASE_영상통화_팬싸_마뮤테_2차_1','CHASE_영상통화_팬싸_마뮤테_2차','2022-11-16 11:58:45',NULL),(90,13,'https://cdn.discordapp.com/attachments/1039076920492560445/1039422172529172510/aca14fa38fb6722b.jpeg','MAVERICK_팬싸_메이크스타_1차_1','MAVERICK_팬싸_메이크스타_1차','2022-11-16 11:58:45',NULL),(91,13,'https://cdn.discordapp.com/attachments/1039076920492560445/1039424087862300682/43b9ec42039ca627.jpeg','CHASE_영상통화_팬싸_에버라인_특전_1','CHASE_영상통화_팬싸_에버라인_특전','2022-11-16 11:58:45',NULL),(92,13,'https://cdn.discordapp.com/attachments/1039076920492560445/1039424445590294569/0bcad7554c794427.jpeg','CHASE_영상통화_팬싸_미화당_특전_1','CHASE_영상통화_팬싸_미화당_특전','2022-11-16 11:58:45',NULL),(93,13,'https://cdn.discordapp.com/attachments/1039076920492560445/1039425024282595338/06d741bf9d7107c5.jpeg','CHASE_영상통화_팬싸_메이크스타_2차_1','CHASE_영상통화_팬싸_메이크스타_2차','2022-11-16 11:58:45',NULL),(94,13,'https://cdn.discordapp.com/attachments/1039076920492560445/1039425298225176617/e8cee259671ed7b7.jpeg','CHASE_영상통화_팬싸_DMC_1차_1','CHASE_영상통화_팬싸_DMC_1차','2022-11-16 11:58:45',NULL),(95,13,'https://cdn.discordapp.com/attachments/1039076920492560445/1039425902595022868/Fgurg_VaEAIG-lG.jpeg','THE BOYZ WORLD TOUR : THE B-ZONE IN EUROPE_PHOTOCARD SET_1','THE BOYZ WORLD TOUR : THE B-ZONE IN EUROPE_PHOTOCARD SET','2022-11-16 11:58:45',NULL),(96,13,'https://cdn.discordapp.com/attachments/1039076920492560445/1039426187157590026/EWalceTU8AACh4A.jpeg','더비_2기_키트_포토카드_2_1','더비_2기_키트_포토카드_2','2022-11-16 11:58:45',NULL),(97,13,'https://cdn.discordapp.com/attachments/1039076920492560445/1039426457430147083/EWalcb_U8AAGULh.jpeg','더비_2기_키트_포토카드_1_1','더비_2기_키트_포토카드_1','2022-11-16 11:58:45',NULL),(98,15,'https://cdn.discordapp.com/attachments/1039076920492560445/1039426923387957258/MAVERICK_ID_CARD.jpeg','MAVERICK_앨범_ID_CARD_1','MAVERICK_앨범_ID_CARD','2022-11-16 11:58:45',NULL),(99,15,'https://cdn.discordapp.com/attachments/1039076920492560445/1039427208210563082/1.jpeg','디어마이뮤즈_파자마_1_1','디어마이뮤즈_파자마_1','2022-11-16 11:58:45',NULL),(100,15,'https://cdn.discordapp.com/attachments/1039076920492560445/1039427251172802570/2.jpeg','디어마이뮤즈_파자마_2_1','디어마이뮤즈_파자마_2','2022-11-16 11:58:45',NULL),(101,15,'https://cdn.discordapp.com/attachments/1039076920492560445/1039428189598011463/5f6ceba5a953bd5b.jpeg','CHASE_영상통화_팬싸_에버라인_특전_1','CHASE_영상통화_팬싸_에버라인_특전','2022-11-16 11:58:45',NULL),(102,15,'https://cdn.discordapp.com/attachments/1039076920492560445/1039428530716561438/dd31f3093d1e667b.jpeg','MAVERICK_앨범_STORY BOOK.ver_1','MAVERICK_앨범_STORY BOOK.ver','2022-11-16 11:58:45',NULL),(103,15,'https://cdn.discordapp.com/attachments/1039076920492560445/1039429071819522048/4.jpeg','더비_4기_키트_포토카드_1_1','더비_4기_키트_포토카드_1','2022-11-16 11:58:45',NULL),(104,15,'https://cdn.discordapp.com/attachments/1039076920492560445/1039429072033419294/42.jpeg','더비_4기_키트_포토카드_2_1','더비_4기_키트_포토카드_2','2022-11-16 11:58:45',NULL),(105,12,'https://cdn.discordapp.com/attachments/1039076920492560445/1039432578551271434/MAVERICK_ID_CARD.jpeg','MAVERICK_앨범_ID_CARD_1','MAVERICK_앨범_ID_CARD','2022-11-16 11:58:45',NULL),(106,12,'https://cdn.discordapp.com/attachments/1039076920492560445/1039434247691309106/REVEAL_ENCORE_EVENT_-_Time_of_CALL.png','REVEAL_영상통화_팬싸_애플뮤직_특전_1','REVEAL_영상통화_팬싸_애플뮤직_특전','2022-11-16 11:58:45',NULL),(107,12,'https://cdn.discordapp.com/attachments/1039076920492560445/1039436843088891914/a232d8ad2cdea6ef.jpeg','CHASE_영상통화_팬싸_미화당_특전_1','CHASE_영상통화_팬싸_미화당_특전','2022-11-16 11:58:45',NULL),(108,12,'https://cdn.discordapp.com/attachments/1039076920492560445/1039437553486544896/2bac0ae057d34fc2.jpeg','CHASE_영상통화_팬싸_에버라인_특전_1','CHASE_영상통화_팬싸_에버라인_특전','2022-11-16 11:58:45',NULL),(109,12,'https://cdn.discordapp.com/attachments/1039076920492560445/1039438081671041024/ErAoU_eXUAU6Gtw.jpeg','CHASE_앨범_Stealer.ver_티켓_1','CHASE_앨범_Stealer.ver_티켓','2022-11-16 11:58:45',NULL),(110,12,'https://cdn.discordapp.com/attachments/1039076920492560445/1039438328539389984/07cf3a5ecc2b702c.jpeg','CHASE_영상통화_팬사_위드드라마_2차_1','CHASE_영상통화_팬사_위드드라마_2차','2022-11-16 11:58:45',NULL),(111,14,'https://cdn.discordapp.com/attachments/1039076920492560445/1039438921802731520/MAVERICK_ID_CARD.jpeg','MAVERICK_앨범_ID_CARD_1','MAVERICK_앨범_ID_CARD','2022-11-16 11:58:45',NULL),(112,14,'https://cdn.discordapp.com/attachments/1039076920492560445/1039439017994891314/REVEAL_ENCORE_EVENT_-_Time_of_CALL.png','REVEAL_ENCORE_EVENT: [Time of CALL]_미공개_특전_포카_1','REVEAL_ENCORE_EVENT: [Time of CALL]_미공개_특전_포카','2022-11-16 11:58:45',NULL),(113,14,'https://cdn.discordapp.com/attachments/1039076920492560445/1039441442856251452/e5dc063d5e98cb32.jpeg','크리스마씨_MD_스티커팩_1','크리스마씨_MD_스티커팩','2022-11-16 11:58:45',NULL),(114,14,'https://cdn.discordapp.com/attachments/1039076920492560445/1039441877801385994/cb9f89e447a2d135.jpeg','CHASE_영상통화_팬싸_미화당_특정_1','CHASE_영상통화_팬싸_미화당_특정','2022-11-16 11:58:45',NULL),(115,14,'https://cdn.discordapp.com/attachments/1039076920492560445/1039442221495230484/2ec591e1b40688ac.jpeg','2021_시즌그리팅_에버라인_1','2021_시즌그리팅_에버라인','2022-11-16 11:58:45',NULL),(116,14,'https://cdn.discordapp.com/attachments/1039076920492560445/1039442885919125514/0128d30a43846e27.jpeg','CHASE_영상통화_팬싸_DMC_2차_1','CHASE_영상통화_팬싸_DMC_2차','2022-11-16 11:58:45',NULL),(117,6,'https://cdn.discordapp.com/attachments/1039076920492560445/1039443150915260467/MAVERICK_ID_CARD.jpeg','MAVERICK_앨범_ID_CARD_1','MAVERICK_앨범_ID_CARD','2022-11-16 11:58:45',NULL),(118,6,'https://cdn.discordapp.com/attachments/1039076920492560445/1039443864395730954/FCElW4eXoAsQimO.jpeg','THRILL_ING_앨범_Bang.ver_1','THRILL_ING_앨범_Bang.ver','2022-11-16 11:58:45',NULL),(119,6,'https://cdn.discordapp.com/attachments/1039076920492560445/1039444350259703918/69684ffd4749573d.jpeg','CHASE_영상통화_팬싸_위드드라마_3차_1','CHASE_영상통화_팬싸_위드드라마_3차','2022-11-16 11:58:45',NULL),(120,6,'https://cdn.discordapp.com/attachments/1039076920492560445/1039444731748417536/78fc132866859579.jpeg','데이즈드_포토카드_1','데이즈드_포토카드','2022-11-16 11:58:45',NULL),(121,6,'https://cdn.discordapp.com/attachments/1039076920492560445/1039445001714798602/d3fc74e018b310b2.jpeg','CHASE_영상통화_팬싸_애플뮤직_2차_1','CHASE_영상통화_팬싸_애플뮤직_2차','2022-11-16 11:58:45',NULL),(122,6,'https://cdn.discordapp.com/attachments/1039076920492560445/1039445439277170698/6565546d937e566a.jpeg','THE_FILM_FESTIVAL_MD_홀더_세트_블랙_1','THE_FILM_FESTIVAL_MD_홀더_세트_블랙','2022-11-16 11:58:45',NULL),(123,6,'https://cdn.discordapp.com/attachments/1039076920492560445/1039445682496471050/80afc76a7805e372.jpeg','CHASE_영상통화_팬싸_에버라인_1','CHASE_영상통화_팬싸_에버라인','2022-11-16 11:58:45',NULL),(124,7,'https://cdn.discordapp.com/attachments/1039076920492560445/1039446046343974962/MAVERICK_ID_CARD.jpeg','MAVERICK_앨범_ID_CARD_1','MAVERICK_앨범_ID_CARD','2022-11-16 11:58:45',NULL),(125,7,'https://cdn.discordapp.com/attachments/1039076920492560445/1039446558875320351/de4cd0683277ec81.jpeg','CHASE_영상통화_팬싸_에버라인_1','CHASE_영상통화_팬싸_에버라인','2022-11-16 11:58:45',NULL),(126,7,'https://cdn.discordapp.com/attachments/1039076920492560445/1039446771128090634/71fe78e719de4d56.jpeg','CHASE_영상통화_팬싸_미화당_1','CHASE_영상통화_팬싸_미화당','2022-11-16 11:58:45',NULL),(127,7,'https://cdn.discordapp.com/attachments/1039076920492560445/1039447120664612905/837df2eace0e378a.jpeg','THE_FILM_FESTIVAL_포카_홀더_세트_레드_1','THE_FILM_FESTIVAL_포카_홀더_세트_레드','2022-11-16 11:58:45',NULL),(128,7,'https://cdn.discordapp.com/attachments/1039076920492560445/1039447452039778365/311b8313b5bb4f40.jpeg','CHASE_영상통화_팬싸_DMC_1차_1','CHASE_영상통화_팬싸_DMC_1차','2022-11-16 11:58:45',NULL),(129,11,'https://cdn.discordapp.com/attachments/1039076920492560445/1039447691547127808/MAVERICK_ID_CARD.jpeg','MAVERICK_앨범_ID_CARD_1','MAVERICK_앨범_ID_CARD','2022-11-16 11:58:45',NULL),(130,11,'https://cdn.discordapp.com/attachments/1039076920492560445/1039447919310413874/REVEAL_ENCORE_EVENT_-_Time_of_CALL.png','REVEAL_ENCORE_EVENT: [Time of CALL]_미공개_특전_포카_1','REVEAL_ENCORE_EVENT: [Time of CALL]_미공개_특전_포카','2022-11-16 11:58:45',NULL),(131,11,'https://cdn.discordapp.com/attachments/1039076920492560445/1039449343775756319/919865df0ebbc870.jpeg','THE_FILM_FESTIVAL_MD _홀더_세트_블랙_1','THE_FILM_FESTIVAL_MD _홀더_세트_블랙','2022-11-16 11:58:45',NULL),(132,11,'https://cdn.discordapp.com/attachments/1039076920492560445/1039449683053006870/b8cd2436421d8f75.jpeg','CHASE_영상통화_팬싸_위드드라마_2차_1','CHASE_영상통화_팬싸_위드드라마_2차','2022-11-16 11:58:45',NULL),(133,16,'https://cdn.discordapp.com/attachments/1039076920492560445/1039450040705499176/MAVERICK_ID_CARD.jpeg','MAVERICK_앨범_ID_CARD_1','MAVERICK_앨범_ID_CARD','2022-11-16 11:58:45',NULL),(134,16,'https://cdn.discordapp.com/attachments/1039076920492560445/1039450384395145276/03bd3bac9b38bf26.jpeg','CHASE_영상통화_팬싸_에버라인_1','CHASE_영상통화_팬싸_에버라인','2022-11-16 11:58:45',NULL),(135,16,'https://cdn.discordapp.com/attachments/1039076920492560445/1039450600397623408/e3ea0843e070b652.jpeg','CHASE_영상통화_팬싸_미화당_1','CHASE_영상통화_팬싸_미화당','2022-11-16 11:58:45',NULL),(136,16,'https://cdn.discordapp.com/attachments/1039076920492560445/1039450798096142367/8cfbcc3c6af4e8fc.jpeg','CHASE_영상통화_팬사_마뮤테_2차_1','CHASE_영상통화_팬사_마뮤테_2차','2022-11-16 11:58:45',NULL),(137,16,'https://cdn.discordapp.com/attachments/1039076920492560445/1039451011116433458/f028cb4f4c0605dd.jpeg','스쿨룩스_스쿨룩스_1','스쿨룩스_스쿨룩스','2022-11-16 11:58:45',NULL),(138,16,'https://cdn.discordapp.com/attachments/1039076920492560445/1039451260568485938/c3907f70afc15c65.jpeg','THE_FILM_FESTIVAL_MD_트레카_1_1','THE_FILM_FESTIVAL_MD_트레카_1','2022-11-16 11:58:45',NULL),(139,16,'https://cdn.discordapp.com/attachments/1039076920492560445/1039451700517404672/22412bec027fd040.jpeg','DREAMLIKE_앨범_Day.ver_1','DREAMLIKE_앨범_Day.ver','2022-11-16 11:58:45',NULL),(140,22,'https://media.discordapp.net/attachments/1039076920492560445/1039443766328688670/Karina-SSGT2022-AppleMusic.jpg?width=364&height=605','SSGT 2022 _Apple Music_1','SSGT 2022 _Apple Music','2022-11-16 11:58:45',NULL),(141,22,'https://media.discordapp.net/attachments/1039076920492560445/1039444706393858058/Karina-Savage_POS_Ver-ArClipCard.jpg?width=404&height=606','Savage P.O.S Ver._Ar Clip Card_1','Savage P.O.S Ver._Ar Clip Card','2022-11-16 11:58:45',NULL),(142,22,'https://cdn.discordapp.com/attachments/1039076920492560445/1039445649755750471/Karina-Girls-KWANGYA_ver.jpg','Girls_GYANGYA Ver._1','Girls_GYANGYA Ver.','2022-11-16 11:58:45',NULL),(143,22,'https://cdn.discordapp.com/attachments/1039076920492560445/1039446615204839434/Karina-Savage_POS_Ver-ArPhotocard.jpg','Savage P.O.S Ver._Ar Photocard_1','Savage P.O.S Ver._Ar Photocard','2022-11-16 11:58:45',NULL),(144,22,'https://media.discordapp.net/attachments/1039076920492560445/1039447037877440522/Karina-Girls_B2S-Thailand.jpg?width=383&height=605','Girls_B2S Thailand_1','Girls_B2S Thailand','2022-11-16 11:58:45',NULL),(145,22,'https://cdn.discordapp.com/attachments/1039076920492560445/1039447740188475442/Karina-SMCU-EXPRESS-AR-Ticket-SET0.jpg','SMCU EXPRESS AR Ticket Set__1','SMCU EXPRESS AR Ticket Set_','2022-11-16 11:58:45',NULL),(146,22,'https://media.discordapp.net/attachments/1039076920492560445/1039471425272152084/Karina-Girls-Mumo.jpg?width=389&height=606','Girls_Mumo_1','Girls_Mumo','2022-11-16 11:58:45',NULL),(147,22,'https://cdn.discordapp.com/attachments/1039076920492560445/1039478545195470878/Karina-SSGT2022-photocard.jpg','SSGT 2022_photocard_1','SSGT 2022_photocard','2022-11-16 11:58:45',NULL),(148,23,'https://media.discordapp.net/attachments/1039076920492560445/1039477328671154266/Giselle-savage_p.o.s_ver-ar_clip_cardjpg.jpg?width=404&height=606','Savage P.O.S Ver_Ar Clip Card_1','Savage P.O.S Ver_Ar Clip Card','2022-11-16 11:58:45',NULL),(149,23,'https://media.discordapp.net/attachments/1039076920492560445/1039471425473486848/Ningning-GirlsMumo.jpg?width=394&height=606','Girls_Mumo_1','Girls_Mumo','2022-11-16 11:58:45',NULL),(150,23,'https://media.discordapp.net/attachments/1039076920492560445/1039472964988567563/Zizel-Girls_Mumo2jpg.jpg?width=386&height=605','Girls_Mumo2_1','Girls_Mumo2','2022-11-16 11:58:45',NULL),(151,23,'https://cdn.discordapp.com/attachments/1039076920492560445/1039476556906627102/Giselle-CLIO_2.jpg','CLIO 2_CLIO 2_1','CLIO 2_CLIO 2','2022-11-16 11:58:45',NULL),(152,23,'https://media.discordapp.net/attachments/1039076920492560445/1039478544914456586/Giselle-SSGT2022-photocard.jpg?width=391&height=607','SSGT 2022_Photocard_1','SSGT 2022_Photocard','2022-11-16 11:58:45',NULL),(153,24,'https://cdn.discordapp.com/attachments/1039076920492560445/1039450056702570559/Winter-savage__Photocard_.jpg','Savage_SYNK DIVE Ver._1','Savage_SYNK DIVE Ver.','2022-11-16 11:58:45',NULL),(154,24,'https://cdn.discordapp.com/attachments/1039076920492560445/1039466708760531044/Winterr-CLIO.jpg','CLIO_CLIO_1','CLIO_CLIO','2022-11-16 11:58:45',NULL),(155,24,'https://cdn.discordapp.com/attachments/1039076920492560445/1039468962724974673/Winter-savage_deluxe_box.jpg','Savage_deluxe box_1','Savage_deluxe box','2022-11-16 11:58:45',NULL),(156,24,'https://media.discordapp.net/attachments/1039076920492560445/1039471425704185886/Winter-Girls_Mumo_B_ver.jpg?width=391&height=605','Girls_Mumo B Ver._1','Girls_Mumo B Ver.','2022-11-16 11:58:45',NULL),(157,24,'https://media.discordapp.net/attachments/1039076920492560445/1039472964497846343/Winter-Girls_Mumo_C.jpg?width=390&height=606','Girls_Mumo C Ver._1','Girls_Mumo C Ver.','2022-11-16 11:58:45',NULL),(158,24,'https://media.discordapp.net/attachments/1039076920492560445/1039478544591507476/Winter-SSGT2022-photocard.jpg?width=390&height=607','SSGT 2022_photocard_1','SSGT 2022_photocard','2022-11-16 11:58:45',NULL),(159,25,'https://media.discordapp.net/attachments/1039076920492560445/1039471425985191946/Zizel-Girls_Mumo.jpg?width=385&height=606','Girls_Mumo_1','Girls_Mumo','2022-11-16 11:58:45',NULL),(160,25,'https://media.discordapp.net/attachments/1039076920492560445/1039472964804022302/Ningning-GirlsMumo2.jpg?width=393&height=605','Girs_Mumo2_1','Girs_Mumo2','2022-11-16 11:58:45',NULL),(161,25,'https://media.discordapp.net/attachments/1039076920492560445/1039478545514242169/Ningning-SSGT2022-photocard.jpg?width=393&height=606','SSGT 2022_Photocard_1','SSGT 2022_Photocard','2022-11-16 11:58:45',NULL),(162,33,'https://cdn.discordapp.com/attachments/1039076920492560445/1040164315161956412/3a8be123b22f0cd4.jpeg','드림쇼_2_5회차_1','드림쇼_2_5회차','2022-11-16 11:58:45',NULL),(163,28,'https://cdn.discordapp.com/attachments/1039076920492560445/1040164437090369586/313f4dc2cb1e1525.jpeg','resonance_pt.2_departure_키노_1','resonance_pt.2_departure_키노','2022-11-16 11:58:45',NULL),(164,32,'https://cdn.discordapp.com/attachments/1039076920492560445/1040164876179492934/5aa907513ddad7dc.jpeg','regulate_앨범_포카_1','regulate_앨범_포카','2022-11-16 11:58:45',NULL),(165,36,'https://cdn.discordapp.com/attachments/1039076920492560445/1040165188638343198/15f8836258d2b200.jpeg','Universe_SM_STORE_럭키드로우_1','Universe_SM_STORE_럭키드로우','2022-11-16 11:58:45',NULL),(166,29,'https://cdn.discordapp.com/attachments/1039076920492560445/1040166033220173864/5db3310ba5d868db.jpeg','NEO_CITY_보이스키링_1','NEO_CITY_보이스키링','2022-11-16 11:58:45',NULL),(167,32,'https://cdn.discordapp.com/attachments/1039076920492560445/1041148836552384612/nctdream__.jpg','Hot_Sauce_앨범_crazyboring_1','Hot_Sauce_앨범_crazyboring','2022-11-16 11:58:45',NULL),(168,33,'https://cdn.discordapp.com/attachments/1039076920492560445/1041149219274227822/nctdream__.jpg','Hot_Sauce_앨범_crazyboring_1','Hot_Sauce_앨범_crazyboring','2022-11-16 11:58:45',NULL),(169,35,'https://cdn.discordapp.com/attachments/1039076920492560445/1041149672183582800/nctdream.jpg','Hot_Sauce_앨범_crazyboring_1','Hot_Sauce_앨범_crazyboring','2022-11-16 11:58:45',NULL),(170,33,'https://cdn.discordapp.com/attachments/1039076920492560445/1041150201479565414/nctdream.jpg','Hot_Sauce_앨범_chillincafe_1','Hot_Sauce_앨범_chillincafe','2022-11-16 11:58:45',NULL),(171,31,'https://cdn.discordapp.com/attachments/1039076920492560445/1041150919351488595/nctdream.jpg','Hot_Sauce_앨범_crazyboring_1','Hot_Sauce_앨범_crazyboring','2022-11-16 11:58:45',NULL),(172,31,'https://cdn.discordapp.com/attachments/1039076920492560445/1041151304082403488/nctdream.jpg','Hot_Sauce_앨범_chillincafe_1','Hot_Sauce_앨범_chillincafe','2022-11-16 11:58:45',NULL),(173,37,'https://cdn.discordapp.com/attachments/1039076920492560445/1041152769177952326/nctRESONANCE.jpg','resonance_pt.1_포카_1','resonance_pt.1_포카','2022-11-16 11:58:45',NULL),(174,31,'https://cdn.discordapp.com/attachments/1039076920492560445/1041153012233670697/nctpt1.jpg','resonance_pt.1_포카_1','resonance_pt.1_포카','2022-11-16 11:58:45',NULL),(175,32,'https://cdn.discordapp.com/attachments/1039076920492560445/1041153197345079356/nctpt1.jpg','resonance_pt.1_포카_1','resonance_pt.1_포카','2022-11-16 11:58:45',NULL),(176,38,'https://cdn.discordapp.com/attachments/1039076920492560445/1041153369143791697/nctpt1.jpg','resonance_pt.1_포카_1','resonance_pt.1_포카','2022-11-16 11:58:45',NULL),(177,35,'https://cdn.discordapp.com/attachments/1039076920492560445/1041153536601358356/nctpt1.jpg','resonance_pt.1_포카_1','resonance_pt.1_포카','2022-11-16 11:58:45',NULL),(178,30,'https://cdn.discordapp.com/attachments/1039076920492560445/1041153732391473193/nctpt1.jpg','resonance_pt.1_포카_1','resonance_pt.1_포카','2022-11-16 11:58:45',NULL),(179,36,'https://cdn.discordapp.com/attachments/1039076920492560445/1041153990622183484/nctpt1.jpg','resonance_pt.1_포카_1','resonance_pt.1_포카','2022-11-16 11:58:45',NULL),(180,34,'https://cdn.discordapp.com/attachments/1039076920492560445/1041154337377878086/nctpt2.jpg','resonance_pt.2_Arrival_키노_1','resonance_pt.2_Arrival_키노','2022-11-16 11:58:45',NULL),(181,36,'https://cdn.discordapp.com/attachments/1039076920492560445/1041154602961207367/nctpt2.jpg','resonance_pt.2_Arrival_키노_1','resonance_pt.2_Arrival_키노','2022-11-16 11:58:45',NULL),(182,31,'https://cdn.discordapp.com/attachments/1039076920492560445/1041154864429928499/nctpt2.jpg','resonance_pt.2_Arrival_키노_1','resonance_pt.2_Arrival_키노','2022-11-16 11:58:45',NULL),(183,32,'https://cdn.discordapp.com/attachments/1039076920492560445/1041155082475032677/nctpt2.jpg','resonance_pt.2_Arrival_키노_1','resonance_pt.2_Arrival_키노','2022-11-16 11:58:45',NULL),(184,29,'https://cdn.discordapp.com/attachments/1039076920492560445/1041155375514263592/nct.jpg','resonance_pt.2_Arrival_키노_1','resonance_pt.2_Arrival_키노','2022-11-16 11:58:45',NULL),(185,29,'https://cdn.discordapp.com/attachments/1039076920492560445/1041155579575541870/nctdepar.jpg','resonance_pt.2_departure_키노_1','resonance_pt.2_departure_키노','2022-11-16 11:58:45',NULL),(186,33,'https://cdn.discordapp.com/attachments/1039076920492560445/1041156059542335608/nctarri.jpg','resonance_pt.2_Arrival_키노_1','resonance_pt.2_Arrival_키노','2022-11-16 11:58:45',NULL),(187,36,'https://cdn.discordapp.com/attachments/1039076920492560445/1041156381086064640/nctpt.jpg','resonance_pt.2_departure_키노_1','resonance_pt.2_departure_키노','2022-11-16 11:58:45',NULL);
/*!40000 ALTER TABLE `Photocard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PhotocardImage`
--

DROP TABLE IF EXISTS `PhotocardImage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PhotocardImage` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'auto_increment',
  `file` int NOT NULL,
  `photocardSellArticle` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_File_TO_PhotocardImage_1` (`file`),
  KEY `FK_PhotocardSellArticle_TO_PhotocardImage_1` (`photocardSellArticle`),
  CONSTRAINT `FK_File_TO_PhotocardImage_1` FOREIGN KEY (`file`) REFERENCES `File` (`id`),
  CONSTRAINT `FK_PhotocardSellArticle_TO_PhotocardImage_1` FOREIGN KEY (`photocardSellArticle`) REFERENCES `PhotocardSellArticle` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PhotocardImage`
--

LOCK TABLES `PhotocardImage` WRITE;
/*!40000 ALTER TABLE `PhotocardImage` DISABLE KEYS */;
INSERT INTO `PhotocardImage` VALUES (1,1,1),(2,2,2),(3,5,3),(4,11,4),(5,13,5),(6,14,6),(7,15,7),(8,16,8),(9,40,9),(10,41,10),(11,42,11),(12,43,12),(13,44,13),(14,47,14),(15,48,15),(16,50,16),(17,53,17),(18,56,18),(19,65,19),(20,66,20),(21,69,21),(22,73,22),(23,84,23),(24,85,24);
/*!40000 ALTER TABLE `PhotocardImage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PhotocardSellArticle`
--

DROP TABLE IF EXISTS `PhotocardSellArticle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PhotocardSellArticle` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'auto_increment',
  `photocard` int DEFAULT NULL COMMENT 'NULL이면 기타',
  `user` int NOT NULL COMMENT '회원번호(auto_increment)',
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '거래 제목',
  `price` int NOT NULL COMMENT '포토카드 판매가',
  `viewCount` int NOT NULL COMMENT '포토카드 판매글 조회수',
  `description` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '포토카드 판매글 내용',
  `tradeStatus` int NOT NULL,
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '포토카드 판매글 최초 등록일',
  `updateAt` timestamp NULL DEFAULT NULL,
  `deleteAt` timestamp NULL DEFAULT NULL COMMENT '포토카드 판매클 삭제 관리',
  `refreshedDate` timestamp NULL DEFAULT NULL COMMENT '포토카드 판매글 끌올 일자',
  PRIMARY KEY (`id`),
  KEY `FK_Photocard_TO_PhotocardSellArticle_1` (`photocard`),
  KEY `FK_USER_TO_PhotocardSellArticle_1` (`user`),
  KEY `FK_TradeStatus_TO_PhotocardSellArticle_1` (`tradeStatus`),
  CONSTRAINT `FK_Photocard_TO_PhotocardSellArticle_1` FOREIGN KEY (`photocard`) REFERENCES `Photocard` (`id`),
  CONSTRAINT `FK_TradeStatus_TO_PhotocardSellArticle_1` FOREIGN KEY (`tradeStatus`) REFERENCES `TradeStatusCategory` (`id`),
  CONSTRAINT `FK_USER_TO_PhotocardSellArticle_1` FOREIGN KEY (`user`) REFERENCES `User` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PhotocardSellArticle`
--

LOCK TABLES `PhotocardSellArticle` WRITE;
/*!40000 ALTER TABLE `PhotocardSellArticle` DISABLE KEYS */;
INSERT INTO `PhotocardSellArticle` VALUES (1,56,2,'뉴진스 해린 포카 팝니당',190000,0,'뉴진스 해린 포카팜',1,'2022-11-16 12:09:38',NULL,NULL,NULL),(2,1,4,'르세라핌 김채원 포카 팜',15000,0,'르세라핌 김채원 포카 팝니당',1,'2022-11-16 12:10:50',NULL,NULL,NULL),(3,54,6,'다니엘 레전드 포카 팜',50000,0,'진짜 다니엘 희귀템입니다.\n집안가보입니다.',1,'2022-11-16 12:14:53',NULL,NULL,NULL),(4,1,8,'김채원 포카 팔아요',2000,0,'팔아요 팔아요',1,'2022-11-16 12:38:17',NULL,NULL,NULL),(5,79,4,'더보이즈 주연 매버릭 포카팝니당',15000,0,'주연 매버릭 포카 팔아요~ ',1,'2022-11-16 13:06:53',NULL,NULL,NULL),(6,70,4,'더보이즈 현재 포카 팔아여~~~',20000,0,'현재 포카!! 짱이쁨',1,'2022-11-16 13:08:12',NULL,NULL,NULL),(7,49,4,'뉴진스 공방 포카 팝니당',10000,0,'뉴진스 공방 포카 입니당',1,'2022-11-16 13:09:55',NULL,NULL,NULL),(8,163,4,'NCT 2020 도영 포카 팜',29000,0,'NCT 도영이 포카 팔아여',1,'2022-11-16 13:11:31',NULL,NULL,NULL),(9,88,11,'큐 메버릭 포카 팔아여',5000,0,'상태 좋아염 ㅇㅅㅇ 우체국 등기로 다음날 바로 보낼게여 채팅 주세여',1,'2022-11-16 16:25:33',NULL,NULL,NULL),(10,99,11,'[급처분] 서누 포카 팔아용 ㅠㅠ',50000,0,'콘서트 가야 돼서 티켓값 벌어야 돼여 쿨거일수록 좋아여 스티커 덤으로 보내드릴게여 ㅇㅅㅇ',1,'2022-11-16 16:27:39',NULL,NULL,NULL),(11,126,11,'제이꼽 포카 팝니당',3000,0,'안 꾸겨지게 뽁뽁이로 감싸서 우체국 등기로 보냅니당~ 걱정 마세여 거래 경험 많아욤 채팅 ㄱㄱ',1,'2022-11-16 16:29:34',NULL,NULL,NULL),(12,62,11,'[급처] 이재현 포카 팔아요',100000,0,'팬싸 가야 돼서 급처 합니다 한번도 안 꺼내본 거라서 흠집 1도 없어요 채팅 주세여 학원 끝나고 저녁에만 답장 가능합니다.',1,'2022-11-16 16:31:55',NULL,NULL,NULL),(13,48,11,'민지 포카 팔아용',8000,0,'채팅 주시면 바로 계좌 알려 드릴게용 쿨거 해용',1,'2022-11-16 16:34:03',NULL,NULL,NULL),(14,74,11,'눈물을 머금고 팝니다',80000,0,'내일까지 연락 주시면 네고도 가능합니다 채팅으로 문의 주세요',1,'2022-11-16 16:37:15',NULL,NULL,NULL),(15,81,11,'내 인생의 주연 포카 팝니다',25000,0,'눈물이 나네요 채팅으로 문의 주세요 저는 이제 조연이에요',1,'2022-11-16 16:39:21',NULL,NULL,NULL),(16,25,10,'르세라핌 카즈하 포카팝니다 1',500000,0,'제발사주세요',1,'2022-11-17 01:32:16',NULL,NULL,NULL),(17,24,3,'카즈하 진짜 아까운거 팝니다.',90000,0,'진짜 아끼는건데 ㅠㅠ 버스비가 없어서',1,'2022-11-17 07:55:01',NULL,NULL,NULL),(18,147,11,'에스파 카리나 포카 처분해요',3500,0,'광야로 떠나야 돼서 처분합니다 채팅 ㄱㄱ',1,'2022-11-17 08:29:30',NULL,NULL,NULL),(19,3,15,'김채원 포카 처분합니다',50000,0,'채원이 포카 팔아야 살 수 있어요.',1,'2022-11-17 09:07:05',NULL,NULL,NULL),(20,1,15,'김채원 포카 팝니다',20000,0,'포카 팔아요!!',1,'2022-11-17 09:47:46',NULL,NULL,NULL),(21,47,4,'아이브 안유진 포카 팝니다',20000,0,'안유진 포카 팜',1,'2022-11-22 02:16:29',NULL,NULL,NULL),(22,50,11,'팝니다',20000,0,'이 포카 팔아요',1,'2022-11-24 05:06:56',NULL,NULL,NULL),(23,63,11,'포카 팔아요',20000,0,'우리 현재 팔아요...',1,'2023-03-06 08:07:37',NULL,NULL,NULL),(24,74,11,'영훈이 팔아여',10000,0,'포카 팔아여',1,'2023-03-06 08:08:28',NULL,NULL,NULL);
/*!40000 ALTER TABLE `PhotocardSellArticle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Post`
--

DROP TABLE IF EXISTS `Post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Post` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '게시글id',
  `user` int NOT NULL COMMENT '회원 고유 id',
  `category` int NOT NULL COMMENT '게시글 분류 카테고리',
  `viewCount` int NOT NULL DEFAULT '0' COMMENT '게시글의 조회수',
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '게시글의 제목',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '게시글의 내용',
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '게시글 최초 작성일자',
  `updateAt` timestamp NULL DEFAULT NULL COMMENT '게시글 최근 수정일자',
  `deleteAt` timestamp NULL DEFAULT NULL COMMENT '게시글 삭제일자',
  PRIMARY KEY (`id`),
  KEY `FK_USER_TO_Post_1` (`user`),
  KEY `FK_PostCategory_TO_Post_1` (`category`),
  CONSTRAINT `FK_PostCategory_TO_Post_1` FOREIGN KEY (`category`) REFERENCES `PostCategory` (`id`),
  CONSTRAINT `FK_USER_TO_Post_1` FOREIGN KEY (`user`) REFERENCES `User` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Post`
--

LOCK TABLES `Post` WRITE;
/*!40000 ALTER TABLE `Post` DISABLE KEYS */;
INSERT INTO `Post` VALUES (1,2,1,5,'난 몰랐어 내 맘이 이리 다채로운지','긴 꿈을 꾸게 해 이 방은 작은 heaven\n','2022-11-16 12:03:11',NULL,NULL),(2,2,1,3,'마음은 이렇게 알다가도 모르지','사랑이라는 건 한순간에 필 테니\n','2022-11-16 12:04:04',NULL,NULL),(3,4,1,2,'암 온 더 넥스트 레블','I\'m on the Next Level','2022-11-16 12:11:53',NULL,NULL),(4,4,1,3,'내 흉 집도 나의 일부라면','겁이 난 없지 없지','2022-11-16 12:13:50',NULL,NULL),(5,2,1,2,'아스팔트 온도 50도 와우!!','아스팔트 온도 50도 와우~','2022-11-16 12:14:39',NULL,NULL),(6,4,1,2,'널 우연히 마주친 척 할래','못 본 척 지나갈래','2022-11-16 12:15:29',NULL,NULL),(7,4,1,5,'내 지난 날들은 눈 뜨면 잊는 꿈','Hype boy 너만 원해\nHype boy 내가 전해','2022-11-16 12:17:16',NULL,NULL),(8,1,1,11,'아아아아아아 인투디 언노운...~~~','저는 L사입니다 하하하하하하하하하하하하핳','2022-11-16 12:19:06',NULL,NULL),(9,1,1,5,'Wish we could turn back time To the good old days','When our mama sang us to sleep\nBut now we\'re stressed out!!','2022-11-16 12:25:27',NULL,NULL),(10,4,1,5,'똑도독똑똑 엘사!? 두 유 워너 빌더 스노우맨~','똑도독똑똑 엘사!?\n듀유워너빌더스노우맨','2022-11-16 12:25:44',NULL,NULL),(11,1,1,5,'따분한 나의 눈빛이 무표정했던 얼굴이','널 보며 빛나고 있어\n널 담은 눈동자는 odd\n내 안에 빼곡하게 피어나는 blue\n내가 지금 느끼는 이 감정들은 true','2022-11-16 12:26:49',NULL,NULL),(12,7,2,6,'포카 샀어요~~','쌈무 쌈무 조아','2022-11-16 12:41:21',NULL,'2022-11-16 12:44:07'),(13,10,1,2,'불꽃대박','또보고싶다','2022-11-16 14:43:10',NULL,'2022-11-16 14:43:41'),(14,10,1,13,'가을인가','겨울인가','2022-11-16 14:44:03',NULL,NULL),(15,12,1,1,'겨울이었다....','새벽 12시 55분... 아이패드로도 업로드를 해보았다....','2022-11-16 15:54:18',NULL,'2022-11-16 15:58:22'),(16,12,1,4,'겨울이었다....','새벽 12시 55분... 아이패드로도 업로드를 해보았다....','2022-11-16 15:54:19',NULL,NULL),(17,12,1,1,'겨울이었다....','새벽 12시 55분... 아이패드로도 업로드를 해보았다....','2022-11-16 15:54:21',NULL,'2022-11-16 15:58:09'),(18,12,1,2,'겨울이었다....','새벽 12시 55분... 아이패드로도 업로드를 해보았다....','2022-11-16 15:54:27',NULL,'2022-11-16 15:58:18'),(19,12,1,1,'겨울이었다....','새벽 12시 55분... 아이패드로도 업로드를 해보았다....','2022-11-16 15:54:27',NULL,'2022-11-16 15:57:58'),(20,12,1,1,'겨울이었다....','새벽 12시 55분... 아이패드로도 업로드를 해보았다....','2022-11-16 15:54:28',NULL,'2022-11-16 15:58:06'),(21,12,1,1,'겨울이었다....','새벽 12시 55분... 아이패드로도 업로드를 해보았다....','2022-11-16 15:54:28',NULL,'2022-11-16 15:58:01'),(22,12,1,1,'겨울이었다....','새벽 12시 55분... 아이패드로도 업로드를 해보았다....','2022-11-16 15:54:28',NULL,'2022-11-16 15:58:25'),(23,12,1,3,'업로드 테스트','잘되나...?','2022-11-16 15:54:52','2022-11-16 15:55:09','2022-11-16 15:57:41'),(24,12,2,1,'자랑게시판 테스트','사진 업로드가 안되서 해보고 있습니다...','2022-11-16 15:56:03',NULL,'2022-11-16 15:56:13'),(25,12,1,1,'업로드 테스트....','사진 보관함에서는 잘 되는거 같은데\n드라이브쪽은 접근이 안되는거 같기도???','2022-11-16 15:56:59',NULL,'2022-11-16 15:57:51'),(26,12,1,1,'업로드 테스트....','사진 보관함에서는 잘 되는거 같은데\n드라이브쪽은 접근이 안되는거 같기도???','2022-11-16 15:57:00',NULL,'2022-11-16 15:57:54'),(27,12,1,1,'업로드 테스트....','사진 보관함에서는 잘 되는거 같은데\n드라이브쪽은 접근이 안되는거 같기도???','2022-11-16 15:57:01',NULL,'2022-11-16 15:57:47'),(28,12,1,1,'업로드 테스트....','사진 보관함에서는 잘 되는거 같은데\n드라이브쪽은 접근이 안되는거 같기도???','2022-11-16 15:57:01',NULL,'2022-11-16 15:57:44'),(29,12,1,1,'업로드 테스트....','사진 보관함에서는 잘 되는거 같은데\n드라이브쪽은 접근이 안되는거 같기도???','2022-11-16 15:57:01',NULL,'2022-11-16 15:57:37'),(30,12,1,4,'업로드 테스트....','사진 보관함에서는 잘 되는거 같은데\n드라이브쪽은 접근이 안되는거 같기도???','2022-11-16 15:57:01',NULL,NULL),(31,12,1,1,'업로드 테스트....','사진 보관함에서는 잘 되는거 같은데\n드라이브쪽은 접근이 안되는거 같기도???','2022-11-16 15:57:05',NULL,'2022-11-16 15:57:30'),(32,12,1,1,'업로드 테스트....','사진 보관함에서는 잘 되는거 같은데\n드라이브쪽은 접근이 안되는거 같기도???','2022-11-16 15:57:05',NULL,'2022-11-16 15:57:33'),(33,12,1,1,'업로드 테스트....','사진 보관함에서는 잘 되는거 같은데\n드라이브쪽은 접근이 안되는거 같기도???','2022-11-16 15:57:05',NULL,'2022-11-16 16:00:07'),(34,12,1,1,'업로드 테스트....','사진 보관함에서는 잘 되는거 같은데\n드라이브쪽은 접근이 안되는거 같기도???','2022-11-16 15:57:05',NULL,'2022-11-16 15:57:26'),(35,12,1,2,'업로드 테스트....','사진 보관함에서는 잘 되는거 같은데\n드라이브쪽은 접근이 안되는거 같기도???','2022-11-16 15:57:06',NULL,'2022-11-16 15:57:23'),(36,12,1,14,'테스트를 했었는데','적은 용량을 테스트 중입니다..','2022-11-16 16:05:18',NULL,NULL),(37,11,1,13,'주무세요...ㅠㅠ','ㅠ왜 안 자요','2022-11-16 16:05:45',NULL,NULL),(38,11,2,2,'제 포꾸 자랑할래요~','어때요? ㅎㅎ 예쁜가요?','2022-11-16 16:06:59',NULL,NULL),(39,11,1,10,'자랑 게시판 text-align: left 필요해요... 누락됐나','ㅋㅋㅋㅋ큪ㅍㅍㅍ퓨ㅠㅠㅠㅍㅍㅍ','2022-11-16 16:08:15',NULL,'2022-11-17 02:14:18'),(40,11,2,1,'포꾸 자랑해도 돼요?','이 친구는 sf9 로운이에요 요즘은 연기를 하더라고요 ^^','2022-11-16 16:09:07',NULL,NULL),(41,11,2,1,'나도 자랑~','김스멜씨 입니다!','2022-11-16 16:09:51',NULL,NULL),(42,11,2,1,'민니 포꾸 💖','좋아요 눌러 주세요 >_<','2022-11-16 16:10:29',NULL,NULL),(43,11,2,1,'제 친구가 재환이 팬이에요','워너원 메인보컬 김재환입니다! 지금은 솔로 활동 중이에요!','2022-11-16 16:11:13',NULL,NULL),(44,11,2,1,'박우진 아세요?','우진이래요~','2022-11-16 16:11:40',NULL,NULL),(45,11,2,1,'별빛 챠니 ✨','좋아요 눌러죠용 ㅎㅎ 귀엽죠?','2022-11-16 16:12:36',NULL,NULL),(46,11,2,1,'잊을만 하면 돌아오는 포꾸','김스멜씨입니다 ㅎㅎ','2022-11-16 16:12:56',NULL,NULL),(47,11,2,1,'이찌 귀여워용 ㅎㅎ','귀여워~','2022-11-16 16:13:27',NULL,NULL),(48,11,2,1,'현서긔 >_ㅇ','포꾸 해 봤어요~ 귀엽나요? ㅎㅎ 좋아요 눌러 줘용','2022-11-16 16:14:12',NULL,NULL),(49,11,2,2,'째니 포꾸 🖤','댓글 달아 주세요!','2022-11-16 16:14:54',NULL,NULL),(50,11,2,1,'째니 짱~ 또 올려봐요 ㅎㅎ','귀.엽.죠? 훗.','2022-11-16 16:15:36',NULL,NULL),(51,11,1,19,'장터 상세에서 뒤로가기 버튼 누를 시 라우터ㅓ문제가!@!@#','으앙','2022-11-16 16:17:13',NULL,'2022-11-17 02:14:11'),(52,11,2,1,'류진아 사랑해 ㅠ_ㅠ','넘 예뽀 ㅠ.ㅠ','2022-11-16 16:18:05',NULL,NULL),(53,11,2,1,'YU NA 🤍','#ITZY','2022-11-16 16:18:39',NULL,NULL),(54,11,2,6,'ㅇiㄷH후1 ㅅrㄹ6ㅎH ❤️','대 휘 야!','2022-11-16 16:19:18',NULL,NULL),(55,11,2,3,'누구일까요?~','ㅎㅎㅎ 정답은 댓글로!','2022-11-16 16:21:01',NULL,NULL),(56,11,2,3,'염색 너무 찰떡이얌...','우지나...','2022-11-16 16:21:25',NULL,NULL),(57,11,2,4,'숮이...🍎','숮랑둥 살앙헤','2022-11-16 16:22:07',NULL,NULL),(58,11,2,3,'두근두근. 심쿵,.','류 진 이 얼 굴 이 다 한 포 꾸','2022-11-16 16:22:33',NULL,NULL),(59,11,2,3,'미년이 탈색 추팔 할게여...ㅠㅠ','ㅠㅠ 황미년 사랑해...','2022-11-16 16:23:02',NULL,NULL),(60,11,2,4,'옹포꾸 🧸','귀요밍.','2022-11-16 16:23:25',NULL,NULL),(61,11,2,7,'내가 만든 포꾸~','너를 위해 구.웠.지.','2022-11-16 16:34:43',NULL,NULL),(62,11,2,22,'포꾸 자랑해도 될까요???','처음이라 떨리네요 ㅎㅎ 포카즈 흥하세요!','2022-11-16 16:35:16',NULL,NULL),(63,11,1,36,'자소서 써야 되는데 한줄도 안 적은 나 레쟌도','^_^ 브이~','2022-11-16 16:41:05',NULL,'2022-11-17 05:38:53'),(64,3,1,10,'재미있는 포토카드 자랑타임','저는 가지고 있는게 없습니다.','2022-11-17 07:16:58',NULL,NULL),(65,4,1,4,'아무거나 올려볼께요','하이하이하이','2022-11-17 08:28:27',NULL,NULL),(66,11,1,4,'엔믹스 카테고리 왜 없나요?','엔믹스~ 0과 1의 미로가 보여~','2022-11-17 08:31:22',NULL,NULL),(67,2,1,0,'뉴진스가 짱이시다!!!','뉴진스가 짱이시다!!!!!','2022-11-17 08:38:54',NULL,'2022-11-17 08:39:55'),(68,2,1,3,'뉴진스가 짱이시다!!!','뉴진스가 짱이시다!!!!!','2022-11-17 08:39:01',NULL,NULL),(69,2,1,1,'뉴진스가 짱이시다!!!','뉴진스가 짱이시다!!!!!','2022-11-17 08:39:02',NULL,'2022-11-17 08:39:42'),(70,2,1,9,'도영이 ','nct 도영','2022-11-17 08:41:21',NULL,NULL),(71,1,2,1,'dfdfada','sdfadsfa','2022-11-17 08:46:32',NULL,'2022-11-17 08:46:40'),(72,15,1,3,'자유 게시판 게시판','ㅇㅅㅇ','2022-11-17 09:09:31',NULL,NULL),(73,15,1,1,'자유롭게~','저 하늘을~','2022-11-17 09:09:53',NULL,NULL),(74,14,1,1,'포카포카 포카즈','화이팅!!','2022-11-17 09:09:53',NULL,NULL),(75,1,1,2,'내가 만든 사파리','캐쉬가 구워지고 있씁니다..','2022-11-17 09:10:31',NULL,NULL),(76,4,1,3,'암 온 더 넥스트 레블','암 온더 넥스트 레블\n','2022-11-17 09:10:33',NULL,NULL),(77,15,1,5,'포카즈 너무 예뻐요','저도 살래요','2022-11-17 09:10:35',NULL,NULL),(78,10,1,3,'배고픈밤입니다','저녁뭐먹지','2022-11-17 09:10:44',NULL,NULL),(79,14,1,5,'난나나나 난난 나나난나 ','솨','2022-11-17 09:10:46',NULL,NULL),(80,15,2,3,'포카 샀어요~~~','자랑하러 왔어요~~','2022-11-17 09:49:22',NULL,'2022-11-18 09:17:02'),(81,11,1,13,'포카즈 짱!','짱이야!','2022-11-18 06:03:24',NULL,NULL),(82,1,1,19,'글 작성','작성작성','2022-11-18 10:37:57',NULL,NULL),(83,3,1,25,'행복하세요','여러분 월드컵기간입니다.\n','2022-11-21 15:41:15',NULL,NULL),(84,1,1,35,'테스트테스트','원하는대로 dd','2022-11-23 10:33:15','2022-12-04 15:24:01',NULL),(85,12,1,8,'ddddd','tgttvtvtvttv','2022-11-27 04:21:48',NULL,NULL),(86,11,1,29,'잘 지내시나요?','다들 보고 싶어여~','2022-12-03 11:33:23',NULL,NULL),(87,8,1,16,'dsfdsfadsfa','dsㄻㄴㅇㄻㄴㅇㄻㅇㅇㄹㄴㅁㄴㅁㅇㄴㄻㅇㄴㅁㅇㄴㄹ','2022-12-04 04:22:39',NULL,NULL),(88,21,1,23,'테스트','ㅇㅇㅇㅇ','2022-12-04 15:19:20',NULL,NULL),(89,10,1,32,'배고픈화요일입니다','뭘먹지요?','2022-12-06 00:18:23','2022-12-06 00:19:27',NULL),(90,10,1,1,'배고픈화요일입니다','뭘먹지요?','2022-12-06 00:18:28',NULL,'2022-12-06 00:18:44'),(91,10,1,1,'배고픈화요일입니다','뭘먹지요?','2022-12-06 00:18:30',NULL,'2022-12-06 00:18:41'),(92,12,1,10,'frrvfrrg','gtgtgtbtt','2022-12-12 12:04:56',NULL,NULL),(93,3,1,15,'집무실 포카즈','배고픕니다 여전히 ','2023-01-07 07:50:28',NULL,NULL),(94,11,1,10,'2월도 포카즈','안녕들 하세요','2023-02-01 01:00:20',NULL,NULL),(95,27,1,39,'카카오 로그인도 붙였습니다','잠수함 패치ㅇㅅㅇ','2023-02-12 11:57:00',NULL,NULL),(96,28,1,15,'요즘 로스트아크에 빠졌어요','저는 로악귀예요','2023-02-13 08:10:15',NULL,NULL),(97,29,1,13,'카카오 로그인 접속','오셨군요','2023-02-13 08:10:54',NULL,NULL),(98,3,1,27,'벤자민 버튼이 이렇게 말했죠','살아가면서 너무 늦거나 이른 건 없다. \n넌 뭐든지 될 수 있어 꿈을 이루는 데 시간제한은 없단다. \n지금처럼 살아도 되고 새 삶을 시작해도 돼 최선과 최악의 선택 중 최선을 선택을 내리길 바라며 네가 새로운 걸 보고 새로운 걸 느꼈으면 좋겠다. \n너와는 생각이 다른 사람들을 만나며 후회 없는 삶을 살면 좋겠구나. \n\n조금이라도 후회가 생긴다면 용기를 내서 다시 시작하렴','2023-02-14 05:27:44','2023-02-14 05:28:03',NULL);
/*!40000 ALTER TABLE `Post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PostCategory`
--

DROP TABLE IF EXISTS `PostCategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PostCategory` (
  `id` int NOT NULL,
  `name` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '1: 자유, 2:자랑',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PostCategory`
--

LOCK TABLES `PostCategory` WRITE;
/*!40000 ALTER TABLE `PostCategory` DISABLE KEYS */;
INSERT INTO `PostCategory` VALUES (1,'자유'),(2,'자랑');
/*!40000 ALTER TABLE `PostCategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PostImage`
--

DROP TABLE IF EXISTS `PostImage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PostImage` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'auto_increment',
  `file` int NOT NULL,
  `post` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_File_TO_PostImage_1` (`file`),
  KEY `FK_Post_TO_PostImage_1` (`post`),
  CONSTRAINT `FK_File_TO_PostImage_1` FOREIGN KEY (`file`) REFERENCES `File` (`id`),
  CONSTRAINT `FK_Post_TO_PostImage_1` FOREIGN KEY (`post`) REFERENCES `Post` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PostImage`
--

LOCK TABLES `PostImage` WRITE;
/*!40000 ALTER TABLE `PostImage` DISABLE KEYS */;
INSERT INTO `PostImage` VALUES (1,3,4),(2,6,6),(3,7,7),(4,8,8),(5,9,9),(6,10,11),(7,12,12),(8,17,24),(9,18,36),(10,19,38),(11,20,40),(12,21,41),(13,22,42),(14,23,43),(15,24,44),(16,25,45),(17,26,46),(18,27,47),(19,28,48),(20,29,49),(21,30,50),(22,31,52),(23,32,53),(24,33,54),(25,34,55),(26,35,56),(27,36,57),(28,37,58),(29,38,59),(30,39,60),(31,45,61),(32,46,62),(33,49,63),(34,52,64),(35,57,66),(42,63,70),(43,64,71),(44,67,80),(45,68,83),(46,70,84),(48,72,84),(49,74,86),(50,75,87),(51,76,87),(52,77,88),(53,78,89),(54,79,94),(55,80,96),(56,81,97),(57,82,98);
/*!40000 ALTER TABLE `PostImage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reply`
--

DROP TABLE IF EXISTS `Reply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Reply` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'auto_increment',
  `post` int NOT NULL COMMENT '게시글id',
  `user` int NOT NULL COMMENT '회원번호',
  `content` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '댓글 내용(null 값 비허용)',
  `pid` int DEFAULT NULL COMMENT '대댓글일 경우 상위 댓글밑에서 조회',
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '게시글 최초 작성일자',
  `updateAt` timestamp NULL DEFAULT NULL COMMENT '덧글 최근 수정일자',
  `deleteAt` timestamp NULL DEFAULT NULL COMMENT '게시글 삭제일자',
  PRIMARY KEY (`id`),
  KEY `FK_Post_TO_Reply_1` (`post`),
  KEY `FK_USER_TO_Reply_1` (`user`),
  CONSTRAINT `FK_Post_TO_Reply_1` FOREIGN KEY (`post`) REFERENCES `Post` (`id`),
  CONSTRAINT `FK_USER_TO_Reply_1` FOREIGN KEY (`user`) REFERENCES `User` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reply`
--

LOCK TABLES `Reply` WRITE;
/*!40000 ALTER TABLE `Reply` DISABLE KEYS */;
INSERT INTO `Reply` VALUES (1,8,4,'엘사~?! 두유 워너 빌더 스노우맨~?',NULL,'2022-11-16 12:20:36',NULL,NULL),(2,7,2,'Hype boy!',NULL,'2022-11-16 12:22:44',NULL,NULL),(3,7,4,'하입보이!',2,'2022-11-16 12:23:14',NULL,NULL),(4,12,1,'댓글댓글',NULL,'2022-11-16 12:41:48',NULL,NULL),(5,12,1,'대댇댓글',NULL,'2022-11-16 12:42:02',NULL,NULL),(6,12,1,'해하하하하',5,'2022-11-16 12:42:36',NULL,NULL),(7,12,8,'우와',4,'2022-11-16 12:42:57',NULL,NULL),(8,12,8,'괜히 팜 ㄷㄷㄷ',NULL,'2022-11-16 12:43:03',NULL,NULL),(9,12,4,'대래대랫댓글',4,'2022-11-16 12:43:05',NULL,NULL),(10,36,11,'ㅠㅠ.ㅠㅠ',NULL,'2022-11-16 16:05:56',NULL,NULL),(11,37,12,'자유게시판에 사진 업로드가 안되서 보니까 용량 너무 커서 그렇대요 ㅋㅋ',NULL,'2022-11-16 16:06:46',NULL,NULL),(12,37,11,'미띤 ㅋㅋㅋㅋ',11,'2022-11-16 16:07:24',NULL,NULL),(13,37,12,'그래서 body 용량 더 줄여야할거같아요 ㅋㅋ',11,'2022-11-16 16:07:45',NULL,NULL),(14,37,11,'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ잠을 자야 하는뎈ㅋㅋ',NULL,'2022-11-16 16:08:33',NULL,NULL),(15,39,12,'ㅜㅜㅜㅜ 일단 가장 시급한 수정 삭제 버튼 원복시킬게요',NULL,'2022-11-16 16:09:08',NULL,NULL),(16,39,11,'흑흑 ㅠㅠㅠ',15,'2022-11-16 16:09:20',NULL,NULL),(17,51,12,'헉 라우터 오타 ㅋㅋㅋ',NULL,'2022-11-16 16:18:22',NULL,NULL),(18,51,12,'뵤리님이 수정하실래요??',17,'2022-11-16 16:18:33',NULL,NULL),(19,51,11,'저 vscode도 안 켜놓은 상태라서 켜놓으셨으면 수정해 주시술 있나요?!!!',17,'2022-11-16 16:20:33',NULL,NULL),(20,51,12,'넵~~ 오타 찾아서 고쳐서 pull당길께요',17,'2022-11-16 16:21:01',NULL,NULL),(21,51,11,'yes~~~👍🏻',NULL,'2022-11-16 16:21:39',NULL,NULL),(22,8,11,'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',NULL,'2022-11-16 16:40:32',NULL,NULL),(23,63,12,'자소설이고 뭐고 저는 낼 면접 어쩌죠 ㅋㅋ',NULL,'2022-11-16 16:42:46',NULL,NULL),(24,51,12,'뒤로 잘 가도록 해결햇어용',NULL,'2022-11-16 16:43:26',NULL,NULL),(25,63,11,'면접 캐리하고 오세여.',23,'2022-11-16 16:43:48',NULL,NULL),(26,51,11,'굿입니다용',24,'2022-11-16 16:44:07',NULL,NULL),(27,63,12,'딥다이브 보고 있어요 ㅋㅋㅋ 근데 머리 아파서 하나도 안들어오고~~',23,'2022-11-16 16:44:37',NULL,NULL),(28,63,3,'레전드인정입니다.',NULL,'2022-11-17 01:47:43',NULL,NULL),(29,62,3,'와.... 판매는안하시나요?',NULL,'2022-11-17 01:48:09',NULL,NULL),(30,14,5,'겨울입니다',NULL,'2022-11-17 08:25:12',NULL,NULL),(31,64,11,'올리실 권한이 없습니다.',NULL,'2022-11-17 08:26:08',NULL,NULL),(32,62,11,'사고 싶으신가요?1',29,'2022-11-17 08:26:53',NULL,NULL),(33,65,11,'남양주 배스킨라빈스 앞으로 나오세요',NULL,'2022-11-17 08:31:40',NULL,NULL),(34,70,2,'댓글 달아봅니다!!!!!!!',NULL,'2022-11-17 08:42:49',NULL,NULL),(35,79,15,'댓글입니ㅏㄷ',NULL,'2022-11-17 09:49:35',NULL,NULL),(36,79,15,'대댓글도 만들었어요',35,'2022-11-17 09:49:43',NULL,NULL),(37,82,1,'ddd',NULL,'2022-11-21 14:55:40',NULL,NULL),(38,82,11,'이뻐요 ㅡㅡ',NULL,'2022-11-21 14:59:37',NULL,NULL),(39,83,11,'오 필승 코리아',NULL,'2022-11-21 15:43:40',NULL,NULL),(40,83,1,'오 오레오레',NULL,'2022-11-21 16:47:27',NULL,NULL),(41,84,15,'hi',NULL,'2022-11-24 02:42:56',NULL,NULL),(42,84,20,'사고 싶어요! ',NULL,'2022-11-25 06:45:23',NULL,NULL),(43,84,20,'♡',41,'2022-11-25 06:46:51',NULL,NULL),(44,8,3,'뭐하세요',NULL,'2022-11-26 06:38:09',NULL,NULL),(45,83,3,'대한민국',NULL,'2022-11-26 06:38:26',NULL,NULL),(46,62,3,'아뇨',NULL,'2022-11-26 06:38:56',NULL,NULL),(47,85,12,'gtgtvyby',NULL,'2022-11-27 04:21:52',NULL,NULL),(48,85,12,'vrvrtvtvtv',47,'2022-11-27 04:21:56',NULL,NULL),(49,61,20,'사랑',NULL,'2022-11-28 05:02:18',NULL,NULL),(50,81,20,'짱!!',NULL,'2022-11-28 05:02:58',NULL,NULL),(51,87,8,'ㄴㅇㅁㄻㄴㅇ',NULL,'2022-12-04 04:22:43',NULL,NULL),(52,87,8,'ㅇㄴㅁㄹㅇㅁㄴ',51,'2022-12-04 04:22:46',NULL,NULL),(53,87,8,'dfdd',NULL,'2022-12-04 06:06:09',NULL,NULL),(54,87,8,'ddd',NULL,'2022-12-04 06:06:52',NULL,'2022-12-04 06:06:57'),(55,86,10,'예쓰예쓰 ',NULL,'2022-12-04 06:37:20',NULL,NULL),(56,87,10,'모하세요',NULL,'2022-12-04 06:37:31',NULL,NULL),(57,87,1,'화면 테스트를 하였습니다',56,'2022-12-04 12:05:49',NULL,'2022-12-04 12:05:55'),(58,87,1,'댓글 삭제 테스트',NULL,'2022-12-04 12:06:23',NULL,'2022-12-04 12:06:26'),(59,87,1,'ddd',NULL,'2022-12-05 04:02:04',NULL,'2022-12-05 04:02:06'),(60,89,5,'낙곱새',NULL,'2022-12-06 05:03:11',NULL,NULL),(61,84,1,'asdfas',NULL,'2022-12-09 09:40:55',NULL,NULL),(62,86,26,'우와아아',NULL,'2023-01-18 07:05:44',NULL,NULL),(63,93,11,'아침은 커피',NULL,'2023-02-01 01:00:39',NULL,NULL),(64,95,28,'훌륭합니다',NULL,'2023-02-13 08:09:15',NULL,NULL),(65,95,3,'합격이십니다.',NULL,'2023-02-14 05:25:17',NULL,NULL),(66,97,3,'대단하십니까 별이님',NULL,'2023-02-14 05:26:32',NULL,NULL),(67,98,28,'꿈은 이루어진다. ⭐️',NULL,'2023-02-14 08:19:42',NULL,NULL);
/*!40000 ALTER TABLE `Reply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TradeHistory`
--

DROP TABLE IF EXISTS `TradeHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TradeHistory` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'auto_increment',
  `photocardSellArticle` int NOT NULL,
  `photocard` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `seller` int NOT NULL,
  `buyer` int NOT NULL,
  `tradePrice` int NOT NULL,
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TradeHistory`
--

LOCK TABLES `TradeHistory` WRITE;
/*!40000 ALTER TABLE `TradeHistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `TradeHistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TradeStatusCategory`
--

DROP TABLE IF EXISTS `TradeStatusCategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TradeStatusCategory` (
  `id` int NOT NULL,
  `name` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '1.판매중/ 2. 예약중/ 3. 판매완료',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TradeStatusCategory`
--

LOCK TABLES `TradeStatusCategory` WRITE;
/*!40000 ALTER TABLE `TradeStatusCategory` DISABLE KEYS */;
INSERT INTO `TradeStatusCategory` VALUES (1,'판매중'),(2,'판매완료');
/*!40000 ALTER TABLE `TradeStatusCategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '회원번호(auto_increment)',
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nickname` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `profileImage` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleteAt` timestamp NULL DEFAULT NULL COMMENT '탈퇴하지 않으면 null',
  `score` int DEFAULT NULL,
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT NULL,
  `artist` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`) /*!80000 INVISIBLE */,
  KEY `FK_Artist_TO_USER_1` (`artist`),
  CONSTRAINT `FK_Artist_TO_USER_1` FOREIGN KEY (`artist`) REFERENCES `Artist` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'google#114878223744793843978','hsm0156@gmail.com','안예뻐요','https://lh3.googleusercontent.com/a/ALm5wu12zk-FsEmSj9d6Eket7VqZlHw9bIs57dlv0lWO=s96-c',NULL,NULL,'2022-11-16 12:01:30','2022-11-17 08:01:11',1),(2,'google#103277925121599529284','romingoon@gmail.com','아이브짱이브','https://slowtest.ml/api/166867394413173475aa8-b4e3-49f4-94f9-7c1737da96e3.png',NULL,NULL,'2022-11-16 12:01:46','2022-11-17 08:32:24',1),(3,'google#107603262314846043315','ho2yahh@gmail.com','하즈카','https://slowtest.ml/api/1668671828310b5ba5006-7fa2-47c8-97ef-e19fb5882ea1.jpg',NULL,NULL,'2022-11-16 12:03:01','2022-11-17 07:57:08',3),(4,'google#103079659299484310880','shyeon1732@gmail.com','겨울의안댕댕','https://slowtest.ml/api/166867412612768600127-c72d-4d47-915c-185b221a43e7.jpg',NULL,NULL,'2022-11-16 12:04:30','2023-01-12 01:02:28',1),(5,'google#103877988597939757746','hsm0156@gmail.com','아이돌빅팬22','https://slowtest.ml/api/1668671905790eae9091d-5a3c-4df4-9a54-8cb9837210e2.jpg',NULL,NULL,'2022-11-16 12:12:37','2022-11-17 08:20:52',37),(6,'google#115422744099053790889','ljkk1230@knou.ac.kr','배고픈하마','https://slowtest.ml/api/1668600837940f20a21d5-32b2-4448-9b0b-db05facc6923.gif',NULL,NULL,'2022-11-16 12:13:33','2022-11-16 12:13:57',NULL),(7,'google#115190763318751669187','tankyou29@gmail.com','김만채','https://lh3.googleusercontent.com/a/ALm5wu00EfRxG4_KbLm4FHjTabMYfWlqXiRLLHwe1_xz=s96-c',NULL,NULL,'2022-11-16 12:35:25','2022-11-16 12:37:00',NULL),(8,'twitter#1556275636058324992','null','전설의딱복이','https://pbs.twimg.com/profile_images/1556275866929602560/cyc7o-qQ_normal.jpg',NULL,NULL,'2022-11-16 12:36:30','2022-11-16 12:46:04',NULL),(9,'twitter#1573252372477792257',NULL,'광주영어학원분필관찰자김도훈','https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',NULL,NULL,'2022-11-16 12:50:44',NULL,NULL),(10,'google#115390947260161023728','hjunee2@gmail.com','서울깍쟁이','https://lh3.googleusercontent.com/a/ALm5wu1rxuKwtgiXp4CMCqTLY__Utdv0PysFeZf_TJu9rjQ=s96-c',NULL,NULL,'2022-11-16 12:53:09','2022-11-17 01:28:16',NULL),(11,'google#118377784332328156272','qufdl352@gmail.com','별냥이','https://lh3.googleusercontent.com/a/ALm5wu1JdP95eZDrf8PdbNsrj56IHoZzUQ0FY3dCXIgtdA=s96-c',NULL,NULL,'2022-11-16 13:01:19','2022-11-18 06:03:41',4),(12,'apple#001490.cabb82d3758149088749f6586ff3f7f1.1553','akswnd55@gmail.com','피어나는뉴비','https://slowtest.ml/api/defaultProfile.png',NULL,NULL,'2022-11-16 15:53:04','2022-11-16 15:58:45',NULL),(13,'google#106528676786609908892','xelloss007@gmail.com','제주도','https://lh3.googleusercontent.com/a/ALm5wu106YSbMMpTyXIZc0XBRVcLeOvRtJocJ0t2sI_U=s96-c',NULL,NULL,'2022-11-17 01:27:51','2022-11-17 01:28:22',NULL),(14,'apple#000020.1babea0ee1214bd9b6670d6261e08e8b.1737','Nobug@gmail.com','화성','https://slowtest.ml/api/defaultProfile.png',NULL,NULL,'2022-11-17 08:02:43','2022-11-17 08:32:41',NULL),(15,'google#109706788211527609412','tbzpang@gmail.com','김별잉잉잉','https://lh3.googleusercontent.com/a/ALm5wu1fNdaB1w60DIjpuxYqCv_WTJw32jxT5jP7RkUF=s96-c',NULL,NULL,'2022-11-17 09:04:19','2022-11-24 05:17:18',9),(16,'google#104705861943300564662','knsan189@gmail.com','고양태권도장공문서위조마스터안주현','https://lh3.googleusercontent.com/a/ALm5wu2k0heYaNedZWWJX7up4GDbG9pSX-nizXeQPQZG=s96-c',NULL,NULL,'2022-11-17 09:57:27',NULL,NULL),(17,'google#109096868492019185914','wmfajr1357@gmail.com','산채비빔밥먹는스님앞에서빨대먹는고강건','https://lh3.googleusercontent.com/a/ALm5wu3zjurRoUzZ0B_O-iAvYstqdO6MIz54jM-LkjCI=s96-c',NULL,NULL,'2022-11-17 13:29:28',NULL,NULL),(18,'google#116359422659040294241','ohjinseok1113@gmail.com','서울사우나소리없는방귀빌런엄준식','https://lh3.googleusercontent.com/a/ALm5wu3psWPHoImv7RxQL8JGJRirIex1fsvdSr6w5AE2VQ=s96-c',NULL,NULL,'2022-11-18 10:14:44',NULL,NULL),(19,'google#111380487817427935557','hohoya102@gmail.com','수능시험장에서소리지르는광주의아들안주현','https://lh3.googleusercontent.com/a/ALm5wu0B4DH4URfAguEw6OYAGL3vHrP0B1AcX1tVZ2Tu=s96-c',NULL,NULL,'2022-11-23 12:47:27',NULL,NULL),(20,'google#102112761344872619358','openvision02@gmail.com','1234','https://lh3.googleusercontent.com/a/ALm5wu2PMBVlnZzTN56VQoxoPIYFGWYeUhOZHSCDqs2zhHI=s96-c',NULL,NULL,'2022-11-25 04:21:06','2023-02-14 14:49:40',38),(21,'google#106840561708205416156','her2478@gmail.com','제주성인용품점다데기지배자박종현','https://lh3.googleusercontent.com/a/ALm5wu1zlKLHT3NJgB504XG8HDqDOoTTaZVfkqxfnwwK=s96-c',NULL,NULL,'2022-12-04 15:17:22',NULL,NULL),(22,'google#112200271284709109916','dmsgk1559@gmail.com','ISIS행동대장용인의딸박상현','https://lh3.googleusercontent.com/a/AEdFTp77Eo9sE9K_jpGqqudk3HYUnVn2-uIQiFuNQvhykA=s96-c',NULL,NULL,'2022-12-06 00:05:13',NULL,NULL),(23,'google#108074891714593005579','ree9622@gmail.com','성남풋살장절대강자문성수','https://lh3.googleusercontent.com/a/AEdFTp4rdhJrlnu4Cuc5YTeh-aeZg3b-B4AMyqkbcSRUe3k=s96-c',NULL,NULL,'2022-12-13 05:34:22',NULL,NULL),(24,'google#117620727626668963552','mjyeom@launchpack.co.kr','전주휴지통속비타민관찰자정지웅','https://lh3.googleusercontent.com/a/AEdFTp7nf0qMdp1poirwmQ91XG5XyG41L_YXDK13vBRM=s96-c',NULL,NULL,'2022-12-20 05:27:18',NULL,NULL),(25,'google#105962325318090958791','gandy818@gmail.com','벽돌집벽돌빼서젠가하는박상현','https://lh3.googleusercontent.com/a/AEdFTp4Hz3WBAbrBBBeisg2HmcRRHSYYV-JpktAwk9_klQ=s96-c',NULL,NULL,'2023-01-18 07:03:58',NULL,NULL),(26,'google#105311333410932955280','dev.mnkg@gmail.com','전주고등학교지박령고강건','https://lh3.googleusercontent.com/a/AEdFTp4QoT1s8B1iSNulG_KYyVvOek-TkCRp6YYgnAUY=s96-c',NULL,NULL,'2023-01-18 07:04:10',NULL,NULL),(27,'kakao#2472564681',NULL,'창원미용실캐스터네츠관찰자정지웅','https://slowtest.ml/api/defaultProfile.png',NULL,NULL,'2023-02-12 11:56:15',NULL,NULL),(28,'google#111893225707071476484','kimstar@tongro.co.kr','천안풋살장화장실문지기박종현','https://lh3.googleusercontent.com/a/AEdFTp6nKLzCT-IzlyVrwfu19e0QloPCro40oOZj_AU=s96-c',NULL,NULL,'2023-02-13 08:09:02',NULL,NULL),(29,'kakao#2664341457',NULL,'고양성인용품점틀니셔틀문성수','https://slowtest.ml/api/defaultProfile.png',NULL,NULL,'2023-02-13 08:10:36',NULL,NULL),(30,'kakao#2474180802',NULL,'제주초등학교2학년4반에어컨밑장빼기9단박종현','https://slowtest.ml/api/defaultProfile.png',NULL,NULL,'2023-02-15 00:40:43',NULL,NULL),(31,'kakao#2666962418',NULL,'안산세탁소소리없는방귀빌런안주현','https://slowtest.ml/api/defaultProfile.png',NULL,NULL,'2023-02-15 04:05:32',NULL,NULL),(32,'kakao#2688240666','null','호오오오','https://slowtest.ml/api/167772084928873fb7909-d18e-4546-9056-fc55d849bef5.png',NULL,NULL,'2023-03-02 01:33:14','2023-03-02 01:34:09',NULL),(33,'google#102379998799137183724','tptns159@gmail.com','제주에버랜드할아버지지팡이수호자고강건','https://slowtest.ml/api/1679045367644dd37ffd1-eefb-4208-9497-60290ea9b672.png',NULL,NULL,'2023-03-14 01:04:58','2023-03-17 09:29:27',NULL);
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserAuthority`
--

DROP TABLE IF EXISTS `UserAuthority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserAuthority` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user` int NOT NULL COMMENT '회원번호',
  `authority` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_USER_TO_UserGrade_1` (`user`),
  KEY `FK_Authority_TO_UserGrade_1` (`authority`),
  CONSTRAINT `FK_Authority_TO_UserGrade_1` FOREIGN KEY (`authority`) REFERENCES `AuthorityCategory` (`id`),
  CONSTRAINT `FK_USER_TO_UserGrade_1` FOREIGN KEY (`user`) REFERENCES `User` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserAuthority`
--

LOCK TABLES `UserAuthority` WRITE;
/*!40000 ALTER TABLE `UserAuthority` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserAuthority` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-26  5:49:43
