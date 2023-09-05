-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 05, 2023 at 04:11 AM
-- Server version: 10.5.19-MariaDB-cll-lve
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u641427100_womes_safety`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(100) NOT NULL,
  `name` text NOT NULL,
  `mobile` varchar(150) NOT NULL,
  `email` varchar(200) NOT NULL,
  `address` text NOT NULL,
  `dob` varchar(200) NOT NULL,
  `status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `mobile`, `email`, `address`, `dob`, `status`) VALUES
(2, 'Suraj', '8888448230', '', '', '', ''),
(3, 'Kalyani', '9172696952', '', '', '', ''),
(4, 'suraaj', '7249336534', '', '', '', ''),
(5, 'lalits', '9172696951', '', '', '', ''),
(9, 'lalits', '9657256675', '', '', '', ''),
(10, 'SB', '7796255468', '', '', '', ''),
(11, 'Yash Wele', '7264897898', '', '', '', ''),
(12, '', '', '', '', '', ''),
(13, 'Suraj', '9604385262', '', '', '', ''),
(14, 'vaishnavi', '7559108413', '', '', '', ''),
(15, 'Jagruti', '9022450542', '', '', '', ''),
(16, 'Samiksha Dhalwar', 'samikshadhalwar19@gmail.com', 'samikshadhalwar19@gmail.com', 'Aathwale layout waghapur chausala road yavatmal', '19/09/2000', ''),
(17, 'Samiksha Shrikant Dhalwar', '09096417741', 'samikshadhalwar19@gmail.com', 'Aathwalw Layout Waghapur Chausala Road', '19/09/2000', ''),
(18, 'Samiksha Shrikant Dhalwar', '8856000204', 'surekhadhalwar1971@gmail.com', 'Athwale Layout Waghapur Chausala Road Yavatmal', '19/09/2000', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
