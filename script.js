// =========================================================
// PARENTS DISAPPOINTMENT CALCULATOR™ - JAVASCRIPT
// =========================================================

/**
 * 1. Global User Data Object
 * Stores all 8 answers entered by the real user.
 */
const userData = {
    age: null,
    academics: null,
    career: null,
    income: null,
    fitness: null,
    skills: null,
    household: null,
    relationship: null
};

/**
 * 2. Separate Comparison Kid Object
 * Stores the generated stats for the fictional "Other Kid™".
 */
const comparisonKid = {
    name: "",
    age: null,
    academics: "",
    income: "",
    exercise: "",
    skills: "",
    quote: ""
};

/**
 * 3. Final Calculated Result Object
 * Stores the calculated score, category, breakdown, and explanation.
 */
const calculatedScoreResult = {
    score: 0,
    category: "",
    breakdown: {},
    parentLogicModifier: 0,
    randomEvent: null,
    explanation: ""
};

/**
 * 4. Data Pools for Fictional Characters, Random Events & Parent Chaos
 */
const rivalNames = [
    "Sharma Ji's Son™",
    "The Neighbor's Kid™",
    "Your Cousin™",
    "That Kid From WhatsApp™",
    "Someone Your Parents Met Once™"
];

const rivalQuotes = [
    "He wakes up at 5 AM. Nobody knows why.",
    "Apparently he has already bought a house.",
    "Your parents met him once. That was enough.",
    "He has 14 certificates. You have Netflix.",
    "He somehow has a LinkedIn profile at age 12."
];

const rivalIncomes = ["₹1.2L", "₹2.5L", "₹3.8L", "₹5.0L", "₹10L+"];
const rivalExercises = ["7 days/week (at 4:30 AM)", "6 days/week", "Twice a day", "Marathon runner on weekends"];
const rivalAcademics = ["96.8%", "98.5%", "99.2%", "100% (Gold Medalist)"];
const rivalSkillsList = ["17 certified skills", "24 skills including AI & gourmet cooking", "32 skills and speaks 6 languages", "Too many to count"];

// Humorous Random Events during scoring
const randomEventsPool = [
    { text: "Your cousin just got promoted at work.", effect: 8 },
    { text: "Your mother compared you to someone in a family WhatsApp group.", effect: 5 },
    { text: "You cleaned the house without being asked.", effect: -5 },
    { text: "You actually woke up before 7:00 AM.", effect: -3 },
    { text: "A distant relative spotted you ordering fast food at midnight.", effect: 6 }
];

// Humorous Parent Reaction Quotes for final screen
const parentReactionsPool = [
    "Your parents have reviewed the evidence.",
    "Please prepare for a family discussion.",
    "Your cousin has been mentioned 7 times.",
    "Your parents say they're proud of you. But...",
    "Someone else's child has entered the chat."
];

// Humorous Toast Notification Pool (Parental Chaos Layer)
const parentToastsPool = [
    "🔔 MOM: Sharma Ji's son just got promoted.",
    "📢 DAD: Have you considered a government job?",
    "⚠️ AUNTY: Your cousin is getting married next month.",
    "💀 SYSTEM: Comparison mode activated.",
    "📱 MOM: Look at this WhatsApp status.",
    "😐 DAD: I'm not comparing you, but...",
    "🏆 SYSTEM: Someone else's child has entered the chat.",
    "📊 MOM: Your marks have been compared with the entire family."
];

/**
 * 5. Grabbing DOM Elements (HTML Elements)
 */
// Views
const landingView = document.getElementById("landing-view");
const q1View = document.getElementById("q1-view");
const q2View = document.getElementById("q2-view");
const q3View = document.getElementById("q3-view");
const q4View = document.getElementById("q4-view");
const q5View = document.getElementById("q5-view");
const q6View = document.getElementById("q6-view");
const q7View = document.getElementById("q7-view");
const q8View = document.getElementById("q8-view");
const loadingView = document.getElementById("loading-view");
const otherKidView = document.getElementById("other-kid-view");
const comparisonView = document.getElementById("comparison-view");
const resultsView = document.getElementById("results-view");

// Buttons
const startBtn = document.getElementById("start-btn");
const q1NextBtn = document.getElementById("q1-next-btn");
const q2NextBtn = document.getElementById("q2-next-btn");
const q3NextBtn = document.getElementById("q3-next-btn");
const q4NextBtn = document.getElementById("q4-next-btn");
const q5NextBtn = document.getElementById("q5-next-btn");
const q6NextBtn = document.getElementById("q6-next-btn");
const q7NextBtn = document.getElementById("q7-next-btn");
const calculateBtn = document.getElementById("calculate-btn");
const compareBtn = document.getElementById("compare-btn");
const revealBtn = document.getElementById("reveal-btn");
const shareBtn = document.getElementById("share-btn");
const tryAgainBtn = document.getElementById("try-again-btn");

// Question Elements
const ageInput = document.getElementById("age-input");
const q1Error = document.getElementById("q1-error");
const academicOptionCards = document.querySelectorAll("#academics-options .option-card");
const q2Error = document.getElementById("q2-error");
const careerOptionCards = document.querySelectorAll("#career-options .option-card");
const q3Error = document.getElementById("q3-error");
const incomeOptionCards = document.querySelectorAll("#income-options .option-card");
const q4Error = document.getElementById("q4-error");
const fitnessOptionCards = document.querySelectorAll("#fitness-options .option-card");
const q5Error = document.getElementById("q5-error");
const skillsOptionCards = document.querySelectorAll("#skills-options .option-card");
const q6Error = document.getElementById("q6-error");
const householdOptionCards = document.querySelectorAll("#household-options .option-card");
const q7Error = document.getElementById("q7-error");
const relationshipOptionCards = document.querySelectorAll("#relationship-options .option-card");
const q8Error = document.getElementById("q8-error");

// Other Kid View Elements
const rivalNameEl = document.getElementById("rival-name");
const rivalAgeEl = document.getElementById("rival-age");
const rivalAcademicsEl = document.getElementById("rival-academics");
const rivalIncomeEl = document.getElementById("rival-income");
const rivalExerciseEl = document.getElementById("rival-exercise");
const rivalSkillsEl = document.getElementById("rival-skills");
const rivalQuoteEl = document.getElementById("rival-quote");

// The Comparison Screen Elements
const compYouAgeEl = document.getElementById("comp-you-age");
const compRivalAgeEl = document.getElementById("comp-rival-age");
const compRivalBadgeAgeEl = document.getElementById("comp-rival-badge-age");
const reactAgeEl = document.getElementById("react-age");

const compYouAcademicsEl = document.getElementById("comp-you-academics");
const compRivalAcademicsEl = document.getElementById("comp-rival-academics");
const compRivalBadgeAcademicsEl = document.getElementById("comp-rival-badge-academics");
const reactAcademicsEl = document.getElementById("react-academics");

const compYouIncomeEl = document.getElementById("comp-you-income");
const compRivalIncomeEl = document.getElementById("comp-rival-income");
const compRivalBadgeIncomeEl = document.getElementById("comp-rival-badge-income");
const reactIncomeEl = document.getElementById("react-income");

const compYouFitnessEl = document.getElementById("comp-you-fitness");
const compRivalExerciseEl = document.getElementById("comp-rival-exercise");
const compRivalBadgeExerciseEl = document.getElementById("comp-rival-badge-exercise");
const reactExerciseEl = document.getElementById("react-exercise");

const compYouSkillsEl = document.getElementById("comp-you-skills");
const compRivalSkillsEl = document.getElementById("comp-rival-skills");
const compRivalBadgeSkillsEl = document.getElementById("comp-rival-badge-skills");
const reactSkillsEl = document.getElementById("react-skills");

// Results View Elements
const finalScoreNumberEl = document.getElementById("final-score-number");
const finalScoreCategoryEl = document.getElementById("final-score-category");
const meterFillEl = document.getElementById("meter-fill");
const finalExplanationEl = document.getElementById("final-explanation");
const factorsListEl = document.getElementById("factors-list");
const parentReactionTextEl = document.getElementById("parent-reaction-text");
const shareFeedbackEl = document.getElementById("share-feedback");

// Toast & Easter Egg Elements
const toastContainer = document.getElementById("toast-container");
const mainBrandTitle = document.getElementById("main-brand-title");
const easterEggModal = document.getElementById("easter-egg-modal");
const closeModalBtn = document.getElementById("close-modal-btn");

/**
 * 6. Helper Function: Smooth View Switcher
 */
function switchView(fromView, toView) {
    fromView.classList.add("hidden");
    toView.classList.remove("hidden");
    toView.classList.remove("fade-in");
    
    // Trigger reflow to restart CSS animation
    void toView.offsetWidth;
    toView.classList.add("fade-in");
}

/**
 * 7. Helper Function: Pick a Random Item from an Array
 */
function getRandomItem(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

/**
 * 8. Notification System: Reusable Toast Function
 */
function showNotification(message) {
    if (!toastContainer) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("toast-fade-out");
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 400);
    }, 3200);
}

/**
 * Helper to occasionally trigger a toast notification (45% probability)
 */
function maybeShowNotification() {
    if (Math.random() < 0.45) {
        setTimeout(() => {
            const randomToast = getRandomItem(parentToastsPool);
            showNotification(randomToast);
        }, 400);
    }
}

/**
 * Helper: Handle Option Card Selection & Accessibility (aria-checked)
 */
function handleOptionSelection(cards, selectedCard, storageKey) {
    cards.forEach(c => {
        c.classList.remove("selected");
        c.setAttribute("aria-checked", "false");
    });

    selectedCard.classList.add("selected");
    selectedCard.setAttribute("aria-checked", "true");
    userData[storageKey] = selectedCard.getAttribute("data-value");
    console.log(`Updated ${storageKey}:`, userData[storageKey]);
}

/**
 * 9. Easter Egg: 5 Quick Clicks on Website Title
 */
let easterClickCount = 0;
let easterClickTimer = null;

if (mainBrandTitle) {
    mainBrandTitle.addEventListener("click", function () {
        easterClickCount++;
        
        clearTimeout(easterClickTimer);
        easterClickTimer = setTimeout(() => {
            easterClickCount = 0;
        }, 1800);

        if (easterClickCount >= 5) {
            easterClickCount = 0;
            easterEggModal.classList.remove("hidden");
        }
    });
}

if (closeModalBtn) {
    closeModalBtn.addEventListener("click", function () {
        easterEggModal.classList.add("hidden");
    });
}

/**
 * 10. Fictional Character Generator Function
 */
function generateOtherKid() {
    comparisonKid.name = getRandomItem(rivalNames);
    
    const userAge = userData.age || 24;
    comparisonKid.age = Math.max(19, userAge - 2);
    
    comparisonKid.academics = getRandomItem(rivalAcademics);
    comparisonKid.income = getRandomItem(rivalIncomes);
    comparisonKid.exercise = getRandomItem(rivalExercises);
    comparisonKid.skills = getRandomItem(rivalSkillsList);
    comparisonKid.quote = getRandomItem(rivalQuotes);

    // Update Other Kid View
    rivalNameEl.textContent = comparisonKid.name;
    rivalAgeEl.textContent = `${comparisonKid.age} (Younger than you)`;
    rivalAcademicsEl.textContent = comparisonKid.academics;
    rivalIncomeEl.textContent = comparisonKid.income;
    rivalExerciseEl.textContent = comparisonKid.exercise;
    rivalSkillsEl.textContent = comparisonKid.skills;
    rivalQuoteEl.textContent = `“${comparisonKid.quote}”`;

    console.log("Generated Other Kid™ Data:", comparisonKid);
}

/**
 * 11. Populate Comparison Screen Function
 */
function renderComparison() {
    // 1. Age
    compYouAgeEl.textContent = userData.age ? `${userData.age} years old` : "N/A";
    compRivalAgeEl.textContent = `${comparisonKid.age} years old (Peak potential)`;
    compRivalBadgeAgeEl.textContent = comparisonKid.name.toUpperCase();
    reactAgeEl.textContent = "⏳ Time is ticking.";

    // 2. Academics
    compYouAcademicsEl.textContent = userData.academics || "N/A";
    compRivalAcademicsEl.textContent = comparisonKid.academics;
    compRivalBadgeAcademicsEl.textContent = comparisonKid.name.toUpperCase();
    if (userData.academics && userData.academics.includes("topper")) {
        reactAcademicsEl.textContent = "🤔 A worthy challenger appears!";
    } else if (userData.academics && userData.academics.includes("talk about it")) {
        reactAcademicsEl.textContent = "💀 Total emotional damage.";
    } else {
        reactAcademicsEl.textContent = "😬 Not looking good.";
    }

    // 3. Monthly Income
    compYouIncomeEl.textContent = userData.income || "N/A";
    compRivalIncomeEl.textContent = comparisonKid.income;
    compRivalBadgeIncomeEl.textContent = comparisonKid.name.toUpperCase();
    if (userData.income && userData.income.includes("₹1L+")) {
        reactIncomeEl.textContent = "😳 Wait... YOU WIN THIS ONE.";
    } else if (userData.income && userData.income.includes("₹0")) {
        reactIncomeEl.textContent = "💸 Your parents felt that.";
    } else {
        reactIncomeEl.textContent = "📉 A noticeable financial gap.";
    }

    // 4. Exercise
    compYouFitnessEl.textContent = userData.fitness || "N/A";
    compRivalExerciseEl.textContent = comparisonKid.exercise;
    compRivalBadgeExerciseEl.textContent = comparisonKid.name.toUpperCase();
    if (userData.fitness && userData.fitness.includes("Every day")) {
        reactExerciseEl.textContent = "💪 Respectable dedication.";
    } else if (userData.fitness && userData.fitness.includes("fridge")) {
        reactExerciseEl.textContent = "🛋️ Your parents have noticed.";
    } else {
        reactExerciseEl.textContent = "🏋️ Rival is running laps around you.";
    }

    // 5. Skills
    compYouSkillsEl.textContent = userData.skills || "N/A";
    compRivalSkillsEl.textContent = comparisonKid.skills;
    compRivalBadgeSkillsEl.textContent = comparisonKid.name.toUpperCase();
    if (userData.skills && userData.skills.includes("Too many")) {
        reactSkillsEl.textContent = "🔥 Finally, some competition!";
    } else {
        reactSkillsEl.textContent = "🧠 The resume gap is alarming.";
    }
}

/**
 * 12. SCORING ALGORITHM: calculateDisappointmentScore()
 */
function calculateDisappointmentScore() {
    let disappointment = 0;
    const breakdown = {};

    // 1. Academics (Max Weight: 20 pts)
    let academicPts = 12;
    if (userData.academics) {
        if (userData.academics.includes("topper")) academicPts = 2;
        else if (userData.academics.includes("decent")) academicPts = 7;
        else if (userData.academics.includes("surviving")) academicPts = 14;
        else if (userData.academics.includes("talk about it")) academicPts = 20;
    }
    disappointment += academicPts;
    breakdown.academics = academicPts;

    // 2. Career (Max Weight: 15 pts)
    let careerPts = 8;
    if (userData.career) {
        if (userData.career.includes("working")) careerPts = 2;
        else if (userData.career.includes("studying")) careerPts = 5;
        else if (userData.career.includes("Looking")) careerPts = 11;
        else if (userData.career.includes("complicated")) careerPts = 15;
    }
    disappointment += careerPts;
    breakdown.career = careerPts;

    // 3. Income (Max Weight: 20 pts)
    let incomePts = 12;
    if (userData.income) {
        if (userData.income.includes("₹1L+")) incomePts = 2;
        else if (userData.income.includes("₹50K–1L")) incomePts = 6;
        else if (userData.income.includes("₹25–50K")) incomePts = 11;
        else if (userData.income.includes("₹1–25K")) incomePts = 16;
        else if (userData.income.includes("₹0")) incomePts = 20;
    }
    disappointment += incomePts;
    breakdown.income = incomePts;

    // 4. Fitness (Max Weight: 10 pts)
    let fitnessPts = 5;
    if (userData.fitness) {
        if (userData.fitness.includes("Every day")) fitnessPts = 1;
        else if (userData.fitness.includes("few times")) fitnessPts = 3;
        else if (userData.fitness.includes("Occasionally")) fitnessPts = 7;
        else if (userData.fitness.includes("fridge")) fitnessPts = 10;
    }
    disappointment += fitnessPts;
    breakdown.fitness = fitnessPts;

    // 5. Skills (Max Weight: 10 pts)
    let skillsPts = 5;
    if (userData.skills) {
        if (userData.skills.includes("Too many")) skillsPts = 1;
        else if (userData.skills.includes("4–5")) skillsPts = 3;
        else if (userData.skills.includes("2–3")) skillsPts = 6;
        else if (userData.skills.includes("0–1")) skillsPts = 10;
    }
    disappointment += skillsPts;
    breakdown.skills = skillsPts;

    // 6. Household (Max Weight: 10 pts)
    let householdPts = 5;
    if (userData.household) {
        if (userData.household.includes("run the house")) householdPts = 1;
        else if (userData.household.includes("Sometimes")) householdPts = 4;
        else if (userData.household.includes("asked")) householdPts = 7;
        else if (userData.household.includes("reason Mom is asking")) householdPts = 10;
    }
    disappointment += householdPts;
    breakdown.household = householdPts;

    // 7. Relationship (Max Weight: 15 pts)
    let relationshipPts = 8;
    if (userData.relationship) {
        if (userData.relationship.includes("Married")) relationshipPts = 1;
        else if (userData.relationship.includes("Engaged")) relationshipPts = 3;
        else if (userData.relationship.includes("Dating")) relationshipPts = 7;
        else if (userData.relationship.includes("Single")) relationshipPts = 11;
        else if (userData.relationship.includes("asking")) relationshipPts = 15;
    }
    disappointment += relationshipPts;
    breakdown.relationship = relationshipPts;

    // 8. Rival Comparison Modifier
    let rivalModifier = 0;
    if (comparisonKid.income && (comparisonKid.income.includes("5.0L") || comparisonKid.income.includes("10L+"))) {
        if (!userData.income || !userData.income.includes("₹1L+")) rivalModifier += 4;
    }
    if (userData.skills && userData.skills.includes("Too many")) rivalModifier -= 3;
    disappointment += rivalModifier;

    // 9. Parent Logic™ Modifier (-5 to +10 pts)
    const parentLogicModifier = Math.floor(Math.random() * 16) - 5;
    disappointment += parentLogicModifier;

    // 10. Random Humorous Event
    const randomEvent = getRandomItem(randomEventsPool);
    disappointment += randomEvent.effect;

    // 11. Clamping strictly between 0 and 100
    const finalScore = Math.max(0, Math.min(100, Math.round(disappointment)));

    // 12. Score Categories
    let category = "";
    if (finalScore <= 20) category = "FAVOURITE CHILD STATUS";
    else if (finalScore <= 40) category = "DOING ALRIGHT";
    else if (finalScore <= 60) category = "COULD BE BETTER";
    else if (finalScore <= 80) category = "PARENTS ARE CONCERNED";
    else category = "CRITICALLY DISAPPOINTING";

    // 13. Dynamic Explanation
    let explanation = "";
    if (incomePts >= 16) {
        explanation = `You lost critical points because ${comparisonKid.name} is earning ${comparisonKid.income} while you are still "investing in yourself".`;
    } else if (academicPts >= 14) {
        explanation = `Your academic track record was brought up at the family dinner table. Nobody defended you.`;
    } else if (fitnessPts >= 7) {
        explanation = `Your step count saved you from none of your parents' subtle, lingering sighs.`;
    } else if (finalScore <= 30) {
        explanation = `Miraculously, you survived with low disappointment. Your parents might actually brag about you on WhatsApp today!`;
    } else {
        explanation = `Your parents have officially compared your profile with ${comparisonKid.name} and forwarded the verdict to your relatives.`;
    }

    // Save to global results state
    calculatedScoreResult.score = finalScore;
    calculatedScoreResult.category = category;
    calculatedScoreResult.breakdown = breakdown;
    calculatedScoreResult.parentLogicModifier = parentLogicModifier;
    calculatedScoreResult.randomEvent = randomEvent;
    calculatedScoreResult.explanation = explanation;

    console.log("Calculated Disappointment Result:", calculatedScoreResult);
    return calculatedScoreResult;
}

/**
 * 13. Helper: Animate Counter from 0 to Target Score
 */
function animateScoreCounter(targetScore, duration = 1200) {
    let startTimestamp = null;
    const startVal = 0;

    function step(timestamp) {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        const easeOutQuad = 1 - (1 - progress) * (1 - progress);
        const currentVal = Math.floor(easeOutQuad * (targetScore - startVal) + startVal);
        
        finalScoreNumberEl.textContent = `${currentVal}%`;

        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            finalScoreNumberEl.textContent = `${targetScore}%`;
        }
    }

    window.requestAnimationFrame(step);
}

/**
 * 14. Helper: Generate Top 3 Concern Reasons for Results Screen
 */
function generateConcernFactors(result) {
    const factors = [];

    if (result.breakdown.income >= 11) {
        factors.push({
            icon: "💸",
            text: `Monthly income (${userData.income || "low"}) fell behind ${comparisonKid.name}'s ${comparisonKid.income}.`
        });
    } else if (result.breakdown.academics >= 14) {
        factors.push({
            icon: "📚",
            text: `Academic history (${userData.academics || "average"}) failed to beat the rival benchmark of ${comparisonKid.academics}.`
        });
    } else {
        factors.push({
            icon: "💼",
            text: `Career situation (${userData.career || "uncertain"}) prompted unexpected parental questions.`
        });
    }

    if (result.breakdown.fitness >= 7) {
        factors.push({
            icon: "🛋️",
            text: `Exercise habits: "${userData.fitness}" compared to rival's ${comparisonKid.exercise}.`
        });
    } else if (result.breakdown.household >= 7) {
        factors.push({
            icon: "🧹",
            text: `Household contribution: "${userData.household}" raised eyebrows.`
        });
    } else {
        factors.push({
            icon: "💍",
            text: `Relationship status: "${userData.relationship}" kept relatives asking questions.`
        });
    }

    if (result.randomEvent) {
        factors.push({
            icon: "📢",
            text: `Random Event: "${result.randomEvent.text}" (${result.randomEvent.effect >= 0 ? '+' : ''}${result.randomEvent.effect}% disappointment).`
        });
    }

    return factors.slice(0, 3);
}

/**
 * 15. Populate & Render Final Results Screen
 */
function renderResults(result) {
    animateScoreCounter(result.score);
    finalScoreCategoryEl.textContent = result.category;

    meterFillEl.style.width = "0%";
    const meterTrack = document.querySelector(".meter-track");
    if (meterTrack) {
        meterTrack.setAttribute("aria-valuenow", result.score);
    }

    setTimeout(() => {
        meterFillEl.style.width = `${result.score}%`;
    }, 100);

    finalExplanationEl.textContent = `“${result.explanation}”`;

    const factors = generateConcernFactors(result);
    factorsListEl.innerHTML = factors.map(f => `
        <div class="factor-item">
            <span class="factor-icon">${f.icon}</span>
            <span class="factor-text">${f.text}</span>
        </div>
    `).join("");

    const randomReaction = getRandomItem(parentReactionsPool);
    parentReactionTextEl.textContent = `“${randomReaction}”`;

    shareFeedbackEl.classList.add("hidden");
    shareFeedbackEl.textContent = "";
}

/**
 * 16. Reset Calculator Function (For "TRY AGAIN")
 */
function resetCalculator() {
    userData.age = null;
    userData.academics = null;
    userData.career = null;
    userData.income = null;
    userData.fitness = null;
    userData.skills = null;
    userData.household = null;
    userData.relationship = null;

    ageInput.value = "";
    ageInput.classList.remove("input-error");

    document.querySelectorAll(".option-card").forEach(card => {
        card.classList.remove("selected");
        card.setAttribute("aria-checked", "false");
    });

    document.querySelectorAll(".error-msg, .confirm-msg").forEach(el => {
        el.classList.add("hidden");
    });

    meterFillEl.style.width = "0%";
    switchView(resultsView, landingView);
    console.log("Calculator reset to initial state.");
}

/**
 * =========================================================
 * ALL EVENT LISTENERS
 * =========================================================
 */

// Step 1: Landing Page -> Question 1
startBtn.addEventListener("click", function () {
    switchView(landingView, q1View);
    ageInput.focus();
    maybeShowNotification();
});

// Step 2: Question 1 -> Question 2
function handleQ1Submit() {
    const ageValue = ageInput.value.trim();

    if (!ageValue || isNaN(ageValue) || Number(ageValue) <= 0) {
        q1Error.classList.remove("hidden");
        ageInput.classList.add("input-error");
        ageInput.focus();
        return;
    }

    q1Error.classList.add("hidden");
    ageInput.classList.remove("input-error");
    userData.age = Number(ageValue);
    switchView(q1View, q2View);
    maybeShowNotification();
}

q1NextBtn.addEventListener("click", handleQ1Submit);

// Keyboard Enter Key on Age Input
ageInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        handleQ1Submit();
    }
});

ageInput.addEventListener("input", function () {
    if (!q1Error.classList.contains("hidden")) {
        q1Error.classList.add("hidden");
        ageInput.classList.remove("input-error");
    }
});

// Step 3: Question 2 Selection & Transition
academicOptionCards.forEach(function (card) {
    card.addEventListener("click", function () {
        handleOptionSelection(academicOptionCards, card, "academics");
        q2Error.classList.add("hidden");
    });
});

q2NextBtn.addEventListener("click", function () {
    if (!userData.academics) {
        q2Error.classList.remove("hidden");
        return;
    }
    q2Error.classList.add("hidden");
    switchView(q2View, q3View);
    maybeShowNotification();
});

// Step 4: Question 3 Selection & Transition
careerOptionCards.forEach(function (card) {
    card.addEventListener("click", function () {
        handleOptionSelection(careerOptionCards, card, "career");
        q3Error.classList.add("hidden");
    });
});

q3NextBtn.addEventListener("click", function () {
    if (!userData.career) {
        q3Error.classList.remove("hidden");
        return;
    }
    q3Error.classList.add("hidden");
    switchView(q3View, q4View);
    maybeShowNotification();
});

// Step 5: Question 4 Selection & Transition
incomeOptionCards.forEach(function (card) {
    card.addEventListener("click", function () {
        handleOptionSelection(incomeOptionCards, card, "income");
        q4Error.classList.add("hidden");
    });
});

q4NextBtn.addEventListener("click", function () {
    if (!userData.income) {
        q4Error.classList.remove("hidden");
        return;
    }
    q4Error.classList.add("hidden");
    switchView(q4View, q5View);
    maybeShowNotification();
});

// Step 6: Question 5 Selection & Transition
fitnessOptionCards.forEach(function (card) {
    card.addEventListener("click", function () {
        handleOptionSelection(fitnessOptionCards, card, "fitness");
        q5Error.classList.add("hidden");
    });
});

q5NextBtn.addEventListener("click", function () {
    if (!userData.fitness) {
        q5Error.classList.remove("hidden");
        return;
    }
    q5Error.classList.add("hidden");
    switchView(q5View, q6View);
    maybeShowNotification();
});

// Step 7: Question 6 Selection & Transition
skillsOptionCards.forEach(function (card) {
    card.addEventListener("click", function () {
        handleOptionSelection(skillsOptionCards, card, "skills");
        q6Error.classList.add("hidden");
    });
});

q6NextBtn.addEventListener("click", function () {
    if (!userData.skills) {
        q6Error.classList.remove("hidden");
        return;
    }
    q6Error.classList.add("hidden");
    switchView(q6View, q7View);
    maybeShowNotification();
});

// Step 8: Question 7 Selection & Transition
householdOptionCards.forEach(function (card) {
    card.addEventListener("click", function () {
        handleOptionSelection(householdOptionCards, card, "household");
        q7Error.classList.add("hidden");
    });
});

q7NextBtn.addEventListener("click", function () {
    if (!userData.household) {
        q7Error.classList.remove("hidden");
        return;
    }
    q7Error.classList.add("hidden");
    switchView(q7View, q8View);
    maybeShowNotification();
});

// Step 9: Question 8 Selection
relationshipOptionCards.forEach(function (card) {
    card.addEventListener("click", function () {
        handleOptionSelection(relationshipOptionCards, card, "relationship");
        q8Error.classList.add("hidden");
    });
});

// Step 10: "CALCULATE MY DISAPPOINTMENT" -> Loading -> Show "Other Kid™"
calculateBtn.addEventListener("click", function () {
    if (!userData.relationship) {
        q8Error.classList.remove("hidden");
        return;
    }

    q8Error.classList.add("hidden");
    console.log("All User Data Stored:", userData);

    switchView(q8View, loadingView);

    setTimeout(function () {
        generateOtherKid();
        switchView(loadingView, otherKidView);
        showNotification("🏆 SYSTEM: Someone else's child has entered the chat.");
    }, 1500);
});

// Step 11: "COMPARE US" -> Transition to THE COMPARISON™ Screen
compareBtn.addEventListener("click", function () {
    renderComparison();
    switchView(otherKidView, comparisonView);
    showNotification("💀 SYSTEM: Comparison mode activated.");
});

// Step 12: "REVEAL MY SCORE" -> Calculate & Transition to Final Results View
revealBtn.addEventListener("click", function () {
    const result = calculateDisappointmentScore();
    renderResults(result);
    switchView(comparisonView, resultsView);
});

// Step 13: "SHARE MY DISAPPOINTMENT" Button (Web Share API & Clipboard Fallback)
shareBtn.addEventListener("click", async function () {
    const score = calculatedScoreResult.score || 0;
    const shareText = `I scored ${score}% on the Parents Disappointment Calculator™. Apparently someone else's child is doing better.`;
    
    if (navigator.share) {
        try {
            await navigator.share({
                title: "Parents Disappointment Calculator™",
                text: shareText,
                url: window.location.href
            });
            console.log("Share successful via Web Share API");
            return;
        } catch (err) {
            console.log("Web share cancelled or failed, using clipboard fallback:", err);
        }
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareText).then(() => {
            shareFeedbackEl.textContent = "✓ Share message copied to clipboard! Forward it to family.";
            shareFeedbackEl.classList.remove("hidden");
        }).catch(() => {
            shareFeedbackEl.textContent = `Share text: "${shareText}"`;
            shareFeedbackEl.classList.remove("hidden");
        });
    } else {
        shareFeedbackEl.textContent = `Share text: "${shareText}"`;
        shareFeedbackEl.classList.remove("hidden");
    }
});

// Step 14: "TRY AGAIN" Button -> Reset All Data & Return to Landing Page
tryAgainBtn.addEventListener("click", function () {
    resetCalculator();
});
