// Queue Data Structure
class Queue {
  constructor() {
    this.storage = [];
  }

  enqueue(element) {
    this.storage.push(element);
  }

  dequeue() {
    if (this.storage.length === 0) {
      return undefined;
    }

    this.storage.shift();
  }

  peek() {
    if (this.storage.length === 0) {
      return undefined;
    }

    return this.storage[0];
  }

  isEmpty() {
    return this.storage.length === 0;
  }

  clear() {
    this.storage = [];
  }

  size() {
    const storageSize = this.storage.length;
    return storageSize;
  }

  printQueue() {
    const queueDataString = this.storage.join(", ");
    return queueDataString;
  }
}

// Testing
const firstQueue = new Queue();

firstQueue.enqueue(1);
firstQueue.enqueue(2);
firstQueue.enqueue(3);

console.log("Enqueue 3 Values: ", firstQueue.storage);

firstQueue.dequeue();
console.log("Dequeue: ", firstQueue.storage);

console.log("Check size: ", firstQueue.size());

console.log("Check Empty: ", firstQueue.isEmpty());

console.log("Peek: ", firstQueue.peek());

console.log("Print queue: ", firstQueue.printQueue());

firstQueue.clear();
console.log("After clear function: ", firstQueue.storage);
