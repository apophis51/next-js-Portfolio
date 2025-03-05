import {pipe} from 'fp-ts/function'
import  {flow} from 'fp-ts/function'

//with flow the first function can take any ammount of values and the rest are unary

// with pipe they are unary

//first example
const size = (s: string) => s.length

const isAtLeast3 = (n: number) => n >= 3

let answer = pipe(
    'hello',
    size,
    isAtLeast3
)
console.log(answer) 
console.log(size('hello'))
console.log(isAtLeast3(size('hello')))


//second example

const trim = (s: string) => s.trim()    

pipe(
    ' hi ', 
    trim, //'hi'
    size, // 2
    isAtLeast3 //false
) //false

console.log(isAtLeast3(size(trim(' hi '))))

// third example

const isValid = (s: string) => pipe(
    s,
    trim,
    size,
    isAtLeast3
)



console.log(isValid(' hi '))

//forth exmaple

function forthExample() {
    const pipee = <A, B, C>(
        a: A,
        f: (a: A) => B,
        g: (b: B) => C
    ): C => g(f(a))
}

//fith 

const isLongEnough = flow(size, isAtLeast3)
console.log(isLongEnough('hello'))

const concat = (s1: string, s2: string) => s1 + s2

const isValidBetter = flow(concat, trim, size, isAtLeast3)

console.log(isValidBetter(' hi ', ' hi'))

export {answer}