-- SELECT name, year 
-- FROM movies 
-- WHERE year=1902 AND rank>5;

--> 1.-

SELECT * FROM movies WHERE year = 1993;

--> 2.-

SELECT COUNT(*) FROM movies WHERE year = 1982; --4597

-- 3.-

SELECT * FROM actors WHERE last_name LIKE '%stack%';
SELECT COUNT(*) FROM actors WHERE last_name LIKE '%stack%'; --47

-- 4.-

SELECT first_name, last_name, COUNT(*) as total
FROM actors 
GROUP BY lower(first_name), lower(last_name)
ORDER BY total DESC
LIMIT 10;   

-- 5 .-

SELECT COUNT(*) as movies, act.first_name as actor
FROM roles as rol
INNER JOIN actors as act ON rol.actor_id = act.id
GROUP BY actor_id
ORDER BY movies DESC
LIMIT 100;

-- 6.-

SELECT COUNT(*) as total, genre
FROM movies_genres 
GROUP BY genre
ORDER BY total DESC
LIMIT 10;

-- 7.-

SELECT a.first_name, a.last_name
FROM actors as a
JOIN roles as r ON a.id = r.actor_id
JOIN movies as m ON r.movie_id = m.id
WHERE m.name = 'Braveheart' AND m.year = 1995
ORDER BY a.last_name;

-- 8.-

SELECT d.first_name, d.last_name, m.name, m.year
FROM directors as d
JOIN movies_directors as md ON d.id = md.director_id
JOIN movies as m ON md.movie_id = m.id
JOIN movies_genres as mg ON m.id = mg.movie_id
WHERE mg.genre = 'Film-Noir' AND m.year % 4 = 0
ORDER BY m.name
LIMIT 10;

-- 9.-

SELECT m.id
FROM movies as md
JOIN roles as r ON m.id = r.movie_id
JOIN actors as a ON r.actor_id = a.id
WHERE a.first_name = "Kevin" AND a.last_name = "Bacon"