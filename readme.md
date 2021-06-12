# Readme

I have approch this problem with Nodejs React and postgres with postgis extention

# Db schema


[typeorm model](honestFoodTestBackend/src/api/models/Outlet/Outlet.ts)

Table outlets

id: number;
outlet_name: string;
outlet_description: string;
area_name: string;
outletGeom: Geometry; Outlet location (type - Point)
outletAreaGeom: Geometry; Outlet Service Area (type - Polygon)

# Postgres script

honestFoodTestBackend/src/api/services/Outlet/OutletService.ts

```
SELECT *
FROM outlets
WHERE ST_Contains("outlets"."outletAreaGeom",(ST_SetSRID(ST_MakePoint(${lat},${lng}),4326)))

```

using ST_Contains method of postgis postgres I am able to check if a point(latitude,logitude) belongs to a Geometry polygon

# Dump

I have tried to create a script to automate area polygons and names from KML and insert it to DB.Full do to lack of time I had manully inserted the values from KML file to DB .

Automation Script Incomplete - honestFoodTestBackend/src/database/seeds/CreateOutlets.ts
Run using npm run db:seed

Db dump in csv - honestFoodTestBackend/honestfoodoutlet

# Backend Usage

cd honestFoodTestBackend

create a .env file using the sample .env.example

npm install
npm run dev

# frontend usage

npm install
npm start

# Db setup

add postgis extention to postgres database

CREATE EXTENSION postgis;

CREATE TABLE public.outlets
(
id integer NOT NULL DEFAULT nextval('outlets_id_seq'::regclass),
outlet_name character varying COLLATE pg_catalog."default",
outlet_description character varying COLLATE pg_catalog."default",
area_name character varying COLLATE pg_catalog."default",
"outletGeom" geometry(Point,4326),
"outletAreaGeom" geometry(Polygon,4326),
CONSTRAINT "PK_4f218ad1778c5c01d7bf77bab02" PRIMARY KEY (id)
)
