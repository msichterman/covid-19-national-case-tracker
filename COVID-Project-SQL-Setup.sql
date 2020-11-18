CREATE TABLE "states" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "abbreviation" varchar,
  "population" int
);

CREATE TABLE "counties" (
  "state_id" int,
  "name" varchar,
  "fips_code" int,
  "lat" decimal,
  "lon" decimal,
  "population" int
);

CREATE TABLE "reports" (
  "id" SERIAL PRIMARY KEY,
  "date" date,
  "new_deaths" int,
  "cumulative_deaths" int,
  "new_cases" int,
  "cumulative_cases" int,
  "state_id" int
);

CREATE TABLE "governors" (
  "first_name" varchar,
  "last_name" varchar,
  "state_id" int,
  "party_id" int
);

CREATE TABLE "parties" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "senate_seats" int,
  "house_seats" int
);

ALTER TABLE "counties" ADD FOREIGN KEY ("state_id") REFERENCES "states" ("id");

ALTER TABLE "reports" ADD FOREIGN KEY ("state_id") REFERENCES "states" ("id");

ALTER TABLE "governors" ADD FOREIGN KEY ("state_id") REFERENCES "states" ("id");

ALTER TABLE "governors" ADD FOREIGN KEY ("party_id") REFERENCES "parties" ("id");
