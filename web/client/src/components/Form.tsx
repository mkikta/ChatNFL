import { Button, Grid2, Stack, Typography } from "@mui/material";
import PlayerList from "./PlayerListInput";
import TeamInput from "./TeamInput";
import BallState from "./GameStateForm";
import ChosenPlayForm from "./ChosenPlayForm";
import { QueryContext } from "../context/QueryContext";
import { useContext } from "react";
import queryPlay from "../requests/playRequest";
import { ResponseContext } from "../context/ResponseContext";


const Form = () => {
    const queryContext = useContext(QueryContext);
    const responseContext = useContext(ResponseContext);
    return (
        <Stack direction="column" justifyContent="space-between" alignContent="center" height="100%">
            <Typography textAlign={"center"} variant="h2" color="black">
                ChatNFL
            </Typography>
            <Stack direction="column" alignContent="center" spacing={3}>
                <Grid2 container>
                    <Grid2 size={6}>
                        <TeamInput offense={true} />
                    </Grid2>
                    <Grid2 size={6}>
                        <TeamInput offense={false} />
                    </Grid2>
                </Grid2>
                <Grid2 container>
                    <Grid2 size={6}>
                        <PlayerList offense={true} />
                    </Grid2>
                    <Grid2 size={6}>
                        <PlayerList offense={false} />
                    </Grid2>
                </Grid2>
                <BallState />
                <ChosenPlayForm />
                <Button
                    variant="contained"
                    onClick={async () => {
                        const response = await queryPlay(queryContext?.data!);
          
                        responseContext?.setResponse(response.split("**"));
                    }}
                >Generate</Button>
            </Stack>
        </Stack>
    );
};

export default Form;
