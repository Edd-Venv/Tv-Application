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
    show_rating NUMERIC NOT NULL,
    show_summary VARCHAR NOT NULL,
    id_uid UUID REFERENCES person
)

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
    UNIQUE(person_name),
    UNIQUE(refreshtoken)
);