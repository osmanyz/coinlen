# Providers

- Binance.com is working base on websocket polling
- Paribu.com is working base on ajax polling (I don't know why they don't have any socket system)
- BtcTurk.com is working base on websocket polling

## Environment of configurations

Open Exchange Rates API KEYS, you can create two free accounts.
 
[The Forever Free Plan](https://openexchangerates.org/signup/free) 

```console
$ CURRENCY_KEY_1=XXXXXX
$ CURRENCY_KEY_2=XXXXXX
```

Connection of RethinkDB. This is an example.

```console
$ DB_HOST=127.0.0.1
$ DB_PORT=28015
$ DB_NAME=coinlen
```

WebSocket url and with a path. This is an example.

```console
$ SOCKET_URL=https://websocket.coinlen.com
$ SOCKET_PATH=/coinlen.socket
$ SOCKET_NAMESPACE=/c4
```

If you want to use notifications system. You have to create a bot in Telegram.

[Bots: An introduction for developers](https://core.telegram.org/bots)

```console
$ TELEGRAM_API=https://api.telegram.org/bot1XXXXXX:XXX
$ TELEGRAM_CHAT_ID='-1XXXXXXXX'
```

Don't forget to set it your timezone. In the server side it needs for RethinkDB. 

```console
$ TZ='Europe/Istanbul'
```
