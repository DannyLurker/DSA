class Stack {
  // Properti dan konstruktor
  constructor() {
    this.count = 0;
    this.storage = {};
  }

  // Metode push
  push = function (value) {
    this.storage[this.count] = value;
    this.count++;
  };

  // Metode pop
  pop = function () {
    if (this.count === 0) {
      return undefined;
    }
    this.count--;
    const result = this.storage[this.count];
    delete this.storage[this.count];
    return result;
  };

  // Metode peek
  peek = function () {
    if (this.count === 0) {
      // Tambahan: Penanganan kasus stack kosong
      return undefined;
    }
    return this.storage[this.count - 1];
  };

  // Metode size
  size = function () {
    return this.count;
  };

  // Metode isEmpty
  isEmpty = function () {
    return this.count === 0;
  };
}

const newStack = new Stack();

console.log("--- Tahap Awal ---");
console.log("Stack kosong?", newStack.isEmpty()); // true
console.log("Ukuran Stack:", newStack.size()); // 0

newStack.push("Danny");
console.log("\n--- Setelah Push 'Danny' ---");
console.log("Storage:", newStack.storage); // { '0': 'Danny' }
console.log("Ukuran Stack:", newStack.size()); // 1
console.log("Puncak Stack:", newStack.peek()); // Danny

newStack.push("Elon Musk");
newStack.push("Vitalik");
console.log("\n--- Setelah Push 'Elon Musk' & 'Vitalik' ---");
console.log("Storage:", newStack.storage); // { '0': 'Danny', '1': 'Elon Musk', '2': 'Vitalik' }
console.log("Ukuran Stack:", newStack.size()); // 3
console.log("Puncak Stack:", newStack.peek()); // Vitalik

const poppedValue = newStack.pop();
console.log("\n--- Setelah Pop ---");
console.log("Nilai yang di-pop:", poppedValue); // Vitalik
console.log("Storage:", newStack.storage); // { '0': 'Danny', '1': 'Elon Musk' } (indeks 2 dihapus)
console.log("Puncak Stack:", newStack.peek()); // Elon Musk
console.log("Ukuran Stack:", newStack.size()); // 2

console.log("\n--- Pemeriksaan Akhir ---");
console.log("Stack kosong?", newStack.isEmpty()); // false
console.log("Ukuran Stack:", newStack.size()); // 2

newStack.pop(); // Pop "Elon Musk"
newStack.pop(); // Pop "Danny"
console.log("\n--- Setelah Pop Semua Elemen ---");
console.log("Storage:", newStack.storage); // {}
console.log("Ukuran Stack:", newStack.size()); // 0
console.log("Puncak Stack:", newStack.peek()); // undefined (karena kosong)
console.log("Stack kosong?", newStack.isEmpty()); // true
