# 開発

## 立ち上げ
```
docker compose build
docker compose run --rm server bin/rails db:create
docker compose run --rm server bin/rails db:migrate
```

## 作業開始
```
docker compose up -d
```

## 作業終了
```
docker compose down
```

# デプロイ

## デプロイ手順

- docker contextをdefaultにする
- buildする
- (必要なら)awsにログイン
- ECRにpushする
- docker contextをmyecscontextにする
- compose upする

```bash
target=server
docker context use default
docker build -f ${target}/Dockerfile.prod -t 645943600532.dkr.ecr.us-east-1.amazonaws.com/${target}:latest ${target}
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 645943600532.dkr.ecr.us-east-1.amazonaws.com
docker push 645943600532.dkr.ecr.us-east-1.amazonaws.com/${target}:latest
docker context use myecscontext
docker compose -f docker-compose.prod.yml up
```

## ECSのコンテナに入る

タスクが RUNNINGになるまで待ったほうがいいかも

```bash
aws ecs execute-command --cluster searchsearch --task (タスクID) --container server --interactive --command "bash"
```

