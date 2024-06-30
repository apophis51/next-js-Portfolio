
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

console.log('cool')

const items = [
    { type: 'fruit', name: 'apple' },
    { type: 'vegetable', name: 'carrot' },
    { type: 'fruit', name: 'banana' },
    { type: 'vegetable', name: 'lettuce' },
  ];
  
  const groupedItems = items.reduce((accumulator, currentItem) => {
    const existingGroup = accumulator.find(group => group.type === currentItem.type);
    if (existingGroup) {
      existingGroup.items.push(currentItem);
    } else {
      accumulator.push({
        type: currentItem.type,
        items: [currentItem],
      });
    }
    return accumulator;
  }, []);
  
  console.log(groupedItems);


  let bugArray = [{cool: 'haha'}, {cool: 'fuck'}]

  bugArray.forEach(bug => {bug.cool = 'yes'})

  console.log(bugArray)

  let randomArray = [1,2,3]


  randomArray.forEach((num, index) => {
    randomArray[index] =  num + 1
  })

  console.log(randomArray)
let goodjson = '[{"question": "Country*", "response": "United States of America"},  {"question": "First Name*", "response": "Malcolm"},  {"question": "Last Name*", "response": "Vernon"},  {"question": "Address Line 1*", "response": "1685 coral way apt b"},  {"question": "City*", "response": "Largo"},  {"question": "State*", "response": "Florida"},  {"question": "Postal Code*", "response": "33771"},  {"question": "Email address*", "response": "malcolmxvernon@hotmail.com"},  {"question": "Phone Device Type*", "response": "mobile"},  {"question": "Country Phone Code*", "response": "+1"},  {"question": "Phone number*", "response": "970703947"},  {"question": "How did you hear about us?", "response": "pick linkdin or indeed if available"},  {"question": "Are you now or have you ever been employed or contracted by an FIS company?", "response": "No"},  {"question": "Do you have any relatives that currently work for FIS?", "response": "No"},  {"question": "Do you now, or will you in the future, require sponsorship to work in the country you are applying to?", "response": "No"},  {"question": "What is your official notice period?", "response": "2 weeks"},  {"question": "What is your current or most recent salary?", "response": "19 an hour"},  {"question": "What is your desired salary?", "response": "70k or what ever the equivalent is for that hourly. im open to what ever"},  {"question": "Do you have any restrictions that would apply to your employment at FIS, such as a Non-Compete or No Solicitation agreement?", "response": "always say no to non-competes"}]'


let oribinalsampletext = `[
  '[{"question": "AIJobTitleCompanyRejectionMessageJobDescriptionCollapse", "response": "Software Developer"}]',
  '[{"question": "Choose Your CareerPublic Relation SpecialistFinance InternHuman Resources InternGraphic Design InternPublic Relations InternAccounting InternSales InternMarketing InternCommunications CoordinatorManagement AnalystWeb Developer InternSales RecruiterContent WriterDigital Marketing InternMarket Research AnalystSoftware Developer InternUnity 3D Developer InternCybersecurity InternContent Writer Intern", "response": "Software Developer Intern"}]',
  '[{"question": "name*", "response": "Malcolm Vernon"}]',
  '[{"question": "email id*", "response": "malcolmxvernon@hotmail.com"}]',
  '[{"question": "phone number*", "response": "9707033947"}]',
  '[{"question": "Choose Your Career*", "options": ["Communications Coordinator", "Management Analyst", "Web Developer Intern", "Sales Recruiter", "Content Writer", "Digital Marketing Intern", "Market Research Analyst", "Software Developer Intern"]',
  '[{"question": "No file chosenBrowse", "response": ""}]',
  '[{"question": "Search for:", "response": ""}]'
]`

  let sampletext = '[{"question": "AIJobTitleCompanyRejectionMessageJobDescriptionCollapse", "response": "Software Developer"},{"question": "Choose Your CareerPublic Relation SpecialistFinance InternHuman Resources InternGraphic Design InternPublic Relations InternAccounting InternSales InternMarketing InternCommunications CoordinatorManagement AnalystWeb Developer InternSales RecruiterContent WriterDigital Marketing InternMarket Research AnalystSoftware Developer InternUnity 3D Developer InternCybersecurity InternContent Writer Intern", "response": "Software Developer Intern"},{"question": "name*", "response": "Malcolm Vernon"},{"question": "email id*", "response": "malcolmxvernon@hotmail.com"},{"question": "phone number*", "response": "9707033947"}]'

  let thirdtest = `[
  '[{"question": "Choose Your CareerPublic Relation SpecialistFinance InternHuman Resources InternGraphic Design InternPublic Relations InternAccounting InternSales InternMarketing InternCommunications CoordinatorManagement AnalystWeb Developer InternSales RecruiterContent WriterDigital Marketing InternMarket Research AnalystSoftware Developer InternUnity 3D Developer InternCybersecurity InternContent Writer Intern", "response": "Software Developer Intern"}]',
  '[{"question": "name*", "response": "Malcolm Vernon"}]',
  '[{"question": "email id*", "response": "malcolmxvernon@hotmail.com"}]',
  '[{"question": "phone number*", "response": "(970) 703-3947"}]',
  '[{"question": "Choose Your Career*", "options": ["Communications Coordinator", "Management Analyst", "Web Developer Intern", "Sales Recruiter", "Content Writer", "Digital Marketing Intern", "Market Research Analyst", "Software Developer Intern"]',
  '[{"question": "No file chosenBrowse", "response": ""}]',
  '[{"question": "Search for:", "response": ""}]'
]`
let goodJsonParse = await JSON.parse(goodjson)
console.log(sampletext)
let SampleTextParse = await JSON.parse(sampletext)
SampleTextParse
// let thirdTextParse = await JSON.parse(thirdtest)


let regexTest = `Regular Expressions, abbreviated as Regex or Regexp, are a string of characters created within the framework of Regex syntax rules. You can easily manage your data with Regex, which uses commands like finding, matching, and editing. Regex can be used in
\`\`\`
fjlakjdfjf
\`\`\`
jlkjjl or even when having sex`

const result = regexTest.replace(/```[\s\S]*?```/g, '');

console.log(result);