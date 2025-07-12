let letters = [];

const word = "racecar";

let reverseWord = "";

for (let i = 0; i < word.length; i++) {
  letters.push(word[i]);
}

for (let i = 0; i < word.length; i++) {
  reverseWord += letters.pop();
}

if (word === reverseWord) {
  console.log(`${word} is a palindrome`);
} else {
  console.log(`${word} is a palindrome`);
}
