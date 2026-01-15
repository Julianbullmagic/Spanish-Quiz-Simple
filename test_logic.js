
const rawWordList = [
    { "Muy bien": "Very good/Very well" }
];

const fullWordList = rawWordList.map(obj => {
    const key = Object.keys(obj)[0];
    return { es: key, en: obj[key] };
});

function parseAnswers(text) {
    const answers = new Set();
    
    function addVariations(t) {
        if (!t) return;
        answers.add(t);
        
        // Handle parentheses removal
        const noParens = t.replace(/\s*\(.*?\)/g, '').trim();
        if (noParens && noParens !== t) {
            answers.add(noParens);
        }
    }

    // Split by slash
    const parts = text.split('/');
    parts.forEach(p => addVariations(p.trim()));

    // Contraction expansion (simplified for test)
    const currentList = Array.from(answers);
    const replacements = [
        { pattern: /\bwhat's\b/gi, replacement: "what is" },
        // ... (others omitted for brevity as they are not relevant to this case)
    ];
    
    // Just minimal check for the loop structure
    currentList.forEach(ans => {
        // ...
    });

    return Array.from(answers);
}

const wordObj = fullWordList[0];
const rawAnswer = wordObj.en;
const accepted = parseAnswers(rawAnswer);

console.log("Raw Answer:", rawAnswer);
console.log("Accepted Answers:", JSON.stringify(accepted));

const normalize = (str) => str.toLowerCase().replace(/[.,?!¡¿]/g, '').trim();

const userInputs = ["Very good", "Very well", "Very good/Very well"];

userInputs.forEach(input => {
    const userVal = normalize(input);
    const isCorrect = accepted.some(a => normalize(a) === userVal);
    console.log(`Input: "${input}" -> Correct? ${isCorrect}`);
});
