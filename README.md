# Point of Sales RESTful API

## Stacks
- Node JS
- MySQL
- ExpressJS

## Setup
1. Clone repository<br>
`$ https://github.com/muhammadluth/point-of-sales.git`<br>
`$ cd point-of-sales`

2. Install depedencies
```bash
$ npm install
```

3. Setup your environment variable in `.env` files (if not exists, create your own).
```env
# NODE_ENV development | production | test
NODE_ENV = development

# DATABASE
DB_HOSTNAME = localhost
DB_USERNAME = root
DB_PASSWORD = ' '
DB_NAME = db_restful

# SECRET KEY
SECRET_JWT = xxxx

```
5. Serve server
```bash
$ npm start
```

## API Details

### Products
| Method | Endpoint | Description | Request Param | Request Body | Request Query |
| --- | --- | --- | --- | --- | --- |
| GET | /api/v1.0/product | Get products | -  | -  | `search`: STRING, `limit`: NUMBER, `page`: NUMBER, `sort`: STRING (column with order splitted by '-'. Ex: `sort=name-asc (order by name ASC)` |
| POST | /api/v1.0/product | Create new product | - | `name`: STRING, `description`: STRING, `category`: STRING, `price`: NUMBER, `qty`: NUMBER, `image: FILE`: | - |
| GET | /api/v1.0/product/:id | Get one product by id | `id`: STRING (UUID) | - | - |
| PUT | /api/v1.0/product/:id | Update product | `id`: STRING (UUID) | `name`: STRING, `category`: STRING (UUID), `description`: STRING, `price`: NUMBER, `stock`: NUMBER, `image: FILE` | - |
| DELETE | /api/v1.0/product/:id | Delete product | `id`: STRING (UUID) | - | - |
| PATCH | /api/v1.0/product/:id | Reduce Quantity Product | `qty`: NUMBER (QUANTITY) | - | - |

### Category
| Method | Endpoint | Description | Request Param | Request Body | Request Query |
| --- | --- | --- | --- | --- | --- |
| GET | /api/v1.0/category | Get category | -  | -  | - |
| POST | /api/v1.0/category | Create new category | - | `name`: STRING | - |
| PUT | /api/v1.0/category/:id | Update category | `id`: STRING (UUID) | `name`: STRING | - |
| DELETE | /api/v1.0/category/:id | Delete category | `id`: STRING (UUID) | - | - |

### Auth
| Method | Endpoint | Description | Request Headers | Request Body |
| --- | --- | --- | --- | --- |
| POST | /api/v1.0/users/register | Register user | -  | `username`: STRING, `email`: STRING, `password`: STRING |
| POST | /api/v1.0/users/login | Login user | - | `email`: STRING, `password`: STRING |

---
Copyright © 2019