
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
        if (model == "gemini") {
            console.log('hit')
            const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });
            const completion = await model.generateContent(prompt);
            const response = await completion.response;
            const text = await response.text();
            return text
        }

        if (model == "openai") {
            const chatCompletion = await openai.chat.completions.create({
                messages: [
                    { "role": "user", "content": prompt },
                ],
                model: "gpt-3.5-turbo",
            });

            return chatCompletion.choices[0].message.content
        }

        if (model == "lamma3") {
            const chatCompletion = await groq.chat.completions.create({
                "messages": [
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                "model": "llama-3.1-70b-versatile",
                "temperature": 1,
                "max_tokens": 1024,
                "top_p": 1,
                "stream": false,
                "stop": null
            });

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