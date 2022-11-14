# Test Task

## Back-end for online store

There are two ways how you can run this app - using Docker compose or running it locally.

### Docker compose

In order to run this application you need to clone the repo to your local machine.
Then you have to write `docker compose up`

That's it!

### Running it locally

Clone repo as well, then write `npm install` to install all dependencies for node.
After that edit .env file, set `PG*` variables so that application could connect to your postgres db

## Initial data

Project has pre-written data in it, such as:

1. admin user (email: "admin@mail.com", password: "admin")
2. default user (email: "user@mail.com", password: "user")
3. 2 Brands and 2 Product types
4. 4 different products

## Endpoints

### /Users

#### POST `/users/registration`

_Creates a new user_

Body example:

```
{
    "name": "Test",
    "email": "test@mail.com",
    "password": "test",
    "passwordConfirmation": "test"
}
```

#### POST `/users/login`

_Gives you an accessToken for user and user info_

Body example:

```
{
    "email": "user@mail.com",
    "password": "user"
}
```

#### GET `/users/me`

##### Authorization header required

_Gives you info about current user_

#### PUT `/users/me`

##### Authorization header required

_Allows you to edit current user but not his password_

Body example:

```
{
    "email": "user@mail.com",
    "name": "Not default user"
}
```

#### DELETE `/users/me`

##### Authorization header required

_Deletes current user_

### /Types and /Brands

_Currently types and brands have pretty much the same functionality, so all the endpoints are the same, the only difference is in their name, so I will only describe endpoints for /types, but they are the same for /brands_

#### GET `/types`

_Gives you all available types_

#### POST `/types`

##### Authorization header of ADMIN required

_Adds another product type to db_

Body example:

```
{
    "name": "Fridges"
}
```

#### DELETE `/types/:typeId`

##### Authorization header of ADMIN required

_Deletes existing type from db_

### /Products

#### GET `/products`

_Returns all available products_

##### Available query params:

1. limit - limit the amount of products received
2. page - set the page that the user is currently looking
3. typeId - get products of specific type
4. brandId - get products of specific brand

All queries are combinable!

#### GET `/products/:productId`

_Returns a product with specific id_

#### POST `/products`

##### Authorization header of ADMIN required

_Adds a new product to db_

Body example:

```
{
    "title": "Test product",
    "description": "Just a regular test",
    "price": 249.99,
    "brandId": 1,
    "typeId": 2
}
```

#### PUT `/products/:productId`

##### Authorization header of ADMIN required

_Updates already existing product_

Body example:

```
{
    "title": "Not a regular test product",
    "description": "Another description",
    "price": 249.99,
    "brandId": 1,
    "typeId": 2
}
```

#### DELETE `/products/:productId`

##### Authorization header of ADMIN required

_Deletes already existing product_

### /Cart

#### POST `/cart`

##### Authorization header required

_Adds a product to user cart_

Body example:

```
{
    "productId": 1,
    "quantity": 3
}
```

#### GET `/cart`

##### Authorization header required

_Gets a cart for a specific user_

#### DELETE `/cart/:productId`

##### Authorization header required

_Deletes a product from cart_
