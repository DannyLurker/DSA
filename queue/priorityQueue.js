// Queue Data Structure
class PriorityQueue {
  constructor() {
    this.storage = [];
  }

  enqueue(element) {
    if (this.storage.length === 0) {
      this.storage.push(element);
    } else {
      let added = false;
      for (let i = 0; i < this.storage.length; i++) {
        // Element[1] is the priority, assuming lower number means higher priority
        if (element[1] < this.storage[i][1]) {
          this.storage.splice(i, 0, element);
          added = true;
          break;
        }
      }
      // If the element was not added in the loop (it has the lowest priority), push it to the end
      if (!added) {
        this.storage.push(element);
      }
    }
  }

  dequeue() {
    if (this.storage.length === 0) {
      return undefined; // Return undefined if the queue is empty
    }
    // Dequeue should return the removed element as well
    return this.storage.shift();
  }

  peek() {
    if (this.storage.length === 0) {
      return undefined; // Return undefined if the queue is empty
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
    return this.storage.length;
  }

  printQueue() {
    // Better representation for complex elements like [name, priority]
    return this.storage.map((item) => `[${item[0]}, ${item[1]}]`).join(", ");
  }
}

// --- Testing PriorityQueue ---
console.log("--- Testing PriorityQueue ---");

const pq = new PriorityQueue();

console.log("\n--- Test 1: isEmpty() on empty queue ---");
console.log("Is queue empty? (Expected: true)", pq.isEmpty()); // Expected: true
console.log("Queue size (Expected: 0):", pq.size()); // Expected: 0

console.log("\n--- Test 2: Enqueue elements with varying priorities ---");
pq.enqueue(["Task A", 3]);
pq.enqueue(["Task B", 1]);
pq.enqueue(["Task C", 5]);
pq.enqueue(["Task D", 2]);
pq.enqueue(["Task E", 1]); // Test duplicate priority

// Expected order: ["Task B", 1], ["Task E", 1], ["Task D", 2], ["Task A", 3], ["Task C", 5]
console.log("After enqueuing 5 tasks:", pq.printQueue());
console.log("Storage array after enqueue:", JSON.stringify(pq.storage)); // Use JSON.stringify for better array visualization
console.log("Is queue empty? (Expected: false)", pq.isEmpty()); // Expected: false
console.log("Queue size (Expected: 5):", pq.size()); // Expected: 5

console.log("\n--- Test 3: peek() ---");
// Expected: ["Task B", 1] (the highest priority element)
console.log("Peek at front (Expected: [Task B, 1]):", pq.peek());

console.log("\n--- Test 4: dequeue() ---");
let dequeuedItem1 = pq.dequeue(); // Should remove ["Task B", 1]
console.log("Dequeued item 1 (Expected: [Task B, 1]):", dequeuedItem1);
console.log("Queue after 1 dequeue:", pq.printQueue());
console.log("Queue size (Expected: 4):", pq.size());

let dequeuedItem2 = pq.dequeue(); // Should remove ["Task E", 1]
console.log("Dequeued item 2 (Expected: [Task E, 1]):", dequeuedItem2);
console.log("Queue after 2 dequeues:", pq.printQueue());
console.log("Queue size (Expected: 3):", pq.size());

console.log("\n--- Test 5: Enqueue after some dequeues ---");
pq.enqueue(["Task F", 0]); // High priority
pq.enqueue(["Task G", 4]); // Medium priority

// Expected order: ["Task F", 0], ["Task D", 2], ["Task A", 3], ["Task G", 4], ["Task C", 5]
console.log("Queue after more enqueues:", pq.printQueue());
console.log("Storage array after more enqueue:", JSON.stringify(pq.storage));
console.log("Queue size (Expected: 5):", pq.size());

console.log("\n--- Test 6: Dequeue all elements ---");
while (!pq.isEmpty()) {
  console.log("Dequeued:", pq.dequeue());
}
console.log("Queue after dequeuing all:", pq.printQueue());
console.log("Is queue empty? (Expected: true)", pq.isEmpty()); // Expected: true
console.log("Queue size (Expected: 0):", pq.size()); // Expected: 0

console.log("\n--- Test 7: dequeue() and peek() on empty queue ---");
console.log("Dequeuing from empty queue (Expected: undefined):", pq.dequeue()); // Expected: undefined
console.log("Peeking at empty queue (Expected: undefined):", pq.peek()); // Expected: undefined

console.log("\n--- Test 8: clear() ---");
pq.enqueue(["Item 1", 10]);
pq.enqueue(["Item 2", 20]);
console.log("Queue before clear:", pq.printQueue());
pq.clear();
console.log("Queue after clear:", pq.printQueue());
console.log("Is queue empty? (Expected: true)", pq.isEmpty()); // Expected: true
console.log("Queue size (Expected: 0):", pq.size()); // Expected: 0
