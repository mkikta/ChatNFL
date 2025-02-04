import { HfInference } from "@huggingface/inference";

// access code should be stored in proxy server for front-end protection
const accessCode = "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";

const hf = new HfInference(accessCode);

const infer = async() => {
    const chatCompletion = await hf.chatCompletion({
        model: "deepseek-ai/DeepSeek-R1",
        messages: [
            {
                role: "user",
                content: "What is the capital of France?"
            }
        ],
        provider: "together",
        max_tokens: 500
    });

    console.log(chatCompletion.choices[0].message);
}
