import { Box, Button, Stack, Typography } from "@mui/material";


const Form = () => {
  return (
  <Stack direction="column" justifyContent="space-between" alignContent="center" height="100%">
    <Typography textAlign={"center"} variant="h1">
      ChatNFL
    </Typography>
    <Box ></Box>
    <Stack direction="column" alignContent="center">
      
      <Button>Generate</Button>
    </Stack>
  </Stack>
  );
};

export default Form;