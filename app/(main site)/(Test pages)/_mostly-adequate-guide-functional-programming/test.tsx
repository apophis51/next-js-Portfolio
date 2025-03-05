

function main()
{
// {const compose = (...fns) => (...args) => fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];
//composes functions from right to left
const compose = (...fns: ((...args: any[]) => any)[]) => (...args: any[]) => fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];
const toUpperCase = (x: string) => x.toUpperCase();
const exclaim = (x: any) => `${x}!`
const shout = compose(exclaim, toUpperCase);
console.log(shout('send in the clowns')); // "SEND IN THE CLOWNS!"
}
main()


// identity monad
function main2() {
class Identity<T> {
    constructor(public value: T) {
      this.value = value;
    }
    static of<T>(value: T) {
      return new Identity(value);
    }
    map<U>(fn: (value: T) => U) {
      return Identity.of(fn(this.value));
    }
    flatMap<U>(fn: (value: T) => U) {
      return fn(this.value);
    }
  }
  // Example usage:
  const result = Identity.of(5)
    .map(x => x * 2)
    .map(x => x + 3);
  
  console.log(result.value); // 13
}
main2()
  ////////////////////////////////////////////////////////

  class Maybe {
    constructor(value) {
      this.value = value;
    }
  
    static of(value) {
      return new Maybe(value);
    }
  
    map(fn) {
      return this.value == null ? Maybe.of(null) : Maybe.of(fn(this.value));
    }
  
    flatMap(fn) {
      return this.value == null ? Maybe.of(null) : fn(this.value);
    }
  }
  
  // Example usage:
  const safeDivide = (num, denom) =>
    denom === 0 ? Maybe.of(null) : Maybe.of(num / denom);
  
  const result = Maybe.of(10)
    .flatMap(x => safeDivide(x, 2))
    .map(x => x + 5);
  
  console.log(result.value); // 10 (since 10 / 2 = 5, then 5 + 5 = 10)
  
  const result2 = Maybe.of(10)
    .flatMap(x => safeDivide(x, 0)) // Division by zero
    .map(x => x + 5);
  
  console.log(result2.value); // null (prevents error)
  
  