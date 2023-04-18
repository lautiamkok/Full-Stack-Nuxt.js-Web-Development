-- Adminer 4.8.1 MySQL 10.6.12-MariaDB-0ubuntu0.22.04.1-log dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `created_on` varchar(255) NOT NULL,
  `updated_on` varchar(255) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`(4)),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

INSERT INTO `user` (`id`, `name`, `slug`, `created_on`, `updated_on`) VALUES
('ae88352b-7a7c-4e0e-a388-614306a9237b',	'John',	'john',	'1678715982161',	'1678715982161'),
('8887cea8-5a03-4fcd-b842-242915078d75',	'Jane',	'jane',	'1678715950672',	'1678715950672');

-- 2023-03-13 14:00:05
