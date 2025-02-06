import { Client } from "@elastic/elasticsearch";

const client = new Client({
  node: 'http://localhost:9200',
  auth: { username: process.env.ELASTICSEARCH_USERNAME as string, password: process.env.ELASTICSEARCH_PASSWORD as string },
});

async function run() {
  // search api docs: https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#_search
  const res = await client.search({
    size: 20 // number of hits to return
  });
  console.log(res);
};

run();

export default client;
