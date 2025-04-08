ollama run deepseek-r1:1.5b

export ELASTICSEARCH_USERNAME=elasticsearch
export ELASTICSEARCH_PASSWORD=wViIQ9wz

curl -fsSL https://elastic.co/start-local | sh

cd web/client

npm run dev

cd ../server

npm run start
