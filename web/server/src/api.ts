import express from 'express';
import { validate, Joi } from "express-validation";
import { QuerySchema } from "@shared/QueryShema";
import requestData from "./elasticsearch";

const api = express.Router();

const teamNameValidation = Joi.string().pattern(/^[A-Z]+$/).min(2).max(3);
const playerNameValidation = Joi.string().pattern(/^([0-9]{1,2}-)?[A-Za-z]+.[A-Za-z\-]+$/);

const queryValidator = {
  body: Joi.object({
    offense_team: teamNameValidation.optional(),
    offense_players: Joi.array().items(playerNameValidation).max(12).required(),
    defense_team: teamNameValidation.optional(),
    defense_players: Joi.array().items(playerNameValidation).max(12).required(),

    play_type: Joi.string().valid('pass', 'run').required(),

    // Information related to throws
    pass_data: Joi.alternatives().conditional('play_type', {
      is: 'pass',
      then: Joi.object({
        passing_player: Joi.string().optional(),
        receiving_player: Joi.string().optional(),
        pass_length: Joi.string().optional(),
        pass_location: Joi.string().optional(),
      }).required(),
      otherwise: Joi.forbidden()
    }),

    // Information related to runs
    run_data: Joi.alternatives().conditional('play_type', {
      is: 'run',
      then: Joi.object({
        rushing_player: Joi.string().optional(),
        run_location: Joi.string().optional(),
        run_gap: Joi.string().optional(),
      }).required(),
      otherwise: Joi.forbidden()
    }),
  })
};

api.post('/v1',

  // @ts-ignore
  validate(queryValidator),

  (req, res) => {
    const data = req.body as QuerySchema
    console.log(data);

    // TODO: Request context from ElasticSearch
    requestData(data);

    // TODO: Feed content to LLM model

    // Return information to user
    let result = "Not Yet Implemented";
    res.status(200).send(result);
  }
)

export default api;
