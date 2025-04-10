import { Paper, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { ResponseContext } from "../context/ResponseContext";


const ResponseDisplay = () => {
  const responseContext = useContext(ResponseContext);
  return (
    <Stack alignItems="stretch" justifyContent="center" width={"100%"} height={"100%"} paddingX={4} paddingY={8}>
      <Paper sx={{flex: 1, padding: 3}}>
        <Typography>
          {(responseContext?.response) ? (responseContext.response.map((v,i) => (((i&1)==1)) ? <b>{v}</b> : v)) : ""}
        </Typography>
      </Paper>
    </Stack>
  );
}

export default ResponseDisplay;