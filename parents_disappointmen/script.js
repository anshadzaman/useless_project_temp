const questions = [

    {
        category: "EDUCATION DEPARTMENT",
        question: "How many hours did you study this week?",
        answers: [
            ["More than 30 hours 📚", 5],
            ["10–30 hours", 15],
            ["Less than 10 hours", 30],
            ["Study? What's that? 🫠", 45]
        ]
    },

    {
        category: "CAREER DEPARTMENT",
        question: "How is your career going?",
        answers: [
            ["Exactly as planned 📈", 5],
            ["Pretty decent", 15],
            ["Still figuring things out", 30],
            ["My parents are suggesting government jobs", 45]
        ]
    },

    {
        category: "MONEY DEPARTMENT",
        question: "How is your financial situation?",
        answers: [
            ["I'm financially independent 💰", 5],
            ["Doing alright", 15],
            ["Let's not discuss finances", 30],
            ["My parents still ask if I'm earning", 45]
        ]
    },

    {
        category: "PRODUCTIVITY DEPARTMENT",
        question: "How many projects have you started and never finished?",
        answers: [
            ["None. I finish everything.", 5],
            ["One or two", 15],
            ["A small collection", 30],
            ["My GitHub is a graveyard 💀", 45]
        ]
    },

    {
        category: "LIFESTYLE DEPARTMENT",
        question: "How clean is your room?",
        answers: [
            ["Hotel level ✨", 5],
            ["Reasonably clean", 15],
            ["I know where everything is... mostly", 30],
            ["Archaeologists could study it", 45]
        ]
    },

    {
        category: "SCREEN TIME DEPARTMENT",
        question: "How much time do you spend on your phone?",
        answers: [
            ["Less than 2 hours", 5],
            ["2–4 hours", 15],
            ["4–7 hours", 30],
            ["My phone knows more about me than my parents", 45]
        ]
    },

    {
        category: "FAMILY DEPARTMENT",
        question: "How often do you hear 'When I was your age...'?",
        answers: [
            ["Almost never", 5],
            ["Sometimes", 15],
            ["Every family function", 30],
            ["It is basically a daily notification", 45]
        ]
    },

    {
        category: "SOCIAL DEPARTMENT",
        question: "How often do relatives ask about your future?",
        answers: [
            ["Never", 5],
            ["Occasionally", 15],
            ["Every family gathering", 30],
            ["My relatives have formed a committee", 45]
        ]
    },

    {
        category: "MARRIAGE DEPARTMENT",
        question: "How many marriage suggestions have you received?",
        answers: [
            ["None", 5],
            ["A few", 15],
            ["Too many", 30],
            ["My family has a spreadsheet", 45]
        ]
    },

    {
        category: "EXPECTATIONS DEPARTMENT",
        question: "How close are you to your childhood dream?",
        answers: [
            ["I actually achieved it 🏆", 5],
            ["Getting there", 15],
            ["My dream changed completely", 30],
            ["My childhood self would be confused", 45]
        ]
    }

];


let currentQuestion = 0;

let totalScore = 0;


/* ELEMENTS */

const landing = document.getElementById("landing");
const quiz = document.getElementById("quiz");
const calculating = document.getElementById("calculating");
const result = document.getElementById("result");
const final = document.getElementById("final");

const startBtn = document.getElementById("startBtn");

const questionNumber = document.getElementById("questionNumber");
const progressText = document.getElementById("progressText");
const progress = document.getElementById("progress");

const questionCategory =
    document.getElementById("questionCategory");

const question =
    document.getElementById("question");

const answers =
    document.getElementById("answers");

const calculationText =
    document.getElementById("calculationText");

const fakeProgress =
    document.getElementById("fakeProgress");

const percentage =
    document.getElementById("percentage");

const status =
    document.getElementById("status");

const resultSubtitle =
    document.getElementById("resultSubtitle");

const categoryScores =
    document.getElementById("categoryScores");

const parentQuote =
    document.getElementById("parentQuote");

const achievements =
    document.getElementById("achievements");

const complaintBtn =
    document.getElementById("complaintBtn");

const complaint =
    document.getElementById("complaint");

const excuseBtn =
    document.getElementById("excuseBtn");

const excuse =
    document.getElementById("excuse");

const yourBar =
    document.getElementById("yourBar");

const sharmaBar =
    document.getElementById("sharmaBar");

const yourScore =
    document.getElementById("yourScore");

const sharmaScore =
    document.getElementById("sharmaScore");

const againBtn =
    document.getElementById("againBtn");

const restartBtn =
    document.getElementById("restartBtn");


/* =========================
   SCREEN CONTROL
========================= */

function showScreen(screen) {

    document
        .querySelectorAll(".screen")
        .forEach(item => {
            item.classList.remove("active");
        });

    screen.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================
   START
========================= */

startBtn.addEventListener("click", () => {

    currentQuestion = 0;

    totalScore = 0;

    showScreen(quiz);

    loadQuestion();

});


/* =========================
   LOAD QUESTION
========================= */

function loadQuestion() {

    const current =
        questions[currentQuestion];


    questionNumber.textContent =
        String(currentQuestion + 1)
            .padStart(2, "0");


    progressText.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;


    progress.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;


    questionCategory.textContent =
        current.category;


    question.textContent =
        current.question;


    answers.innerHTML = "";


    current.answers.forEach(answer => {

        const button =
            document.createElement("button");

        button.className =
            "answer-btn";

        button.textContent =
            answer[0];


        button.addEventListener("click", () => {

            totalScore += answer[1];

            currentQuestion++;


            if (currentQuestion < questions.length) {

                loadQuestion();

            } else {

                startCalculation();

            }

        });


        answers.appendChild(button);

    });

}


/* =========================
   CALCULATING
========================= */

function startCalculation() {

    showScreen(calculating);

    fakeProgress.style.width = "0%";

    const messages = [

        "Opening Parent Evaluation System...",

        "Checking academic performance...",

        "Reviewing career decisions...",

        "Scanning unfinished projects...",

        "Calculating screen-time damage...",

        "Checking room cleanliness...",

        "Contacting imaginary relatives...",

        "Comparing with Sharma Ji's son...",

        "Generating parental report...",

        "Finalizing disappointment..."

    ];


    let index = 0;


    const interval =
        setInterval(() => {

            calculationText.textContent =
                messages[index];


            fakeProgress.style.width =
                `${((index + 1) / messages.length) * 100}%`;


            index++;


            if (index >= messages.length) {

                clearInterval(interval);

                setTimeout(showResult, 700);

            }

        }, 400);

}


/* =========================
   RESULT
========================= */

function showResult() {

    showScreen(result);


    /*
        Minimum score = 50
        Maximum score = 450

        Convert to 0–100%.
    */

    const minScore = 50;
    const maxScore = 450;

    const finalPercentage =
        Math.round(
            ((totalScore - minScore) /
            (maxScore - minScore)) * 100
        );


    const score =
        Math.max(
            0,
            Math.min(100, finalPercentage)
        );


    percentage.textContent =
        `${score}%`;


    setStatus(score);

    generateCategoryScores(score);

    generateParentQuote(score);

    generateAchievements(score);

    generateComparison(score);

}


/* =========================
   STATUS
========================= */

function setStatus(score) {

    if (score <= 20) {

        status.textContent =
            "🥰 PROUD PARENT";

        resultSubtitle.textContent =
            "Somehow, everything is going according to plan.";

    }

    else if (score <= 40) {

        status.textContent =
            "🙂 SLIGHT CONCERN";

        resultSubtitle.textContent =
            "There has been a meeting about you.";

    }

    else if (score <= 60) {

        status.textContent =
            "🤨 SUSPICIOUS";

        resultSubtitle.textContent =
            "Your parents have started asking questions.";

    }

    else if (score <= 80) {

        status.textContent =
            "😐 FAMILY MEETING";

        resultSubtitle.textContent =
            "Everyone has an opinion about your career.";

    }

    else if (score < 100) {

        status.textContent =
            "🚨 SERIOUS DISCUSSION";

        resultSubtitle.textContent =
            "Sharma Ji's son has entered the conversation.";

    }

    else {

        status.textContent =
            "💀 CRITICAL";

        resultSubtitle.textContent =
            "The family group chat is extremely active.";

    }

}


/* =========================
   CATEGORY SCORES
========================= */

function generateCategoryScores(score) {

    const categories = [

        "📚 Academics",
        "💼 Career",
        "💰 Finances",
        "🧑‍💻 Productivity",
        "🏠 Lifestyle",
        "📱 Screen Time"

    ];


    categoryScores.innerHTML = "";


    categories.forEach((name, index) => {

        const variation =
            Math.floor(Math.random() * 25) - 12;

        const value =
            Math.max(
                0,
                Math.min(
                    100,
                    score + variation
                )
            );


        const wrapper =
            document.createElement("div");

        wrapper.className =
            "category-score";


        wrapper.innerHTML = `

            <div class="category-name">

                <span>${name}</span>

                <span>${value}%</span>

            </div>

            <div class="category-bar">

                <div
                    class="category-fill"
                    style="width: ${value}%">
                </div>

            </div>

        `;


        categoryScores.appendChild(wrapper);

    });

}


/* =========================
   PARENT QUOTE
========================= */

function generateParentQuote(score) {

    const quotes = {

        low: [
            '"Very proud of you."',
            '"Keep going!"',
            '"You are doing well."'
        ],

        medium: [
            '"You could do better."',
            '"What is your plan exactly?"',
            '"We should talk about your future."'
        ],

        high: [
            '"When I was your age..."',
            '"Your cousin is doing very well."',
            '"What are you doing with your life?"'
        ],

        extreme: [
            '"We need to talk."',
            '"Call your uncle."',
            '"Your relatives are asking questions."'
        ]

    };


    let list;


    if (score <= 25) {

        list = quotes.low;

    }

    else if (score <= 60) {

        list = quotes.medium;

    }

    else if (score <= 85) {

        list = quotes.high;

    }

    else {

        list = quotes.extreme;

    }


    parentQuote.textContent =
        list[Math.floor(Math.random() * list.length)];

}


/* =========================
   SHARMA JI COMPARISON
========================= */

function generateComparison(score) {

    const sharmaScoreValue =
        Math.min(
            100,
            Math.max(
                85,
                score + Math.floor(Math.random() * 20)
            )
        );


    yourBar.style.width =
        `${score}%`;

    sharmaBar.style.width =
        `${sharmaScoreValue}%`;


    yourScore.textContent =
        `${score}%`;

    sharmaScore.textContent =
        `${sharmaScoreValue}%`;

}


/* =========================
   ACHIEVEMENTS
========================= */

function generateAchievements(score) {

    const allAchievements = [

        {
            icon: "📱",
            title: "Screen Time Champion",
            description: "Your phone knows you better than your parents."
        },

        {
            icon: "💀",
            title: "Professional Procrastinator",
            description: "Tomorrow has been your busiest day."
        },

        {
            icon: "🧑‍💻",
            title: "GitHub Graveyard Keeper",
            description: "17 repositories. 2 finished projects."
        },

        {
            icon: "🏠",
            title: "Room Archaeologist",
            description: "You know exactly where everything is."
        },

        {
            icon: "💍",
            title: "Marriage Question Survivor",
            description: "You survived another family gathering."
        },

        {
            icon: "📈",
            title: "Career Loading...",
            description: "Your career is currently buffering."
        },

        {
            icon: "🗣️",
            title: "Relative Comparison Survivor",
            description: "You have been compared and survived."
        },

        {
            icon: "🏆",
            title: "Still Trying",
            description: "And honestly, that's pretty impressive."
        }

    ];


    achievements.innerHTML = "";


    const count =
        score > 75 ? 4 :
        score > 50 ? 3 :
        score > 25 ? 2 :
        1;


    const shuffled =
        [...allAchievements]
            .sort(() => Math.random() - .5);


    shuffled
        .slice(0, count)
        .forEach(item => {

            const div =
                document.createElement("div");

            div.className =
                "achievement";


            div.innerHTML = `

                <strong>
                    ${item.icon} ${item.title}
                </strong>

                <span>
                    ${item.description}
                </span>

            `;


            achievements.appendChild(div);

        });

}


/* =========================
   PARENTAL COMPLAINT
========================= */

complaintBtn.addEventListener("click", () => {

    complaint.classList.toggle("show");


    if (!complaint.classList.contains("show")) {
        return;
    }


    complaint.innerHTML = `

        <div class="complaint-title">
            OFFICIAL PARENTAL COMPLAINT™
        </div>

        <p>
            Dear Child,
        </p>

        <br>

        <p>
            After careful evaluation, the management
            has identified the following concerns:
        </p>

        <br>

        <ul>

            <li>
                You sleep at completely unacceptable hours.
            </li>

            <li>
                Your screen time requires its own budget.
            </li>

            <li>
                Your career plan remains classified.
            </li>

            <li>
                Your room has entered a new ecosystem.
            </li>

            <li>
                Your relatives have started asking questions.
            </li>

        </ul>

        <br>

        <p>
            Please improve immediately.
        </p>

        <br>

        <strong>
            Regards,<br>
            The Management
        </strong>

    `;

});


/* =========================
   EXCUSE GENERATOR
========================= */

const excuses = [

    "The market conditions were unfavorable.",

    "I was focusing on personal development.",

    "The startup is currently in stealth mode.",

    "I am currently exploring multiple career opportunities.",

    "The algorithm has not yet recognized my potential.",

    "I am working on something very big. I cannot disclose it yet.",

    "My five-year plan is still loading.",

    "I am prioritizing mental bandwidth optimization.",

    "The economy is partially responsible.",

    "I am waiting for the right opportunity."
];


excuseBtn.addEventListener("click", () => {

    excuse.classList.add("show");


    const random =
        excuses[
            Math.floor(
                Math.random() * excuses.length
            )
        ];


    excuse.innerHTML = `

        <strong>
            🧑‍💻 OFFICIAL EXCUSE
        </strong>

        <br><br>

        "${random}"

    `;

});


/* =========================
   AGAIN
========================= */

againBtn.addEventListener("click", () => {

    currentQuestion = 0;

    totalScore = 0;

    showScreen(quiz);

    loadQuestion();

});


/* =========================
   FINAL REVEAL
========================= */

restartBtn.addEventListener("click", () => {

    currentQuestion = 0;

    totalScore = 0;

    showScreen(landing);

});