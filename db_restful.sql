-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 14 Okt 2019 pada 04.22
-- Versi server: 10.3.16-MariaDB
-- Versi PHP: 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_restful`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(120) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `update_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `category`
--

INSERT INTO `category` (`id`, `name`, `created_at`, `update_at`) VALUES
(9, 'Makanan', '2019-10-04 20:41:55', NULL),
(10, 'Minuman', '2019-10-04 20:42:06', NULL),
(11, 'Jajanan', '2019-10-04 20:48:53', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `history`
--

CREATE TABLE `history` (
  `id` int(100) NOT NULL,
  `invoices` varchar(200) NOT NULL,
  `user` varchar(200) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `orders` varchar(200) NOT NULL,
  `amount` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `history`
--

INSERT INTO `history` (`id`, `invoices`, `user`, `date`, `orders`, `amount`) VALUES
(2, '52295', 'admin', '2019-10-12 07:20:34', 'Ayam Goreng', 60000),
(3, '90036', 'admin', '2019-10-12 07:28:12', 'Es Campur', 60000),
(4, '85101', 'muhammad', '2019-10-11 14:38:04', 'KFC Chicken', 300000),
(5, '85101', 'muhammad', '2019-10-11 14:38:04', 'Ayam Goreng', 60000),
(6, '71653', 'muhammad', '2019-09-11 14:41:01', 'KFC Chicken', 300000),
(7, '71653', 'muhammad', '2019-09-10 14:41:01', 'Es Campur', 90000),
(8, '71653', 'muhammad', '2018-10-11 14:41:01', 'Oreo Biskuit', 45000),
(9, '89922', 'muhammad', '2018-10-11 14:41:14', 'KFC Chicken', 300000),
(10, '89922', 'muhammad', '2019-01-11 14:41:14', 'Es Campur', 90000),
(11, '89922', 'muhammad', '2019-10-14 14:41:14', 'Oreo Biskuit', 45000),
(12, '89922', 'muhammad', '2019-10-13 14:41:14', 'Ayam Goreng', 140000),
(13, '62367', 'admin', '2019-10-11 18:01:44', 'KFC Chicken', 400000),
(14, '86582', 'admin', '2019-10-11 18:02:58', 'KFC Chicken', 2000000),
(15, '62367', 'admin', '2018-10-11 18:01:44', 'KFC Chicken', 400000),
(16, '72301', 'admin', '2019-10-12 03:31:06', 'KFC Chicken', 100000),
(17, '66437', 'admin', '2019-10-12 03:38:30', 'Es Campur', 15000),
(18, '66437', 'admin', '2019-10-12 03:38:30', 'Nasi Goreng', 20000);

-- --------------------------------------------------------

--
-- Struktur dari tabel `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(120) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `price` int(16) NOT NULL,
  `qty` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `update_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `product`
--

INSERT INTO `product` (`id`, `name`, `description`, `image`, `category_id`, `price`, `qty`, `created_at`, `update_at`) VALUES
(35, 'KFC Chicken', 'Ayam goreng adalah hidangan yang dibuat dari daging ayam dicampur tepung bumbu yang digoreng dalam minyak goreng panas. Beberapa rumah makan siap saji secara khusus menghidangkan ayam goreng, misalnya Kentucky Fried Chicken. Sementara itu beberapa rumah makan di Indonesia juga menghidangkan ayam goreng tradisional Indonesia seperti Ayam Goreng Suharti, Fatmawati dan Mbok Berek.', 'dd45ce22-f026-40e6-986d-1b4ec18973e5.jpeg', 9, 100000, 100, '2019-10-04 20:46:09', NULL),
(36, 'Es Campur', 'Es campur adalah salah satu minuman khas Indonesia yang cara membuat nya dengan mencampurkan berbagai jenis bahan dalam sirup manis. Bahan yang dijadikan bahan biasanya berasa manis atau masam. Es campur dapat dijumpai di berbagai daerah di Indonesia dengan rasa dan bahan yang berbeda. Oleh karena itu daerah asal dari es campur sulit ditentukan.', '1a7851c9-ec68-4329-bd1d-41b37ce8597a.jpeg', 10, 15000, 100, '2019-10-04 20:47:28', NULL),
(41, 'Oreo Biskuit', 'Fanta adalah merek minuman ringan berkarbonasi rasa buah yang diproduksi oleh The Coca-Cola Company. Tersedia lebih dari ratusan pilihan rasa di seluruh dunia. Minuman ini diperkenalkan pertama kali di Jerman pada tahun 1940.', 'ed20f5fe-4756-4740-a7ed-7142a0c7c006.jpeg', 11, 15000, 100, '2019-10-05 01:44:23', NULL),
(42, 'Ayam Goreng', 'Fanta adalah merek minuman ringan berkarbonasi rasa buah yang diproduksi oleh The Coca-Cola Company. Tersedia lebih dari ratusan pilihan rasa di seluruh dunia. Minuman ini diperkenalkan pertama kali di Jerman pada tahun 1940.', '59a2456f-aa11-4def-9949-c62cd38cc663.jpeg', 11, 20000, 100, '2019-10-05 01:44:51', NULL),
(44, 'Nasi Goreng', 'Nasi goreng adalah sebuah makanan berupa nasi yang digoreng dan diaduk dalam minyak goreng atau margarin, biasanya ditambah kecap manis, bawang merah, bawang putih, asam jawa, lada dan bumbu-bumbu lainnya, seperti telur, ayam, dan kerupuk.', '639c3c25-8b80-4f65-a521-e39b5ffd91ad.jpeg', 9, 20000, 100, '2019-10-11 14:51:24', '2019-10-11 15:15:40'),
(45, 'Nasi Kuning', 'Nasi kuning adalah sebuah makanan berupa nasi yang digodog dan diaduk dalam minyak goreng atau margarin, biasanya ditambah kecap manis, bawang merah, bawang putih, asam jawa, lada dan bumbu-bumbu lainnya, seperti telur, ayam, dan kerupuk.', '3a08cba5-b4e2-4b1f-ab32-17dc885e95cc.jpeg', 9, 20000, 10, '2019-10-12 10:56:17', NULL),
(46, 'Nasi', 'Nasi berasal dari beras', 'df1a9d65-46f3-4c1a-b7ce-3acf9c868f0c.jpeg', 9, 20000, 100, '2019-10-12 17:31:40', NULL),
(47, 'Nasi Kucing', 'Nasi berasal dari beras untuk kucing', '6d366056-eb49-4899-964e-d72caeb3f93f.jpeg', 11, 20000, 10, '2019-10-12 19:18:36', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `created_at`, `updated_at`) VALUES
(2, 'Joko Senseioiikaiiiiooo', 'jokonjqqq11@admin.com', 'jokoganteng1234jhjiklll2', '2019-09-27 15:12:58', NULL),
(3, 'koJo', 'joko@admin.com', 'joki2345', '2019-09-28 02:46:22', NULL),
(4, 'aku', 'aku@coba.com', 'aku123', '2019-09-28 04:31:40', NULL),
(6, 'Muhammad Luthfi', 'muhammad@gmail.com', 'admin123', '2019-09-28 08:32:26', NULL),
(11, 'akuu12366', 'aaaa@aaaa.com', '123', '2019-09-28 10:28:58', NULL),
(18, 'adata', 'adata1233@gmail.com', '$2b$10$/YW0kxAHIvoAQUycclRyxuxFAfaZ36g7TqidUSEtHeNIuRviHmVQa', '2019-09-29 03:38:49', NULL),
(21, 'adata', 'adat88@gmail.com', '$2b$10$0VMBi5xf7bIfERYTp9YHCuP9xgZpo82Wnf70NIpgqP3S23sZ9CVra', '2019-09-29 03:39:46', NULL),
(24, 'Muhammad Luthfi', 'muhammadluthfi059@gmail.com', '$2b$10$AxdGRr.1Gn9xm0BORRHLDu.IAHT3n3yZsJVbl/tOK5FpaeVtkTMF6', '2019-09-29 15:18:28', NULL),
(25, 'admin', 'admin@admin.com', '$2b$10$32.8U8xu2/ZLty813Dfu9O4EAoqJ9vVU7nKBvh1.GqfzBRU4S7Fna', '2019-09-29 15:28:52', NULL),
(27, 'asiap', 'asiap@gmail.om', '$2b$10$f63SNF5O7YTYob0i37CgOeaDXU6SRN6M4uBe0gRK6968da0RvI8ee', '2019-09-30 11:13:09', NULL),
(29, 'sutangading', 'sutangading@gmail.com', '$2b$10$N2geAZJ9oTz5FX51WJ15We5kX7VAYK/U2YyhGwvi.cCpxnvpt5i/O', '2019-09-30 11:25:52', NULL),
(30, 'aku', 'aku@aku.com', '$2b$10$WS4L.aTXmXMP7P9EUaYAWOCUdpds2HJkB2WHLu0k1Ba9Tcq05h1Wm', '2019-10-02 10:23:59', NULL),
(31, 'muhammad', 'muhammadluthfi@gmail.com', '$2b$10$46DjeYN72bXT3rIIpyXbje0ddtl1h6o.Nd2DP29LQgFKKjRgK1YNS', '2019-10-09 16:53:01', NULL);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeks untuk tabel `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name_2` (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT untuk tabel `history`
--
ALTER TABLE `history`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT untuk tabel `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
