import { PlayType, PassLength, ActionLocation, RunGap } from "./PlayEnums";
import { idToPlayer } from "./Players";

export interface QuerySchema {
  offenseTeam?: string,
  defenseTeam?: string,
  offensePlayers: string[],
  defensePlayers: string[],
  ballLocation?: number|null,
  currentDown?: number|null,
  downDistance?: number|null,
  gameSecondsLeft?: number|null,
  playType: PlayType,
  passData?: {
    passingPlayer?: string,
    receivingPlayer?: string,
    passLength?: PassLength,
    passLocation?: ActionLocation,
  },
  runData?: {
    rushingPlayer?: string,
    runLocation?: ActionLocation,
    runGap?: RunGap,
  }
};

const convertPlayerIdToNames = (schema : QuerySchema) => {
  schema.offensePlayers = schema.offensePlayers.map(id => idToPlayer[id].label)
  schema.defensePlayers = schema.defensePlayers.map(id => idToPlayer[id].label)
  if (schema.passData) {
    if (schema.passData.passingPlayer) schema.passData.passingPlayer = idToPlayer[schema.passData.passingPlayer].label
    if (schema.passData.receivingPlayer) schema.passData.receivingPlayer = idToPlayer[schema.passData.receivingPlayer].label
  }
  if (schema.runData) {
    if (schema.runData.rushingPlayer) schema.runData.rushingPlayer = idToPlayer[schema.runData.rushingPlayer].label
  }
}
export {convertPlayerIdToNames};