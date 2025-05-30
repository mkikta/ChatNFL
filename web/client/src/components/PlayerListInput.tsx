import {
  Autocomplete,
  Box,
  ButtonBase,
  Grid2,
  Paper,
  Stack,
  styled,
  Typography,
  TextField
} from "@mui/material";
import { useContext, useState } from "react";
import { QueryContext } from "../context/QueryContext";
import { createPlayerAutocompleteProps } from "./playerAutocompleteHelper";
import { idToPlayer, Player, PLAYERS } from "@shared/Players"; // Make sure PLAYERS is available

const TypographyStrikethrough = styled(Typography)`
  button:hover & {
    text-decoration: line-through;
  }
`;

interface PlayerListInputProps {
  offense: boolean;
}

const PlayerListInput = ({ offense }: PlayerListInputProps) => {
  const targetField = offense ? "offensePlayers" : "defensePlayers";
  const opposingField = offense ? "defensePlayers" : "offensePlayers";
  const queryContext = useContext(QueryContext);
  const [rawValue, setRawValue] = useState("");

  // Get IDs of players already selected on the opposing team
  const selectedCurrent = queryContext?.data[targetField] || [];
  const selectedOpposing = queryContext?.data[opposingField] || [];

  // Filter out players already selected on the other team
  const availablePlayers = PLAYERS.filter(
    (player) => !selectedOpposing.includes(player.id) && !selectedCurrent.includes(player.id)
  );

  return (
    <Paper>
      <Stack direction={"column"}>
        <Typography variant={"h6"} textAlign={"center"}>
          {offense ? "Offense Players" : "Defense Players"}
        </Typography>

        <Autocomplete
          {...createPlayerAutocompleteProps("Add Player")}
          options={availablePlayers}
          getOptionLabel={(player: Player) => player.shortName}
          renderInput={(params) => <TextField {...params} label="Add Player" />}
          value={null}
          inputValue={rawValue}
          onInputChange={(_, newValue) => setRawValue(newValue)}
          onChange={(_, newValue) => {
            if (queryContext) {
              setRawValue("");
              (offense
                ? queryContext.setOffensePlayers
                : queryContext.setDefensePlayers)((prev) => {
                if (newValue) {
                  return [...prev, newValue.id];
                } else {
                  return prev;
                }
              });
            }
          }}
        />

        <Box sx={{ height: "200px", overflowX: "clip", overflowY: "scroll" }}>
          <Grid2 container>
            {(queryContext?.data[targetField] || []).map((id, i) => {
              const player = idToPlayer[id];
              return (
                <Grid2 key={i} size={6}>
                  <ButtonBase
                    sx={{ justifyContent: "flex-start", width: "100%" }}
                    disableRipple
                    onClick={() => {
                      if (queryContext) {
                        (offense
                          ? queryContext.setOffensePlayers
                          : queryContext.setDefensePlayers)((prev) => {
                          const lineup = [...prev];
                          lineup.splice(i, 1);
                          return lineup;
                        });
                      }
                    }}
                  >
                    <Stack
                      direction={"row"}
                      padding={1}
                      alignItems={"center"}
                    >
                      <img
                        loading="lazy"
                        width="30"
                        src={`https://static.www.nfl.com/image/upload/t_person_squared_mobile/f_auto/league/${player.headshot}`}
                        alt=""
                      />
                      <TypographyStrikethrough>
                        {player.shortName}
                      </TypographyStrikethrough>
                    </Stack>
                  </ButtonBase>
                </Grid2>
              );
            })}
          </Grid2>
        </Box>
      </Stack>
    </Paper>
  );
};

export default PlayerListInput;
