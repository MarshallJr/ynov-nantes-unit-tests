# Locust

[Locust doc](https://docs.locust.io/en/stable/what-is-locust.html)

## What's inside
There's 2 containers :
 - the master, the host, where the application to be tested is
 - the worker, can be instanciated multiple times, used to test the container

## Launch
```
docker-compose up --scale worker=4
```

[Web UI](http://0.0.0.0:8089/)
