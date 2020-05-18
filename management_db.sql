-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 18, 2020 at 05:39 PM
-- Server version: 5.7.30-0ubuntu0.16.04.1
-- PHP Version: 7.0.33-0ubuntu0.16.04.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `management_db`
--
CREATE DATABASE IF NOT EXISTS `management_db` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `management_db`;

-- --------------------------------------------------------

--
-- Table structure for table `auth_tokens`
--

DROP TABLE IF EXISTS `auth_tokens`;
CREATE TABLE `auth_tokens` (
  `id` int(11) NOT NULL,
  `access_token` text CHARACTER SET latin1 NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_disable` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0= Enable , 1 =  Disabled'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `auth_tokens`
--

INSERT INTO `auth_tokens` (`id`, `access_token`, `user_id`, `created_at`, `is_disable`) VALUES
(1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQG1haWxpbmF0b3IuY29tIiwiZXhwIjoxNTkwNDA4NTQzLCJpYXQiOjE1ODk4MDM3NDN9.cM0d_fe1xEw8_5SMK6uIfuC6OFF2HH9wWCi-8A6J_mE', 1, '2020-05-18 12:09:03', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  `description` longtext NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '0 => ToDo, 1 => In-Progress, 2 => Completed',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `name`, `user_id`, `description`, `status`, `created_at`, `updated_at`) VALUES
(4, 'Task One', 2, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', 2, '2020-05-17 05:22:24', '2020-05-17 05:22:24'),
(5, 'Task two', 5, 'Lorem Ipsum is not simply random text. ', 0, '2020-05-17 05:22:38', '2020-05-17 05:22:38'),
(6, 'Task 3', 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 0, '2020-05-17 05:22:24', '2020-05-17 05:22:24'),
(7, 'Task 4', 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', 2, '2020-05-17 05:22:24', '2020-05-17 05:22:24'),
(8, 'Task 5', 2, 'Lorem Ipsum is not simply random text. ', 1, '2020-05-17 05:22:24', '2020-05-17 05:22:24'),
(9, 'Task 6', 2, 'Lorem Ipsum is not simply random text. ', 0, '2020-05-17 05:22:24', '2020-05-17 05:22:24'),
(10, 'Task 7', 2, 'Lorem Ipsum is not simply random text. ', 2, '2020-05-17 05:22:24', '2020-05-17 05:22:24');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `dob` date NOT NULL,
  `designation` varchar(50) NOT NULL,
  `role_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_disable` tinyint(1) NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `password`, `dob`, `designation`, `role_id`, `created_at`, `updated_at`, `is_disable`, `is_active`) VALUES
(1, 'Admin', 'admin@mailinator.com', 'e10adc3949ba59abbe56e057f20f883e', '2000-05-16', 'admin', 1, '2020-05-16 00:00:00', '2020-05-16 00:00:00', 0, 1),
(2, 'Anjali Gupta', 'anjaligt19@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', '1992-03-19', 'Software Developer', 2, '2020-05-16 00:00:00', '2020-05-16 00:00:00', 0, 1),
(5, 'John12', 'john@mailinator.com', 'e10adc3949ba59abbe56e057f20f883e', '1995-10-12', 'tesr', 2, '2020-05-17 01:34:41', '2020-05-17 01:34:41', 0, 0),
(6, 'Riyu', 'riyu@mailinator.com', 'e10adc3949ba59abbe56e057f20f883e', '2019-12-03', 'test', 2, '2020-05-18 01:28:14', '2020-05-18 01:28:14', 0, 1),
(7, 'anji', 'anjaligt192@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', '1995-10-12', 'test', 2, '2020-05-18 09:27:45', '2020-05-18 09:27:45', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
CREATE TABLE `user_roles` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`id`, `name`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'admin', 1, '2020-05-16 00:00:00', '2020-05-16 00:00:00'),
(2, 'user', 1, '2020-05-16 00:00:00', '2020-05-16 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auth_tokens`
--
ALTER TABLE `auth_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auth_tokens`
--
ALTER TABLE `auth_tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `auth_tokens`
--
ALTER TABLE `auth_tokens`
  ADD CONSTRAINT `auth_tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `user_roles` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
