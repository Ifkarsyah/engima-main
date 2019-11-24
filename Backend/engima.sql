-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 24, 2019 at 10:07 AM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `engima`
--

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `transaction_id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `comment` varchar(700) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`transaction_id`, `userId`, `movie_id`, `rating`, `comment`) VALUES
(1, 1, 475557, 9, 'lorem ipsum');

-- --------------------------------------------------------

--
-- Table structure for table `schedules`
--

CREATE TABLE `schedules` (
  `id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `date_time` datetime NOT NULL DEFAULT current_timestamp(),
  `seats` int(11) NOT NULL DEFAULT 1073741823
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(15) NOT NULL,
  `email` varchar(320) NOT NULL,
  `phone` varchar(12) NOT NULL,
  `password` varchar(64) NOT NULL,
  `profile_pic` varchar(2048) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `phone`, `password`, `profile_pic`) VALUES
(1, 'uchiha.madara', 'madara@uchiha.com', '0838555227', 'tobiramasia', 'https://imgix.ranker.com/user_node_img/50081/1001612045/original/reality-photo-u2?w=650&q=50&fm=pjpg&fit=crop&crop=faces'),
(2, 'senju.tobirama', 'tobirama@senju.com', '0896555546', 'madarasia', 'https://i.ytimg.com/vi/-1-HIWSwmaQ/maxresdefault.jpg'),
(3, 'namikaze.minato', 'minato@konoha.com', '088029555567', 'kushinaku', 'https://vignette.wikia.nocookie.net/naruto/images/7/71/Minato_Namikaze.png/revision/latest?cb=20160125175116'),
(4, 'uchiha.sasuke', 'sasuke@uchiha.com', '0227219212', 'sakuraku', 'https://vignette.wikia.nocookie.net/naruto/images/2/21/Sasuke_Part_1.png/revision/latest?cb=20170716092103'),
(5, 'Saitama', 'saitama@wanpanman.com', '0214702204', 'lohelohelohe', 'https://vignette.wikia.nocookie.net/onepunchman/images/0/07/Saitama_serious_profile.png/revision/latest?cb=20161002154538'),
(6, 'miyazano.kaori', 'kaori@miyazano.com', '0215844919', 'arimakeun', 'https://vignette.wikia.nocookie.net/shigatsu-wa-kimi-no-uso/images/3/3d/Ep03.jpg/revision/latest?cb=20150306235014'),
(7, 'kirishima.touka', 'touka@kirishima.com', '0214524325', 'kanekikun', 'https://imgix.ranker.com/user_node_img/50087/1001738957/original/can-and-_39_t-even-protect-himself-photo-u2?w=650&q=50&fm=pjpg&fit=crop&crop=faces');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`transaction_id`);

--
-- Indexes for table `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `movies_movies_id_fk` (`movie_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`,`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `schedules`
--
ALTER TABLE `schedules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=487;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
