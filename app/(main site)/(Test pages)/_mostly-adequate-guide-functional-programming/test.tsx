

function main()
{
// {const compose = (...fns) => (...args) => fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];

//composes functions from right to left

const compose = (...fns: ((...args: any[]) => any)[]) => (...args: any[]) => fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];

// const compose2 = (f, g) => x => f(g(x));


const compose2 = (f: (arg0: any) => any, g: (arg0: any) => any) => (x: any) => f(g(x));

const capitalize = s => toUpperCase(head(s)) + toLowerCase(tail(s));




const toUpperCase = (x: string) => x.toUpperCase();
const exclaim = (x: any) => `${x}!`

//gay version;
//const shout = x => exclaim(toUpperCase(x));

const shout = compose(exclaim, toUpperCase);

console.log(shout('send in the clowns')); // "SEND IN THE CLOWNS!"

}

main()