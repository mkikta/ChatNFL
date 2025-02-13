import express from 'express';
import { validate, Joi } from "express-validation";
import requestData from "./elasticsearch";
import { QuerySchema } from "@shared/QuerySchema";
import TEAMS from "@shared/Teams";
import PLAYERS from "@shared/Players";
import { ActionLocation, PassLength, RunGap } from '@shared/PlayEnums';
import completeChat from './model';

const api = express.Router();

const teamNameValidation = Joi.string().valid(...TEAMS.map(team => team.shortName));
const playerNameValidation = Joi.string().valid(...PLAYERS.map(player => player.id));

const queryValidator = {
  body: Joi.object({
    offenseTeam: teamNameValidation.optional(),
    offensePlayers: Joi.array().items(playerNameValidation).max(12).required(),
    defenseTeam: teamNameValidation.optional(),
    defensePlayers: Joi.array().items(playerNameValidation).max(12).required(),

    ballLocation: Joi.number().min(0).max(100).optional(),
    currentDown: Joi.number().min(1).max(4).optional(),
    downDistance: Joi.number().min(0).max(100).optional(),
    gameSecondsLeft: Joi.number().min(0).max(3600).optional(),

    playType: Joi.string().valid('pass', 'run').required(),

    // Information related to throws
    passData: Joi.alternatives().conditional('playType', {
      is: 'pass',
      then: Joi.object({
        passingPlayer: playerNameValidation.optional(),
        receivingPlayer: playerNameValidation.optional(),
        passLength: Joi.string().valid(...Object.values(PassLength)).optional(),
        passLocation: Joi.string().valid(...Object.values(ActionLocation)).optional(),
      }).required(),
      otherwise: Joi.forbidden()
    }),

    // Information related to runs
    runData: Joi.alternatives().conditional('playType', {
      is: 'run',
      then: Joi.object({
        rushingPlayer: playerNameValidation.optional(),
        runLocation: Joi.string().valid(...Object.values(ActionLocation)).optional(),
        runGap: Joi.string().valid(...Object.values(RunGap)).optional(),
      }).required(),
      otherwise: Joi.forbidden()
    }),
  })
};

api.post('/v1',

  // @ts-ignore
  validate(queryValidator),

  async (req, res) => {
    const data = req.body as QuerySchema
    console.log(data);

    // TODO: Request context from ElasticSearch
    requestData(data);

    // TODO: Feed content to LLM model
    let response = await completeChat("What is football?", [""]);
    console.log(response);
    response = response.substring(response.indexOf("</think>")+8);
    // Return information to user
    res.status(200).send(response);
  }
)

export default api;
