const questions = [

    {
        category: "HAIR DEPARTMENT",

        question: "How is your hairline doing?",

        answers: [
            {
                text: "Perfect. Hasn't moved since birth 👑",
                value: 500000
            },
            {
                text: "Slightly suspicious 👀",
                value: 300000
            },
            {
                text: "It's slowly migrating backwards",
                value: 150000
            },
            {
                text: "My forehead has declared independence 🫡",
                value: 50000
            }
        ]
    },


    {
        category: "HEIGHT DEPARTMENT",

        question: "How tall are you?",

        answers: [
            {
                text: "Tall enough to change the light bulb",
                value: 300000
            },
            {
                text: "Above average 📏",
                value: 250000
            },
            {
                text: "Average human being",
                value: 180000
            },
            {
                text: "Short king / queen 👑",
                value: 120000
            }
        ]
    },


    {
        category: "HAIR DEPARTMENT",

        question: "How would you describe your hair?",

        answers: [
            {
                text: "Luxury shampoo commercial material ✨",
                value: 400000
            },
            {
                text: "Pretty decent",
                value: 250000
            },
            {
                text: "Strategic styling required",
                value: 150000
            },
            {
                text: "Let's not talk about it.",
                value: 50000
            }
        ]
    },


    {
        category: "FACE DEPARTMENT",

        question: "How impressive is your beard?",

        answers: [
            {
                text: "Full beard. Viking mode 🧔",
                value: 350000
            },
            {
                text: "Decent beard",
                value: 250000
            },
            {
                text: "Patchy but we're working on it",
                value: 150000
            },
            {
                text: "Baby face forever 👶",
                value: 100000
            }
        ]
    },


    {
        category: "EDUCATION DEPARTMENT",

        question: "What is your educational qualification?",

        answers: [
            {
                text: "PhD / Highly qualified 🎓",
                value: 500000
            },
            {
                text: "Engineering / Medicine / Professional degree",
                value: 400000
            },
            {
                text: "Bachelor's degree",
                value: 250000
            },
            {
                text: "My degree requires explanation",
                value: 150000
            }
        ]
    },


    {
        category: "CAREER DEPARTMENT",

        question: "What do you do for a living?",

        answers: [
            {
                text: "Very well-paid professional 💰",
                value: 700000
            },
            {
                text: "Software / Tech 💻",
                value: 600000
            },
            {
                text: "Business / Entrepreneur",
                value: 550000
            },
            {
                text: "Still figuring it out 🫠",
                value: 100000
            }
        ]
    },


    {
        category: "FITNESS DEPARTMENT",

        question: "How physically fit are you?",

        answers: [
            {
                text: "Gym is basically my second home 🏋️",
                value: 300000
            },
            {
                text: "I exercise sometimes",
                value: 200000
            },
            {
                text: "I walk to the fridge",
                value: 100000
            },
            {
                text: "My fitness tracker has given up",
                value: 50000
            }
        ]
    },


    {
        category: "DOMESTIC DEPARTMENT",

        question: "Can you cook?",

        answers: [
            {
                text: "I can cook an entire meal 👨‍🍳",
                value: 350000
            },
            {
                text: "I can cook a few things",
                value: 250000
            },
            {
                text: "I can make tea ☕",
                value: 100000
            },
            {
                text: "I know several food delivery apps",
                value: 50000
            }
        ]
    },


    {
        category: "STYLE DEPARTMENT",

        question: "How good is your fashion sense?",

        answers: [
            {
                text: "People ask where I shop 😎",
                value: 300000
            },
            {
                text: "Pretty stylish",
                value: 220000
            },
            {
                text: "I have three good shirts",
                value: 150000
            },
            {
                text: "Comfort is my fashion",
                value: 80000
            }
        ]
    },


    {
        category: "FAMILY DEPARTMENT",

        question: "How good are you at surviving family functions?",

        answers: [
            {
                text: "I can survive 8 hours of relatives",
                value: 300000
            },
            {
                text: "I disappear after eating 🍛",
                value: 200000
            },
            {
                text: "I hide behind my phone 📱",
                value: 100000
            },
            {
                text: "I simply don't attend",
                value: 50000
            }
        ]
    }

];


let currentQuestion = 0;

let totalWorth = 0;


/* ELEMENTS */

const quiz = document.getElementById("quiz");

const result = document.getElementById("result");

const questionNumber =
    document.getElementById("questionNumber");

const progressText =
    document.getElementById("progressText");

const progress =
    document.getElementById("progress");

const category =
    document.getElementById("category");

const question =
    document.getElementById("question");

const answers =
    document.getElementById("answers");

const amount =
    document.getElementById("amount");

const details =
    document.getElementById("details");

const restartBtn =
    document.getElementById("restartBtn");


/* LOAD QUESTION */

function loadQuestion() {

    const current = questions[currentQuestion];


    /* NUMBER */

    questionNumber.textContent =
        String(currentQuestion + 1).padStart(2, "0");


    /* PROGRESS TEXT */

    progressText.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;


    /* PROGRESS BAR */

    const percentage =
        ((currentQuestion + 1) / questions.length) * 100;

    progress.style.width =
        `${percentage}%`;


    /* QUESTION */

    category.textContent =
        current.category;

    question.textContent =
        current.question;


    /* CLEAR ANSWERS */

    answers.innerHTML = "";


    /* CREATE ANSWERS */

    current.answers.forEach((answerData) => {

        const button =
            document.createElement("button");

        button.className = "answer";

        button.textContent =
            answerData.text;


        button.addEventListener("click", () => {

            totalWorth += answerData.value;

            nextQuestion();

        });


        answers.appendChild(button);

    });

}


/* NEXT QUESTION */

function nextQuestion() {

    currentQuestion++;


    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        showResult();

    }

}


/* SHOW RESULT */

function showResult() {

    quiz.classList.add("hidden");

    result.classList.remove("hidden");


    amount.textContent =
        `₹${totalWorth.toLocaleString("en-IN")}`;


    details.innerHTML = "";


    const selectedDetails = [
        "💇 Hairline",
        "📏 Height",
        "🧔 Beard",
        "🎓 Education",
        "💼 Career",
        "🏋️ Fitness",
        "🍳 Cooking",
        "😎 Style",
        "👨‍👩‍👧 Family Skills"
    ];


    selectedDetails.forEach(item => {

        const div =
            document.createElement("div");

        div.className = "detail";

        div.innerHTML = `
            <span>${item}</span>
            <strong>VALUED ✓</strong>
        `;

        details.appendChild(div);

    });

}


/* RESTART */

restartBtn.addEventListener("click", () => {

    currentQuestion = 0;

    totalWorth = 0;

    result.classList.add("hidden");

    quiz.classList.remove("hidden");

    loadQuestion();

});


/* START */

loadQuestion();