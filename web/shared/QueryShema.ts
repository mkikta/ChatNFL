export interface QuerySchema {
  offense_team?: string,
  defense_team?: string,
  offense_players: string[],
  defense_players: string[],
  play_type: string,
  pass_data?: {
    passing_player?: string,
    receiving_player?: string,
    pass_length?: string,
    pass_location?: string,
  },
  run_data?: {
    rushing_player?: string,
    run_location?: string,
    run_gap?: string,
  }
};