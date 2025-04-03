import { Autocomplete, FormControl, Grid2, InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material";
import { useContext } from "react";
import { QueryContext } from "../context/QueryContext";
import { ActionLocation, PassLength, PlayType, RunGap } from "@shared/PlayEnums";
import { createPlayerAutocompleteProps } from "./playerAutocompleteHelper";
import { idToPlayer } from "@shared/Players";


const ChosenPlayForm = () => {
  const queryContext = useContext(QueryContext);
  return (
  <Paper>
    <Typography variant={"h6"} textAlign={"center"}>Play</Typography>
    <Grid2 container spacing={1} padding={1}>
      <Grid2 size={4}>
        <FormControl fullWidth>
          <InputLabel id="play-type-select-label">Play Type</InputLabel>
          <Select
            labelId="play-type-select-label"
            id="play-type-select"
            value={queryContext?.data.playType || ""}
            label="Play Type"
            onChange={(e) => {
              if (queryContext) {
                queryContext.setPlayType(e.target.value as PlayType);
              }
            }}
          >
            <MenuItem value={PlayType.PASS}>Pass</MenuItem>
            <MenuItem value={PlayType.RUN}>Run</MenuItem>
          </Select>
        </FormControl>
      </Grid2>
      {(queryContext?.data.playType == PlayType.PASS ? (<PassPlay />) : null)}
      {(queryContext?.data.playType == PlayType.RUN ? (<RunPlay />) : null)}
    </Grid2>
  </Paper>
  );
}

const PassPlay = () => {
  const queryContext = useContext(QueryContext);
  const offensePlayerIds = queryContext?.data.offensePlayers || [];
  const offensePlayerOptions = offensePlayerIds.map((id) => idToPlayer[id]);
  return (<>
    <Grid2 size={4}>
      <FormControl fullWidth>
        <InputLabel id="pass-location-select-label">Pass Location</InputLabel>
        <Select
          labelId="pass-location-select-label"
          id="pass-location-select"
          value={queryContext?.data.passData?.passLocation || ActionLocation.UNDEFINED}
          label="Pass Location"
          onChange={(e) => {
            if (queryContext) {
              queryContext.setPassLocation(e.target.value as ActionLocation);
            }
          }}
        >
          <MenuItem value={ActionLocation.LEFT}>Left</MenuItem>
          <MenuItem value={ActionLocation.MIDDLE}>Middle</MenuItem>
          <MenuItem value={ActionLocation.RIGHT}>Right</MenuItem>
        </Select>
      </FormControl>
    </Grid2>
    <Grid2 size={4}>
      <FormControl fullWidth>
        <InputLabel id="pass-length-select-label">Pass Distance</InputLabel>
        <Select
          labelId="pass-length-select-label"
          id="pass-length-select"
          value={queryContext?.data.passData?.passLength || PassLength.UNDEFINED}
          label="Pass Length"
          onChange={(e) => {
            if (queryContext) {
              queryContext.setPassLength(e.target.value as PassLength);
            }
          }}
        >
          <MenuItem value={PassLength.SHORT}>Short</MenuItem>
          <MenuItem value={PassLength.DEEP}>Deep</MenuItem>
        </Select>
      </FormControl>
    </Grid2>
    <Grid2 size={6}>
      <Autocomplete
        {...createPlayerAutocompleteProps("Passing Player")}
        options={offensePlayerOptions}
        getOptionLabel={(player) => player?.shortName || ""}
        value={queryContext?.data.passData?.passingPlayer ? idToPlayer[queryContext?.data.passData?.passingPlayer] : null}
        onChange={(_, newValue) => {
          if (queryContext) {
            queryContext?.setPassingPlayer(newValue?.id ?? "");
          }
        }}
      />
    </Grid2>
    <Grid2 size={6}>
      <Autocomplete
        {...createPlayerAutocompleteProps("Receiving Player")}
        options={offensePlayerOptions}
        getOptionLabel={(player) => player?.shortName || ""}
        value={queryContext?.data.passData?.receivingPlayer ? idToPlayer[queryContext?.data.passData?.receivingPlayer] : null}
        onChange={(_, newValue) => {
          if (queryContext) {
            queryContext?.setReceivingPlayer(newValue?.id ?? "");
          }
        }}
      />
    </Grid2>
  </>);
}

const RunPlay = () => {
  const queryContext = useContext(QueryContext);
  const offensePlayerIds = queryContext?.data.offensePlayers || [];
  const offensePlayerOptions = offensePlayerIds.map((id) => idToPlayer[id]);
  return (<>
    <Grid2 size={4}>
      <FormControl fullWidth>
        <InputLabel id="run-location-select-label">Run Location</InputLabel>
        <Select
          labelId="run-location-select-label"
          id="run-location-select"
          value={queryContext?.data.runData?.runLocation || ActionLocation.UNDEFINED}
          label="Run Location"
          onChange={(e) => {
            if (queryContext) {
              queryContext.setRunLocation(e.target.value as ActionLocation);
            }
          }}
        >
          <MenuItem value={ActionLocation.LEFT}>Left</MenuItem>
          <MenuItem value={ActionLocation.MIDDLE}>Middle</MenuItem>
          <MenuItem value={ActionLocation.RIGHT}>Right</MenuItem>
        </Select>
      </FormControl>
    </Grid2>
    <Grid2 size={4}>
      <FormControl fullWidth>
        <InputLabel id="run-gap-select-label">Run Gap</InputLabel>
        <Select
          labelId="run-gap-select-label"
          id="run-gap-select"
          value={queryContext?.data.runData?.runGap || RunGap.UNDEFINED}
          label="Run Gap"
          onChange={(e) => {
            if (queryContext) {
              queryContext.setRunGap(e.target.value as RunGap);
            }
          }}
        >
          <MenuItem value={RunGap.END}>End</MenuItem>
          <MenuItem value={RunGap.GUARD}>Guard</MenuItem>
          <MenuItem value={RunGap.TACKLE}>Tackle</MenuItem>
        </Select>
      </FormControl>
    </Grid2>
    <Grid2 size={12}>
      <Autocomplete
        {...createPlayerAutocompleteProps("Rushing Player")}
        options={offensePlayerOptions}
        getOptionLabel={(player) => player?.shortName || ""}
        value={queryContext?.data.runData?.rushingPlayer ? idToPlayer[queryContext?.data.runData?.rushingPlayer] : null}
        onChange={(_, newValue) => {
          if (queryContext) {
            queryContext?.setRushingPlayer(newValue?.id ?? "");
          }
        }}
      />
    </Grid2>
  </>);
}

export default ChosenPlayForm;