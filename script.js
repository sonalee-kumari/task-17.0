const divideNumbers = (num1, num2) => {
    return new Promise((resolve, reject) => {
        // First check if input types are valid numbers
        if (typeof num1 !== 'number' || typeof num2 !== 'number' || isNaN(num1) || isNaN(num2)) {
            reject(new Error("Invalid input: Both arguments must be valid numbers."));
            return;
        }

        if (num2 === 0) {
            reject(new Error("Division by zero is not allowed."));
        } else {
            const result = num1 / num2;
            resolve(result);
        }
    });
};

const testCases = [
    { a: 20, b: 4, desc: "Standard positive integer division" },
    { a: 15, b: 0, desc: "Division by zero (should reject)" },
    { a: -50, b: 5, desc: "Negative numerator" },
    { a: 7, b: 2, desc: "Decimal result division" },
    { a: 0, b: 10, desc: "Zero divided by a positive integer" },
    { a: -12, b: -3, desc: "Both negative numbers" },
    { a: 100, b: 0, desc: "Second zero case (edge check)" }
];

function displayOutput(message, isError = false) {
    console.log(message);
    const container = document.getElementById("output-log");
    if (container) {
        const p = document.createElement("p");
        p.textContent = message;
        p.style.color = isError ? "#d9534f" : "#2e7d32";
        container.appendChild(p);
    }
}


console.log("--- Running Tests using .then() / .catch() ---");
testCases.slice(0, 3).forEach((item) => {
    divideNumbers(item.a, item.b)
        .then((res) => {
            displayOutput(`[PASS] ${item.desc}: ${item.a} / ${item.b} = ${res}`);
        })
        .catch((err) => {
            displayOutput(`[REJECTED] ${item.desc}: ${item.a} / ${item.b} -> ${err.message}`, true);
        });
});

const runAsyncTests = async () => {
    console.log("--- Running Tests using async/await ---");
    
    for (let i = 3; i < testCases.length; i++) {
        const item = testCases[i];
        try {
            const res = await divideNumbers(item.a, item.b);
            displayOutput(`[PASS - Async] ${item.desc}: ${item.a} / ${item.b} = ${res}`);
        } catch (err) {
            displayOutput(`[REJECTED - Async] ${item.desc}: ${item.a} / ${item.b} -> ${err.message}`, true);
        }
    }
};


runAsyncTests();