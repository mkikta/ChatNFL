import ollama, { Message as Msg } from 'ollama'

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
        messages.push(new Message('assistant', c))
    }
    const response = await ollama.chat({
        model: model,
        messages: messages
    });
    return response.message.content;
}
