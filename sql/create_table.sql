CREATE TABLE IF NOT EXISTS movies(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL,
    "category" VARCHAR(50) NOT NULL,
    "duration" INTEGER NOT NULL,
    "price" INTEGER NOT NULL
);
