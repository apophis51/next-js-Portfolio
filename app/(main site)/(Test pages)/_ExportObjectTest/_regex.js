
//start quokka with "ctl + shift + p and look for quokka start"
//Using Promise.resolve() to Yield Control
//.innerText reads the formatted text of a dom element
//.textContent reads the raw text of a dom element
//.click() simulates a click on an element
//.attributes gets array of element attributes
//element.className gets class attributes or you can use element.classList you can also use  .add, .remove, .toggle, .contains on them
//vitest environment options https://vitest.dev/config/#environment
//.element.parentNode.className gets classname of a parrent node
//observer.disconect to kill a mutation observer
// grab all the dives of a certain class
/*
Grab all dom elements that contain the word select
const allElements = document.querySelectorAll('*');

const elementsContainingSelect = Array.from(allElements).filter(element => {
    // Check if the element's text content or any attribute value contains the word "Select"
    const elementText = element.textContent || element.innerText || '';
    const elementAttributes = Array.from(element.attributes).map(attr => attr.value).join(' ');
    return elementText.includes('Select') || elementAttributes.includes('Select');
});
*/
/*

dispatching a mouse event

const Mouseevent = new MouseEvent('mousedown', {
    bubbles: true,
    cancelable: true,
    view: window
});
    const button = document.getElementById('myButton');
    button.dispatchEvent(Mouseevent);
*/
/* get parrent div text
const childElement = document.getElementById('childButton');
const parentText = parentDiv.textContent.trim();

*/
/*
Using await Promise.resolve() to Yield Control
In the context of your asynchronous function, await Promise.resolve() yields control back to the event loop, allowing other microtasks (like the MutationObserver callback) to execute before resuming the function. This effectively makes your function more responsive to changes.

Key Points
Microtasks: All queued microtasks will run before your function resumes.
Macrotasks: Only those macrotasks that are ready to run (due to timing) will run before your function resumes. Others might still be pending.
Rendering Tasks: The browser may perform rendering updates between function yields, ensuring the UI remains responsive.
*/
let text = 'This example is the same as above, but we use named capturing groups to remember the matched words instead. This way, we can access the matched words by their meanings.'


let regexCaptureGroup = /(the)/
let namedCapturedGroup = /(?<word>the)/


let matches = text.match(regexCaptureGroup)
let test = text.replace(regexCaptureGroup, 'test')

let namedMatches = text.match(namedCapturedGroup)
let namedObject = namedMatches.groups


matches             

test

namedMatches 
namedObject

const findDuplicates = 'foo foo bar me as above, but ';
const regex = /\b\w+\s+\b/g;
console.log(findDuplicates.match(regex));

const personList = `First_Name: John, Last_Name: Doe
First_Name: Jane, Last_Name: Smith`;

const regexpNames = /First_Name: (\w+), Last_Name: (\w+)/g;
for (const match of personList.matchAll(regexpNames)) {
  console.log(`Hello ${match[1]} ${match[2]}`);
}


let newText = 'This example is the same as above, but we use named capturing groups to remember the matched words instead. This way, we can access the matched words by their meanings.'

let newRegEx = /This/g

let newMatches = newText.match(newRegEx)

console.log(newMatches)

let testSnippet1 = '   option  focused, 1 of 10. 10 results available.…press Tab to select the option and exit the menu.'
let testSnippet2 = 'Caret IconCaret symbol'
let testSnippet3 = ' fuck fuck fuck'
let regex1 = /option  focused/
let regex2 = /Caret/

let Evaluate_These_Patterns = [
    /option  focused/,
    /Caret/
]

evaluateSnippet1 = testSnippet2.match(/Caret/) 
let toocool = regex1.test(testSnippet1)
toocool
let toocool2 = regex2.test(testSnippet2)
toocool2

let malcool = function evaluate(){
let accumulator = []
Evaluate_These_Patterns.forEach(pattern => {
    accumulator.push(pattern.test(testSnippet3))
})
if (accumulator.includes(true)){
    return true
}
else{
    return false
}
}

console.log(malcool())



let assTest = 'alkdfjldkfjldkfjlsj   sdlfkjf *jdflskjf'

let assRegex= /\*/

let assEval = assRegex.test(assTest)

assEval


function PassedByRef(data){
    let outputValue = data
    return(
        {output: () => outputValue,
         update: (newValue) => outputValue = newValue
         }
    )
}
let myJobInit = (PassedByRef('Programmer'))

let myJobChange = myJobInit.update
let myJob = myJobInit.output()


console.log(myJob)

myJobChange('unemployed programmer')

console.log(myJob)


let tooth = [4]

let tooth1 = tooth[0]

tooth1

let tooth2 = tooth1

tooth2
tooth1 = 5
tooth2

