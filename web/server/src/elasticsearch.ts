import { Client } from "@elastic/elasticsearch";
import { QuerySchema } from "@shared/QuerySchema";
import * as fs from 'fs';

const filename = 'merged_pbp.txt';

const client = new Client({
  node: 'http://localhost:9200',
  auth: { username: process.env.ELASTICSEARCH_USERNAME as string, password: "wViIQ9wz" },
});

// use query to search for data using client
const requestData = async (query: QuerySchema) => {
  // client.search() api docs: https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#_search

  // example get pbp
  const pbpRes = await client.search({
    index: 'pbp',
    size: 10,
  });
  const pbpResString = pbpRes.hits.hits.map((element) => JSON.stringify(element));
  console.log("hi")
  fs.writeFileSync(filename, pbpResString.join('\n'), 'utf8');
  //example get pbp_part
  // const pbpPartRes = await client.search({
  //   index: 'pbp_participation',
  //   size: 10,
  // });
  // console.log(pbpPartRes.hits.hits);

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
  // console.log(res.hits);

  // then format the data in some way to prepare it for the llm
  return "";
};

requestData({} as QuerySchema);

export default requestData;
