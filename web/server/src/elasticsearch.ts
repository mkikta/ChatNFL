import { Client } from "@elastic/elasticsearch";
import { convertPlayerIdToNames, QuerySchema } from "@shared/QuerySchema";
import { idToPlayer } from "../../shared/Players";
import * as fs from 'fs';

const filename = 'merged_pbp.txt';

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

  var defensePlayersNames = query.defensePlayers.map(id => idToPlayer[id].label)
  defensePlayersNames = defensePlayersNames.map(name => name.split(/\s+/)[1])

  var offensePlayerNames = []

  if (query.passData) {
    if (query.passData.passingPlayer) 
      {
        var passingPlayer = idToPlayer[query.passData.passingPlayer].label
        passingPlayer = passingPlayer.split(/\s+/)[0][0] + "." + passingPlayer.split(/\s+/)[1]
        offensePlayerNames.push(passingPlayer)
      }
    if (query.passData.receivingPlayer) {
      var receivingPlayer = idToPlayer[query.passData.receivingPlayer].label
      receivingPlayer = receivingPlayer.split(/\s+/)[0][0] + "." + receivingPlayer.split(/\s+/)[1]
      offensePlayerNames.push(receivingPlayer)
    }
  }
  if (query.runData) {
    if (query.runData.rushingPlayer) {
      var rushingPlayer = idToPlayer[query.runData.rushingPlayer].label
      rushingPlayer = rushingPlayer.split(/\s+/)[0][0] + "." + rushingPlayer.split(/\s+/)[1]
      offensePlayerNames.push(rushingPlayer)
    }
  }

  console.log(defensePlayersNames)
  console.log(offensePlayerNames)

  const res = await client.search({
    index: 'pbp',
    size: 10,
    body: {
      query: {
        function_score: {
          query: { match_all : {}},
          boost: 0,
          functions: [
            {
              filter: {
                query_string: {
                  fields: ["desc"],
                  query: offensePlayerNames.join(' OR ')
                }
              },
              weight: 20
            },
            {
              filter: {
                query_string: {
                  fields: ["desc"],
                  query: defensePlayersNames.join(' OR ')
                }
              },
              weight: 5
            },
            {
              filter: {
                query_string: {
                  fields: ["players_on_play"],
                  query: playersQuery
                }
              },
              weight: 20
            },
            {
              filter: {
                query_string: {
                  fields: ["posteam"],
                  query: query.offenseTeam!
                }
              },
              weight: 5
            },
            {
              filter: {
                query_string: {
                  fields: ["defteam"],
                  query: query.defenseTeam!
                }
              },
              weight: 5
            },
            {
              filter: {
                range: {
                  ["game_seconds_remaining"]: {
                    gte: query.gameSecondsLeft! - 150,
                    lte: query.gameSecondsLeft! + 150
                  }
                }
              },
              weight: 1
            },
            {
              filter: {
                range: {
                  ["yardline_100"]: {
                    gte: query.ballLocation! - 10,
                    lte: query.ballLocation! + 10
                  }
                }
              },
              weight: 1
            },
            {
              filter: {
                range: {
                  ["yrdstogo"]: {
                    gte: query.downDistance! - 5,
                    lte: query.downDistance! + 5
                  }
                }
              },
              weight: 1
            },
            {
              filter: {
                query_string: {
                  fields: ["down"],
                  query: String(query.currentDown!)
                }
              },
              weight: 1
            },
            {
              filter: {
                query_string: {
                  fields: ["play_type"],
                  query: query.playType
                }
              },
              weight: 1
            },
            {
              filter: {
                query_string: {
                  fields: ["pass_length"],
                  query: query.passData?.passLength ?? ""
                }
              },
              weight: 1
            },
            {
              filter: {
                query_string: {
                  fields: ["pass_location"],
                  query: query.passData?.passLocation ?? ""
                }
              },
              weight: 1
            },
            {
              filter: {
                query_string: {
                  fields: ["run_location"],
                  query: query.runData?.runLocation ?? ""
                }
              },
              weight: 1
            },
            {
              filter: {
                query_string: {
                  fields: ["run_gap"],
                  query: query.runData?.runGap ?? ""
                }
              },
              weight: 1
            }
          ],
          max_boost: 1000,
          score_mode: 'sum',
          boost_mode: 'multiply',
          min_score: 50
        }
      }
    }
  })
                 
  var context: String[] = [];

  const hits = res.hits.hits;

  for (const hit of hits) {
    const source = hit._source as {'desc': string};
    context.push(source.desc);
  }
  
  return context;
};

export default requestData;
