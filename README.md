
## 立ち上げ
```
docker-compose build
docker-compose run --rm server bin/rake db:create
docker-compose run --rm server bin/rails db:migrate
```

## 作業時
```
docker-compose up -d
```

