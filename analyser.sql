-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-05-2018 a las 06:26:46
-- Versión del servidor: 10.1.25-MariaDB
-- Versión de PHP: 7.1.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `analyser`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `restrictions`
--

CREATE TABLE `restrictions` (
  `id` int(11) NOT NULL,
  `restriccion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `restrictions`
--

INSERT INTO `restrictions` (`id`, `restriccion`) VALUES
(39, '	guns'),
(33, 'alcohol'),
(34, 'alcoholic beverage'),
(29, 'assassin'),
(30, 'assassination'),
(35, 'cigarette'),
(13, 'firearm'),
(2, 'firegun'),
(6, 'gun'),
(14, 'gun accesory'),
(7, 'handgun'),
(32, 'hijacker'),
(31, 'hijacking'),
(15, 'knife'),
(36, 'liqueur'),
(19, 'machine'),
(20, 'machinegun'),
(27, 'murder'),
(28, 'murderer'),
(38, 'newOne'),
(11, 'pistol'),
(9, 'revolver'),
(24, 'rob'),
(25, 'robbery'),
(37, 'Rule'),
(16, 'scissors'),
(17, 'shootgun'),
(12, 'shooting'),
(26, 'stole'),
(21, 'theft'),
(22, 'thief'),
(23, 'thieves'),
(10, 'trigger'),
(8, 'weapon');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `result_analisis`
--

CREATE TABLE `result_analisis` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(256) DEFAULT NULL,
  `categoria` varchar(256) DEFAULT NULL,
  `segmento` varchar(256) DEFAULT NULL,
  `confidence` varchar(256) DEFAULT NULL,
  `id_video` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `result_analisis`
--

INSERT INTO `result_analisis` (`id`, `descripcion`, `categoria`, `segmento`, `confidence`, `id_video`) VALUES
(220, 'community', 'organization', '0 .0s a 114.982', '0.5786712765693665', 59),
(221, 'interaction', 'person', '0 .0s a 114.982', '0.6037953495979309', 59),
(222, 'crowd', 'people', '0 .0s a 114.982', '0.6501240134239197', 59),
(223, 'people', 'person', '0 .0s a 114.982', '0.901478111743927', 59),
(240, 'alcoholic beverage', 'drink', '0 .0s a 28.800', '0.6417940258979797', 60),
(241, 'bottle', '', '0 .0s a 28.800', '0.8274654746055603', 60),
(242, 'alcohol', 'drink', '0 .0s a 28.800', '0.6509974002838135', 60),
(243, 'drink', '', '0 .0s a 28.800', '0.7045662999153137', 60),
(244, 'liqueur', 'drink', '0 .0s a 28.800', '0.6296367049217224', 60),
(245, 'knife', 'knife', NULL, '0.85434232', 60),
(246, 'cigarette', 'cigarette', NULL, '0.759546', 60),
(247, 'alcohol', 'drink', '0 .0s a 28.800', '0.6509974002838135', 62),
(248, 'bottle', '', '0 .0s a 28.800', '0.8274654746055603', 62),
(249, 'alcoholic beverage', 'drink', '0 .0s a 28.800', '0.6417940258979797', 62),
(250, 'liqueur', 'drink', '0 .0s a 28.800', '0.6296367049217224', 62),
(251, 'drink', '', '0 .0s a 28.800', '0.7045662999153137', 62),
(252, 'knife', 'knife', NULL, '0.85434232', 62),
(253, 'cigarette', 'cigarette', NULL, '0.759546', 62),
(254, 'people', 'person', '0 .0s a 114.982', '0.901478111743927', 61),
(255, 'crowd', 'people', '0 .0s a 114.982', '0.6501240134239197', 61),
(256, 'interaction', 'person', '0 .0s a 114.982', '0.6037953495979309', 61),
(257, 'community', 'organization', '0 .0s a 114.982', '0.5786712765693665', 61),
(258, 'guns', 'handgun', NULL, '0.85434232', 61),
(259, 'firearm', 'firearm', NULL, '0.85434232', 61),
(260, 'retail', 'building', '0 .0s a 46.213', '0.523347020149231', 63),
(261, 'closed-circuit television', '', '0 .0s a 46.213', '0.7314231395721436', 63),
(262, 'factory', 'building', '0 .0s a 46.213', '0.6635160446166992', 63),
(263, 'manufacturing', 'person', '0 .0s a 46.213', '0.6585153937339783', 63),
(264, 'machine', '', '0 .0s a 46.213', '0.6367565393447876', 63),
(265, 'theft', '', '0 .0s a 46.213', '0.4959999918937683', 63),
(266, 'firearm', 'firearm', NULL, '0.85434232', 63),
(267, 'robbery', 'stole', NULL, '0.85434232', 63),
(268, 'kill', 'kill', NULL, '0.95434232', 63),
(269, 'kill\r\n', NULL, NULL, NULL, NULL),
(270, 'people', 'person', '0 .0s a 114.982', '0.901478111743927', 64),
(271, 'community', 'organization', '0 .0s a 114.982', '0.5786712765693665', 64),
(272, 'interaction', 'person', '0 .0s a 114.982', '0.6037953495979309', 64),
(273, 'crowd', 'people', '0 .0s a 114.982', '0.6501240134239197', 64),
(274, 'guns', 'handgun', NULL, '0.85434232', 64),
(275, 'firearm', 'firearm', NULL, '0.85434232', 64);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'cristhian', 'mau@gmail.com', '$2y$10$RuSibWKsO36WzmmwkrHTo.s1SMVsXqOD1Z0UwM/NrtlHjTna8mRT.', 'tHrKRcKnxPvEh5KxdBX5GgcQ819r5pH7OmL8MuuGR2wToyHrthxgWFQaS3v1', '2019-05-05 06:40:16', '2019-05-05 06:40:16'),
(2, 'pedro', 'pedro@hotmail.com', '$2y$10$uX79MzGp9owRDT97Ub.s9.JzbjS6jTJ/S3JLhxUX/IsYJhv/sdnZq', 'egd2XzoNP8uaEh43z44IEyOFCJfKec6cG4WUZAc87t9eYHsylCQxYLAkHepC', '2019-05-06 09:05:57', '2019-05-06 09:05:57'),
(3, 'timon', 'timon@gmail.com', '$2a$10$cWhs1qPufVezoQ2MEXzem.QbhBpvZPIZFfT0IcIHdOIZw1ZNNeLne', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `videos`
--

CREATE TABLE `videos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `s3key` varchar(200) NOT NULL,
  `duracion` time DEFAULT NULL,
  `peso` double DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `analisado` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `videos`
--

INSERT INTO `videos` (`id`, `nombre`, `s3key`, `duracion`, `peso`, `created_at`, `updated_at`, `analisado`) VALUES
(58, 'asalto.mp4', '', NULL, NULL, '2018-05-22 17:41:28', '2018-05-22 17:41:28', 'Processed correctly'),
(59, 'videoarmaestudiante.mp4', '', NULL, NULL, '2018-05-22 17:55:57', '2018-05-22 17:55:57', 'Processed correctly'),
(60, 'videoHome.mp4', '', NULL, NULL, '2018-05-22 18:03:14', '2018-05-22 18:03:14', 'Processed correctly'),
(61, 'videoarmaestudiante.mp4', '', NULL, NULL, '2018-05-22 19:43:37', '2018-05-22 19:43:37', 'Processed correctly'),
(62, 'videoHome.mp4', '', NULL, NULL, '2018-05-22 20:23:59', '2018-05-22 20:23:59', 'Processed correctly'),
(63, 'videoCentro.mp4', '', NULL, NULL, '2018-05-22 22:05:06', '2018-05-22 22:05:06', 'Processed correctly'),
(64, 'videoarmaestudiante.mp4', '', NULL, NULL, '2018-05-22 23:01:37', '2018-05-22 23:01:37', 'Processed correctly');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `restrictions`
--
ALTER TABLE `restrictions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `restriccion` (`restriccion`);

--
-- Indices de la tabla `result_analisis`
--
ALTER TABLE `result_analisis`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `restrictions`
--
ALTER TABLE `restrictions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
--
-- AUTO_INCREMENT de la tabla `result_analisis`
--
ALTER TABLE `result_analisis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=276;
--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
