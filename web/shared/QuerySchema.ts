export interface QuerySchema {
  offenseTeam?: string,
  defenseTeam?: string,
  offensePlayers: string[],
  defensePlayers: string[],
  ballLocation?: number|null,
  currentDown?: number|null,
  gameSecondsLeft?: number|null,
  playType: string,
  passData?: {
    passingPlayer?: string,
    receivingPlayer?: string,
    passLength?: string,
    passLocation?: string,
  },
  runData?: {
    rushingPlayer?: string,
    runLocation?: string,
    runGap?: string,
  }
};