import { Client } from "@elastic/elasticsearch";
import { QuerySchema } from "@shared/QuerySchema";

const client = new Client({
  node: 'http://localhost:9200',
  auth: { username: process.env.ELASTICSEARCH_USERNAME as string, password: process.env.ELASTICSEARCH_PASSWORD as string },
});

// use query to search for data using client
const requestData = async (query: QuerySchema) => {
  // client.search() api docs: https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#_search

  var playersQuery: string = "(*" + query.offensePlayers[0] + "*)";
  for (let i = 1; i < query.offensePlayers.length; i++) {
    playersQuery = playersQuery + " OR (*" + String(query.offensePlayers[i]) + "*)"
  }
  for (var player in query.defensePlayers) {
    playersQuery = playersQuery + " OR (*" + String(player) + "*)"
  }

  const res = await client.search({
    index: 'pbp',
    size: 5,
    body: {
      query: {
        bool: {
          should: [
            {
              query_string: {
                fields: ["players_on_play"],
                query: playersQuery
              }
            },
            {
              query_string: {
                fields: ["posteam"],
                query: query.offenseTeam!
              }
            },
            {
              query_string: {
                fields: ["defteam"],
                query: query.defenseTeam!
              }
            },
            {
              range: {
                ["game_seconds_remaining"]: {
                  gte: query.gameSecondsLeft! - 150,
                  lte: query.gameSecondsLeft! + 150
                }
              }
            },
            {
              range: {
                ["yardline_100"]: {
                  gte: query.ballLocation! - 10,
                  lte: query.ballLocation! + 10
                }
              }
            },
            {
              range: {
                ["yrdstogo"]: {
                  gte: query.downDistance! - 5,
                  lte: query.downDistance! + 5
                }
              }
            },
            {
              query_string: {
                fields: ["down"],
                query: String(query.currentDown!)
              }
            },
            {
              query_string: {
                fields: ["play_type"],
                query: query.playType
              }
            }
          ]
        }
      }
    }
  })

  var context: String[] = [];

  const hits = res.hits.hits;

  for (const hit of hits) {
    const source = hit._source as {'desc': string};
    context.push("The result of a similar play was: " + source.desc);
  }
  
  return context;
};

export default requestData;
