import { QuerySchema } from "@shared/QueryShema";
import axios from "axios"

// Eventually remove this.
export async function sendMockRequest() {
  const exampleSchema : QuerySchema = {
    offense_players: [],
    defense_players: [],
    play_type: "pass",
    pass_data: {},
  };
  return await queryPlay(exampleSchema);
}

async function queryPlay(schema : QuerySchema) {
  return (await axios.post('/api/v1', schema as object)).data;
}

export default queryPlay;