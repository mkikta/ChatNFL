import { QuerySchema } from "@shared/QuerySchema";
import axios from "axios"

// Eventually remove this.
export async function sendMockRequest() {
  const exampleSchema : QuerySchema = {
    offensePlayers: [],
    defensePlayers: [],
    playType: "pass",
    passData: {},
  };
  return await queryPlay(exampleSchema);
}

async function queryPlay(schema : QuerySchema) {
  return (await axios.post('/api/v1', schema as object)).data;
}

export default queryPlay;