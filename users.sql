-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Май 12 2021 г., 13:22
-- Версия сервера: 8.0.18
-- Версия PHP: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `serinada`
--

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `second_name` text NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `second_name`, `email`, `password`) VALUES
(1, 'Alex', 'Alex', 'test@mail.ru', ''),
(2, 'John', 'Homsted', 'john@mail.ru', ''),
(3, 'Res', 'undefined', 'res@mail.ru', '123456'),
(4, 'Res', 'undefined', 'newRes@mail.ru', '$2a$15$pj3msY2QW2NDSLJ4/OBrz.zOzTBtiDT3VGZkSJSPYjlHq4mFoyKq6'),
(5, 'Yuri', 'undefined', 'yuri@mail.ru', '123456'),
(6, 'Yuri', 'Не указано', 'testyuri@mail.ru', '123456'),
(7, 'Oleg', 'Не указано', 'oleg@gmail.com', '$2a$15$HzW3bE0hDaWVYqVtpfqpkOXhXo4/E8L86TNBM/EmM82qMgl5Bvgwq'),
(8, 'Вячеслав', 'Аксёнов', 'aks8slava@mail.ru', '$2a$15$IhJcOWyRwq9rxnBerOGE6uF/oLdEZgrEfAEw3UI29zlXDPEITbjdC'),
(9, 'Юрий', 'Есепенок', 'yuriEsipenok@mail.com', '$2a$15$9Yren/DkVhh4zfKZ3jQU1eiq6eaxxaR93LxgdcZn9LHg8Z30pEOB2'),
(10, 'Колямбикус', 'Вакариус', 'dsdafadasdasdasd@mail.com', '$2a$15$4wJ0LO9tw/l6MrtBpuCwc.7wLzk4SaYGfLmtpGbeoBd7pgSNwQVcm'),
(11, 'Лариса', 'Лошко', 'a@mail.ru', '$2a$15$3k6l1dFvTEnKXQlU5FZiVOIiVsFII6FNtEoChaYFDYX214ResbupC'),
(12, 'дефект', 'Есепенок', 'ekatze777@mail.ru', '$2a$15$Zu1RiNs3Q7YaAv5vb1sKxOgq2XDceKxYyjAC48nQs/cE4nuIXLgbe'),
(13, 'Yrij', 'Esepenok', '113322greenear@gmail.com', '$2a$15$ICYA0xHIv0RFzrNTe/Dl5uwcY7plA8bZArOXy55OPHobY2l1Zvov6'),
(14, '123', '123', '123@gmail.com', '$2a$15$g5LIxKLXjRTUG97W.NLNdOsNAMEqVOzUNTRJhqYM9ZheCpBzWzK2O'),
(15, 'aaaa', 'aaaa', '113322gear@gmail.com', '$2a$15$Qh0cvT6jYyJ8fGgC6mPasOlFF7FH2VE1fzaDiPZU924P91jzkefl6'),
(16, 'aaaa', 'aaaa', '113322ger@gmail.com', '$2a$15$fBbU1QoCivzFjh2i1FDa9ensyaesHqFXEHC0YyRJqYDIH7YqthRzu'),
(17, 'qweqe', 'eqwewq', '113322gr@gmail.com', '$2a$15$ja51uq8USbc6zI.91erVCOZidghHyYS5uTBBsSeNpAN588QrKOEdu'),
(18, 'Вячеслав Аксёнов', '1', '113322r@gmail.com', '$2a$15$RP2pu6qdyqK.AVfmIBufv.UHal9Oqq6AJj67tuqIKQQZJpbq.wOEa'),
(19, 'asas', 'assa', '11332r@gmail.com', '$2a$15$gOllK9Q4pLtKEAPQAhohJur/tDxANhRR30yrcX63h47300HrmljRC'),
(20, 'asdsd', 'sadsad', '11332r@gmail.co', '$2a$15$B0sPJk1dykhnD0TwkcCYqupB5FaLNkxaGXriwOHiHbPUY2BxHlI/6');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
