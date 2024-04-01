



//'* / + -'



let arr = ['-', '+', '*', '*','/'];
let normalizedArr =[]

let sortarr ={
    '*': 0,
    '/': 1,
    '+': 2,
    '-': 3
}

let sortarr2 ={
    '0': '*',
    '1': '/',
    '2': '+',
    '3': '-'
}

for (x in arr){
    normalizedArr.push(sortarr[arr[x]])

}

console.log(normalizedArr)

let sortedArr = normalizedArr.sort((a,b) => a-b)
console.log(sortedArr)

let renormalizedArr = []


for (let x of normalizedArr){
    renormalizedArr.push(sortarr2[x])
}
console.log(renormalizedArr)