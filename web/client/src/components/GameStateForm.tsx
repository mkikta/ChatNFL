import { FormControl, Grid2, InputAdornment, InputLabel, MenuItem, Paper, Select, Slider, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { QueryContext } from "../context/QueryContext";

const GameStateForm = () => {
  const queryContext = useContext(QueryContext);
  return (
  <Paper>
    <Typography variant={"h6"} textAlign={"center"}>Game State</Typography>
    <Grid2 container spacing={1} padding={1}>
      <Grid2 size={6}>
        <Typography>Ball on {queryContext?.data.ballLocation}. {queryContext?.data.downDistance} Yards to Go</Typography>
      </Grid2>
      <Grid2 size={6}>
      </Grid2>
      <Grid2 size={12}>
        <Slider
          value={[100-(queryContext?.data.ballLocation??0), 100-(queryContext?.data.ballLocation??0)+(queryContext?.data.downDistance??0)]}
          onChange={(_, newVal) => {
            const [ballLocation, targetLocation] = newVal as number[];
            queryContext!.setBallLocation(100-ballLocation);
            queryContext!.setDownDistance(targetLocation - ballLocation)
          }}
        />
      </Grid2>
      <Grid2 size={6}>
        <FormControl fullWidth>
          <InputLabel id="down-select-label">Down</InputLabel>
          <Select
            labelId="down-select-label"
            id="down-select"
            value={queryContext?.data.currentDown || ''}
            label="Down"
            onChange={(e) => {
              if (queryContext) {
                queryContext.setCurrentDown(+e.target.value || null);
              }
            }}
          >
            <MenuItem value={""}>Ignore</MenuItem>
            <MenuItem value={1}>1st Down</MenuItem>
            <MenuItem value={2}>2nd Down</MenuItem>
            <MenuItem value={3}>3rd Down</MenuItem>
            <MenuItem value={4}>4th Down</MenuItem>
          </Select>
        </FormControl>
      </Grid2>
      <Grid2 size={6}>
        <TextField
          fullWidth
          label="Total Time Remaining"
          value={(queryContext && ("gameSecondsLeft" in queryContext.data)) ? queryContext?.data.gameSecondsLeft : ""}
          onChange={(e) => {
            if (queryContext) {
              queryContext.setGameSecondsLeft(+e.target.value)
            }
          }}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">s</InputAdornment>,
            },
          }}
        />
      </Grid2>
    </Grid2>
  </Paper>
  );
}

export default GameStateForm;