
const questions = [
    {
        question: "What is your profession?",
        category: "PERSONAL INFORMATION",
        answers: [
            { text: "Software Engineer 💻", value: 500000 },
            { text: "Doctor 🩺", value: 1000000 },
            { text: "Government Employee 🏛️", value: 750000 },
            { text: "Business Owner 💼", value: 800000 }
        ]
    },

    {
        question: "How many cars does your family own?",
        category: "TRANSPORTATION",
        answers: [
            { text: "None. We walk. 🚶", value: 0 },
            { text: "One", value: 150000 },
            { text: "Two", value: 300000 },
            { text: "We have a garage problem 🚗🚗🚗", value: 600000 }
        ]
    },

    {
        question: "How big is the family house?",
        category: "REAL ESTATE",
        answers: [
            { text: "Small and cozy 🏠", value: 100000 },
            { text: "Normal house", value: 250000 },
            { text: "Big house", value: 500000 },
            { text: "Basically a palace 🏰", value: 1000000 }
        ]
    },

    {
        question: "How much gold does the family expect?",
        category: "GOLD DEPARTMENT",
        answers: [
            { text: "None. Obviously.", value: 0 },
            { text: "Just a little", value: 100000 },
            { text: "Some jewellery 💍", value: 250000 },
            { text: "Enough to start a jewellery shop", value: 500000 }
        ]
    },

    {
        question: "Finally... how demanding is the extended family?",
        category: "THE UNCLES",
        answers: [
            { text: "Very reasonable 😇", value: 50000 },
            { text: "They have suggestions", value: 150000 },
            { text: "They have spreadsheets", value: 300000 },
            { text: "They called a family meeting 📞", value: 500000 }
        ]
    }
];


let currentQuestion = 0;
let total = 0;

const landing = document.getElementById("landing");
const quiz = document.getElementById("quiz");
const calculating = document.getElementById("calculating");
const result = document.getElementById("result");
const reveal = document.getElementById("reveal");

const questionNumber = document.getElementById("questionNumber");
const progressText = document.getElementById("progressText");
const progress = document.getElementById("progress");

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");

const startBtn = document.getElementById("startBtn");
const revealBtn = document.getElementById("revealBtn");


function showScreen(screen) {

    document.querySelectorAll(".screen").forEach(section => {
        section.classList.remove("active");
    });

    screen.classList.add("active");
}


startBtn.addEventListener("click", () => {

    currentQuestion = 0;
    total = 0;

    showScreen(quiz);
    loadQuestion();

});


function loadQuestion() {

    const q = questions[currentQuestion];

    questionNumber.textContent =
        String(currentQuestion + 1).padStart(2, "0");

    progressText.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    progress.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    questionElement.textContent = q.question;

    document.querySelector(".question-category").textContent =
        q.category;

    answersElement.innerHTML = "";

    q.answers.forEach(answer => {

        const button = document.createElement("button");

        button.className = "answer-btn";
        button.textContent = answer.text;

        button.addEventListener("click", () => {

            total += answer.value;

            currentQuestion++;

            if (currentQuestion < questions.length) {

                loadQuestion();

            } else {

                startCalculation();

            }

        });

        answersElement.appendChild(button);

    });
}


function startCalculation() {

    showScreen(calculating);

    const messages = [
        "Initializing Dowry Engine...",
        "Checking family expectations...",
        "Scanning property records...",
        "Estimating gold requirements...",
        "Consulting imaginary uncles...",
        "Converting human relationships into rupees...",
        "This is getting uncomfortable...",
        "Calculation complete."
    ];

    let index = 0;
    let fakeProgress = 0;

    const text = document.getElementById("calculationText");
    const bar = document.getElementById("fakeProgress");

    const interval = setInterval(() => {

        if (index < messages.length) {
            text.textContent = messages[index];
            index++;
        }

        fakeProgress += 14;
        bar.style.width = `${Math.min(fakeProgress, 100)}%`;

        if (index >= messages.length) {

            clearInterval(interval);

            setTimeout(showResult, 800);

        }

    }, 500);
}


function showResult() {

    showScreen(result);

    const finalAmount = total + 374200;

    document.getElementById("amount").textContent =
        `₹${finalAmount.toLocaleString("en-IN")}`;

    const details = document.getElementById("resultDetails");

    details.innerHTML = `
        <div class="detail">
            <span>💰 Cash</span>
            <strong>₹${Math.round(finalAmount * 0.6).toLocaleString("en-IN")}</strong>
        </div>

        <div class="detail">
            <span>💍 Gold</span>
            <strong>₹${Math.round(finalAmount * 0.2).toLocaleString("en-IN")}</strong>
        </div>

        <div class="detail">
            <span>🚗 Vehicle</span>
            <strong>₹${Math.round(finalAmount * 0.15).toLocaleString("en-IN")}</strong>
        </div>

        <div class="detail">
            <span>🍳 Pressure Cooker</span>
            <strong>₹${Math.round(finalAmount * 0.05).toLocaleString("en-IN")}</strong>
        </div>
    `;
}


revealBtn.addEventListener("click", () => {

    showScreen(reveal);

});

