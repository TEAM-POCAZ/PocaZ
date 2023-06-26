-- --------------------------------------------------------
-- 호스트:                          localhost
-- 서버 버전:                        8.0.29 - MySQL Community Server - GPL
-- 서버 OS:                        Linux
-- HeidiSQL 버전:                  12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- pocaz 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `pocaz` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `pocaz`;

-- 테이블 pocaz.Agency 구조 내보내기
CREATE TABLE IF NOT EXISTS `Agency` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'auto_increment',
  `name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 pocaz.Artist 구조 내보내기
CREATE TABLE IF NOT EXISTS `Artist` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'auto_increment',
  `agency` int NOT NULL,
  `artistGroup` int DEFAULT NULL,
  `stageName` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `realName` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_Agency_TO_Artist_1` (`agency`),
  KEY `FK_ArtistGroup_TO_Artist_1` (`artistGroup`),
  CONSTRAINT `FK_Agency_TO_Artist_1` FOREIGN KEY (`agency`) REFERENCES `Agency` (`id`),
  CONSTRAINT `FK_ArtistGroup_TO_Artist_1` FOREIGN KEY (`artistGroup`) REFERENCES `ArtistGroup` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 pocaz.ArtistGroup 구조 내보내기
CREATE TABLE IF NOT EXISTS `ArtistGroup` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'auto_increment',
  `englishName` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `koreanName` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `grouplogoUrl` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 pocaz.AuthorityCategory 구조 내보내기
CREATE TABLE IF NOT EXISTS `AuthorityCategory` (
  `id` int NOT NULL COMMENT 'auto_increment',
  `name` varchar(40) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 pocaz.Chat 구조 내보내기
CREATE TABLE IF NOT EXISTS `Chat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `chatRoom` int NOT NULL,
  `user` int NOT NULL COMMENT '회원번호',
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ChatRoom_TO_Chat_1` (`chatRoom`),
  KEY `FK_USER_TO_Chat_1` (`user`),
  CONSTRAINT `FK_ChatRoom_TO_Chat_1` FOREIGN KEY (`chatRoom`) REFERENCES `ChatRoom` (`id`),
  CONSTRAINT `FK_USER_TO_Chat_1` FOREIGN KEY (`user`) REFERENCES `User` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 pocaz.ChatRoom 구조 내보내기
CREATE TABLE IF NOT EXISTS `ChatRoom` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'auto_increment',
  sellarticleid int NULL,
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 pocaz.ChatUser 구조 내보내기
CREATE TABLE IF NOT EXISTS `ChatUser` (
  `chatRoom` int NOT NULL,
  `user` int NOT NULL,
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT NULL,
  sellItemId INT NULL,
  PRIMARY KEY (`chatRoom`,`user`),
  KEY `FK_User_TO_ChatUser_1` (`user`),
  CONSTRAINT `FK_ChatRoom_TO_ChatUser_1` FOREIGN KEY (`chatRoom`) REFERENCES `ChatRoom` (`id`),
  CONSTRAINT `FK_User_TO_ChatUser_1` FOREIGN KEY (`user`) REFERENCES `User` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 pocaz.File 구조 내보내기
CREATE TABLE IF NOT EXISTS `File` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'auto_increment',
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '업로드시 파일이름',
  `path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '파일 전체경로',
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 pocaz.GalmangPhotoCard 구조 내보내기
CREATE TABLE IF NOT EXISTS `GalmangPhotoCard` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user` int NOT NULL COMMENT '회원번호',
  `photocard` int NOT NULL COMMENT '포토카드 고유id를 저장',
  PRIMARY KEY (`id`),
  KEY `FK_USER_TO_GalmangPhotoCard_1` (`user`),
  KEY `FK_Photocard_TO_GalmangPhotoCard_1` (`photocard`),
  CONSTRAINT `FK_Photocard_TO_GalmangPhotoCard_1` FOREIGN KEY (`photocard`) REFERENCES `Photocard` (`id`),
  CONSTRAINT `FK_USER_TO_GalmangPhotoCard_1` FOREIGN KEY (`user`) REFERENCES `User` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 pocaz.LikeManage 구조 내보내기
CREATE TABLE IF NOT EXISTS `LikeManage` (
  `post` int NOT NULL COMMENT 'auto_increment',
  `user` int NOT NULL COMMENT '회원번호',
  PRIMARY KEY (`post`,`user`),
  KEY `FK_USER_TO_LikeManage_1` (`user`),
  CONSTRAINT `FK_Post_TO_LikeManage_1` FOREIGN KEY (`post`) REFERENCES `Post` (`id`),
  CONSTRAINT `FK_USER_TO_LikeManage_1` FOREIGN KEY (`user`) REFERENCES `User` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 pocaz.Photocard 구조 내보내기
CREATE TABLE IF NOT EXISTS `Photocard` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '포토카드 고유id를 저장auto_increment',
  `artist` int NOT NULL,
  `path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '포토카드 이름',
  `description` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_Artist_TO_Photocard_1` (`artist`),
  CONSTRAINT `FK_Artist_TO_Photocard_1` FOREIGN KEY (`artist`) REFERENCES `Artist` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 pocaz.PhotocardImage 구조 내보내기
CREATE TABLE IF NOT EXISTS `PhotocardImage` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'auto_increment',
  `file` int NOT NULL,
  `photocardSellArticle` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_File_TO_PhotocardImage_1` (`file`),
  KEY `FK_PhotocardSellArticle_TO_PhotocardImage_1` (`photocardSellArticle`),
  CONSTRAINT `FK_File_TO_PhotocardImage_1` FOREIGN KEY (`file`) REFERENCES `File` (`id`),
  CONSTRAINT `FK_PhotocardSellArticle_TO_PhotocardImage_1` FOREIGN KEY (`photocardSellArticle`) REFERENCES `PhotocardSellArticle` (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 pocaz.PhotocardSellArticle 구조 내보내기
CREATE TABLE IF NOT EXISTS `PhotocardSellArticle` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'auto_increment',
  `photocard` int DEFAULT NULL COMMENT 'NULL이면 기타',
  `user` int NOT NULL COMMENT '회원번호(auto_increment)',
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '거래 제목',
  `price` int NOT NULL COMMENT '포토카드 판매가',
  `viewCount` int NOT NULL COMMENT '포토카드 판매글 조회수',
  `description` varchar(2048) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '포토카드 판매글 내용',
  `tradeStatus` int NOT NULL,
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '포토카드 판매글 최초 등록일',
  `updateAt` timestamp NULL DEFAULT NULL,
  `deleteAt` timestamp NULL COMMENT '포토카드 판매클 삭제 관리',
  `refreshedDate` timestamp NULL DEFAULT NULL COMMENT '포토카드 판매글 끌올 일자',
  PRIMARY KEY (`id`),
  KEY `FK_Photocard_TO_PhotocardSellArticle_1` (`photocard`),
  KEY `FK_USER_TO_PhotocardSellArticle_1` (`user`),
  KEY `FK_TradeStatus_TO_PhotocardSellArticle_1` (`tradeStatus`),
  CONSTRAINT `FK_Photocard_TO_PhotocardSellArticle_1` FOREIGN KEY (`photocard`) REFERENCES `Photocard` (`id`),
  CONSTRAINT `FK_TradeStatus_TO_PhotocardSellArticle_1` FOREIGN KEY (`tradeStatus`) REFERENCES `TradeStatusCategory` (`id`),
  CONSTRAINT `FK_USER_TO_PhotocardSellArticle_1` FOREIGN KEY (`user`) REFERENCES `User` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 pocaz.Post 구조 내보내기
CREATE TABLE IF NOT EXISTS `Post` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '게시글id',
  `user` int NOT NULL COMMENT '회원 고유 id',
  `category` int NOT NULL COMMENT '게시글 분류 카테고리',
  `viewCount` int NOT NULL DEFAULT '0' COMMENT '게시글의 조회수',
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '게시글의 제목',
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '게시글의 내용',
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '게시글 최초 작성일자',
  `updateAt` timestamp NULL DEFAULT NULL COMMENT '게시글 최근 수정일자',
  `deleteAt` timestamp NULL DEFAULT NULL COMMENT '게시글 삭제일자',
  PRIMARY KEY (`id`),
  KEY `FK_USER_TO_Post_1` (`user`),
  KEY `FK_PostCategory_TO_Post_1` (`category`),
  CONSTRAINT `FK_PostCategory_TO_Post_1` FOREIGN KEY (`category`) REFERENCES `PostCategory` (`id`),
  CONSTRAINT `FK_USER_TO_Post_1` FOREIGN KEY (`user`) REFERENCES `User` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 pocaz.PostCategory 구조 내보내기
CREATE TABLE IF NOT EXISTS `PostCategory` (
  `id` int NOT NULL,
  `name` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '1: 자유, 2:자랑',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 pocaz.PostImage 구조 내보내기
CREATE TABLE IF NOT EXISTS `PostImage` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'auto_increment',
  `file` int NOT NULL,
  `post` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_File_TO_PostImage_1` (`file`),
  KEY `FK_Post_TO_PostImage_1` (`post`),
  CONSTRAINT `FK_File_TO_PostImage_1` FOREIGN KEY (`file`) REFERENCES `File` (`id`),
  CONSTRAINT `FK_Post_TO_PostImage_1` FOREIGN KEY (`post`) REFERENCES `Post` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 pocaz.Reply 구조 내보내기
CREATE TABLE IF NOT EXISTS `Reply` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'auto_increment',
  `post` int NOT NULL COMMENT '게시글id',
  `user` int NOT NULL COMMENT '회원번호',
  `content` varchar(2048) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '댓글 내용(null 값 비허용)',
  `pid` int DEFAULT NULL COMMENT '대댓글일 경우 상위 댓글밑에서 조회',
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '게시글 최초 작성일자',
  `updateAt` timestamp NULL COMMENT '덧글 최근 수정일자',
  `deleteAt` timestamp NULL DEFAULT NULL COMMENT '게시글 삭제일자',
  PRIMARY KEY (`id`),
  KEY `FK_Post_TO_Reply_1` (`post`),
  KEY `FK_USER_TO_Reply_1` (`user`),
  CONSTRAINT `FK_Post_TO_Reply_1` FOREIGN KEY (`post`) REFERENCES `Post` (`id`),
  CONSTRAINT `FK_USER_TO_Reply_1` FOREIGN KEY (`user`) REFERENCES `User` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 pocaz.TradeHistory 구조 내보내기
CREATE TABLE IF NOT EXISTS `TradeHistory` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'auto_increment',
  `photocardSellArticle` int NOT NULL,
  `photocard` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `seller` int NOT NULL,
  `buyer` int NOT NULL,
  `tradePrice` int NOT NULL,
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 pocaz.TradeStatusCategory 구조 내보내기
CREATE TABLE IF NOT EXISTS `TradeStatusCategory` (
  `id` int NOT NULL,
  `name` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '1.판매중/ 2. 예약중/ 3. 판매완료',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 pocaz.User 구조 내보내기
CREATE TABLE IF NOT EXISTS `User` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '회원번호(auto_increment)',
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nickname` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
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
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 pocaz.UserAuthority 구조 내보내기
CREATE TABLE IF NOT EXISTS `UserAuthority` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user` int NOT NULL COMMENT '회원번호',
  `authority` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_USER_TO_UserGrade_1` (`user`),
  KEY `FK_Authority_TO_UserGrade_1` (`authority`),
  CONSTRAINT `FK_Authority_TO_UserGrade_1` FOREIGN KEY (`authority`) REFERENCES `AuthorityCategory` (`id`),
  CONSTRAINT `FK_USER_TO_UserGrade_1` FOREIGN KEY (`user`) REFERENCES `User` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4 COLLATE=UTF8MB4_UNICODE_CI;

ALTER TABLE ChatRoom 
ADD CONSTRAINT FK_Chatroom_TO_PhotocardSellArticle_2
FOREIGN KEY (sellarticleid)
REFERENCES PhotocardSellArticle (id);


ALTER TABLE ChatUser
ADD CONSTRAINT FK_Chatuser_TO_ChatRoom_3
FOREIGN KEY (sellItemId)
REFERENCES ChatRoom (sellarticleid);

-- 내보낼 데이터가 선택되어 있지 않습니다.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
