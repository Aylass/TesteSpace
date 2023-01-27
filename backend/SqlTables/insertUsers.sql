DROP table users


CREATE TABLE IF NOT EXISTS users (
    user_id INT NOT NULL PRIMARY KEY,
    user_first_name VARCHAR(300),
    user_birth_date DATE,
    user_access_id INT,
    user_address_id INT,
    user_job_id INT,
    user_product_buyed_id INT,
    user_car_id INT,
    status BOOLEAN
)

select * from users

ALTER TABLE users 
   ADD CONSTRAINT user_access_id
      FOREIGN KEY(user_access_id) 
      REFERENCES users_access(user_access_id),
   ADD CONSTRAINT user_address_id
      FOREIGN KEY(user_address_id) 
      REFERENCES users_address(user_address_id),
   ADD CONSTRAINT user_job_id
      FOREIGN KEY(user_job_id) 
      REFERENCES users_job(user_job_id),
   ADD CONSTRAINT user_product_buyed_id
      FOREIGN KEY(user_product_buyed_id) 
      REFERENCES users_products_buyed(user_product_buyed_id),
   ADD CONSTRAINT user_car_id
      FOREIGN KEY(user_car_id) 
      REFERENCES users_cars(car_id)

INSERT INTO users VALUES 
	(1,'Alexandre','2021-07-25 07:07:20',11,95,9,94,75,NULL),
	(2,'Felipe','2021-04-01 23:04:24',70,44,2,30,25,'False'),
	(3,'Guilherme','2020-12-20 14:12:48',59,73,21,63,56,NULL),
	(4,'Morgana','2021-02-01 00:02:45',63,96,48,36,88,'False'),
	(5,'Ana Luiza','2021-06-01 23:06:43',10,1,8,36,4,'True'),
	(6,'Caio','2021-03-15 11:03:47',14,9,97,4,64,'False'),
	(7,'Beatriz','2020-09-24 01:09:58',37,88,69,48,70,NULL),
	(8,'João Lucas','2020-12-25 02:12:20',16,22,24,90,13,'False'),
	(9,'Liz','2020-09-07 08:09:08',78,49,64,16,25,NULL),
	(10,'Raul','2021-07-20 15:07:16',37,75,17,27,79,'True'),
	(11,'Márcia','2021-06-03 12:06:15',68,91,75,52,19,NULL),
	(12,'Maria Eduarda','2020-11-28 23:11:22',56,21,72,15,94,'False'),
	(13,'Felícia','2021-01-17 07:01:23',52,70,88,94,83,NULL),
	(14,'Eloá','2020-12-22 11:12:42',34,60,75,84,56,'False'),
	(15,'Daniel','2021-01-23 22:01:39',68,77,1,23,67,'True'),
	(16,'Marcela','2020-11-10 10:11:13',27,29,77,49,19,'False'),
	(17,'Calebe','2021-04-07 18:04:40',88,59,93,23,68,NULL),
	(18,'Hélio','2020-12-10 00:12:58',61,59,18,85,61,'False'),
	(19,'Maitê','2021-03-28 07:03:14',66,38,27,83,22,NULL),
	(20,'Marcos','2021-07-11 03:07:00',52,28,15,50,72,'True'),
	(21,'Heloísa','2020-11-12 19:11:46',12,59,39,65,37,NULL),
	(22,'Paula','2020-10-24 22:10:37',51,4,20,70,11,'False'),
	(23,'Luiza','2021-03-30 11:03:29',51,21,36,45,75,NULL),
	(24,'João Pedro','2020-10-09 13:10:11',70,92,73,24,1,'False'),
	(25,'Isabelly','2020-10-26 02:10:48',31,62,94,96,47,'True'),
	(26,'Vitor','2020-10-19 11:10:50',24,88,17,64,89,'False'),
	(27,'Pedro Henrique','2021-04-13 08:04:10',99,55,10,89,60,NULL),
	(28,'Enzo Gabriel','2021-05-11 04:05:34',59,99,40,80,47,'False'),
	(29,'Maria Júlia','2020-11-27 00:11:00',7,19,84,75,NULL,NULL),
	(30,'Théo','2020-08-08 23:08:23',65,81,74,1,54,'True'),
	(31,'Raul','2020-12-07 01:12:55',21,98,85,64,21,NULL),
	(32,'Carla','2021-02-24 00:02:46',39,95,47,80,42,'False'),
	(33,'Joaquim','2020-09-07 12:09:40',2,89,76,75,86,NULL),
	(34,'Marcela','2020-12-04 01:12:35',27,56,79,8,22,'False'),
	(35,'Ana Clara','2020-12-08 00:12:03',36,77,72,76,62,'True'),
	(36,'Maria Clara','2020-10-20 17:10:13',2,38,19,16,38,'False'),
	(37,'Esther','2020-08-10 06:08:39',23,46,46,68,22,NULL),
	(38,'Danilo','2020-12-02 14:12:17',NULL,69,5,53,18,'False'),
	(39,'Dalila','2021-02-27 18:02:31',84,30,55,77,51,NULL),
	(40,'César','2020-10-23 13:10:38',39,82,15,64,13,'True'),
	(41,'Isabel','2021-04-29 05:04:58',73,51,29,28,90,NULL),
	(42,'Marcos','2021-02-08 20:02:22',57,26,62,36,75,'False'),
	(43,'Lucca','2021-02-06 20:02:05',19,65,63,39,59,NULL),
	(44,'Isabelly','2020-09-30 18:09:46',62,43,83,61,97,'False'),
	(45,'Maria Clara','2020-09-27 03:09:59',25,9,64,32,93,'True'),
	(46,'Marina','2021-07-01 15:07:08',92,34,8,5,48,'False'),
	(47,'Janaína','2021-03-13 06:03:54',40,52,25,7,53,NULL),
	(48,'Maria Eduarda','2021-05-06 11:05:13',36,87,63,53,5,'False'),
	(49,'João Pedro','2021-02-12 10:02:24',86,33,5,75,3,NULL),
	(50,'Daniel','2020-10-16 09:10:49',60,1,86,92,81,'True'),
	(51,'Alícia','2021-03-09 07:03:51',3,11,1,94,1,NULL),
	(52,'Isabella','2021-01-05 04:01:22',39,58,71,21,41,'False'),
	(53,'Gustavo','2021-06-01 17:06:19',36,20,92,8,89,NULL),
	(54,'Maria Luiza','2021-01-15 21:01:17',35,54,77,12,33,'False'),
	(55,'Samuel','2021-03-08 15:03:19',4,50,97,84,65,'True'),
	(56,'Enzo Gabriel','2020-09-04 13:09:15',19,80,85,14,79,'False'),
	(57,'Lara','2020-08-12 03:08:56',4,55,31,42,91,NULL),
	(58,'Isaac','2020-10-28 00:10:17',74,77,1,34,62,'False'),
	(59,'Giovanna','2021-07-22 16:07:32',25,84,95,72,16,NULL),
	(60,'Carla','2020-10-31 12:10:03',45,88,32,12,74,'True'),
	(61,'João Pedro','2021-03-28 10:03:06',45,87,4,69,66,NULL),
	(62,'Dalila','2021-06-25 22:06:57',24,39,23,52,50,'False'),
	(63,'Heloísa','2021-07-23 18:07:51',42,67,17,53,10,NULL),
	(64,'Dalila','2020-11-04 18:11:27',64,69,85,40,1,'False'),
	(65,'Benjamin','2021-01-21 05:01:10',47,6,48,73,19,'True'),
	(66,'Sarah','2021-06-30 03:06:23',NULL,11,4,NULL,56,'False'),
	(67,'Eduarda','2021-03-30 14:03:53',8,64,59,21,49,NULL),
	(68,'Vitória','2021-05-06 22:05:24',42,62,34,22,35,'False'),
	(69,'Maria Cecília','2020-12-29 04:12:23',50,62,29,52,31,NULL),
	(70,'Isabelly','2021-06-09 20:06:27',33,80,84,54,79,'True'),
	(71,'Isabel','2021-06-26 02:06:47',70,8,4,64,80,NULL),
	(72,'Nataniel','2020-11-18 12:11:20',75,55,15,23,38,'False'),
	(73,'Yango','2021-01-10 15:01:03',NULL,95,62,96,49,NULL),
	(74,'Marina','2021-06-08 03:06:44',74,9,22,62,47,'False'),
	(75,'Guilherme','2020-08-14 06:08:02',18,65,16,26,87,'True'),
	(76,'Antonella','2020-10-18 11:10:28',43,75,32,47,84,'False'),
	(77,'Bryan','2020-11-13 14:11:46',83,47,11,62,62,NULL),
	(78,'Carla','2021-01-24 12:01:49',70,40,70,75,54,'False'),
	(79,'Marcelo','2020-10-08 06:10:45',90,35,50,75,18,NULL),
	(80,'Lorraine','2020-11-11 16:11:20',71,54,24,98,98,'True'),
	(81,'Eduardo','2021-06-26 14:06:33',70,73,84,79,80,NULL),
	(82,'Talita','2021-04-13 04:04:50',32,68,63,68,97,'False'),
	(83,'Maitê','2021-01-31 06:01:54',11,9,58,17,83,NULL),
	(84,'Cecília','2021-05-06 03:05:56',62,73,23,37,80,'False'),
	(85,'Danilo','2021-04-06 12:04:59',72,63,43,88,26,'True'),
	(86,'Antônio','2021-02-02 22:02:13',68,63,78,NULL,67,'False'),
	(87,'Gúbio','2020-09-24 12:09:17',68,51,20,28,80,NULL),
	(88,'Natália','2020-09-30 16:09:11',7,80,32,78,56,'False'),
	(89,'Ígor','2020-12-15 08:12:59',41,82,47,37,71,NULL),
	(90,'Antônio','2021-01-16 15:01:27',99,16,6,13,45,'True'),
	(91,'Eloá','2020-10-25 00:10:24',92,14,22,39,11,NULL),
	(92,'Yango','2020-11-20 17:11:16',85,10,75,13,6,'False'),
	(93,'Júlio César','2021-04-21 20:04:24',53,32,29,35,67,NULL),
	(94,'Yango','2020-09-04 23:09:15',21,49,NULL,62,20,'False'),
	(95,'Gabriel','2020-11-04 19:11:18',27,15,22,76,30,'True'),
	(96,'Maria Júlia','2020-11-05 16:11:32',62,42,28,88,48,'False'),
	(97,'Matheus','2021-01-02 02:01:34',13,44,79,99,2,NULL),
	(98,'Carla','2020-08-28 23:08:06',40,22,57,69,38,'False'),
	(99,'Morgana','2020-08-09 09:08:38',18,73,83,24,68,NULL),
	(100,'Sílvia','2020-12-11 06:12:20',25,91,88,85,74,'True')