// Mock Setup
let quizQueue = [];
let currentCard = { wordObj: { id: "testWord" } };
let totalItems = 0;

// The logic function extracted from index.html (modified to use local variables)
function reinforceWord() {
    if (!currentCard || !currentCard.wordObj) return;

    const wordObj = currentCard.wordObj;
    
    // Count existing instances of this question in the remaining queue
    const existingCount = quizQueue.filter(item => item === wordObj).length;
    
    // Logic: Make it 3 times more frequent (Triple the count).
    // If none exist, add at least one.
    let copiesToAdd;
    if (existingCount === 0) {
        copiesToAdd = 1;
    } else {
        // To triple the count (Total = 3 * Existing), we add 2 * Existing
        copiesToAdd = existingCount * 2;
    }

    for (let i = 0; i < copiesToAdd; i++) {
        // Random position in the queue
        const pos = Math.floor(Math.random() * quizQueue.length);
        quizQueue.splice(pos, 0, wordObj);
    }

    totalItems += copiesToAdd;
    
    return { existingCount, copiesToAdd, finalCount: quizQueue.filter(i => i === wordObj).length };
}

// TEST 1: No instances in queue
quizQueue = [];
console.log("--- Test 1: 0 Instances ---");
let res1 = reinforceWord();
console.log(`Existing: ${res1.existingCount}, Added: ${res1.copiesToAdd}, Final: ${res1.finalCount}`);
if (res1.copiesToAdd === 1 && res1.finalCount === 1) console.log("PASS"); else console.log("FAIL");

// TEST 2: 1 Instance in queue
quizQueue = [currentCard.wordObj, {id: "other"}];
console.log("\n--- Test 2: 1 Instance ---");
let res2 = reinforceWord();
console.log(`Existing: ${res2.existingCount}, Added: ${res2.copiesToAdd}, Final: ${res2.finalCount}`);
if (res2.copiesToAdd === 2 && res2.finalCount === 3) console.log("PASS"); else console.log("FAIL");

// TEST 3: 2 Instances in queue
quizQueue = [currentCard.wordObj, {id: "other"}, currentCard.wordObj];
console.log("\n--- Test 3: 2 Instances ---");
let res3 = reinforceWord();
console.log(`Existing: ${res3.existingCount}, Added: ${res3.copiesToAdd}, Final: ${res3.finalCount}`);
if (res3.copiesToAdd === 4 && res3.finalCount === 6) console.log("PASS"); else console.log("FAIL");

// TEST 4: 5 Instances in queue
quizQueue = Array(5).fill(currentCard.wordObj);
console.log("\n--- Test 4: 5 Instances ---");
let res4 = reinforceWord();
console.log(`Existing: ${res4.existingCount}, Added: ${res4.copiesToAdd}, Final: ${res4.finalCount}`);
if (res4.copiesToAdd === 10 && res4.finalCount === 15) console.log("PASS"); else console.log("FAIL");

