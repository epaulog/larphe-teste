-- phpMyAdmin SQL Dump
-- version 4.0.4.2
-- http://www.phpmyadmin.net
--
-- Máquina: localhost
-- Data de Criação: 03-Set-2016 às 18:57
-- Versão do servidor: 5.6.13
-- versão do PHP: 5.4.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de Dados: `has`
--
CREATE DATABASE IF NOT EXISTS `has` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `has`;

-- --------------------------------------------------------

--
-- Estrutura da tabela `controllers`
--

CREATE TABLE IF NOT EXISTS `controllers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `controller_type` int(11) NOT NULL,
  `ip` text NOT NULL,
  `account_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Extraindo dados da tabela `controllers`
--

INSERT INTO `controllers` (`id`, `name`, `controller_type`, `ip`, `account_id`) VALUES
(1, 'Arduino', 1, '192.168.1.106:9005', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `controller_types`
--

CREATE TABLE IF NOT EXISTS `controller_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `model` text NOT NULL,
  `n_outputs` int(11) NOT NULL,
  `n_inputs` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Extraindo dados da tabela `controller_types`
--

INSERT INTO `controller_types` (`id`, `model`, `n_outputs`, `n_inputs`) VALUES
(1, '1x1', 1, 1),
(2, '2x2', 2, 2),
(3, '4x2', 2, 4),
(4, '4x4', 4, 4);

-- --------------------------------------------------------

--
-- Estrutura da tabela `item_types`
--

CREATE TABLE IF NOT EXISTS `item_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `img` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Extraindo dados da tabela `item_types`
--

INSERT INTO `item_types` (`id`, `name`, `img`) VALUES
(1, 'lamp', 'lamp.png'),
(2, 'socket', 'socket.png'),
(3, 'aconditioner', 'aconditioner.png');

-- --------------------------------------------------------

--
-- Estrutura da tabela `itens`
--

CREATE TABLE IF NOT EXISTS `itens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `type` int(11) NOT NULL,
  `pos_x` float NOT NULL,
  `pos_y` float NOT NULL,
  `size` float NOT NULL,
  `rotation` int(11) NOT NULL,
  `status` text NOT NULL,
  `temp` int(11) NOT NULL,
  `controller_id` int(11) NOT NULL,
  `io` int(11) NOT NULL,
  `map_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `map_id` (`map_id`),
  KEY `map_id_2` (`map_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=26 ;

--
-- Extraindo dados da tabela `itens`
--

INSERT INTO `itens` (`id`, `name`, `type`, `pos_x`, `pos_y`, `size`, `rotation`, `status`, `temp`, `controller_id`, `io`, `map_id`) VALUES
(1, 'Lampada sala', 1, 2.1978, 23.3202, 4.2957, 0, 'off', 0, 1, 1, 1),
(11, '', 1, 1.98488, 58.6916, 4.22387, 0, 'off', 0, 0, 0, 1),
(16, '', 1, 26.9347, 22.4888, 4.24886, 0, 'on', 0, 0, 0, 1),
(20, '', 1, 25.2725, 55, 12.6858, 0, 'off', 0, 0, 0, 2),
(22, '', 1, 91.7993, 66.729, 4.40636, 0, 'off', 0, 0, 0, 2),
(24, '', 1, 73.6842, 66.729, 4.52876, 0, 'off', 0, 0, 0, 2),
(25, '', 1, 42.1053, 41.4953, 4.16157, 0, 'off', 0, 0, 0, 2);

-- --------------------------------------------------------

--
-- Estrutura da tabela `maps`
--

CREATE TABLE IF NOT EXISTS `maps` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `slot` int(11) NOT NULL,
  `img` text NOT NULL,
  `account_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Extraindo dados da tabela `maps`
--

INSERT INTO `maps` (`id`, `name`, `slot`, `img`, `account_id`) VALUES
(1, 'Mapa 1', 1, '1.png', 1),
(2, 'Mapa 2', 5, '2.png', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` text NOT NULL,
  `psw` text NOT NULL,
  `type` text NOT NULL,
  `account_id` int(11) NOT NULL,
  `name` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `account_id` (`account_id`),
  FULLTEXT KEY `user` (`user`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=19 ;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`id`, `user`, `psw`, `type`, `account_id`, `name`) VALUES
(16, 'lucianothume@email.com', '23c7937f1a3a4e6e6008490b2e8472c8', 'admin', 1, 'Luciano Thume'),
(18, 'admin@admin.com', 'bc55244ebe170e1277e7647b085cc2cd', 'admin', 1, 'Admin');

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `itens`
--
ALTER TABLE `itens`
  ADD CONSTRAINT `itens_ibfk_1` FOREIGN KEY (`map_id`) REFERENCES `maps` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
