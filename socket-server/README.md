# Socket Server

## Environment of configurations

Socket Server's port. If you change it you have change nginx.conf too.

```console
$ PORT=7200
```

Connection of MongoDB. This is an example.

```console
$ MONGODB_URI=mongodb://user:password@localhost:27017/db_name
```

Connection of RethinkDB. This is an example.

```console
$ DB_HOST=127.0.0.1
$ DB_PORT=28015
$ DB_NAME=coinlen
```

You defined before all configure of socket so just copy here.
 
```console
$ SOCKET_NAMESPACE=/c4
$ SOCKET_PATH=/coinlen.socket
```

You defined before JWT configure so just copy here.
```console
$ JWT_SECRET=XXXXXX+XXXXXX
```
