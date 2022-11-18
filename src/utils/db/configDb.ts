import userService from "../../user/user.service";
import pool from "./db";

export default async () => {
    await pool.query(`DROP TABLE IF EXISTS "Carts"`);
    await pool.query(`DROP TABLE IF EXISTS "Products"`);
    await pool.query(`DROP TABLE IF EXISTS "Types"`);
    await pool.query(`DROP TABLE IF EXISTS "Brands"`);
    await pool.query(`DROP TABLE IF EXISTS "Users"`);

    await pool.query(`CREATE TABLE IF NOT EXISTS "Users"(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) DEFAULT 'USER'
)`);

    await pool.query(`CREATE TABLE IF NOT EXISTS "Types"(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
)`);

    await pool.query(`CREATE INDEX type_name ON public."Types"(name)`);

    await pool.query(`CREATE TABLE IF NOT EXISTS "Brands"(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
)`);

    await pool.query(`CREATE INDEX brand_name ON public."Brands"(name)`);

    await pool.query(`CREATE TABLE IF NOT EXISTS "Products"(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    price NUMERIC NOT NULL,
    "brandId" INT NOT NULL,
    "typeId" INT NOT NULL,
    CONSTRAINT fk_brand
        FOREIGN KEY("brandId")
            REFERENCES public."Brands"(id),
    CONSTRAINT fk_type
        FOREIGN KEY("typeId")
            REFERENCES public."Types"(id)
);`);

    await pool.query(`CREATE TABLE IF NOT EXISTS "Carts"(
    id SERIAL PRIMARY KEY,
    quantity INT NOT NULL,
    "productId" INT NOT NULL,
    "userId" INT NOT NULL,
    CONSTRAINT fk_device
        FOREIGN KEY("productId")
            REFERENCES public."Products"(id),
    CONSTRAINT fk_user
        FOREIGN KEY("userId")
            REFERENCES public."Users"(id)
)`);
    await pool.query(
        `INSERT INTO public."Brands" (name) VALUES ('Apple') ON CONFLICT DO NOTHING`
    );
    await pool.query(
        `INSERT INTO public."Brands" (name) VALUES ('Samsung') ON CONFLICT DO NOTHING`
    );
    await pool.query(
        `INSERT INTO public."Types" (name) VALUES ('SmartPhone') ON CONFLICT DO NOTHING`
    );
    await pool.query(
        `INSERT INTO public."Types" (name) VALUES ('Laptop') ON CONFLICT DO NOTHING`
    );
    await pool.query(
        `INSERT INTO public."Products" (title, description, price, "brandId", "typeId") VALUES ('iPhone', 'A cool new phone', 899.99, 1, 1) ON CONFLICT DO NOTHING`
    );
    await pool.query(
        `INSERT INTO public."Products" (title, description, price, "brandId", "typeId") VALUES ('Galaxy a51', 'Brand new android smartphone', 799.99, 2, 1) ON CONFLICT DO NOTHING`
    );
    await pool.query(
        `INSERT INTO public."Products" (title, description, price, "brandId", "typeId") VALUES ('MacBook Air', 'A cool light-weighted laptop', 1199.99, 1, 2) ON CONFLICT DO NOTHING`
    );
    await pool.query(
        `INSERT INTO public."Products" (title, description, price, "brandId", "typeId") VALUES ('Galaxy Book', 'Very comfortable and stylish laptop', 999.99, 2, 2) ON CONFLICT DO NOTHING`
    );

    await userService.registration("admin", "admin@mail.com", "admin", "ADMIN");
    await userService.registration("user", "user@mail.com", "user");

    return;
};
