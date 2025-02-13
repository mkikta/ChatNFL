import { Autocomplete, Box, createFilterOptions, Paper, TextField } from "@mui/material";
import { useContext } from "react";
import { QueryContext } from "../context/QueryContext";
import TEAMS, { Team } from "@shared/Teams"

const shortNameToTeam : {[key: string] : Team} = {};
for (const team of TEAMS) {
  shortNameToTeam[team.shortName] = team;
}

interface TeamInputProps {
  offense: boolean
};
const TeamInput = ({offense} : TeamInputProps) => {
  const queryContext = useContext(QueryContext);
  const selectedTeam = queryContext?.data[offense ? 'offenseTeam' : 'defenseTeam']
  return (
  <Paper>
    <Autocomplete
      options={TEAMS}
      value={selectedTeam ? shortNameToTeam[selectedTeam] : null}
      onChange={(_, newValue) => {
        (offense ? queryContext!.setOffenseTeam : queryContext!.setDefenseTeam)(newValue?.shortName ?? "")
      }}
      renderInput= {(params) => {
        return (<TextField {...params} label={offense? "Offense Team" : "Defense Team"} />)
      }}
      renderOption= {(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box
            key={key}
            component="li"
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...optionProps}
          >
            <img
              loading="lazy"
              width="30"
              src={`https://static.www.nfl.com/image/private/f_auto/league/${option.logo}`}
              alt=""
            />
            {option.label}
          </Box>
        );
      }}
      filterOptions={createFilterOptions<Team>({limit: 5})}
    />
  </Paper>
  );
}
// https://static.www.nfl.com/image/private/f_auto/league/
export default TeamInput;