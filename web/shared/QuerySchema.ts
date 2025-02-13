import { PlayType, PassLength, ActionLocation, RunGap } from "./PlayEnums";

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