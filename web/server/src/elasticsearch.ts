import { Client } from "@elastic/elasticsearch";
import { QuerySchema } from "@shared/QuerySchema";

const client = new Client({
  node: 'http://localhost:9200',
  auth: { username: process.env.ELASTICSEARCH_USERNAME as string, password: process.env.ELASTICSEARCH_PASSWORD as string },
});

// use query to search for data using client
const requestData = async (query: QuerySchema) => {
  // client.search() api docs: https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#_search

  const pbpRes = await client.search({
    index: 'pbp',
    size: 10, 
    body: {
      query: {
        function_score: {
          query: {
            match_all: {}
          },
          functions: [
            {
              script_score: {
                script: {
                  source: `
                    int matches = 0;
                    if (doc['offense_players'].size() > 0) {
                      String[] storedIds = doc['offense_players'].value.split(";");
                      for (String id : params.inputIds) {
                        if (Arrays.asList(storedIds).contains(id)) {
                          matches++;
                        }
                      }
                    }
                    return matches;
                  `,
                  params: {
                    storedIds: query.offensePlayers
                  }
                }
              }
            }
          ],
          boost_mode: "replace"
        }
      }
    }
  });

  var context: String[] = [];

  for (var hit in pbpRes.hits.hits) {
    context.push(String(hit))
  }

  return context;
};

export default requestData;
