


const sum = (a: number, b: number): number => a + b;
let answer = sum(3, 5)
answer



const greaterThan = (n: number) => {
    return (x: number) => x > n;
  };
  const greaterThanTen = greaterThan(10);
  console.log(greaterThanTen(33))

/**
Currying Example 1
*/
type MyFunc<T> = (s: T) => (c: number) => number;
const genericFunc: MyFunc<number> = (n: number) => (c: number) => n / c;
console.log(genericFunc(10)(5))
/**
Currying Example 2
*/
const curry = (fn: any) => {
  return function curried(...args: number[]) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return function (...nextArgs: number[]) {
        return curried(...args, ...nextArgs);
      };
    }
  };
};
const NameSpace1 = {
  add: (a: number, b: number) => a + b
}
const curriedAdd = curry(NameSpace1.add);

console.log(curriedAdd(1)(2)); // Output: 3


/** 
Decorators In JavaScript
*/

type AddFunction = (a: number, b: number) => number;
function logDecorator(fn: AddFunction)  {
  return function(...args: [number, number]) {
    console.log(`Calling function with arguments: ${args}`);
    return fn(...args);
  };
}

function add(a: number, b: number) {
  return a + b;
}

                                  
// Another decorator example
function timeDecorator(fn: Function) {
  return function (...args: number[]) {
    console.time('Execution Time');
    const result = fn(...args);
    console.timeEnd('Execution Time');
    return result;
  };
}

function timeExecutionDecorator(fn: Function) {
  return function (...args: any) {
    const start = performance.now();
    const result = fn(...args);
    const end = performance.now();
    console.log(`Execution time: ${end - start}ms`);
    return result;
  };
}
// Applying multiple decorators
const decoratedAddWithTimeExecution = 
                             timeExecutionDecorator(
                             timeDecorator(
                             logDecorator(
                             add)
                             ));

// Use the function with multiple decorators
console.log(decoratedAddWithTimeExecution(332344232423434234234234323423432343434234444, 44333333444444444444444444444444444444444444));  


/**
 * Function Composition (pipeline does the same but left to right instead)
 */

const compose = (...fns: any) => (x: number) =>
  fns.reduceRight((acc: number[], fn: any) => fn(acc), x);

const double = (x: number) => x * 2;
const square = (x: number) => x * x;

const doubleThenSquare = compose(square, double);

console.log(doubleThenSquare(3)); // Output: 36


/**
 * Pipeline example 1
 */

(() => {
const pipe = (...fns: any) => (x: string) =>
  fns.reduce((acc: string[], fn:any) => fn(acc), x);

const trim = (str: string) => str.trim();
const toUpperCase = (str: string) => str.toUpperCase();
const exclaim = (str: string) => str + '!';
const shout = pipe(trim, toUpperCase, exclaim);
console.log(shout('  hellfo ')); 
})();

/**
 * pipeline example 1 converted to composition
 */
(() => {
const compose = (...fns: Function[]) => (x: string) =>
  fns.reduceRight((acc: string, fn: Function) => fn(acc), x);

const trim = (str: string) => str.trim();
const toUpperCase = (str: string) => str.toUpperCase();
const exclaim = (str: string) => str + '!';

const shout = compose(exclaim, toUpperCase, trim);

console.log(shout('  hfello ')); // Output: "HELLO!"
})();

/**
 * Point-Free Style (also known as tacit programming?)
 */
const addIt = (a: number, b: number) => a + b;
const increment = addIt.bind(null, 1);

console.log(increment(2)); // Output: 3



/**
 * Decorator functions chaining
 */

(() => {
  // Decorator functions as methods
const Decorators = {
  log: function (): any {
    const original = this;
    return function (...args: number[]): any {
      console.log(`Calling function with arguments: ${args}`);
      return original.apply(this, args);
    };
  },

  time: function (): any {
    const original = this;
    return function (...args: number[]): any {
      console.time('Execution Time');
      const result = original.apply(this, args);
      console.timeEnd('Execution Time');
      return result;
    };
  }
};

// Utility function to chain decorators
Function.prototype.decorate = function (decorator) {
  return decorator.call(this);
};


// Original function
function add(a: number, b: number) {
  return a + b;
}

// Apply decorators using chaining
const decoratedAdd = add
  .decorate(Decorators.log)
  .decorate(Decorators.time);

// Use the decorated function
console.log(decoratedAdd(2, 3));  // Output: Calling function with arguments: 2,3
                                  //         Execution Time: <time>ms
                                  //         5

})();
  
