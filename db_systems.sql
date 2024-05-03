-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Mag 03, 2024 alle 22:35
-- Versione del server: 10.4.28-MariaDB
-- Versione PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_systems`
--
CREATE DATABASE IF NOT EXISTS `db_systems` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `db_systems`;

-- --------------------------------------------------------

--
-- Struttura della tabella `committenti`
--

CREATE TABLE `committenti` (
  `Id` int(11) NOT NULL,
  `Nome` varchar(40) NOT NULL,
  `Città` varchar(20) NOT NULL,
  `Via` varchar(40) NOT NULL,
  `CAP` int(5) NOT NULL,
  `Telefono` varchar(13) NOT NULL,
  `email` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `committenti`
--

INSERT INTO `committenti` (`Id`, `Nome`, `Città`, `Via`, `CAP`, `Telefono`, `email`) VALUES
(1, 'test', 'Prevalle', 'Via Gardesana', 25080, '391234567890', 'direzione@test.it'),
(2, 'test', 'test', 'test', 44444, '1234567890', 'test.test@test.test'),
(3, 'Eurostampi', 'Castelcovati', 'Via Urago D\'Oglio 3', 25030, '+39030718123', 'commerciale.eurostampi@onger.it'),
(4, 'Pecoranera', 'Botticino', 'Via Cavour 227', 25082, '+393886565619', 'info@gelateriapecoranera.it'),
(5, 'Kuci Stampi', 'Mazzano', 'Via Adriano Olivetti', 25080, '+390302590357', 'info@kucistampi.it'),
(6, 'IC Nuvolento', 'Nuvolento', 'Via Caduti della Resistenza 24', 25080, '+390306897009', 'bsic851006@pec.istruzione.it');

-- --------------------------------------------------------

--
-- Struttura della tabella `dipendenti`
--

CREATE TABLE `dipendenti` (
  `Matricola` int(11) NOT NULL,
  `Nome` varchar(20) NOT NULL,
  `Cognome` varchar(20) NOT NULL,
  `Città` varchar(20) NOT NULL,
  `Via` varchar(20) NOT NULL,
  `CAP` int(5) NOT NULL,
  `Telefono` varchar(13) NOT NULL,
  `PagaOraria` decimal(10,0) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `dipendenti`
--

INSERT INTO `dipendenti` (`Matricola`, `Nome`, `Cognome`, `Città`, `Via`, `CAP`, `Telefono`, `PagaOraria`, `email`, `password`) VALUES
(1095, 'Mario', 'Rossi', 'Nuvolera', 'via Scaiola', 25080, '393559152349', 15, 'mario.rossi@systems.it', 'mario.rossi');

-- --------------------------------------------------------

--
-- Struttura della tabella `interventi`
--

CREATE TABLE `interventi` (
  `Id` int(11) NOT NULL,
  `IdCommittente` int(11) DEFAULT NULL,
  `Matricola` int(11) DEFAULT NULL,
  `Tipologia` varchar(100) NOT NULL,
  `Costo` decimal(10,0) NOT NULL,
  `DataIntervento` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `interventi`
--

INSERT INTO `interventi` (`Id`, `IdCommittente`, `Matricola`, `Tipologia`, `Costo`, `DataIntervento`) VALUES
(1, 1, 1095, 'Sostituzione NAS', 2460, '2023-03-04'),
(2, 1, 1095, 'Aggiunta replica ser', 4670, '2024-01-08'),
(3, 1, 1095, 'Manutenzione UPS', 800, '2024-01-08'),
(4, 1, 1095, 'test aggiunta intervento', 1, '2024-05-02'),
(5, 3, 1095, 'Penetration test', 350, '2024-05-02');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `committenti`
--
ALTER TABLE `committenti`
  ADD PRIMARY KEY (`Id`);

--
-- Indici per le tabelle `dipendenti`
--
ALTER TABLE `dipendenti`
  ADD PRIMARY KEY (`Matricola`);

--
-- Indici per le tabelle `interventi`
--
ALTER TABLE `interventi`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IdCommittente` (`IdCommittente`),
  ADD KEY `Matricola` (`Matricola`);

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `interventi`
--
ALTER TABLE `interventi`
  ADD CONSTRAINT `interventi_ibfk_1` FOREIGN KEY (`IdCommittente`) REFERENCES `committenti` (`Id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `interventi_ibfk_2` FOREIGN KEY (`Matricola`) REFERENCES `dipendenti` (`Matricola`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
