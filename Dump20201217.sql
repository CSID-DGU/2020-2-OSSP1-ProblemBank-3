-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: problembankdb.synology.me    Database: problems
-- ------------------------------------------------------
-- Server version	5.5.62-MariaDB

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
-- Table structure for table `pb_subject_users`
--

DROP TABLE IF EXISTS `pb_subject_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pb_subject_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subject_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pb_subject_users`
--

LOCK TABLES `pb_subject_users` WRITE;
/*!40000 ALTER TABLE `pb_subject_users` DISABLE KEYS */;
INSERT INTO `pb_subject_users` VALUES (1,1,3),(2,1,6),(3,1,2),(4,2,8),(5,2,5),(6,2,7),(7,3,2),(8,3,7);
/*!40000 ALTER TABLE `pb_subject_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pb_subjects`
--

DROP TABLE IF EXISTS `pb_subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pb_subjects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text COLLATE utf8mb4_bin,
  `admin_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pb_subjects`
--

LOCK TABLES `pb_subjects` WRITE;
/*!40000 ALTER TABLE `pb_subjects` DISABLE KEYS */;
INSERT INTO `pb_subjects` VALUES (1,'자료구조와실습',9),(2,'기초프로그래밍',1),(3,'심화프로그래밍',10);
/*!40000 ALTER TABLE `pb_subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pb_test_answers`
--

DROP TABLE IF EXISTS `pb_test_answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pb_test_answers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `test_id` int(11) DEFAULT NULL,
  `problem_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `content` longtext COLLATE utf8mb4_bin,
  `is_correct` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pb_test_answers`
--

LOCK TABLES `pb_test_answers` WRITE;
/*!40000 ALTER TABLE `pb_test_answers` DISABLE KEYS */;
INSERT INTO `pb_test_answers` VALUES (1,6,1,3,'#include<stdio.h>\nint main(void) {\n    int a, b;\n    scanf(\"%d %d\", &a, &b);\n    printf(\"%d\", a*b);\n    return 0;\n}',1),(2,6,1,3,'#include<stdio.h>\nint main(void) {\n    /*\n    *	write your codes!\n    */	\n    return 0;\n}',0),(3,6,1,3,'#include<stdio.h>\nint main(void) {\n    /*\n    *	write your codes!\n    */	\n    return 0;\n}',0),(4,6,1,3,'#include<stdio.h>\nint main(void) {\n    /*\n    *	write your codes!\n    */	\n    int a, b;\n    scanf(\"%d %d\", &a, &b);\n    printf(\"%d\\n\", a*b);\n    return 0;\n}',1),(26,5,4,2,'#include<stdio.h>\nint main(void) {\n    /*\n    *	모르겠어요.....\n    */	\n    return 0;\n}',0),(27,5,14,2,'#include <stdio.h>\n\nint main(void) {\n printf(\"\\\\    /\\\\\\n\");\n printf(\" )  ( \')\\n\");\n printf(\"(  /  )\\n\");\n printf(\" \\\\(__)|\\n\");\n return 0;\n}',1),(28,5,13,2,'#include <stdio.h>\n \nint main() {\n    printf(\"|\\\\_/|\\n\");\n    printf(\"|q p|   /}\\n\");\n    printf(\"( 0 )\\\"\\\"\\\"\\\\\\n\");\n    printf(\"|\\\"^\\\"`    |\\n\");\n    printf(\"||_/=\\\\\\\\__|\\n\");\n    return 0;\n}',1);
/*!40000 ALTER TABLE `pb_test_answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pb_test_feedback`
--

DROP TABLE IF EXISTS `pb_test_feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pb_test_feedback` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `test_id` int(11) DEFAULT NULL,
  `content` text COLLATE utf8mb4_bin,
  `author_id` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pb_test_feedback`
--

LOCK TABLES `pb_test_feedback` WRITE;
/*!40000 ALTER TABLE `pb_test_feedback` DISABLE KEYS */;
INSERT INTO `pb_test_feedback` VALUES (1,1,'3번 문제 테스트케이스에 오류가 있는 것 같습니다.',6,'2020-12-20 08:28:17'),(2,5,'왜 개 문제가 고양이 문제보다 먼저인가요?',6,'2020-12-17 05:32:20'),(3,6,'테스트',6,'2020-12-16 13:41:19'),(8,5,'3번 테스트케이스에 문제가 있는 것 같습니다...',2,'2020-12-17 04:56:43');
/*!40000 ALTER TABLE `pb_test_feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pb_test_problem_contents`
--

DROP TABLE IF EXISTS `pb_test_problem_contents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pb_test_problem_contents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text CHARACTER SET utf8 COLLATE utf8_bin,
  `content` text CHARACTER SET utf8 COLLATE utf8_bin,
  `input` text CHARACTER SET utf8 COLLATE utf8_bin,
  `output` text CHARACTER SET utf8 COLLATE utf8_bin,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pb_test_problem_contents`
--

LOCK TABLES `pb_test_problem_contents` WRITE;
/*!40000 ALTER TABLE `pb_test_problem_contents` DISABLE KEYS */;
INSERT INTO `pb_test_problem_contents` VALUES (1,'A×B','두 정수 A와 B를 입력받은 다음, A×B를 출력하는 프로그램을 작성하시오.','첫째 줄에 A와 B가 주어진다. (0 < A, B < 10)','첫째 줄에 A×B를 출력한다.'),(2,'A+B','두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을 작성하시오. asdfasdf','첫째 줄에 A와 B가 주어진다. (0 < A, B < 10) ','첫째 줄에 A+B를 출력한다.'),(3,'수열의 합','N과 L이 주어질 때, 합이 N이면서, 길이가 적어도 L인 가장 짧은 연속된 음이 아닌 정수 리스트를 구하는 프로그램을 작성하시오.','첫째 줄에 N과 L이 주어진다. N은 1,000,000,000보다 작거나 같은 자연수이고, L은 2보다 크거나 같고, 100보다 작거나 같은 자연수이다.','만약 리스트의 길이가 100보다 작거나 같으면, 연속된 수를 첫째 줄에 공백으로 구분하여 출력한다. 만약 길이가 100보다 크거나 그러한 수열이 없을 때는 -1을 출력한다.'),(4,'시험 성적','시험 점수를 입력받아 90 ~ 100점은 A, 80 ~ 89점은 B, 70 ~ 79점은 C, 60 ~ 69점은 D, 나머지 점수는 F를 출력하는 프로그램을 작성하시오.','첫째 줄에 시험 점수가 주어진다. 시험 점수는 0보다 크거나 같고, 100보다 작거나 같은 정수이다.','시험 성적을 출력한다.'),(5,'팩토리얼 ','0보다 크거나 같은 정수 N이 주어진다. 이때, N!을 출력하는 프로그램을 작성하시오.','첫째 줄에 정수 N(0 ≤ N ≤ 12)가 주어진다.','첫째 줄에 N!을 출력한다.'),(6,'Hello World','Hello World!를 출력하시오.','없음.','Hello World!를 출력하시오.'),(7,'한수','어떤 양의 정수 X의 각 자리가 등차수열을 이룬다면, 그 수를 한수라고 한다. 등차수열은 연속된 두 개의 수의 차이가 일정한 수열을 말한다. N이 주어졌을 때, 1보다 크거나 같고, N보다 작거나 같은 한수의 개수를 출력하는 프로그램을 작성하시오. ','첫째 줄에 1,000보다 작거나 같은 자연수 N이 주어진다.','첫째 줄에 1보다 크거나 같고, N보다 작거나 같은 한수의 개수를 출력한다.'),(8,'문자열의 반복','문자열을 입력받아 5번 반복하여 반환하는 프로그램을 작성해 봅시다.','길이 10 이하의 문자열','5번 반복된 문자열'),(9,'주민번호에서 생년 구하기','주민등록번호를 입력받아 생년 부분만 잘라서 반환하는 프로그램을 작성해 봅시다.','길이 14의 주민등록번호 문자열(-포함)','생년 부분'),(10,'잃어버린 괄호','세준이는 양수와 +, -, 그리고 괄호를 가지고 식을 만들었다. 그리고 나서 세준이는 괄호를 모두 지웠다. 그리고 나서 세준이는 괄호를 적절히 쳐서 이 식의 값을 최소로 만들려고 한다. 괄호를 적절히 쳐서 이 식의 값을 최소로 만드는 프로그램을 작성하시오.','첫째 줄에 식이 주어진다. 식은 ‘0’~‘9’, ‘+’, 그리고 ‘-’만으로 이루어져 있고, 가장 처음과 마지막 문자는 숫자이다. 그리고 연속해서 두 개 이상의 연산자가 나타나지 않고, 5자리보다 많이 연속되는 숫자는 없다. 수는 0으로 시작할 수 있다. 입력으로 주어지는 식의 길이는 50보다 작거나 같다.','첫째 줄에 정답을 출력한다.'),(11,'두 수 비교하기','두 정수 A와 B가 주어졌을 때, A와 B를 비교하는 프로그램을 작성하시오.','첫째 줄에 A와 B가 주어진다. A와 B는 공백 한 칸으로 구분되어져 있다.','첫째 줄에 다음 세 가지 중 하나를 출력한다. A가 B보다 큰 경우에는 \'>\'를 출력한다. A가 B보다 작은 경우에는 \'<\'를 출력한다. A와 B가 같은 경우에는 \'==\'를 출력한다.'),(12,'리스트 원소 추가','리스트의 원소를 공백을 이용해 입력받아 해당 리스트의 마지막 값에 1을 더한 값을 추가하여 반환하는 프로그램을 작성해 봅시다.','길이 10 이하의 정수 리스트','값이 추가된 리스트'),(13,'개','아래 예제와 같이 개를 출력하시오.','없음.','개를 출력한다.'),(14,'고양이','아래 예제와 같이 고양이를 출력하시오.','없음.','고양이를 출력한다.'),(37,'리스트 원소 추가','리스트의 원소를 공백을 이용해 입력받아 해당 리스트의 마지막 값에 1을 더한 값을 추가하여 반환하는 프로그램을 작성해 봅시다.','길이 10 이하의 정수 리스트','값이 추가된 리스트'),(38,'문자열 공백 제거 및 대체','문자열을 입력받아 해당 문자열의 앞 뒤 공백을 제거하고 문자열의 a를 z로 대체하여 반환하는 프로그램을 작성해 봅시다.','길이 10 이하의 문자열','결과 문자열'),(39,'A+B','A+B를 출력하세요.','정수형 A, B','A+B'),(40,'몫과 나머지','두 수 a, b를 입력받아 a를 b로 나눈 몫과 나머지를 반환하는 프로그램을 작성해 봅시다.','10000이하의 두 자연수','몫과 나머지 '),(41,'리스트의 정렬','리스트의 원소를 공백을 이용해 입력받아 해당 리스트를 정렬하여 반환하는 프로그램을 작성해 봅시다.','길이 10 이하의 정수 리스트','정렬된 리스트'),(42,'문자열 공백 제거 및 대체','문자열을 입력받아 해당 문자열의 앞 뒤 공백을 제거하고 문자열의 a를 z로 대체하여 반환하는 프로그램을 작성해 봅시다.','길이 10 이하의 문자열','결과 문자열');
/*!40000 ALTER TABLE `pb_test_problem_contents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pb_test_problems`
--

DROP TABLE IF EXISTS `pb_test_problems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pb_test_problems` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `test_id` int(11) DEFAULT NULL,
  `problem_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pb_test_problems`
--

LOCK TABLES `pb_test_problems` WRITE;
/*!40000 ALTER TABLE `pb_test_problems` DISABLE KEYS */;
INSERT INTO `pb_test_problems` VALUES (1,1,1),(2,1,2),(3,1,3),(4,2,4),(5,2,5),(6,2,6),(7,3,7),(8,3,8),(9,3,9),(10,4,10),(11,4,11),(12,4,12),(13,5,4),(14,5,13),(15,5,14),(41,35,39),(42,35,40),(43,35,41),(44,35,42);
/*!40000 ALTER TABLE `pb_test_problems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pb_test_testcases`
--

DROP TABLE IF EXISTS `pb_test_testcases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pb_test_testcases` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `input_example` varchar(300) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `output_example` varchar(300) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `problem_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=148 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pb_test_testcases`
--

LOCK TABLES `pb_test_testcases` WRITE;
/*!40000 ALTER TABLE `pb_test_testcases` DISABLE KEYS */;
INSERT INTO `pb_test_testcases` VALUES (11,'18 2','5 6 7',3),(12,'6 3','1 2 3',3),(13,'7 2','3 4',3),(14,'12 2','3 4 5',3),(15,'26 4','5 6 7 8',3),(16,'100','A',4),(17,'84','B',4),(18,'71','C',4),(19,'68','D',4),(20,'42','F',4),(21,'10','3628800',5),(22,'3','6',5),(23,'2','2',5),(24,'1','1',5),(25,'4','24',5),(26,NULL,'Hello World!',6),(27,'110','99',7),(28,'1','1',7),(29,'210','105',7),(30,'1000','144',7),(31,'abc','abcabcabcabcabc',8),(32,'1','11111',8),(33,'aD','aDaDaDaDaD',8),(34,'931111-1234567','28',9),(35,'881212-1154754','33',9),(36,'911211-2014454','26',9),(37,'55-50+40','-35',10),(38,'1+2-3','0',10),(39,'3*2/2','3',10),(40,'1 2','<',11),(41,'10 2','>',11),(42,'5 5','==',11),(43,'10 15 5 4 7 3','10 15 5 4 7 3 20 30 10 8 14  6',12),(44,'1 99 -1 3 0','1 99 -1 3  0  2 198 -2 6 0',12),(45,'0','0 0',12),(46,NULL,'|\\_/|\n|q p|   /}\n( 0 )\"\"\"\\\n|\"^\"`    |\n||_/=\\\\__|',13),(47,NULL,'\\    /\\\n )  ( \')\n(  /  )\n \\(__)|',14),(122,'1 2','2',1),(123,'3 4','12',1),(130,'1 2','3',2),(131,'2 5','7',2),(132,'1 2','3',194),(133,'3 4','7',194),(134,'3 5','8',194),(135,'4 6','10',194),(136,'3 3','6',194),(137,'5 4','1 1',135),(138,'100 50','2 0',135),(139,'2 100','0 2',135),(140,'3 33','0 3',135),(141,'10 1','10 0',135),(142,'10 15 5 4 7 3','5 7',140),(143,'1 99 -1 3 0','1',140),(144,'1 1 2 2 0','1',140),(145,'abc','abc',143),(146,'.bc','bc',143),(147,'^a..','a.',143);
/*!40000 ALTER TABLE `pb_test_testcases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pb_test_users`
--

DROP TABLE IF EXISTS `pb_test_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pb_test_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `test_id` int(11) DEFAULT NULL,
  `correct` int(11) DEFAULT '0',
  `wrong` int(11) DEFAULT '0',
  `applied` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=196 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pb_test_users`
--

LOCK TABLES `pb_test_users` WRITE;
/*!40000 ALTER TABLE `pb_test_users` DISABLE KEYS */;
INSERT INTO `pb_test_users` VALUES (1,3,1,0,0,0),(2,6,1,0,0,0),(3,2,1,0,0,0),(7,2,3,0,0,0),(8,7,3,0,0,0),(147,2,5,2,1,1),(181,8,2,0,0,0),(182,5,2,0,0,0),(183,7,2,0,0,0),(184,3,5,0,0,0),(190,8,4,0,0,0),(191,5,4,0,0,0),(192,7,4,0,0,0),(193,8,35,0,0,0),(194,5,35,0,0,0),(195,7,35,0,0,0);
/*!40000 ALTER TABLE `pb_test_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pb_tests`
--

DROP TABLE IF EXISTS `pb_tests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pb_tests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text COLLATE utf8mb4_bin,
  `content` longtext COLLATE utf8mb4_bin,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_exam` int(11) DEFAULT NULL,
  `start` timestamp NULL DEFAULT NULL,
  `end` timestamp NULL DEFAULT NULL,
  `admin_id` int(11) DEFAULT NULL,
  `subject_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pb_tests`
--

LOCK TABLES `pb_tests` WRITE;
/*!40000 ALTER TABLE `pb_tests` DISABLE KEYS */;
INSERT INTO `pb_tests` VALUES (1,'자료구조와실습 중간고사','자료구조와실습 중간고사입니다.','2020-12-15 18:56:22',1,'2020-12-20 08:00:00','2020-12-20 09:00:00',9,1),(2,'기초프로그래밍 중간고사','기초프로그래밍 중간고사입니다.','2020-12-15 18:56:22',1,'2020-12-17 04:00:00','2020-12-17 06:00:00',1,2),(3,'심화프로그래밍 중간고사','심화프로그래밍 중간고사입니다.','2020-12-15 18:56:22',1,'2020-12-22 06:00:00','2020-12-22 08:00:00',10,3),(4,'2020 동국대학교 프로그래밍 경진대회','2020 동국대학교 프로그래밍 경진대회 입니다.','2020-12-15 18:56:22',0,'2020-12-22 19:00:00','2020-12-22 21:00:00',1,NULL),(5,'2020 연말맞이 코딩 부수기','심심한 연말! 코드와 함께 보람차게 보내봅시다!!','2020-12-15 18:56:22',0,'2020-12-17 03:00:00','2020-12-22 09:00:00',1,NULL),(35,'기초프로그래밍 기말고사','기초프로그래밍 기말고사입니다.','2020-12-17 05:01:48',1,'2020-12-18 07:00:00','2020-12-18 12:00:00',1,2);
/*!40000 ALTER TABLE `pb_tests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pb_users`
--

DROP TABLE IF EXISTS `pb_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pb_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(20) COLLATE utf8mb4_bin NOT NULL,
  `pw` varchar(20) COLLATE utf8mb4_bin NOT NULL,
  `user_name` text COLLATE utf8mb4_bin,
  `is_admin` int(11) NOT NULL DEFAULT '0',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pb_users`
--

LOCK TABLES `pb_users` WRITE;
/*!40000 ALTER TABLE `pb_users` DISABLE KEYS */;
INSERT INTO `pb_users` VALUES (1,'admin1','pass','손윤식',1,'2020-12-15 15:30:31'),(2,'user1','pass','서준원',0,'2020-12-15 15:30:31'),(3,'user2','pass','강태원',0,'2020-12-15 15:30:31'),(4,'user3','pass','누비아',0,'2020-12-15 15:30:31'),(5,'user4','pass','주성항',0,'2020-12-15 15:30:31'),(6,'user5','pass','송혜민',0,'2020-12-15 15:30:31'),(7,'user6','pass','최주혁',0,'2020-12-15 15:30:31'),(8,'user7','pass','안지훈',0,'2020-12-15 15:30:31'),(9,'admin2','pass','최은만',1,'2020-12-15 18:46:08'),(10,'admin3','pass','김가영',1,'2020-12-15 18:46:08');
/*!40000 ALTER TABLE `pb_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plass_mylist_problem`
--

DROP TABLE IF EXISTS `plass_mylist_problem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plass_mylist_problem` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `problem_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plass_mylist_problem`
--

LOCK TABLES `plass_mylist_problem` WRITE;
/*!40000 ALTER TABLE `plass_mylist_problem` DISABLE KEYS */;
INSERT INTO `plass_mylist_problem` VALUES (10,20,1);
/*!40000 ALTER TABLE `plass_mylist_problem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plass_problem_category`
--

DROP TABLE IF EXISTS `plass_problem_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plass_problem_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `problem_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plass_problem_category`
--

LOCK TABLES `plass_problem_category` WRITE;
/*!40000 ALTER TABLE `plass_problem_category` DISABLE KEYS */;
INSERT INTO `plass_problem_category` VALUES (1,1,6),(2,2,7),(3,3,8),(4,4,9),(5,5,10),(6,6,11),(7,7,12),(8,8,13),(9,9,14),(10,10,15),(11,11,16),(12,12,17),(13,13,18),(14,14,19),(15,15,20),(16,16,21),(17,17,22),(18,18,23),(19,19,24),(20,20,25),(21,21,26),(22,22,27),(23,23,28),(24,24,29),(25,25,30),(26,26,31),(27,27,32),(28,28,33),(29,29,34),(30,30,35),(31,31,36),(32,32,37),(33,33,38),(34,34,39),(35,35,40),(36,36,41),(37,37,42),(38,38,43),(39,39,45),(40,40,46);
/*!40000 ALTER TABLE `plass_problem_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plass_problem_category_ver2`
--

DROP TABLE IF EXISTS `plass_problem_category_ver2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plass_problem_category_ver2` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `problem_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plass_problem_category_ver2`
--

LOCK TABLES `plass_problem_category_ver2` WRITE;
/*!40000 ALTER TABLE `plass_problem_category_ver2` DISABLE KEYS */;
INSERT INTO `plass_problem_category_ver2` VALUES (1,1,1),(2,2,1),(3,3,2),(4,4,2),(5,5,3),(6,6,3),(7,7,4),(8,8,4),(9,9,5),(10,10,5),(11,11,6),(12,12,6),(13,13,7),(14,14,7),(15,15,8),(16,16,8),(17,17,9),(18,18,9),(19,19,10),(20,20,10),(21,21,11),(22,22,11),(23,23,12),(24,24,12),(25,25,13),(26,26,13),(27,27,14),(28,28,14),(29,29,15),(30,30,15),(31,31,16),(32,32,16),(33,33,17),(34,34,17),(35,35,18),(36,36,18),(37,37,19),(38,38,19),(39,39,20),(40,40,20);
/*!40000 ALTER TABLE `plass_problem_category_ver2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plass_problems`
--

DROP TABLE IF EXISTS `plass_problems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plass_problems` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text COLLATE utf8_bin,
  `content` text COLLATE utf8_bin,
  `rank` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `language` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `input` text COLLATE utf8_bin,
  `output` text COLLATE utf8_bin,
  `remarks` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `level` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plass_problems`
--

LOCK TABLES `plass_problems` WRITE;
/*!40000 ALTER TABLE `plass_problems` DISABLE KEYS */;
INSERT INTO `plass_problems` VALUES (1,'몫과 나머지','두 수 a, b를 입력받아 a를 b로 나눈 몫과 나머지를 반환하는 프로그램을 작성해 봅시다.',1,'2020-08-31 07:00:00','Python','10000이하의 두 자연수','몫과 나머지 ',NULL,'하'),(2,'문자열의 반복','문자열을 입력받아 5번 반복하여 반환하는 프로그램을 작성해 봅시다.',1,'2020-08-31 07:00:00','Python','길이 10 이하의 문자열','5번 반복된 문자열',NULL,'하'),(3,'주민번호에서 생년 구하기','주민등록번호를 입력받아 생년 부분만 잘라서 반환하는 프로그램을 작성해 봅시다.',1,'2020-08-31 07:00:00','Python','길이 14의 주민등록번호 문자열(-포함)','생년 부분',NULL,'하'),(4,'주민번호 분류','주민등록번호를 입력받아 생년 부분이 93 이상이고 성별이 남성인지 여부를 반환하는 프로그램을 작성해 봅시다.',1,'2020-08-31 07:00:00','Python','길이 14의 주민등록번호 문자열(-포함)','boolean값',NULL,'하'),(5,'리스트의 정렬','리스트의 원소를 공백을 이용해 입력받아 해당 리스트를 정렬하여 반환하는 프로그램을 작성해 봅시다.',1,'2020-08-31 07:00:00','Python','길이 10 이하의 정수 리스트','정렬된 리스트',NULL,'하'),(6,'리스트 원소 추가','리스트의 원소를 공백을 이용해 입력받아 해당 리스트의 마지막 값에 1을 더한 값을 추가하여 반환하는 프로그램을 작성해 봅시다.',1,'2020-08-31 07:00:00','Python','길이 10 이하의 정수 리스트','값이 추가된 리스트',NULL,'하'),(7,'리스트의 최대값','리스트의 원소를 공백을 이용해 입력받아 해당 리스트의 최대값을 반환하는 프로그램을 작성해 봅시다.',1,'2020-08-31 07:00:00','Python','길이 10 이하의 정수 리스트','최대값',NULL,'하'),(8,'리스트의 최대값 삭제','리스트의 원소를 공백을 이용해 입력받아 해당 리스트의 최대값을 삭제하는 프로그램을 작성해 봅시다.',1,'2020-08-31 07:00:00','Python','길이 10 이하의 정수 리스트','최대값이 삭제된 리스트',NULL,'하'),(9,'문자열 내부에 문자 삽입','문자열을 입력받아 해당 문자열의 문자와 문자 사이에 \',\'를 추가하여 반환하는 프로그램을 작성해 봅시다.',1,'2020-08-31 07:00:00','Python','길이 10 이하의 문자열','결과 문자열',NULL,'하'),(10,'문자열 공백 제거 및 대체','문자열을 입력받아 해당 문자열의 앞 뒤 공백을 제거하고 문자열의 a를 z로 대체하여 반환하는 프로그램을 작성해 봅시다.',1,'2020-08-31 07:00:00','Python','길이 10 이하의 문자열','결과 문자열',NULL,'하'),(11,'1부터 n까지의 정수','정수 n을 입력받아 1에서부터 n까지의 원소를 가지는 리스트를 반환하는 프로그램을 작성해 봅시다.',1,'2020-08-31 07:00:00','Python','100 이하의 정수 ','1부터 n까지의 숫자',NULL,'하'),(12,'집합 만들기','정수 5개를 입력받아 중복을 제거한 리스트(집합)를 만든 후 반환하는 프로그램을 작성해 봅시다.',1,'2020-08-31 07:00:00','Python','길이 5 이하의 정수 리스트','중복이 제거된 리스트',NULL,'하'),(13,'합집합','집합 A가 {1,2,3,4,5} 의 원소를 가지고 있을 때 집합 B의 원소 5개를 입력받아 두 집합의 합집합을 반환하는 프로그램을 작성해 봅시다.',1,'2020-08-31 07:00:00','Python','집합 B의 원소 5개','집합 A와 집합 B의 합집합',NULL,'하'),(14,'교집합과 차집합','집합 A가 {1,2,3,4,5} 의 원소를 가지고 있을 때 집합 B의 원소 5개를 입력받아 두 집합의 차집합(A-B)과 교집합의 원소의 개수를 반환하는 프로그램을 작성해 봅시다',1,'2020-08-31 07:00:00','Python','집합 B의 원소 5개','차집합의 원소의 수와 교집합의 원소의 수',NULL,'중'),(15,'배수와 집합','정수 n을 입력받아 1부터 n까지의 2의 배수, 3의 배수의 집합을 각각 만든 후, 집합 자료형과 교집합 연산을 이용해 2의 배수이면서 3의 배수인 수(6의 배수)의 집합을 반환하는 프로그램을 작성해 봅시다.',1,'2020-08-31 07:00:00','Python','1000 이하의 정수 n','n이하의 모든 6의 배수를 원소로 가지는 집합',NULL,'중'),(16,'점심 메뉴 투표','점심 메뉴를 다중으로 입력받아 가장 많은 득표 결과를 얻은 메뉴를 반환하는 프로그램을 작성해 봅시다.',1,'2020-08-31 07:00:00','Python','점심 메뉴 목록','가장 많은 득표를 받은 메뉴',NULL,'중'),(17,'홀수와 짝수 개수','여러 자연수들을 입력받아 홀수의 개수와 짝수의 개수를 반환하는 프로그램을 작성해 봅시다.',1,'2020-08-31 07:00:00','Python','100개 이하의 자연수','홀수의 개수와 짝수의 개수',NULL,'하'),(18,'점수 판별','학생의 성적을 입력받아 90점 이상이라면 \"A\", 90점미만 80점 이상이라면 \"B\", 80점 미만이라면 \"C\"를 반환하는 프로그램을 작성해 봅시다.',1,'2020-08-31 07:00:00','Python','학생의 점수','등급',NULL,'하'),(19,'점수 판별2','학생의 점수를 여러개 입력받아 80점 이상의 점수만 반환하는 프로그램을 작성해 봅시다.',1,'2020-08-31 07:00:00','Python','10개 이하의 학생의 점수들','80점 이상의 점수들',NULL,'하'),(20,'직접 만드는 최대값 구현','max, sort, sorted 등의 함수를 사용하지 않고 들어온 값들 중 최대값을 구하여 반환하는 프로그램을 작성해 봅시다.',1,'2020-08-31 07:00:00','Python','20개 이하의 정수','최대값',NULL,'하'),(21,'주민등록번호 검사','다음과 같은 조건에서 주민등록번호가 모두 올바르다면 True, 하나라도 잘못되었다면 False를 반환하는 프로그램을 작성해 봅시다. 1) 년은 1900년 이상 2020년 이하여야 합니다. 2) 월은 1 이상 12 이하여야 합니다. 3) 일은 1 이상 31 이하여야 합니다',1,'2020-08-31 07:00:00','Python','10개 이하의 주민등록번호들','Boolean 값',NULL,'하'),(22,'숫자 검사','여러 값들을 입력받아 첫 값을 제외한 다른 값들의 평균이 첫 값보다 크다면 True, 아니라면 False를 반환하는 프로그램을 작성해 봅시다.',1,'2020-08-31 07:00:00','Python','10개 이하의 정수','Boolean 값',NULL,'하'),(23,'중복 찾기','여러 값들을 입력받아 들어온 값에서 중복된 원소가 있다면 True, 아니라면 False를 출력하는 프로그램을 작성해 봅시다',1,'2020-08-31 07:00:00','Python','10개 이하의 변수','Boolean 값',NULL,'중'),(24,'소수 찾기','자연수 n을 입력받아 n보다 작은 소수를 원소로 가지는 리스트를 반환하는 프로그램을 작성해 봅시다.',1,'2020-08-31 07:00:00','Python','100이하의 정수 n',' n이하의 모든 소수를 원소로 가지는 집합',NULL,'중'),(25,'값 곱하기','여러 수를 입력받아 해당 수를 두배 곱한 값들로 이루어진 리스트를 반환하는 프로그램을 작성해 봅시다.',1,'2020-08-31 07:00:00','Python','10개 이하의 정수들','해당 정수들을 두배 곱한 값들로 이루어진 리스트',NULL,'하'),(26,'계산기 만들기','두 수와 계산 기호(+, -) 를 입력받아 계산을 수행한 결과를 반환하는 계산기 프로그램을 작성해 봅시다.',1,'2020-08-31 07:00:00','Python','두 수와 계산 기호','계산 결과',NULL,'중'),(27,'피보나치 수열','재귀 함수를 이용해 피보나치 수열의 n번째 수를 반환하는 프로그램을 작성해 봅시다.',1,'2020-08-31 07:00:00','Python','자연수 n','피보나치 수열의 n번쨰 항',NULL,'중'),(28,'팩토리얼 구하기','n! 은 1부터 자연수 n까지의 곱을 구하는 수학 기호입니다. 자연수 n을 입력받아 n!의 값을 반환하는 factorial(n) 함수를 작성한 후, 해당 함수를 이용해 n값을 입력받아 factorial을 출력하는 프로그램을 작성해 봅시다.',1,'2020-08-31 07:00:00','Python','10 이하의 자연수 n','n!',NULL,'중'),(29,'숫자 뒤집기','한 정수를 입력받아 해당 정수를 거꾸로 뒤집은 수를 반환하는 프로그램을 작성해 봅시다.',1,'2020-08-31 07:00:00','Python','정수','거꾸로 된 정수',NULL,'하'),(30,'로마 숫자','로마자에서 사용하는 숫자는 다음과 같다 : I, V, X, L, C, D, M',1,'2020-08-31 07:00:00','Python','로마 숫자','10진수',NULL,'중'),(31,'올바른 괄호 판별','다음과 같은 여섯 가지의 괄호 \'(\', \')\', \'[\', \']\', \'{\', \'}\' 와 영문으로 이루어진 문자열이 들어왔을 때, 괄호가 올바르게 배열되었는지를 판단하는 프로그램을 작성해 봅시다. 여는 괄호 후에 같은 타입의 닫는 괄호가 와야 하며, 다음과 같은 형태는 올바른 배열이 아닙니다 : \'([)]\', \'[)]\', \'[}\' 등',1,'2020-08-31 07:00:00','Python','괄호를 포함한 문자열','boolean',NULL,'중'),(32,'마지막 단어','주어진 문장의 맨 마지막 단어를 반환하는 프로그램을 작성해 봅시다. 마지막 단어는 특수 문자를 제외한 단어만 반환합니다.',1,'2020-08-31 07:00:00','Python','문장','마지막 단어',NULL,'중'),(33,'중앙값 찾기','리스트의 원소를 공백을 이용해 입력받아 해당 리스트의 가운데값을 리스트 형태로 반환하는 프로그램을 작성해 봅시다. 개수가 짝수라면 가운데 두 개의 값을 반환해야 합니다.',1,'2020-08-31 07:00:00','Python','길이 10 이하의 정수 리스트','가운데값 리스트',NULL,'중'),(34,'두 배 추가','리스트의 원소를 공백을 이용해 입력받아 해당 리스트를 두 배한 값의 리스트를 기존의 리스트에 추가하여 반환하는 프로그램을 작성해 봅시다.',1,'2020-08-31 07:00:00','Python','길이 10 이하의 정수 리스트','값이 추가된 리스트',NULL,'하'),(35,'홀수 삭제','리스트의 원소를 공백을 이용해 입력받아 해당 리스트의 홀수를 삭제하는 프로그램을 작성해 봅시다.',1,'2020-08-31 07:00:00','Python','길이 10 이하의 자연수 리스트','홀수값이 삭제된 리스트',NULL,'하'),(36,'쉼표 추가','문자열을 입력받아 해당 문자열의 문자와 문자 사이에 \',\'를 추가하고, 모든 문자를 대문자로 바꾸어 반환하는 프로그램을 작성해 봅시다.',1,'2020-08-31 07:00:00','Python','길이 10 이하의 문자열','결과 문자열',NULL,'중'),(37,'문자열 스트립','문자열을 입력받아 해당 문자열의 앞 뒤 공백, 특수문자들을 제거하여 반환하는 프로그램을 작성해 봅시다.',1,'2020-08-31 07:00:00','Python','길이 10 이하의 문자열','결과 문자열',NULL,'하'),(38,'깊이 우선 탐색(BFS)','이진 트리 형태로 값들을 입력받아 깊이 우선 탐색의 경로를 출력하는 프로그램을 작성해 보자.',1,'2020-08-31 07:00:00','Python','이진 트리 값들','경로 리스트',NULL,'중'),(39,'대칭 트리 구하기','이진 트리 형태로 값들을 입력받아 해당 트리가 대칭 트리인지 구하는 프로그램을 작성해 보자. 예를 들어 [1,2,2,3,4,4,3] 는 다음과 같은 형태가 되므로 대칭 트리이다.',1,'2020-08-31 07:00:00','Python','트리의 값들','boolean 값',NULL,'중'),(40,'정규 표현식 매칭','문자열과 패턴이 주어질 때, 해당 정규 표현식 패턴이 문자열과 일치하는지 확인하는 프로그램을 작성해 보자. \'.\'은 임의의 한 글자를 뜻하고, \'*\'는 앞에 있는 글자의 0번 이상의 반복을 뜻한다. 따라서 패턴이 \"a*\"이고 문자열이 \"aaa\"라면 이 문자열은 패턴에 일치하며, 마찬가지로 패턴이 \".*\"이고 문자열이 \"ab\"라면 이 글자는 정규 표현식 패턴에 일치한다.',1,'2020-09-14 11:59:58','Python','문자열과 패턴','boolean 값',NULL,'상');
/*!40000 ALTER TABLE `plass_problems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plass_testcases`
--

DROP TABLE IF EXISTS `plass_testcases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plass_testcases` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `input_example` varchar(300) CHARACTER SET utf8 DEFAULT NULL,
  `output_example` varchar(300) CHARACTER SET utf8 DEFAULT NULL,
  `problem_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plass_testcases`
--

LOCK TABLES `plass_testcases` WRITE;
/*!40000 ALTER TABLE `plass_testcases` DISABLE KEYS */;
INSERT INTO `plass_testcases` VALUES (1,'5 4','1 1',1),(2,'100 50','2 0',1),(3,'2 100','0 2',1),(4,'3 33','0 3',1),(5,'10 1','10 0',1),(6,'abc','abcabcabcabcabc',2),(7,'1','11111',2),(8,'aD','aDaDaDaDaD',2),(9,'931111-1234567','28',3),(10,'881212-1154754','33',3),(11,'911211-2014454','26',3),(12,'931111-1234567','True',4),(13,'901212-1154754','False',4),(14,'951211-2014454','False',4),(15,'10 15 5 4 7 3','5 7',5),(16,'1 99 -1 3 0','1',5),(17,'1 1 2 2 0','1',5),(18,'10 15 5 4 7 3','10 15 5 4 7 3 20 30 10 8 14  6',6),(19,'1 99 -1 3 0','1 99 -1 3  0  2 198 -2 6 0',6),(20,'0','0 0',6),(21,'10 15 5 4 7 3','12',7),(22,'1 99 -1 3 0','100',7),(23,'0','0',7),(24,'10 15 5 4 7 3','10 4',8),(25,'1 99 1 3 5','',8),(26,'33 2 5 1 4','2 4',8),(27,'abcde','A,B,C,D,E',9),(28,',aB',',,A,B',9),(29,'',' ',9),(30,'abc','abc',10),(31,'.bc','bc',10),(32,'^a..','a.',10),(33,'50','1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50',11),(34,'1','1',11),(35,'0','',11),(36,'10 10 5 4 7 3','10 5 4 7 3',12),(37,'1 2 3 0','1 2 3 0',12),(38,'1 1 1 1','1',12),(39,'5 6 7 8 9','1 2 3 4 5 6 7 8 9',13),(40,'1 2 3 4 5','1 2 3 4 5',13),(41,'6 7 8 9 10','1 2 3 4 5 6 7 8 9 10',13),(42,'5 6 7 8 9','4 1',14),(43,'1 2 3 4 5','0 5',14),(44,'6 7 8 9 10','5 0',14),(45,'10','6',15),(46,'100','6 12 18 24 30 36 42 48 54 60 66 72 78 84 90 96',15),(47,'5','',15),(48,'Ramen Steak Salad Ramen','Ramen',16),(49,'Soup Potato Soup','Soup',16),(50,'Hamburger Hamburger Hamburger','Hamburger',16),(51,'1 3 2 5 4 6','2 4',17),(52,'100 20 33 53 55 50','3 3',17),(53,'1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 99 100','3',17),(54,'50','C',18),(55,'99','A',18),(56,'85','B',18),(57,'10 20 80 90','80 90',19),(58,'50 10 20 60 22 30','',19),(59,'80 100 90 20','80 100 90',19),(60,'15 99 80 20 33 22','99',20),(61,'120 30 55 1102 304 66','1102',20),(62,'-1 -3 -5 -6 -30','-1',20),(63,'19931111 19921213 20010405','True',21),(64,'18801211 19931111 20010405','False',21),(65,'19951310 19931111 19921213','False',21),(66,'19951132 19931111 19921213','False',21),(67,'5 6 7 8 9','True',22),(68,'4 2 3 4 5 3 2 5','False',22),(69,'-4 -5 -7 -3 -11','False',22),(70,'a b c d e f g a	','True',23),(71,'1 2 3 4 5 6','False',23),(72,'6 7 8 9 10 6 apple banana','True',23),(73,'10','2 3 5 7',24),(74,'100','2 3 5 7 11 13 17 19 23 29 31 37 41 43 47 53 59 61 67 71 73 79 83 89 97',24),(75,'50','2 3 5 7 11 13 17 19 23 29 31 37 41 43 47',24),(76,'10 5 3 2','20 10 6 4',25),(77,'0 -1 3 2	','0 -2 6 4',25),(78,'1 2 3 4 5 6 7 8 9 10','2 4 6 8 10 12 14 16 18 20',25),(79,'10 20 +','30',26),(80,'50 40 -','10',26),(81,'-10 4 -','-14',26),(82,'1','1',27),(83,'2','1',27),(84,'3','2',27),(85,'13','233',27),(86,'1','1',28),(87,'3','6',28),(88,'6','720',28),(89,'9','362880',28),(90,'20','2',29),(91,'-100','-1',29),(92,'-321','-123',29),(93,'224','422',29),(94,'0','0',29),(95,'III','3',30),(96,'XI','11',30),(97,'LVII','57',30),(98,'IX','9',30),(99,'MCMXCIV','1994',30),(100,'(a)d[b]{c}','True',31),(101,'(abcd)','True',31),(102,'(a]','False',31),(103,'([a)]','False',31),(104,'{(ab)]','False',31),(105,'[{[a]()}]','True',31),(106,'Hello world.','world',32),(107,'This is a sentence','sentence',32),(108,'Python','Python',32),(109,'10 15 5 4 7 3','5 7',33),(110,'1 99 -1 3 0','1',33),(111,'1 1 2 2 0','1',33),(112,'10 15 5 4 7 3','10 15 5 4 7 3 20 30 10 8 14 6',34),(113,'1 99 -1 3 0','1 99 -1 3 0 2 198 -2 6 0',34),(114,'0','0 0',34),(115,'10 15 5 4 7 3','10 4',35),(116,'1 99 1 3 5','',35),(117,'33 2 5 1 4','2 4',35),(118,'abcde','A,B,C,D,E',36),(119,',aB','..A.B',36),(120,'','',36),(121,'abc','abc',37),(122,'.bc','bc',37),(123,'^a..','a.',37),(124,'1 2 3 4 5 6 7','1 2 4 5 3 6 7',38),(125,'1 2 3 4 5 6 7 8 9','1 2 4 8 9 5 3 6 7',38),(126,'1 2 2 3 4 4 3','True',39),(127,'3 5 2 3 2 4 2 2 4 3 2 1 4 2 3','False',39),(128,'2 4 4','True',39),(129,'aa a','False',40),(130,'aa a*','True',40),(131,'ab .*','True',40),(132,'aab c*a*b','True',40),(133,'mississippi mis*is*p*.','False',40);
/*!40000 ALTER TABLE `plass_testcases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plass_total_categories`
--

DROP TABLE IF EXISTS `plass_total_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plass_total_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plass_total_categories`
--

LOCK TABLES `plass_total_categories` WRITE;
/*!40000 ALTER TABLE `plass_total_categories` DISABLE KEYS */;
INSERT INTO `plass_total_categories` VALUES (1,'기초 프로그래밍',1,0,'C언어 기준으로 문제 '),(2,'심화 프로그래밍',1,0,'C++언어 기준으로 문제'),(3,'객체지향 프로그래밍',1,0,'Java 언어 기준으로 문제'),(4,'자료구조',1,0,'자료구조별 문제'),(5,'알고리즘',1,0,'알고리즘별 문제'),(6,'입출력',2,1,''),(7,'연산자 ',2,1,NULL),(8,'제어문',2,1,NULL),(9,'반복문',2,1,NULL),(10,'배열',2,1,NULL),(11,'함수',2,1,NULL),(12,'구조체',2,1,NULL),(13,'포인터',2,1,NULL),(14,'입출력',2,2,NULL),(15,'연산자',2,2,NULL),(16,'제어문',2,2,NULL),(17,'반목문',2,2,NULL),(18,'배열',2,2,NULL),(19,'함수',2,2,NULL),(20,'클래스',2,2,NULL),(21,'상속',2,2,NULL),(22,'예외처리',2,2,NULL),(23,'입출력',2,3,NULL),(24,'연산자',2,3,NULL),(25,'제어문',2,3,NULL),(26,'반복문',2,3,NULL),(27,'배열',2,3,NULL),(28,'클래스,객체',2,3,NULL),(29,'String 클래스 ',2,3,NULL),(30,'상속',2,3,NULL),(31,'예외처리',2,3,NULL),(32,'리스트',2,4,NULL),(33,'스택',2,4,NULL),(34,'큐',2,4,NULL),(35,'데크',2,4,NULL),(36,'백터',2,4,NULL),(37,'맵',2,4,NULL),(38,'탐색',2,5,NULL),(39,'정렬',2,5,NULL),(40,'해싱',2,5,NULL),(41,'선형',3,32,NULL),(42,'이중연결',3,32,NULL),(43,'포인터',3,32,NULL),(44,'배열',3,32,NULL),(45,'포인터',3,33,NULL),(46,'배열',3,33,NULL),(47,'포인터 ',3,34,NULL),(48,'배열',3,34,NULL),(49,'포인터',3,35,NULL),(50,'배열',3,35,NULL),(51,'BFS',3,38,NULL),(52,'DFS',3,38,NULL),(53,'Binary',3,38,NULL),(54,'선형',3,38,NULL),(55,'Sequential',3,38,NULL),(56,'Sequential',3,39,NULL),(57,'Bubble',3,39,NULL),(58,'Quick',3,39,NULL),(59,'Merge',3,39,NULL),(60,'Heap',3,39,NULL);
/*!40000 ALTER TABLE `plass_total_categories` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-17 15:27:02
