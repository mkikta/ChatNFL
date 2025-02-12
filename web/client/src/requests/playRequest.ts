import { PlayType } from "@shared/PlayEnums";
import { QuerySchema } from "@shared/QuerySchema";
import axios from "axios"

// Eventually remove this.
export async function sendMockRequest() {
  const exampleSchema : QuerySchema = {
    offensePlayers: [],
    defensePlayers: [],
    playType: PlayType.PASS,
    passData: {},
  };
  return await queryPlay(exampleSchema);
}

async function queryPlay(schema : QuerySchema) {
  try {
    const result = await axios.post('/api/v1', schema as object);
    if (result.data) return result.data as string;
  } catch (e) {
    console.error(e);
  }
  return "Error";
}

export default queryPlay;