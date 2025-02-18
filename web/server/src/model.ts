import ollama, { Message as Msg } from 'ollama'
import { QuerySchema } from "@shared/QuerySchema";
import { query } from 'express';

class Message implements Msg {
    role: string;
    content: string;
    constructor(role: string, content: string) {
        this.role = role
        this.content = content
    }
}

// Given a user question and a list of context, return the model's response.
async function completeChat(question: string, context: [string], model: string = 'deepseek-r1:1.5b') {
    var messages: [Message];
    messages = [new Message("system", 'You are a coaching assistant for an NFL team. You are very knowledgeable on NFL players, plays, and game histories. You respond with helpful and CONCISE suggestions to users inquiring about the outcome of plays.')]
    messages.push(new Message('user', question))
    for (const c of context) {
        messages.push(new Message('assistant', "This was the outcome of a similar play: " + c))
    }
    const response = await ollama.chat({
        model: model,
        messages: messages
    });
    return response.message.content;
}

function createPrompt(querySchema: QuerySchema) {
    var offenseInfo: String;
    var defenseInfo: String;
    var offensePlayerInfo: String;
    var defensePlayerInfo: String;
    var playTypeInfo: String;
    var passDataInfo: String;
    var runDataInfo: String;
    var prompt: String;
    

    offenseInfo = querySchema.offenseTeam ? "The team on offense is " + querySchema.offenseTeam! + "." : "";
    
    
    defenseInfo = querySchema.defenseTeam ? "The team on defense is " + querySchema.defenseTeam! + "." : "";
    
    offensePlayerInfo = "The players on offense are " + querySchema.offensePlayers[0];
    for (let i = 1; i < querySchema.offensePlayers.length; i++) {
        offensePlayerInfo += ", " + querySchema.offensePlayers[i];
    }
    offensePlayerInfo += "."

    defensePlayerInfo = "The players on defense are " + querySchema.defensePlayers[0];
    for (let i = 1; i < querySchema.defensePlayers.length; i++) {
        defensePlayerInfo += ", " + querySchema.defensePlayers[i];
    }
    defensePlayerInfo += "."

    playTypeInfo = "The play was a " + querySchema.playType;

    if (querySchema.passData) {
        if (querySchema.passData.passingPlayer) {
            passDataInfo = querySchema.passData.passingPlayer! + " passed the ball";
        } else {
            passDataInfo = "The ball was passed";
        }
        if (querySchema.passData.passLength) {
            passDataInfo += " for " + querySchema.passData.passLength! + " yards";
        }
        if (querySchema.passData.passLocation) {
            passDataInfo += querySchema.passData.passLocation!;
        }
        if (querySchema.passData.receivingPlayer) {
            passDataInfo += " to " + querySchema.passData.receivingPlayer!
        } else {
            passDataInfo += " to a teammate"
        }
        passDataInfo += "."
    }

    if (querySchema.runData) {
        if (querySchema.runData.rushingPlayer) {
            runDataInfo = querySchema.runData.rushingPlayer! + " ran the ball"
        } else {
            runDataInfo = "The ball was ran";
        }
        if (querySchema.runData.runLocation) {
            runDataInfo += " for " + querySchema.runData.runLocation! + " yards"
        }
        if (querySchema.runData.runGap) {
            runDataInfo += " to the" + querySchema.runData.runGap!;
        }
        runDataInfo += ".";
    }
}

export default completeChat;