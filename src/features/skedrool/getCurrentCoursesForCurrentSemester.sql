-- create semesters table
CREATE TABLE `semesters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `term` enum('fall','spring','winter','summer','other') DEFAULT NULL,
  `term_year` varchar(255) DEFAULT NULL,
  `school` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- create courses table
CREATE TABLE `courses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `days` varchar(255) DEFAULT NULL,
  `class_time` varchar(255) DEFAULT NULL,
  `start_date` varchar(255) DEFAULT NULL,
  `end_date` varchar(255) DEFAULT NULL,
  `semester_id` int NOT NULL,
  `type` varchar(255) DEFAULT 'Lecture',
  `location` varchar(255) NOT NULL,
  `professor` varchar(255) DEFAULT NULL,
  `professor_email` varchar(255) DEFAULT NULL,
  `credits` int DEFAULT NULL,
  `color` varchar(255) DEFAULT 'red',
  `start_time` varchar(255) DEFAULT '900',
  `end_time` varchar(255) DEFAULT '900',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE PROCEDURE `anki`.`getCurrentCoursesForCurrentSemester`
(
    IN `currYear` INT,
    IN `currTerm` VARCHAR(10)
)
BEGIN
  
  -- find semester by year and term
  SET @semester_id = (SELECT id FROM semesters WHERE term_year = currYear AND term = currTerm);

  -- find courses by semester id
  SELECT * FROM courses WHERE semester_id = @semester_id;
  
END