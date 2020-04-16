DROP DATABASE IF EXISTS soccer_league;
CREATE DATABASE soccer_league;

\c soccer_league

CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    team_name VARCHAR(50) UNIQUE
);

CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    team_id INT NOT NULL REFERENCES teams (id)
);

CREATE TABLE seasons (
    id SERIAL PRIMARY KEY,
    season_start TIMESTAMP NOT NULL,
    season_end TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE referees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);

CREATE TABLE game (
    id SERIAL PRIMARY KEY,
    game_type VARCHAR(4) UNIQUE NOT NULL
);

CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    home_team_id INT NOT NULL REFERENCES teams (id) ON DELETE CASCADE,
    away_team_id INT NOT NULL REFERENCES teams (id) ON DELETE CASCADE,
    match_date TIMESTAMP NOT NULL DEFAULT NOW(),
    ref_id INT NOT NULL REFERENCES referees (id) ON DELETE CASCADE,
    result INT NOT NULL REFERENCES game (id)
);

CREATE TABLE goals (
    player_id INT REFERENCES players (id),
    match_id INT REFERENCES players(id),
        PRIMARY KEY (player_id, match_id),
    amount INT
);
