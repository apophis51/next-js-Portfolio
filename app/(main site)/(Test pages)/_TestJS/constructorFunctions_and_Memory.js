
//factory functions dont need the new keyword but constructor functions do

//const initialMemory = performance.memory.usedJSHeapSize;

// Reducing Initial Memory Usage
// While some of the initial memory usage is inherent to Node.js and V8, you can take steps to minimize it:

// Load Only Necessary Modules: Ensure that only the necessary modules are loaded.
// Use Smaller Node.js Runtimes: Consider using lightweight Node.js distributions if available.
// Optimize Your Code: Remove unnecessary global variables and memory-intensive operations at startup.
// Configure V8 Flags: Adjust V8 flags for heap size and garbage collection if you understand the implications. For example, --max-old-space-size can limit the maximum heap size.



// rss: Resident Set Size - the total memory allocated for the process, including heap, stack, and code segment.
// heapTotal: Total size of the allocated heap.
// heapUsed: Actual memory used from the heap.
// external: Memory used by C++ objects bound to JavaScript objects managed by V8.
// arrayBuffers: Memory allocated for ArrayBuffer and SharedArrayBuffer objects.
const initialMemory = process.memoryUsage().heapUsed;
console.log(process.memoryUsage())
console.log(process.memoryUsage().rss/1024/1024)
console.log(initialMemory/1024)

function kickAss() {

    this.animal = 'an ass'
}

let cooll = new kickAss()

console.log(cooll.animal)
function cool(){
    console.log('cool')
}

const badAss = new cool()

console.log(badAss)


const newAss = new kickAss()
// const a = new kickAss()
// const b = new kickAss()
// const c = new kickAss()
// const d = new kickAss()
// const e = new kickAss()
// const f = new kickAss()
// const g = new kickAss()
// const h = new kickAss()
// const i = new kickAss()
// const j = new kickAss()
// const k = new kickAss()
// const l = new kickAss()
// const m = new kickAss()
// const n = new kickAss()
// const o = new kickAss()
// const p = new kickAss()
// const q = new kickAss()
// const r = new kickAss()
// const s = new kickAss()
// const t = new kickAss()
// const u = new kickAss()
// const v = new kickAss()


const finalMemory = process.memoryUsage().heapUsed;
console.log(finalMemory/1024/1024)
const memoryUsed = finalMemory - initialMemory;
console.log('memory used in kilobytes', memoryUsed/1024);
newAss.animal = 'another ass'

const oldAss = new kickAss()

console.log(oldAss.animal)

console.log(newAss.animal)



console.log('cool')