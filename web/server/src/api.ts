import express from 'express';
import { validate, Joi } from "express-validation";
import { QuerySchema } from "@shared/QuerySchema";

const api = express.Router();

const teamNameValidation = Joi.string().pattern(/^[A-Z]+$/).min(2).max(3);
const playerNameValidation = Joi.string().pattern(/^([0-9]{1,2}-)?[A-Za-z]+.[A-Za-z\-]+$/);

const queryValidator = {
  body: Joi.object({
    offenseTeam: teamNameValidation.optional(),
    offensePlayers: Joi.array().items(playerNameValidation).max(12).required(),
    defenseTeam: teamNameValidation.optional(),
    defensePlayers: Joi.array().items(playerNameValidation).max(12).required(),

    ballLocation: Joi.number().min(0).max(100).optional(),
    currentDown: Joi.number().min(1).max(4).optional(),
    gameSecondsLeft: Joi.number().min(0).max(3600).optional(),

    playType: Joi.string().valid('pass', 'run').required(),

    // Information related to throws
    passData: Joi.alternatives().conditional('playType', {
      is: 'pass',
      then: Joi.object({
        passingPlayer: Joi.string().optional(),
        receivingPlayer: Joi.string().optional(),
        passLength: Joi.string().optional(),
        passLocation: Joi.string().optional(),
      }).required(),
      otherwise: Joi.forbidden()
    }),
    
    // Information related to runs
    runData: Joi.alternatives().conditional('playType', {
      is: 'run',
      then: Joi.object({
        rushingPlayer: Joi.string().optional(),
        runLocation: Joi.string().optional(),
        runGap: Joi.string().optional(),
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

  // TODO: Feed content to LLM model

  // Return information to user
  let result = "Not Yet Implemented";
  res.status(200).send(result);
})

export default api;