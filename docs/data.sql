-- / Creación de la DB
CREATE DATABASE praesidium;
USE praesidium;


-- / Creación de las tablas que NO tienen FK
CREATE TABLE `usrCategories` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `prdCategories` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- / Creación de las tablas que tienen FK
CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `docType` varchar(255) NOT NULL,
  `docNum`  int(10) NOT NULL,
  `avatar` varchar(255) NULL DEFAULT 'no-image.png',
  `usrCategId` int(10) unsigned DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  FOREIGN KEY (`usrCategId`) REFERENCES `usrCategories` (`id`)
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


CREATE TABLE `products` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `description` varchar(255) NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `image` varchar(255) NULL DEFAULT 'no-image.png',
  `prdCategId` int(10) unsigned DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  FOREIGN KEY (`prdCategId`) REFERENCES `prdCategories` (`id`)
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `orders` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `userId` int(10) unsigned default NULL,
  `orderNum` int(10) NOT NULL,
  `date` date NULL DEFAULT NULL,
  `expiration` date NULL DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `ordersDetail` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `orderId` int(10) unsigned default NULL,
  `productId` int(10) unsigned default NULL,
  `price` decimal(8,2) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`),
  FOREIGN KEY (`productId`) REFERENCES `products` (`id`)
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- / Populando las tablas
INSERT INTO `prdCategories` VALUES 
	(DEFAULT, 'VIDA', NULL, NULL),
	(DEFAULT, 'ROBO-PERDIDA', NULL, NULL),
	(DEFAULT, 'INCENDIO', NULL, NULL);

INSERT INTO `usrCategories` VALUES 
	(DEFAULT, 'ADMIN', NULL, NULL),
	(DEFAULT, 'CLIENTE', NULL, NULL);

INSERT INTO `users` (`name`, `email`, `password`, `docType`, `docNum`, `avatar`, `usrCategId`) 
VALUES
	('Cecilia Jauregui', 'cjauregui@email.com', '123abc', 'DNI', '25514456', '1580757435853.jpg',1),
	('Leo Capone', 'lcapone@email.com', '123abc', 'DNI', '29312854', '1580759220430.jpg',1),
  ('Ezequiel ', 'e@email.com', '123abc', 'DNI', '27332924', '1580758204831.jpg',1),
	('Jon Snow', 'jonsnow@email.com', '123abc', 'DNI', '31457094', '1580740110618.jpg',2);
		