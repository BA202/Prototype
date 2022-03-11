# Prototype
This is a running dockerised build of the prototype


## Deployment:

### Frontend:
```
src//React/hotel_reviews/src/backendApi.js
```
change line 6 to
```js
static #baseUrl = ":81/backend/";
```

#
### Classifier:
```
src/Python/classifier
```
add a folder named **Data**, in this folder add the training data.

in the file **classifier.py** at line 32
```python
localDataHandler = DataHandler("./Data")
```

#
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