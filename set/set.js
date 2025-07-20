class MySet {
  constructor() {
    this.values = [];
  }

  add = function (element) {
    if (this.values.includes(element)) {
      return false; // Element already exists
    }
    this.values.push(element);
    return true; // Element added successfully
  };

  remove = function (element) {
    const indexOfElement = this.values.indexOf(element);
    if (indexOfElement === -1) {
      // If element is not found
      return false;
    }
    this.values.splice(indexOfElement, 1);
    return true; // Element removed successfully
  };

  clearAllElementInSet = function () {
    this.values = []; // Simpler way to clear the array
  };

  size = function () {
    return this.values.length;
  };

  checkElement = function (element) {
    return this.values.includes(element); // Corrected: this.values, not this.value
  };

  union = function (secondSet) {
    const newSet = new MySet();
    // Add all elements from the first set
    this.values.forEach((element) => newSet.add(element));
    // Add all elements from the second set
    secondSet.values.forEach((element) => newSet.add(element));
    return newSet; // Union should return a new set, not modify the original
  };

  intersection = function (secondSet) {
    const intersectionSet = new MySet(); // Return a new MySet object
    if (secondSet.size() > 0) {
      for (let i = 0; i < secondSet.size(); i++) {
        const secondSetCurrentValue = secondSet.values[i]; // Corrected
        if (this.values.includes(secondSetCurrentValue)) {
          intersectionSet.add(secondSetCurrentValue);
        }
      }
    }
    return intersectionSet; // Return the new set
  };

  subset = function (secondSet) {
    // If the size of the potential subset is greater than the current set,
    // it cannot be a subset. This is an early exit optimization.
    if (secondSet.size() > this.size()) {
      return false;
    }

    // Loop through each element of the secondSet
    for (let i = 0; i < secondSet.size(); i++) {
      const elementOfSecondSet = secondSet.values[i]; // Corrected
      // If any element from secondSet is NOT in this set, then it's not a subset
      if (!this.values.includes(elementOfSecondSet)) {
        return false; // Found an element not present, so it's not a subset
      }
    }
    // If the loop completes, it means all elements of secondSet were found in this set
    return true; // It is a subset
  };

  // --- Metode toString() yang baru ---
  toString = function () {
    // Mengembalikan string dalam format {element1, element2, ..., elementN}
    return `{${this.values.join(", ")}}`;
  };
}

const firstSet = new MySet();
firstSet.add(1);
firstSet.add(2);
firstSet.add(3);
console.log("FirstSet add : ", firstSet.values); // Output: [1, 2, 3]

const secondSet = new MySet();
secondSet.add(3);
secondSet.add(4);
secondSet.add(5);
console.log("second set add : ", secondSet.values); // Output: [3, 4, 5]

const unionResult = firstSet.union(secondSet);
console.log("Union first set and second set : ", unionResult.values); // Output: [1, 2, 3, 4, 5]

console.log("first set size : ", firstSet.size()); // Output: 3 (firstSet tidak berubah karena union mengembalikan set baru)

firstSet.remove(1);
console.log("first set value after remove : ", firstSet.values); // Output: [2, 3]

firstSet.clearAllElementInSet();
console.log("clear all element of first set : ", firstSet.values); // Output: []

firstSet.add(1);
firstSet.add(2);
firstSet.add(3);
firstSet.add(4);
firstSet.add(5);
firstSet.add(6);
firstSet.add(7);

const thirdSet = new MySet();
thirdSet.add(2);
thirdSet.add(3);
thirdSet.add(4);
thirdSet.add(1);

console.log("\n--- Testing Subset ---");
console.log("First set for subset test: ", firstSet.values); // Output: [1, 2, 3, 4, 5, 6, 7]
console.log("Third set for subset test: ", thirdSet.values); // Output: [2, 3, 4, 1]

console.log("Is thirdSet a subset of firstSet? ", firstSet.subset(thirdSet)); // Output: true

const fourthSet = new MySet();
fourthSet.add(1);
fourthSet.add(2);
fourthSet.add(10); // 10 is not in firstSet
console.log("Fourth set for subset test: ", fourthSet.values); // Output: [1, 2, 10]
console.log("Is fourthSet a subset of firstSet? ", firstSet.subset(fourthSet)); // Output: false

console.log("\n--- Testing Intersection ---");
const intersectionResult = firstSet.intersection(thirdSet);
console.log("intersection first and third set : ", intersectionResult.values); // Output: [1, 2, 3, 4]

console.log("\n--- Testing toString ---");
console.log(firstSet.toString());
