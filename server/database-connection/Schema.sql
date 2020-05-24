create table show (
    show_id SERIAL PRIMARY KEY,
    person_id UUID NOT NULL,
    show_image VARCHAR NOT NULL,
    show_key BIGINT NOT NULL,
    show_title VARCHAR NOT NULL,
    show_runtime BIGINT NOT NULL,
    show_status VARCHAR NOT NULL,
    show_premiered VARCHAR NOT NULL,
    show_genre VARCHAR NOT NULL,
    show_rating NUMERIC,
    show_summary VARCHAR NOT NULL,
    id_uid UUID REFERENCES person
)

          
         
create table movie (
    movie_id SERIAL PRIMARY KEY,
    person_id UUID NOT NULL,
    movie_image VARCHAR NOT NULL,
    movie_key VARCHAR NOT NULL,
    movie_title VARCHAR NOT NULL,
    movie_runtime VARCHAR NOT NULL,
    movie_summary VARCHAR NOT NULL,
    movie_release VARCHAR NOT NULL,
    movie_genre VARCHAR NOT NULL,
    movie_rating NUMERIC,
    movie_trailer VARCHAR NOT NULL,
    id_uid UUID REFERENCES person
);


create table person (
    id_uid UUID PRIMARY KEY NOT NULL,
    person_name VARCHAR(50) NOT NULL,
    password VARCHAR(400) NOT NULL,
    refreshtoken VARCHAR,
    person_image VARCHAR,
    password_reset_token VARCHAR,
    password_reset_expires NUMERIC,
    UNIQUE(person_name),
    UNIQUE(refreshtoken)
);