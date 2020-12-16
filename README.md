# Emprestimo Livros

Uma aplicacao simples para emprestimo de livros

## Installation

npm run index.js

```bash
npm install
npm run index.js

or 

bash shell.bash local deploy
```

## Usage

Pega detalhes do usuario por parametro id

```
/GET
/user/:id

```
----------------------------------------------------------------------

```
CADASTRA UM NOVO USUARIO

/POST
/user


REQUEST: 
{
   "name":"somename",
   "email":"someemail@adress.com.br"
}

RESPONSE: 
[
    {
        "books": [],
        "lend_books": [],
        "borrowed_books": [],
        "_id": "BBBBBBBBB",
        "name": "AAAAAAAAAAAA",
        "email": "YYYYYYYYYYY",
        "created_at": "EEEEEEEEEEEEEE"
    }
]

```

----------------------------------------------------------------------


```
CADASTRA UM NOVO LIVRO

/POST
/book


REQUEST: 
{
    "logged_user_id": "someid",
    "tittle": "SOMEBOOK",
    "pages": "10"
}


RESPONSE: 
{
    "books": [],
    "lend_books": [],
    "borrowed_books": [],
    "_id": "XXXXXXXXXX",
    "name": "XXXXXXXXX",
    "email": "XXXXXXXXX",
    "created_at": "EEEEEEEEEEEEEEEE"
}

----------------------------------------------------------------------

EMPRESTA UM NOVO LIVRO

/POST
/book/lend

REQUEST: 
{
   "logged_user_id":"XXXXXXX",
   "book_id":"YYYYYYYYYYYYYYYYYYY",
   "to_user_id":"ZZZZZZZZZZZZZZZZZZZZZZZ"
}

RESPONSE: 
{
    "_id": "XXXXXXXX",
    "book_id": "AAAAAAAAAAAAA",
    "from_user": "YYYYYYYYYYY",
    "to_user": "ZZZZZZZZZZZZZ",
    "lent_at": "EEEEEEEEEEEEE"
}

```
----------------------------------------------------------------------
```
RETORNA UM LIVRO QUE PEGOU EMPRESTADO

/POST
/book/return

REQUEST: 
{
  "logged_user_id":"XXXXXXX",
   "book_id":"YYYYYYYYYYYYYYYYYYY"
}

RESPONSE: 
{
    "_id": "AAAAAAAAA",
    "book_id": "BBBBBBBBBB",
    "from_user": "CCCCCCCC",
    "to_user": "DDDDDDDD",
    "lent_at": "EEEEEEEE"
    "returned_at": "EEEEEEEE"
}
----------------------------------------------------------------------


```
## How to run test

```npm run test```
