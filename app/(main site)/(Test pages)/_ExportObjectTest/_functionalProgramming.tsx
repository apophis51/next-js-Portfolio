


const sum = (a: number, b: number): number => a + b;


let answer = sum(3, 5)

answer



const greaterThan = (n: number) => {
    return (x: number) => x > n;
  };
  
  const greaterThanTen = greaterThan(10);


  console.log(greaterThanTen(33))


  type MyFunc<T> = (s: T) => (c: number) => number;

const genericFunc: MyFunc<number> = (n: number) => (c: number) => n / c;


console.log(genericFunc(10)(5))