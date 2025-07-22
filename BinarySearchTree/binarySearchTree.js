class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  add(data) {
    const node = this.root;
    if (this.root === null) {
      this.root = new Node(data);
      return;
    } else {
      const searchTree = function (node) {
        if (data < node.data) {
          if (node.left === null) {
            node.left = new Node(data);
            return;
          } else {
            return searchTree(node.left);
          }
        } else if (data > node.data) {
          if (node.right === null) {
            node.right = new Node(data);
            return;
          } else {
            return searchTree(node.right);
          }
        } else {
          // Data already exists, do nothing (or handle as per requirements)
          return null;
        }
      };
      searchTree(node);
    }
  }

  findMin() {
    if (!this.root) {
      return null; // Handle empty tree
    }
    let current = this.root;
    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  }

  findMax() {
    if (!this.root) {
      return null; // Handle empty tree
    }
    let current = this.root;
    while (current.right !== null) {
      current = current.right;
    }
    return current.data;
  }

  isPresent(data) {
    let current = this.root;
    while (current) {
      if (current.data === data) {
        return true;
      }
      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }

  remove(data) {
    const removeNode = function (node, data) {
      if (node === null) {
        return null;
      }

      if (data === node.data) {
        // Case 1: Node has no children (leaf node)
        if (node.left == null && node.right == null) {
          return null;
        }

        // Case 2: Node has one child
        if (node.left == null) {
          return node.right;
        }

        if (node.right == null) {
          return node.left;
        }

        // Case 3: Node has two children
        let tempNode = node.right;
        while (tempNode.left !== null) {
          tempNode = tempNode.left;
        }
        node.data = tempNode.data;
        node.right = removeNode(node.right, tempNode.data);
        return node;
      } else if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else {
        node.right = removeNode(node.right, data);
        return node;
      }
    };
    this.root = removeNode(this.root, data);
  }
}

console.log("--- Memulai Pengujian BST ---");

// --- Tes Inisialisasi dan Penambahan ---
console.log(
  "\n### Tes Penambahan (add) dan Pencarian (findMin, findMax, isPresent)"
);
const bst = new BST();
console.log("BST kosong:");
console.log("findMin():", bst.findMin()); // Expected: null
console.log("findMax():", bst.findMax()); // Expected: null
console.log("isPresent(5):", bst.isPresent(5)); // Expected: false

bst.add(10);
bst.add(7);
bst.add(12);
bst.add(5);
bst.add(8);
bst.add(13);
bst.add(14);
bst.add(9);
bst.add(3); // Menambah beberapa nilai untuk pengujian lebih lanjut

console.log("\nBST setelah penambahan beberapa nilai:");
// Structure:
//         10
//        /  \
//       7    12
//      / \    \
//     5   8    13
//    /     \     \
//   3       9     14

console.log("findMin():", bst.findMin()); // Expected: 3
console.log("findMax():", bst.findMax()); // Expected: 14
console.log("isPresent(9):", bst.isPresent(9)); // Expected: true
console.log("isPresent(90):", bst.isPresent(90)); // Expected: false
console.log("isPresent(10):", bst.isPresent(10)); // Expected: true (root)

// --- Tes Metode Remove ---
console.log("\n### Tes Penghapusan (remove)");

// Tes 1: Hapus Leaf Node (misal: 3)
console.log("\n--- Hapus Leaf Node (3) ---");
console.log("Sebelum hapus 3, isPresent(3):", bst.isPresent(3)); // Expected: true
bst.remove(3);
console.log("Setelah hapus 3, isPresent(3):", bst.isPresent(3)); // Expected: false
console.log("findMin() setelah hapus 3:", bst.findMin()); // Expected: 5 (karena 3 sudah dihapus)

// Tes 2: Hapus Node dengan Satu Anak (misal: 5, anak tunggalnya 8)
// Catatan: Setelah hapus 3, node 5 hanya punya anak kanan (8).
// Kita akan coba hapus node 5, seharusnya 8 menggantikan 5.
console.log("\n--- Hapus Node dengan Satu Anak (5) ---");
console.log("Sebelum hapus 5, isPresent(5):", bst.isPresent(5)); // Expected: true
console.log("findMin() sebelum hapus 5:", bst.findMin()); // Expected: 5
bst.remove(5);
console.log("Setelah hapus 5, isPresent(5):", bst.isPresent(5)); // Expected: false
console.log("isPresent(8):", bst.isPresent(8)); // Expected: true (8 seharusnya masih ada dan menjadi anak dari 7)
// Secara internal, 7.left sekarang seharusnya 8.
console.log("findMin() setelah hapus 5:", bst.findMin()); // Expected: 7 (karena 5 dihapus, 7 jadi yang terkecil di sub-pohon kiri root)

// Tes 3: Hapus Node dengan Dua Anak (misal: 7)
// 7 punya anak kiri (8) dan anak kanan (9). In-order successor dari 7 adalah 8.
// Node 8 tidak punya anak kiri, tapi punya anak kanan (9). Jadi setelah 7 dihapus, 8 mengganti 7.
// Lalu 9 akan diganti parentnya menjadi 8.
console.log("\n--- Hapus Node dengan Dua Anak (7) ---");
console.log("Sebelum hapus 7, isPresent(7):", bst.isPresent(7)); // Expected: true
bst.remove(7);
console.log("Setelah hapus 7, isPresent(7):", bst.isPresent(7)); // Expected: false
console.log("isPresent(8):", bst.isPresent(8)); // Expected: true (8 seharusnya sekarang menggantikan 7)
console.log("findMin() setelah hapus 7:", bst.findMin()); // Expected: 8 (seharusnya 8 yang terkecil sekarang)

// Tes 4: Hapus Root Node dengan Dua Anak (misal: 10)
// In-order successor dari 10 adalah 12 (node terkecil di sub-pohon kanan).
// 12 akan menggantikan 10. Node 13 akan menjadi anak kanan dari 12.
console.log("\n--- Hapus Root Node dengan Dua Anak (10) ---");
console.log("Sebelum hapus 10, isPresent(10):", bst.isPresent(10)); // Expected: true
console.log("findMax() sebelum hapus 10:", bst.findMax()); // Expected: 14
bst.remove(10);
console.log("Setelah hapus 10, isPresent(10):", bst.isPresent(10)); // Expected: false
console.log("Root baru (seharusnya 12) isPresent(12):", bst.isPresent(12)); // Expected: true
console.log("findMin() setelah hapus 10:", bst.findMin()); // Expected: 8 (tetap)
console.log("findMax() setelah hapus 10:", bst.findMax()); // Expected: 14 (tetap)

// Tes 5: Hapus Node yang Tidak Ada
console.log("\n--- Hapus Node yang Tidak Ada (99) ---");
console.log("Sebelum hapus 99, isPresent(99):", bst.isPresent(99)); // Expected: false
bst.remove(99);
console.log("Setelah hapus 99, isPresent(99):", bst.isPresent(99)); // Expected: false
console.log("Pohon tidak berubah, findMin():", bst.findMin()); // Expected: 8
console.log("Pohon tidak berubah, findMax():", bst.findMax()); // Expected: 14

// Tes 6: Hapus node terakhir hingga pohon kosong
console.log("\n--- Hapus Sisa Node Hingga Kosong ---");
bst.remove(8);
bst.remove(9);
bst.remove(12);
bst.remove(13);
bst.remove(14);
console.log("Setelah hapus semua, isPresent(12):", bst.isPresent(12)); // Expected: false
console.log("Pohon kosong, findMin():", bst.findMin()); // Expected: null
console.log("Pohon kosong, findMax():", bst.findMax()); // Expected: null
console.log("Pohon kosong, isPresent(1):", bst.isPresent(1)); // Expected: false

console.log("\n--- Pengujian BST Selesai ---");
