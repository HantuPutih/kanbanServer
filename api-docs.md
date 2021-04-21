url
hhtp mehotd
request
response (succes dan error)

# kanban app

## User


- /user/register (post)

required: 
```javascript
email=[string]
password=[string]
```

**success response**


validation: 
email and password must be filed & 
email must be unique

password akan automatis ter <i>hash</i>

**success response**

201 status code created

```javascript
{
    "id": 4,
    "email": "new@mail.com",
}
```

**error responses**


400 status code

validation error:
```javascript
{
    "error": "email must be unique"
}
```
```javascript
{
    "error": "email cannot be empty!"
}
```
```javascript
{
    "error": "Please enter at least 6 characters password"
}
```



500 status code internal server error

```javascript
{
    "msg": "internal server error"
}
```

- /user/login (post)

required: 
```javascript
email=[string]
password=[string]
```

**success response**


**success response**

200 status code ok

user yang login akan memiliki token yang unik

```javascript
{
    "acces_token": "<token>"
}
```

**error responses**

500 status code internal server error

```javascript
{
    "msg": "internal server error"
}
```


jika password/email salah atau tidak diisi:
```javascript
{
    "error": "invalid email/password"
}
```


- /user/googleLogin (post)

akan automatis google login dengan accouont google dari user

password akan automatis ter <i>hash</i>

**success response**

jika belum memiliki account maka akan automatis dibuat account dan kemudian akan login

201 status code created


```javascript
{
    "id": 4,
    "email": "new@mail.com",
}
```

jika sudah memiliki account akan login

200 status response ok

user yang login akan memiliki token yang unik

```javascript
{
    "token": "<token>"
}
```


**error responses**


500 status code internal server error

```javascript
{
    "msg": "internal server error"
}
```

## Task

- /task (get) authenticate

**success response**

memerlukan access_token pada headers untuk autentikasi

200 status response OK

```javascript
{
    "backlog": [
        {
            "id": 28,
            "title": "new",
            "category": "backlog",
            "UserId": 1,
            "owner": "neww@mail.com",
            "createdAt": "2021-02-12T09:10:07.538Z",
            "updatedAt": "2021-02-12T09:12:13.723Z"
        },
        {
            "id": 33,
            "title": "working",
            "category": "backlog",
            "UserId": 1,
            "owner": "neww@mail.com",
            "createdAt": "2021-02-12T09:17:51.782Z",
            "updatedAt": "2021-02-12T09:17:51.782Z"
        }
    ],
    "todo": [],
    "doing": [
        {
            "id": 30,
            "title": "mengerjakan tugas",
            "category": "doing",
            "UserId": 1,
            "owner": "neww@mail.com",
            "createdAt": "2021-02-12T09:10:15.170Z",
            "updatedAt": "2021-02-12T09:10:15.170Z"
        },
        {
            "id": 32,
            "title": "make program",
            "category": "doing",
            "UserId": 1,
            "owner": "neww@mail.com",
            "createdAt": "2021-02-12T09:12:49.884Z",
            "updatedAt": "2021-02-12T09:18:38.296Z"
        }
    ],
    "done": [
        {
            "id": 31,
            "title": "learn vue",
            "category": "done",
            "UserId": 1,
            "owner": "neww@mail.com",
            "createdAt": "2021-02-12T09:10:18.752Z",
            "updatedAt": "2021-02-12T09:10:18.752Z"
        },
    ]
}
```
**error responses**

500 status code internal server error

```javascript
{
    "msg": "internal server error"
}
```

- /task (post) authenticate

memerlukan access_token pada headers untuk autentikasi

required: 
```javascript
title=[string]
category=[string]
```

**success response**

201 status response created


```javascript
{
    "id": 35,
    "title": "work",
    "category": "backlog",
    "UserId": 1,
    "owner": "neww@mail.com",
    "updatedAt": "2021-02-12T10:20:16.057Z",
    "createdAt": "2021-02-12T10:20:16.057Z"
}

```

**error responses**

400 status response bad request

```javascript
{
    "error": "Title cannot be empty!"
}
```

```javascript
{
    "error": "Invalid category!"
}
```

500 status code internal server error

```javascript
{
    "msg": "internal server error"
}
```

- /task/:id (get) authenticate & authorize

memerlukan access_token pada headers untuk autentikasi dan autorisasi

required: 
```javascript
task.id = [integer]
```

**success response**

200 status response OK

```javascript
{
    "id": 28,
    "title": "work",
    "category": "backlog",
    "UserId": 1,
    "owner": "neww@mail.com",
    "createdAt": "2021-02-12T09:10:07.538Z",
    "updatedAt": "2021-02-12T09:12:13.723Z"
}
```

**error responses**

404 not found

```javascript
{
    "error": "task not found!"
}
```

401 not authorized

```javascript
{
    "error": "unauthorize!"
}
```

500 status code internal server error

```javascript
{
    "msg": "internal server error"
}
```

- /task/:id (put) authenticate & authorize

memerlukan access_token pada headers untuk autentikasi dan autorisasi

required: 
```javascript
task.id = [integer]
title=[string]
category=[string]
```


**success response**

200 status response OK

```javascript
[
    1,
    [
        {
            "id": 28,
            "title": "makan temen",
            "category": "done",
            "UserId": 1,
            "owner": "neww@mail.com",
            "createdAt": "2021-02-12T09:10:07.538Z",
            "updatedAt": "2021-02-12T10:40:40.535Z"
        }
    ]
]
```

**error responses**

400 status response bad request

```javascript
{
    "error": "Title cannot be empty!"
}
```

```javascript
{
    "error": "Invalid category!"
}
```

404 not found

```javascript
{
    "error": "task not found!"
}
```

401 not authorized

```javascript
{
    "error": "unauthorize!"
}
```

500 status code internal server error

```javascript
{
    "msg": "internal server error"
}
```

- /task/:id (patch) authenticate & authorize

memerlukan access_token pada headers untuk autentikasi dan autorisasi

required: 
```javascript
task.id = [integer]
category=[string]
```

**success response**

200 status response OK

```javascript
[
    1,
    [
        {
            "id": 28,
            "title": "makan temen",
            "category": "done",
            "UserId": 1,
            "owner": "neww@mail.com",
            "createdAt": "2021-02-12T09:10:07.538Z",
            "updatedAt": "2021-02-12T10:40:40.535Z"
        }
    ]
]
```

**error responses**

404 not found

```javascript
{
    "error": "task not found!"
}
```

401 not authorized

```javascript
{
    "error": "unauthorize!"
}
```

500 status code internal server error

```javascript
{
    "msg": "internal server error"
}
```


- /task/:id (delete) authenticate & authorize

memerlukan access_token pada headers untuk autentikasi dan autorisasi

required: 
```javascript
task.id = [integer]
```

**success response**

200 status response OK

```javascript
{
    "msg": "Task deleted successfully!"
}
```

**error responses**

404 not found

```javascript
{
    "error": "task not found!"
}
```

401 not authorized

```javascript
{
    "error": "unauthorize!"
}
```

