
function cleanAnswer(text) {
    // 1. Lowercase & Punctuation
    let str = text.toLowerCase().replace(/[.,?!¡¿]/g, '');
    
    // Replace hyphens with spaces
    str = str.replace(/-/g, ' ');
    
    // 2. Remove text in parentheses
    str = str.replace(/\s*\(.*?\)/g, ' ');
    
    // 3. Remove specific grammar tags (word boundaries)
    const tags = [
        'male', 'female', 'masc', 'fem', 'masculine', 'feminine', 'femanine',
        'formal', 'informal', 'singular', 'plural', 'pl', 'sg',
        'spain', 'latam', 'latin america'
    ];
    const regex = new RegExp(`\b(${tags.join('|')})\b`, 'g');
    let stripped = str.replace(regex, '');
    
    // 4. Collapse whitespace
    stripped = stripped.replace(/\s+/g, ' ').trim();
    
    // Safety: If we stripped everything (e.g. the answer was "Male"), return the basic normalized version
    if (stripped.length === 0) {
        return str.trim(); 
    }
    
    return stripped;
}

const expected = "great-grandmother";
const input1 = "great-grandmother";
const input2 = "great grandmother";
const input3 = "great   grandmother"; // extra spaces should be collapsed

const cleanedExpected = cleanAnswer(expected);
console.log(`Expected '${expected}' -> '${cleanedExpected}'`);

const tests = [input1, input2, input3];

tests.forEach(input => {
    const cleaned = cleanAnswer(input);
    console.log(`Input '${input}' -> '${cleaned}'`);
    if (cleaned === cleanedExpected) {
        console.log("MATCH");
    } else {
        console.error("FAIL");
        process.exit(1);
    }
});
console.log("All tests passed.");
