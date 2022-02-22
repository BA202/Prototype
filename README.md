# Prototype
This is a running dockerised build of the prototype


## Usage
clone the git repo
```
docker-compose build
```
```
docker-compose up
```



## Apache Superset 

```
 docker exec -it apache_superset superset fab create-admin \
               --username admin \
               --firstname Superset \
               --lastname Admin \
               --email admin@superset.com \
               --password admin
```

```
docker exec -it apache_superset superset db upgrade
```


```
docker exec -it apache_superset superset load_examples
```

```
docker exec -it apache_superset superset init
```