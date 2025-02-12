import { Client } from "@elastic/elasticsearch";
import { QuerySchema } from "@shared/QuerySchema";

const client = new Client({
  node: 'http://localhost:9200',
  auth: { username: process.env.ELASTICSEARCH_USERNAME as string, password: process.env.ELASTICSEARCH_PASSWORD as string },
});

// use query to search for data using client
const requestData = async (query: QuerySchema) => {
  // client.search() api docs: https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#_search

  // example get pbp
  const pbpRes = await client.search({
    index: 'pbp',
    size: 20,
  });
  console.log(pbpRes.hits.hits[0]);

  // example get player
  const res = await client.search({
    index: 'players',
    size: 20,
    body: {
      query: {
        match: {
          "weight": "256"
        }
      }
    }
  });
  console.log(res.hits.hits[0]);

  // then format the data in some way to prepare it for the llm
  return "";
};

requestData({} as QuerySchema);

export default requestData;
