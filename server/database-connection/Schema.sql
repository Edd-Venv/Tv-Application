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

create table music (
    artist_id SERIAL PRIMARY KEY,
    person_id UUID NOT NULL,
    artist_image VARCHAR NOT NULL,
    song_key BIGINT NOT NULL,
    artist_name VARCHAR NOT NULL,
    song_title VARCHAR NOT NULL,
    album_title VARCHAR NOT NULL,
    explicit_lyrics BOOLEAN NOT NULL,
    song VARCHAR NOT NULL,
    id_uid UUID REFERENCES person
);      
          
         
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

create table book (
  book_id SERIAL PRIMARY KEY,
  person_id UUID NOT NULL,
  book_image VARCHAR NOT NULL,
  book_key BIGINT NOT NULL,
  book_title VARCHAR NOT NULL,
  book_author VARCHAR NOT NULL,
  book_price NUMERIC NOT NULL,
  book_currencyCode VARCHAR NOT NULL,
  book_pages BIGINT NOT NULL,
  id_uid UUID REFERENCES person
)

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