# API Server

## Environment of configurations

Server's port. If you change it you have change nginx.conf too.

```console
$ PORT=7200
```

Connection of MongoDB. This is an example.

```console
$ MONGODB_URI=mongodb://user:password@localhost:27017/db_name
```

Connection of MySQL. This is an example.

```console
$ MYSQL_HOST=localhost
$ MYSQL_PORT=3306
$ MYSQL_DATABASE=coinlen_db
$ MYSQL_USERNAME=coinlen_user
$ MYSQL_PASSWORD=123456
```

Connection of RethinkDB. This is an example.

```console
$ DB_HOST=127.0.0.1
$ DB_PORT=28015
$ DB_NAME=coinlen
```

Settings of Coinbase. If you want to use the payment system you have to configure.

```console
$ ECOMMERCE_API_KEY=XXXX-XXXX-XXX-XXX-XXX
$ WEBHOOK_KEY=XXXXX-XXX-XXX-XXX-XXX
$ ECOMMERCE_COMPLETED_URL=https://app.coinlen.com/payment/completed
$ ECOMMERCE_CANCEL_URL=https://app.coinlen.com/payment/cancel
```

Settings of E-mail. If you want to use the mail system you have to configure.

```console
$ MAILER_HOST=smtp.yandex.com
$ MAILER_PORT=465
$ MAILER_ENCRYPTION=tls
$ MAILER_USERNAME=noreply@example.com
$ MAILER_PASSWORD=123456

```

You should refresh your JWT token for the system security.

```console
$ JWT_SECRET=YOUR-JWT-KEY
```

Don't forget to set it your timezone. In the server side it needs for RethinkDB. 

```console
$ TZ='Europe/Istanbul'
```

API version is compare with Web App for the system health. 
So if Api version isn't same with Web App, the web side will make an alert to the user. 

```console
$ WEB_VERSION=0.0.1
```
