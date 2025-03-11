CREATE TABLE IF NOT EXISTS `category`(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(50) DEFAULT '',
	commodityDesc VARCHAR(255),
	picture VARCHAR(200) DEFAULT 'default_picture.png',
	brand VARCHAR(20),
	createT TIMESTAMP,
	updateT TIMESTAMP
);
ALTER TABLE `category` MODIFY `picture` VARCHAR(255) DEFAULT 'default_picture.png';
ALTER TABLE category ADD createT TIMESTAMP;
INSERT INTO `category` (name, commodityDesc, picture, brand, createT) VALUES ('史丹利', '12333', 'baidu.com', '史丹利', '2025-03-09');
ALTER TABLE `category` ADD count BIGINT;
SELECT brand FROM category;

CREATE TABLE IF NOT EXISTS `category_info`(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(20),
	oldPrice VARCHAR(255) DEFAULT(''),
	newPrice VARCHAR(255) DEFAULT(''),
	`count` VARCHAR(255) DEFAULT(''), -- 为 VARCHAR 指定长度
  picture VARCHAR(255) DEFAULT(''),
	status INT,
	nameDesc VARCHAR(255),
	weight VARCHAR(255) DEFAULT(''),
	categoryType VARCHAR(255) DEFAULT(''),
	createT TIMESTAMP
);

SELECT * FROM `category_info`;
SELECT COUNT(*) AS total FROM `category_info`;
SELECT * FROM `category_info` LIMIT 10 OFFSET 0;
SELECT COUNT(*) AS total FROM `category_info` [];
-- 新家字段
ALTER TABLE `category_info` ADD categoryType VARCHAR(255) DEFAULT('');
ALTER TABLE `category_info` ADD nameDesc VARCHAR(255);
ALTER TABLE category_info ADD status INT NOT NULL;
SELECT * FROM category_info;
ALTER TABLE `category_info` ADD count VARCHAR;
ALTER TABLE category_info DROP updateT;
ALTER TABLE category_info DROP count;
-- CREATE TABLE `category_info` (
--   `id` bigint NOT NULL AUTO_INCREMENT,
--   `oldPrice` bigint DEFAULT NULL,
--   `newPrice` bigint DEFAULT NULL,
--   `categoryId` bigint NOT NULL,
--   `picture` varchar(200) DEFAULT NULL,
--   `status` int NOT NULL,
--   `name` varchar(200) DEFAULT NULL,
--   PRIMARY KEY (`id`),
--   KEY `categoryId` (`categoryId`),
--   CONSTRAINT `category_info_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
ALTER TABLE category_info DROP FOREIGN KEY category_info_ibfk_1;
SHOW CREATE TABLE category_info;
ALTER TABLE category_info DROP categoryId;
INSERT INTO `category_info` (name, oldPrice, newPrice,picture, status ) VALUES ('花生油', 1, 2, 'asdassd', 0);

CREATE TABLE IF NOT EXISTS `categoryPic`(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
	picId BIGINT NOT NULL,
	updateT TIMESTAMP,
	FOREIGN KEY (picId) REFERENCES category(id) ON UPDATE CASCADE ON DELETE CASCADE
);
