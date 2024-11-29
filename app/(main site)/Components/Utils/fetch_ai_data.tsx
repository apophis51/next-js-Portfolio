
import OpenAI from "openai";
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Groq = require('groq-sdk');

export  function fetch_ai_data(model: string, prompt: string) {
console.log('hit')
    const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const groq = new Groq({ apiKey: process.env.GROQAPI });


    async function multipleGenerations(second_prompt: string, loops: number) {
        const token_model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" })
        let fullResult = ''
        let totalTokens = 0
        let tokencount: { totalTokens: number } = { totalTokens: 0 }
        loops = loops - 1
        console.log(loops)
        while (loops != 0) {
            console.log(loops)

            const completion = await singleGeneration();
            fullResult += completion
            tokencount = await token_model.countTokens(fullResult);
            console.log(tokencount)
            prompt = fullResult + second_prompt
            totalTokens += tokencount.totalTokens
            loops--
        }
        console.log(totalTokens)
        return fullResult

    }

    async function singleGeneration() {
        if (model == "gemini gemini-1.5-flash") {
            console.log('hit')
            const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });
            const completion = await model.generateContent(prompt);
            const response = await completion.response;
            console.log(response) 
            const text = await response.text();
            return text
        }

        if (model == "openai o1-mini") {
            const chatCompletion = await openai.chat.completions.create({
                messages: [
                    { "role": "user", "content": prompt },
                ],
                // model: "gpt-3.5-turbo",
                model: "o1-mini", 
                // max_tokens=2000,

                // gpt-4o-mini  .150 per million tokens and 128k context   gpt-4o  and o1-mini
             //   is 3 per million and 128k text context o1-preview   is 15 dollars per million
             //benchmarks https://aimlapi.com/comparisons/chatgpt-4o-vs-o1-mini
 

                
            });
            console.log(chatCompletion)
            //tokens arr included in the response

            return chatCompletion.choices[0].message.content
        }

        if (model == "openai gpt-4o-mini") {
            const chatCompletion = await openai.chat.completions.create({
                messages: [
                    { "role": "user", "content": prompt },
                ],
                // model: "gpt-3.5-turbo",
                model: "gpt-4o-mini", 
                // max_tokens=2000,

                // gpt-4o-mini  .150 per million tokens and 128k context $0.600 / 1M output tokens  gpt-4o  and o1-mini
             //   is 3 per million and 128k text context o1-preview $12.00 / 1M output** tokens  is 15 dollars per million
             //benchmarks https://aimlapi.com/comparisons/chatgpt-4o-vs-o1-mini
 

                
            });
            console.log(chatCompletion)
            //tokens arr included in the responsee

            return chatCompletion.choices[0].message.content
        }

        if (model == "llama-3.1-70b-versatile") {
            const chatCompletion = await groq.chat.completions.create({
                "messages": [
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                // "model": "llama-3.1-70b-versatile",
                "model": "llama-3.1-70b-versatile",
                "temperature": 1,
                "max_tokens": 8000,
                "top_p": 1,
                "stream": false,
                "stop": null
            });

            console.log(chatCompletion) 
            return chatCompletion.choices[0].message.content

        }
        else {

            return 'bad inpput recieved'
        }
    }


    //return 'test'
   // return 'test'
    return {
        singleGeneration, multipleGenerations
    }

}