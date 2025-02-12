import { GoogleGenerativeAI } from "@google/generative-ai";


const API_KEY: string = process.env.GEMINI_API_KEY as string
const genAI = new GoogleGenerativeAI(API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

function getElasticSearchData() {

}

function transformPrompt(){

}

function getLlmResponse(){

}

function transformResponse(){

}

function sendResponse(){
    
}


function getPrompt(): string {
    return "Write a haiku about recursion in programming."
}

async function getResult(prompt: string) {
    const result = await model.generateContent(prompt)
    return result
}

async function main() {
    const prompt = getPrompt()
    const result = await getResult(prompt)
    console.log(result.response.text())
}

main()
