const Groq = require('groq-sdk');
import Container from '@mui/material/Container';
import Highlighter from '@/app/(main site)/Components/Utils/highlighter'
import dynamic from 'next/dynamic'
import { headers } from 'next/headers'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Suspense } from 'react'
import * as markdownUtils from '@/app/globalUtils/markdownUtils'
import { TableOfContentsGenerator } from '@/app/globalComponents/TableOfContentsGenerator'
import '@/app/(main site)/Components/styles/prism.css'
import OpenAI from "openai";
const { GoogleGenerativeAI } = require("@google/generative-ai");
import {recursionStory} from './test'


// let test = require("dotenv").config();
// console.log('test', test.parsed.OPENAI_API_KEY)

const groq = new Groq({
    apiKey: process.env.GROQAPI
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY}); 
console.log(process.env.OPENAI_API_KEY)

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function main3() {
  console.log('ran')
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  let prompt = recursionStory + "now give me the next chapter"

  // let prompt = "teach me javascript recursion programming in multiple chapters."

  let fullstory = ""
  let x =0
  while(x <3){
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);

 
  x++
  fullstory += text
  prompt = fullstory + "now give me the next chapter"
  
  }
  let { totalTokens } =  await model.countTokens(fullstory);
  console.log(totalTokens)
  console.log(fullstory)
  // return text
  return fullstory
}

async function main2() {
  console.log('ran')
  const completion = await openai.chat.completions.create({
    messages: [
        {"role": "user", "content": "Teach me functional Programming with javascript"},
        ],
    model: "gpt-3.5-turbo",
  });

  return completion
}

async function main() {
    try{
  const chatCompletion = await groq.chat.completions.create({
    "messages": [
      {
        "role": "user",
        "content": "Teach me Regex with javascript "
      }
    ],
    "model": "llama-3.1-70b-versatile",
    "temperature": 1,
    "max_tokens": 1024,
    "top_p": 1,
    "stream": false,
    "stop": null
  });
    
  return chatCompletion
}
catch(error){
    console.log(error)
}
}


// (async () => {let completion = await main();
//     let prelimReults = completion.choices[0].message.content
//     console.log(JSON.stringify(prelimReults));

// // let parsedResults =  prelimReults.message.content.replace(/\+/g, '')  bad
// // console.log(`"${parsedResults}"` || "failed")  bad
// })()

export default async function Page() {


     //let completion = await main();
    //  let completion = await main3()
    let convertoJson = 'lskfjalkdjflkdfj'
    //  let convertoJson = completion
    //  let convertoJson = completion.choices[0].message.content; 
     //console.log(convertoJson); 
    //let convertoJson = '**Functional Programming with JavaScript**\n' +
    '==============================================\n' +
    '\n' +
    '**What is Functional Programming?**\n' +
    '---------------------------------\n' +
    '\n' +
    'Functional programming is a programming paradigm that emphasizes the use of pure functions, immutability, and the avoidance of changing state. It\'s a way of writing code that\'s easier to reason about, test, and maintain.\n' +
    '\n' +
    '**Key Concepts**\n' +
    '----------------\n' +
    '\n' +
    '### 1. Pure Functions\n' +
    '\n' +
    'A pure function is a function that:\n' +
    '\n' +
    '* Always returns the same output given the same inputs\n' +
    '* Has no side effects (e.g., it doesn\'t modify external state or depend on external state)\n' +
    '* Doesn\'t depend on external state or variables\n' +
    '\n' +
    'Example:\n' +
    '```javascript\n' +
    'function add(a, b) {\n' +
    '  return a + b;\n' +
    '}\n' +
    '```\n' +
    'This function is pure because it always returns the same output given the same inputs, and it has no side effects.\n' +
    '\n' +
    '### 2. Immutability\n' +
    '\n' +
    'Immutability means that once a value is created, it cannot be changed. This is in contrast to mutable objects, which can be modified after creation.\n' +
    '\n' +
    'Example:\n' +
    '```javascript\n' +
    'const person = { name: \'John\', age: 30 };\n' +
    'person.name = \'Jane\'; // mutation!\n' +
    '```\n' +
    'In this example, the `person` object is mutable, and its `name` property is changed.\n' +
    '\n' +
    '### 3. Higher-Order Functions\n' +
    '\n' +
    'A higher-order function is a function that takes another function as an argument or returns a function as output.\n' +
    '\n' +
    'Example:\n' +
    '```javascript\n' +
    'function twice(f) {\n' +
    '  return function(x) {\n' +
    '    return f(f(x));\n' +
    '  };\n' +
    '}\n' +
    '\n' +
    'const double = twice(x => x * 2);\n' +
    'console.log(double(5)); // 20\n' +
    '```\n' +
    'In this example, the `twice` function takes a function `f` as an argument and returns a new function that applies `f` twice.\n' +
    '\n' +
    '### 4. Closures\n' +
    '\n' +
    'A closure is a function that has access to its own scope and the scope of its outer functions.\n' +
    '\n' +
    'Example:\n' +
    '```javascript\n' +
    'function outer(x) {\n' +
    '  function inner() {\n' +
    '    console.log(x);\n' +
    '  }\n' +
    '  return inner;\n' +
    '}\n' +
    '\n' +
    'const inner = outer(5);\n' +
    'inner(); // 5\n' +
    '```\n' +
    'In this example, the `inner` function has access to the `x` variable in the `outer` function\'s scope.\n' +
    '\n' +
    '**Functional Programming Techniques**\n' +
    '--------------------------------------\n' +
    '\n' +
    '### 1. Map\n' +
    '\n' +
    'The `map` function applies a transformation to each element of an array.\n' +
    '\n' +
    'Example:\n' +
    '```javascript\n' +
    'const numbers = [1, 2, 3, 4, 5];\n' +
    'const doubles = numbers.map(x => x * 2);\n' +
    'console.log(doubles); // [2, 4, 6, 8, 10]\n' +
    '```\n' +
    '### 2. Filter\n' +
    '\n' +
    'The `filter` function creates a new array with only the elements that pass a test.\n' +
    '\n' +
    'Example:\n' +
    '```javascript\n' +
    'const numbers = [1, 2, 3, 4, 5];\n' +
    'const evens = numbers.filter(x => x % 2 === 0);\n' +
    'console.log(evens); // [2, 4]\n' +
    '```\n' +
    '### 3. Reduce\n' +
    '\n' +
    'The `reduce` function applies a function to each element of an array, reducing it to a single value.\n' +
    '\n' +
    'Example:\n' +
    '```javascript\n' +
    'const numbers = [1, 2, 3, 4, 5];\n' +
    'const sum = numbers.reduce((a, b) => a + b, 0);\n' +
    'console.log(sum); // 15\n' +
    '```\n' +
    '### 4. Pipe\n' +
    '\n' +
    'The `pipe` function chains multiple functions together, allowing you to compose complex transformations.\n' +
    '\n' +
    'Example:\n' +
    '```javascript\n' +
    'const double = x => x * 2;\n' +
    'const addOne = x => x + 1;\n' +
    'const pipe = (f, g) => x => f(g(x));\n' +
    'const result = pipe(double, addOne)(5);\n' +
    'console.log(result); // 12\n' +
    '```\n' +
    '**Real-World Example**\n' +
    '---------------------\n' +
    '\n' +
    'Suppose we have a list of users, and we want to get the list of users who are older than 30.\n' +
    '\n' +
    '```javascript\n' +
    'const users = [\n' +
    '  { name: \'John\', age: 25 },\n' +
    '  { name: \'Jane\', age: 35 },\n' +
    '  { name: \'Bob\', age: 40 },\n' +
    '];\n' +
    '\n' +
    'const olderThan30 = users.filter(user => user.age > 30);\n' +
    'console.log(olderThan30); // [{ name: \'Jane\', age: 35 }, { name: \'Bob\', age: 40 }]\n' +
    '```\n' +
    'In this example, we use the `filter` function to create a new array with only the users who are older than 30.\n' +
    '\n' +
    '**Conclusion**\n' +
    '----------\n' +
    '\n' +
    'Functional programming is a powerful paradigm that can help you write more maintainable, efficient, and scalable code. By using pure functions, immutability, and higher-order functions, you can write code that\'s easier to reason about and test.'
    console.log(convertoJson);
    // let convertoJson = JSON.stringify(prelimReults)


    //convertoJson = convertoJson.replace(/\\\"/g, '"');

  // Step 2: Properly format code blocks
  // Add a newline before and after each code block if missing
  //convertoJson = convertoJson.replace(/```javascript/g, '\n```javascript');
  //convertoJson = convertoJson.replace(/```\n/g, '```\n\n');

  // Step 3: Replace or fix common MDX issues
  // Remove invalid escape characters and unnecessary spaces/newlines
  //convertoJson = convertoJson.replace(/\\(?!["'\\])/g, ''); // Remove \ not followed by " or '
  //convertoJson = convertoJson.replace(/\n{3,}/g, '\n\n'); //
    
    // let parsedResults =  prelimReults.message.content.replace(/\+/g, '')
    // console.log(`"${parsedResults}"` || "failed")
    
    return (
        <Container maxWidth="xl"  >
                {/* <div className='bg-white p-9 md:flex flex-col items-center justify-center'> */}
                {/* <div className='bg-white p-9 md:flex-col flex items-center justify-evenly overflow-y-hidden overflow-x-hidden'> */}
    
          <div className='bg-white p-9  flex-col  md:flex md:flex-row md:overflow-visible items-center justify-evenly overflow-y-hidden overflow-x-hidden'>
            {/* <link rel="stylesheet" href="prism.css" /> */}
            {/* <Script src = 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js'
          strategy="afterInteractive" /> */}
            {/* <div className='prose  prose-sm max-w-none flex flex-col items-center justify-center'> */}
            {/* <div className='self-start max-w-0 invisible basis-0'>  <TableOfContentsGenerator markdownTOCData={markdownTOCData} /></div> */}
    
            <div className='prose prose-sm lg:prose-xl prose-a:text-red-600'>
              {/* <ReactMarkdown components={components}>{post.data.attributes.Content}</ReactMarkdown> */}
              <MDXRemote
                // components={MDXcomponents}
                source={convertoJson}
              />
    
              <Highlighter />
            </div>
    
            {/* <p><a href={markdownTOCData[0].link}>{markdownTOCData[0].text}</a></p> */}
          </div>
    
    
        </Container>)
}


/** 
'Here are some sample JavaScript code snippets in Markdown format:\n' +
      '\n' +
      '### Example 1: Hello World\n' +
      '```\n' +
      'console.log("Hello, World!");\n' +
      '```\n' +
      '### Example 2: Variables and Data Types\n' +
      '```\n' +
      'let name = "John Doe";\n' +
      'let age = 30;\n' +
      'console.log(`My name is ${name} and I am ${age} years old.`);\n' +
      '```\n' +
      '### Example 3: Functions\n' +
      '```\n' +
      'function greet(name) {\n' +
      '  console.log(`Hello, ${name}!`);\n' +
      '}\n' +
      'greet("Jane Doe");\n' +
      '```\n' +
      '### Example 4: Conditional Statements\n' +
      '```\n' +
      'let score = 85;\n' +
      'if (score >= 90) {\n' +
      '  console.log("You got an A!");\n' +
      '} else if (score >= 80) {\n' +
      '  console.log("You got a B!");\n' +
      '} else {\n' +
      '  console.log("You got a C or lower.");\n' +
      '}\n' +
      '```\n' +
      '### Example 5: Loops\n' +
      '```\n' +
      'for (let i = 0; i < 5; i++) {\n' +
      '  console.log(`Iteration ${i}: Hello!`);\n' +
      '}\n' +
      '```\n' +
      '### Example 6: Array Methods\n' +
      '```\n' +
      'let fruits = ["apple", "banana", "cherry"];\n' +
      'console.log(`The first fruit is: ${fruits[0]}`);\n' +
      'fruits.push("date");\n' +
      'console.log(`The updated array is: ${fruits}`);\n' +
      '```\n' +
      '### Example 7: Object-Oriented Programming\n' +
      '```\n' +
      'class Person {\n' +
      '  constructor(name, age) {\n' +
      '    this.name = name;\n' +
      '    this.age = age;\n' +
      '  }\n' +
      '  introduce() {\n' +
      '    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);\n' +
      '  }\n' +
      '}\n' +
      'let person = new Person("John Doe", 30);\n' +
      'person.introduce();\n' +
      '```\n' +
      'I hope these examples help! Let me know if you have any questions or need further assistance.'
      */
     