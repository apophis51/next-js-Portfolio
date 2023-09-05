class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    append(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            return;
        }
        
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
    }

    print() {
        let current = this.head;
        while (current) {
            console.log(current.data);
            current = current.next;
        }
    }
}

// Creating a linked list
const myList = new LinkedList();
console.log(myList)
myList.append(10);
console.log(myList)
myList.append(20); 
console.log(myList)
myList.append(30);
console.log(myList)
myList.append(40);
myList.append(50);



console.log("fsfdffadafdsfsdf",myList.head.next.data)
// let test =  LinkedList {  head: Node { data: 10, next: Node { data: 20, next: [Node] } }}
myList.print();


console.log(JSON.stringify(myList))