/* ================================
   LEVEL SYSTEM
================================ */

const rpgModeButton = document.getElementById("rpgModeButton");
const rpgScreen = document.getElementById("rpgScreen");
const rpgBackButton = document.getElementById("rpgBackButton");
const rpgStartOverlay = document.getElementById("rpgStartOverlay");
const rpgStartButton = document.getElementById("rpgStartButton");
const rpgArena = document.getElementById("rpgArena");
const rpgInput = document.getElementById("rpgInput");
const rpgLives = document.getElementById("rpgLives");
const rpgWave = document.getElementById("rpgWave");
const rpgKills = document.getElementById("rpgKills");
const rpgScore = document.getElementById("rpgScore");
const rpgCombo = document.getElementById("rpgCombo");
const grenadeButton = document.getElementById("grenadeButton");
const freezeButton = document.getElementById("freezeButton");
const shieldButton = document.getElementById("shieldButton");
const grenadeCount = document.getElementById("grenadeCount");
const freezeCount = document.getElementById("freezeCount");
const shieldCount = document.getElementById("shieldCount");
const shortWordsButton = document.getElementById("shortWordsButton");
const shortWordsCount = document.getElementById("shortWordsCount");
const similarWordsButton = document.getElementById("similarWordsButton");
const similarWordsCount = document.getElementById("similarWordsCount");
const rpgLevel = document.getElementById("rpgLevel");
const rpgXP = document.getElementById("rpgXP");
const rpgGameOver = document.getElementById("rpgGameOver");
const rpgFinalStats = document.getElementById("rpgFinalStats");
const rpgRetryButton = document.getElementById("rpgRetryButton");
const rpgMenuButton = document.getElementById("rpgMenuButton");

let currentLevel = 0;

let text = levels[currentLevel].text;


/* ================================
   DOM ELEMENTS
================================ */

const textDisplay =
    document.getElementById("textDisplay");

const input =
    document.getElementById("input");

const timeDisplay =
    document.getElementById("time");

const wpmDisplay =
    document.getElementById("wpm");

const accuracyDisplay =
    document.getElementById("accuracy");

const mistakesDisplay =
    document.getElementById("mistakes");

const scoreDisplay =
    document.getElementById("score");

const comboDisplay =
    document.getElementById("combo");

const speedBar =
    document.getElementById("speedBar");

const accuracyBar =
    document.getElementById("accuracyBar");

const comboBar =
    document.getElementById("comboBar");

const speedPercent =
    document.getElementById("speedPercent");

const accuracyPercent =
    document.getElementById("accuracyPercent");

const comboPercent =
    document.getElementById("comboPercent");

const result =
    document.getElementById("result");

const rankDisplay =
    document.getElementById("rank");

const finalWpm =
    document.getElementById("finalWpm");

const finalAccuracy =
    document.getElementById("finalAccuracy");

const finalCombo =
    document.getElementById("finalCombo");

const messageDisplay =
    document.getElementById("message");

const restartButton =
    document.getElementById("restart");

const retryButton =
    document.getElementById("retry");


/* ================================
   XP DISPLAY ELEMENTS
================================ */

const xpEarnedDisplay =
    document.getElementById("xpEarned");

const playerLevelDisplay =
    document.getElementById("playerLevel");

const currentXPDisplay =
    document.getElementById("currentXP");

const nextXPDisplay =
    document.getElementById("nextXP");

const xpBar =
    document.getElementById("xpBar");

const levelUpMessage =
    document.getElementById("levelUpMessage");


/* ================================
   LEVEL MENU ELEMENTS
================================ */

const levelMenu =
    document.getElementById("levelMenu");

const levelList =
    document.getElementById("levelList");

const gameScreen =
    document.getElementById("gameScreen");

const levelSelectButton =
    document.getElementById("levelSelect");


/* ================================
   PLAYER PROFILE ELEMENTS
================================ */

const profileButton =
    document.getElementById("profileButton");

const profileScreen =
    document.getElementById("profileScreen");

const profileBackButton =
    document.getElementById("profileBackButton");

const profilePlayerLevel =
    document.getElementById("profilePlayerLevel");

const profileXPBar =
    document.getElementById("profileXPBar");

const profileCurrentXP =
    document.getElementById("profileCurrentXP");

const profileNextXP =
    document.getElementById("profileNextXP");

const profileCompleted =
    document.getElementById("profileCompleted");

const profileBestRank =
    document.getElementById("profileBestRank");

const profileTotalXP =
    document.getElementById("profileTotalXP");

const profileBestWPM =
    document.getElementById("profileBestWPM");

const profileBestAccuracy =
    document.getElementById("profileBestAccuracy");

const profileBestCombo =
    document.getElementById("profileBestCombo");

const profileUnlocks =
    document.getElementById("profileUnlocks");

const profileCard =
    document.getElementById("profileCard");

const profileAvatar =
    document.getElementById("profileAvatar");

const profileAvatarInput =
    document.getElementById("profileAvatarInput");

const profileNameInput =
    document.getElementById("profileNameInput");

const saveProfileButton =
    document.getElementById("saveProfileButton");

const profileIdentityLevel =
    document.getElementById("profileIdentityLevel");

const profileDesignName =
    document.getElementById("profileDesignName");

const profileDesigns =
    document.getElementById("profileDesigns");

const profileFonts =
    document.getElementById("profileFonts");

const DEFAULT_AVATAR =
    "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
            <rect width="256" height="256" fill="#151515"/>
            <circle cx="128" cy="92" r="48" fill="#777"/>
            <path d="M48 236c8-55 40-82 80-82s72 27 80 82" fill="#777"/>
            <text x="128" y="245" text-anchor="middle" font-family="Arial" font-size="18" fill="#eee">TF</text>
        </svg>
    `);

const profileDesignRewards = {
    forge: { name: "FORGE", level: 1, className: "profile-design-forge" },
    neon: { name: "NEON", level: 3, className: "profile-design-neon" },
    terminal: { name: "TERMINAL", level: 5, className: "profile-design-terminal" },
    void: { name: "VOID", achievement: "wave5", className: "profile-design-void" },
    glitch: { name: "GLITCH", achievement: "wave10", className: "profile-design-glitch" }
};

const profileFontRewards = {
    system: { name: "SYSTEM", level: 1, family: "Arial, sans-serif" },
    mono: { name: "MONO", level: 3, family: "monospace" },
    pixel: { name: "PIXEL", level: 5, family: "monospace" },
    typewriter: { name: "TYPEWRITER", achievement: "score5000", family: "Courier New, monospace" }
};

let playerProfile = {
    name: localStorage.getItem("typeforgeProfileName") || "PLAYER",
    avatar: localStorage.getItem("typeforgeProfileAvatar") || DEFAULT_AVATAR,
    design: localStorage.getItem("typeforgeProfileDesign") || "forge",
    font: localStorage.getItem("typeforgeProfileFont") || "system"
};


/* ================================
   GAME VARIABLES
================================ */

let startTime = null;

let timer = null;

let finished = false;

let combo = 0;

let maxCombo = 0;

let score = 0;


/* ================================
   PROGRESSION SYSTEM
================================ */

let unlockedLevels =
    Number(
        localStorage.getItem(
            "typeforgeUnlockedLevels"
        )
    ) || 1;


let bestRanks =
    JSON.parse(
        localStorage.getItem(
            "typeforgeBestRanks"
        ) || "{}"
    );


const rankValues = {
    F: 0,
    C: 1,
    B: 2,
    A: 3,
    S: 4
};


function isRankEnough(
    rank,
    requiredRank
) {

    return (
        rankValues[rank] >=
        rankValues[requiredRank]
    );

}


/* ================================
   PROFILE CUSTOMIZATION
================================ */

function isProfileRewardUnlocked(item) {
    if (item.level) return playerLevel >= item.level;
    if (item.achievement === "wave5") return Number(localStorage.getItem("typeforgeRPGHighestWave") || 1) >= 5;
    if (item.achievement === "wave10") return Number(localStorage.getItem("typeforgeRPGHighestWave") || 1) >= 10;
    if (item.achievement === "score5000") return Number(localStorage.getItem("typeforgeRPGBestScore") || 0) >= 5000;
    return false;
}

function applyProfileCustomization() {
    const design =
        profileDesignRewards[playerProfile.design] ||
        profileDesignRewards.forge;

    const font =
        profileFontRewards[playerProfile.font] ||
        profileFontRewards.system;

    Object.values(profileDesignRewards).forEach(item => {
        profileCard.classList.remove(item.className);
    });

    profileCard.classList.add(design.className);
    profileCard.style.fontFamily = font.family;
    profileNameInput.style.fontFamily = font.family;
    profileDesignName.textContent = design.name;
    profileIdentityLevel.textContent = playerLevel;
    profileAvatar.src = playerProfile.avatar;
    profileNameInput.value = playerProfile.name;
}

function renderProfileChoices() {
    profileDesigns.innerHTML = "";
    profileFonts.innerHTML = "";

    Object.entries(profileDesignRewards).forEach(([key, item]) => {
        const unlocked = isProfileRewardUnlocked(item);
        const button = document.createElement("button");
        button.className = "profile-choice" +
            (playerProfile.design === key ? " active" : "") +
            (!unlocked ? " locked" : "");
        button.innerHTML = `${unlocked ? "✓ " : "🔒 "}${item.name}<span class="choice-level">${item.level ? `LV ${item.level}` : item.achievement === "wave5" ? "WAVE 5" : item.achievement === "wave10" ? "WAVE 10" : "SCORE 5000"}</span>`;
        button.disabled = !unlocked;
        button.addEventListener("click", () => {
            playerProfile.design = key;
            localStorage.setItem("typeforgeProfileDesign", key);
            renderProfileChoices();
            applyProfileCustomization();
        });
        profileDesigns.appendChild(button);
    });

    Object.entries(profileFontRewards).forEach(([key, item]) => {
        const unlocked = isProfileRewardUnlocked(item);
        const button = document.createElement("button");
        button.className = "profile-choice" +
            (playerProfile.font === key ? " active" : "") +
            (!unlocked ? " locked" : "");
        button.innerHTML = `${unlocked ? "✓ " : "🔒 "}${item.name}<span class="choice-level">${item.level ? `LV ${item.level}` : item.achievement === "wave5" ? "WAVE 5" : item.achievement === "wave10" ? "WAVE 10" : "SCORE 5000"}</span>`;
        button.disabled = !unlocked;
        button.addEventListener("click", () => {
            playerProfile.font = key;
            localStorage.setItem("typeforgeProfileFont", key);
            renderProfileChoices();
            applyProfileCustomization();
        });
        profileFonts.appendChild(button);
    });
}

saveProfileButton.addEventListener("click", () => {
    const cleanName = profileNameInput.value.trim().slice(0, 20);
    playerProfile.name = cleanName || "PLAYER";
    localStorage.setItem("typeforgeProfileName", playerProfile.name);
    profileNameInput.value = playerProfile.name;
    window.dispatchEvent(new CustomEvent("typeforge:profile-changed"));
});

profileAvatarInput.addEventListener("change", event => {
    const file = event.target.files && event.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = () => {
        playerProfile.avatar = reader.result;
        localStorage.setItem("typeforgeProfileAvatar", playerProfile.avatar);
        applyProfileCustomization();
        window.dispatchEvent(new CustomEvent("typeforge:profile-changed", { detail: { avatarFile: file } }));
    };
    reader.readAsDataURL(file);
});

/* ================================
   PLAYER XP SYSTEM
================================ */

let playerXP =
    Number(
        localStorage.getItem(
            "typeforgePlayerXP"
        )
    ) || 0;


let playerLevel =
    Number(
        localStorage.getItem(
            "typeforgePlayerLevel"
        )
    ) || 1;


const playerRewards = {

    2: "CUSTOM CURSOR",

    3: "NEW UI THEME",

    4: "TIME ATTACK",

    5: "COMBO EFFECTS",

    6: "ENDLESS MODE",

    7: "CHALLENGE LEVELS",

    8: "SPECIAL BADGES",

    9: "ADVANCED EFFECTS",

    10: "MASTER TYPOGRAPHER"

};


const xpRequirements = {

    1: 0,

    2: 500,

    3: 1200,

    4: 2000,

    5: 3000,

    6: 4200,

    7: 5500,

    8: 7000,

    9: 8500,

    10: 10000

};


function getPlayerLevel(xp) {

    let level = 1;

    for (
        const levelNumber
        in xpRequirements
    ) {

        if (
            xp >=
            xpRequirements[levelNumber]
            &&
            Number(levelNumber) > level
        ) {

            level =
                Number(levelNumber);

        }

    }

    return level;

}


function calculateXP(
    rank,
    accuracy,
    wpm
) {

    const rankXP = {

        F: 25,

        C: 75,

        B: 125,

        A: 200,

        S: 300

    };


    let xp =
        rankXP[rank] || 0;


    // Accuracy bonus

    xp +=
        Math.round(
            accuracy * 0.5
        );


    // Speed bonus

    xp +=
        Math.min(
            Math.round(wpm),
            100
        );


    return xp;

}


/* ================================
   PLAYER PERFORMANCE DATA
================================ */

let playerStats =
    JSON.parse(
        localStorage.getItem(
            "typeforgePlayerStats"
        ) || "{}"
    );


playerStats.bestWPM =
    playerStats.bestWPM || 0;


playerStats.bestAccuracy =
    playerStats.bestAccuracy || 0;


playerStats.bestCombo =
    playerStats.bestCombo || 0;


/* ================================
   LEVEL MENU
================================ */

function showLevelMenu() {

    gameScreen.style.display =
        "none";

    profileScreen.style.display =
        "none";

    rpgScreen.style.display =
        "none";

    levelMenu.style.display =
        "block";

    levelList.style.display =
        "grid";

    levelList.innerHTML = "";


    levels.forEach(
        (level, index) => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "level-card";


            const unlocked =
                index < unlockedLevels;


            const bestRank =
                bestRanks[level.id]
                || "-";


            card.innerHTML = `

                <div class="level-number">
                    LV - ${String(level.id).padStart(2, "0")}
                </div>

                <div class="level-name">
                    ${level.name}
                </div>

                <div class="level-description">
                    ${level.description}
                </div>

                <div class="level-difficulty">
                    ${level.difficulty}
                </div>

                <div class="level-status">

                    ${
                        unlocked

                        ? `▶ PLAY &nbsp;&nbsp; BEST: ${bestRank}`

                        : "🔒 LOCKED"

                    }

                </div>

            `;


            if (unlocked) {

                card.addEventListener(
                    "click",
                    () =>
                        startLevel(index)
                );

            }

            else {

                card.classList.add(
                    "locked"
                );

            }


            levelList.appendChild(card);

        }
    );

}


/* ================================
   START LEVEL
================================ */

function startLevel(levelIndex) {

    currentLevel =
        levelIndex;


    text =
        levels[currentLevel].text;


    levelMenu.style.display =
        "none";


    profileScreen.style.display =
        "none";


    gameScreen.style.display =
        "block";


    restartGame();

}


/* ================================
   DISPLAY TEXT
================================ */

function displayText() {

    textDisplay.innerHTML = "";


    for (
        let i = 0;
        i < text.length;
        i++
    ) {

        const span =
            document.createElement(
                "span"
            );


        span.textContent =
            text[i];


        textDisplay.appendChild(
            span
        );

    }

}


/* ================================
   START GAME
================================ */

function startGame() {

    if (
        startTime !== null
    ) {

        return;

    }


    startTime =
        Date.now();


    timer =
        setInterval(
            updateStats,
            100
        );

}


/* ================================
   UPDATE
================================ */

function updateStats() {

    if (
        finished ||
        startTime === null
    ) {

        return;

    }


    const elapsed =
        (
            Date.now() -
            startTime
        ) / 1000;


    timeDisplay.textContent =
        elapsed.toFixed(1);


    calculateStats();

}


/* ================================
   CALCULATE STATS
================================ */

function calculateStats() {

    const typed =
        input.value;


    let correct = 0;

    let mistakes = 0;


    for (
        let i = 0;
        i < typed.length;
        i++
    ) {

        if (
            typed[i] === text[i]
        ) {

            correct++;

        }

        else {

            mistakes++;

        }

    }


    /* TIME */

    const elapsed =
        startTime
        ? (
            Date.now() -
            startTime
        ) / 1000
        : 0;


    /* WPM */

    let wpm = 0;


    if (elapsed > 0) {

        const minutes =
            elapsed / 60;


        wpm =
            Math.round(
                (
                    correct / 5
                ) / minutes
            );

    }


    /* ACCURACY */

    let accuracy = 100;


    if (
        typed.length > 0
    ) {

        accuracy =
            Math.round(
                (
                    correct /
                    typed.length
                ) * 100
            );

    }


    /* COMBO */

    combo = 0;


    for (
        let i = 0;
        i < typed.length;
        i++
    ) {

        if (
            typed[i] === text[i]
        ) {

            combo++;

        }

        else {

            combo = 0;

        }


        if (
            combo > maxCombo
        ) {

            maxCombo =
                combo;

        }

    }


    /* SCORE */

    score =
        Math.round(
            (
                wpm * 10
            )
            *
            (
                accuracy / 100
            )
            +
            (
                maxCombo * 2
            )
        );


    /* DISPLAY */

    wpmDisplay.textContent =
        wpm;


    accuracyDisplay.textContent =
        accuracy + "%";


    mistakesDisplay.textContent =
        mistakes;


    scoreDisplay.textContent =
        score;


    comboDisplay.innerHTML =
        "COMBO <span>" +
        combo +
        "</span>";


    /* PERFORMANCE BARS */

    const speedValue =
        Math.min(
            wpm,
            100
        );


    speedBar.style.width =
        speedValue + "%";


    speedPercent.textContent =
        Math.round(speedValue) +
        "%";


    accuracyBar.style.width =
        accuracy + "%";


    accuracyPercent.textContent =
        accuracy + "%";


    const comboValue =
        Math.min(
            (
                combo / 50
            ) * 100,
            100
        );


    comboBar.style.width =
        comboValue + "%";


    comboPercent.textContent =
        Math.round(comboValue) +
        "%";


    updateTextDisplay(
        typed
    );


    return {

        wpm,

        accuracy,

        mistakes,

        elapsed

    };

}


/* ================================
   TEXT COLOR
================================ */

function updateTextDisplay(
    typed
) {

    const characters =
        textDisplay.children;


    for (
        let i = 0;
        i < text.length;
        i++
    ) {

        characters[i].className =
            "";


        if (
            i < typed.length
        ) {

            if (
                typed[i] === text[i]
            ) {

                characters[i]
                    .classList
                    .add("correct");

            }

            else {

                characters[i]
                    .classList
                    .add("incorrect");

            }

        }

        else if (
            i === typed.length
        ) {

            characters[i]
                .classList
                .add("current");

        }

    }

}


/* ================================
   FINISH GAME
================================ */

function finishGame() {

    finished = true;

    clearInterval(timer);


    const stats =
        calculateStats();


    /* ================================
       UPDATE BEST PERFORMANCE
    ================================ */

    if (
        stats.wpm >
        playerStats.bestWPM
    ) {

        playerStats.bestWPM =
            stats.wpm;

    }


    if (
        stats.accuracy >
        playerStats.bestAccuracy
    ) {

        playerStats.bestAccuracy =
            stats.accuracy;

    }


    if (
        maxCombo >
        playerStats.bestCombo
    ) {

        playerStats.bestCombo =
            maxCombo;

    }


    localStorage.setItem(
        "typeforgePlayerStats",
        JSON.stringify(
            playerStats
        )
    );


    /* ================================
       CALCULATE RANK
    ================================ */

    const rank =
        calculateRank(
            stats.wpm,
            stats.accuracy,
            stats.mistakes,
            stats.elapsed
        );


    /* ================================
       AWARD PLAYER XP
    ================================ */

    const earnedXP =
        calculateXP(
            rank,
            stats.accuracy,
            stats.wpm
        );


    const oldPlayerLevel =
        playerLevel;


    playerXP +=
        earnedXP;


    playerLevel =
        getPlayerLevel(
            playerXP
        );


    localStorage.setItem(
        "typeforgePlayerXP",
        playerXP
    );


    localStorage.setItem(
        "typeforgePlayerLevel",
        playerLevel
    );


    const leveledUp =
        playerLevel >
        oldPlayerLevel;


    let newReward = null;


    if (leveledUp) {

        for (
            let level =
                oldPlayerLevel + 1;

            level <= playerLevel;

            level++
        ) {

            if (
                playerRewards[level]
            ) {

                newReward =
                    playerRewards[level];

            }

        }

    }


    /* ================================
       UPDATE XP DISPLAY
    ================================ */

    xpEarnedDisplay.textContent =
        earnedXP;


    playerLevelDisplay.textContent =
        playerLevel;


    currentXPDisplay.textContent =
        playerXP;


    const nextLevelXP =
        xpRequirements[
            playerLevel + 1
        ];


    if (nextLevelXP) {

        nextXPDisplay.textContent =
            nextLevelXP;


        const currentLevelXP =
            xpRequirements[
                playerLevel
            ];


        const xpProgress =
            (
                (
                    playerXP -
                    currentLevelXP
                )
                /
                (
                    nextLevelXP -
                    currentLevelXP
                )
            ) * 100;


        xpBar.style.width =
            Math.min(
                xpProgress,
                100
            ) + "%";

    }

    else {

        nextXPDisplay.textContent =
            "MAX";


        xpBar.style.width =
            "100%";

    }


    /* ================================
       LEVEL UP MESSAGE
    ================================ */

    if (leveledUp) {

        levelUpMessage.textContent =
            `LEVEL UP! PLAYER LEVEL ${playerLevel}`;


        if (newReward) {

            levelUpMessage.textContent +=
                ` — ${newReward} UNLOCKED`;

        }

    }

    else {

        levelUpMessage.textContent =
            "";

    }


    /* ================================
       SAVE BEST RANK
    ================================ */

    const previousBest =
        bestRanks[
            currentLevel + 1
        ];


    if (
        !previousBest ||
        isRankEnough(
            rank,
            previousBest
        )
    ) {

        bestRanks[
            currentLevel + 1
        ] =
            rank;


        localStorage.setItem(
            "typeforgeBestRanks",
            JSON.stringify(
                bestRanks
            )
        );

    }


    /* ================================
       UNLOCK NEXT LEVEL
    ================================ */

    const nextLevel =
        levels[
            currentLevel + 1
        ];


    if (
        nextLevel &&
        isRankEnough(
            rank,
            nextLevel.requiredRank
        )
    ) {

        if (
            unlockedLevels <
            currentLevel + 2
        ) {

            unlockedLevels =
                currentLevel + 2;


            localStorage.setItem(
                "typeforgeUnlockedLevels",
                unlockedLevels
            );

        }

    }


    /* ================================
       FINAL RESULT
    ================================ */

    rankDisplay.textContent =
        rank;


    finalWpm.textContent =
        stats.wpm;


    finalAccuracy.textContent =
        stats.accuracy + "%";


    finalCombo.textContent =
        maxCombo;


    messageDisplay.textContent =
        getRankMessage(rank);


    result.style.display =
        "block";


    input.disabled = true;

}


/* ================================
   RANK SYSTEM
================================ */

function calculateRank(
    wpm,
    accuracy,
    mistakes,
    elapsed
) {

    /* S RANK */

    if (
        wpm >= 80 &&
        accuracy >= 98 &&
        mistakes <= 2
    ) {

        return "S";

    }


    /* A RANK */

    if (
        wpm >= 65 &&
        accuracy >= 95 &&
        mistakes <= 5
    ) {

        return "A";

    }


    /* B RANK */

    if (
        wpm >= 50 &&
        accuracy >= 90
    ) {

        return "B";

    }


    /* C RANK */

    if (
        wpm >= 35 &&
        accuracy >= 80
    ) {

        return "C";

    }


    return "F";

}


/* ================================
   MESSAGES
================================ */

function getRankMessage(
    rank
) {

    switch (rank) {

        case "S":

            return
                "PERFECT RUN. " +
                "YOU HAVE MASTERED SPEED AND ACCURACY.";


        case "A":

            return
                "EXCELLENT PERFORMANCE. " +
                "PUSH YOUR SPEED EVEN FURTHER.";


        case "B":

            return
                "GOOD PERFORMANCE. " +
                "YOUR FUNDAMENTALS ARE SOLID.";


        case "C":

            return
                "DECENT RUN. " +
                "FOCUS ON ACCURACY AND BUILD YOUR SPEED.";


        case "F":

            return
                "KEEP TRAINING. " +
                "ACCURACY COMES BEFORE SPEED.";


        default:

            return "";

    }

}


/* ================================
   INPUT
================================ */

input.addEventListener(
    "input",
    () => {

        if (finished) {

            return;

        }


        startGame();


        calculateStats();


        if (
            input.value.length >=
            text.length
        ) {

            finishGame();

        }

    }
);


/* ================================
   RESTART
================================ */

function restartGame() {

    clearInterval(timer);


    startTime = null;

    finished = false;

    combo = 0;

    maxCombo = 0;

    score = 0;


    input.disabled = false;

    input.value = "";


    timeDisplay.textContent =
        "0.0";


    wpmDisplay.textContent =
        "0";


    accuracyDisplay.textContent =
        "100%";


    mistakesDisplay.textContent =
        "0";


    scoreDisplay.textContent =
        "0";


    comboDisplay.innerHTML =
        "COMBO <span>0</span>";


    speedBar.style.width =
        "0%";


    accuracyBar.style.width =
        "100%";


    comboBar.style.width =
        "0%";


    speedPercent.textContent =
        "0%";


    accuracyPercent.textContent =
        "100%";


    comboPercent.textContent =
        "0%";


    result.style.display =
        "none";


    displayText();


    input.focus();

}


/* ================================
   UPDATE PLAYER PROFILE
================================ */

function updatePlayerProfile() {

    /* PLAYER LEVEL */

    profilePlayerLevel.textContent =
        playerLevel;


    /* XP */

    profileCurrentXP.textContent =
        playerXP;


    const nextLevelXP =
        xpRequirements[
            playerLevel + 1
        ];


    if (nextLevelXP) {

        profileNextXP.textContent =
            nextLevelXP;


        const currentLevelXP =
            xpRequirements[
                playerLevel
            ];


        const progress =
            (
                (
                    playerXP -
                    currentLevelXP
                )
                /
                (
                    nextLevelXP -
                    currentLevelXP
                )
            ) * 100;


        profileXPBar.style.width =
            Math.min(
                progress,
                100
            ) + "%";

    }

    else {

        profileNextXP.textContent =
            "MAX";


        profileXPBar.style.width =
            "100%";

    }


    /* TOTAL XP */

    profileTotalXP.textContent =
        playerXP;


    /* COMPLETED LEVELS */

    let completedLevels = 0;


    levels.forEach(
        level => {

            if (
                bestRanks[level.id]
            ) {

                completedLevels++;

            }

        }
    );


    profileCompleted.textContent =
        `${completedLevels} / ${levels.length}`;


    /* BEST RANK */

    let highestRank = "-";


    levels.forEach(
        level => {

            const rank =
                bestRanks[level.id];


            if (
                rank &&
                (
                    highestRank === "-" ||
                    rankValues[rank] >
                    rankValues[highestRank]
                )
            ) {

                highestRank =
                    rank;

            }

        }
    );


    profileBestRank.textContent =
        highestRank;


    /* BEST PERFORMANCE */

    profileBestWPM.textContent =
        playerStats.bestWPM;


    profileBestAccuracy.textContent =
        playerStats.bestAccuracy +
        "%";


    profileBestCombo.textContent =
        playerStats.bestCombo;


    /* UNLOCKS */

    profileUnlocks.innerHTML =
        "";


    for (
        let level = 2;
        level <= 10;
        level++
    ) {

        const reward =
            playerRewards[level];


        if (!reward) {

            continue;

        }


        const unlocked =
            playerLevel >= level;


        const item =
            document.createElement(
                "div"
            );


        item.className =
            "profile-unlock" +
            (
                unlocked
                ? ""
                : " locked"
            );


        item.innerHTML = `

            <span class="unlock-level">
                LV ${String(level).padStart(2, "0")}
            </span>

            <span class="unlock-name">

                ${
                    unlocked
                    ? "✓ " + reward
                    : "🔒 " + reward
                }

            </span>

        `;


        profileUnlocks.appendChild(
            item
        );

    }

    renderProfileChoices();
    applyProfileCustomization();

}


/* =================================
   FORGE SURVIVAL MODE
================================= */

const RPG_WORDS = [
    "type", "fast", "code", "forge", "quick", "focus", "speed", "input",
    "keyboard", "accuracy", "combat", "player", "damage", "target", "wave",
    "function", "variable", "algorithm", "javascript", "developer", "precision"
];

const RPG_BOSS_WORD_POOL = [
    "break", "core", "forge", "type", "power", "strike",
    "target", "damage", "attack", "shield", "energy", "system",
    "combat", "weapon", "master", "chaos", "danger", "matrix",
    "shadow", "hunter", "cyber", "thunder", "crystal", "phantom",
    "warrior", "destroy", "machine", "overload", "nightmare", "ultimate"
];

let rpgRunning = false;
let rpgEnemies = [];
let rpgAnimation = null;
let rpgSpawnTimer = null;
let rpgLastFrame = 0;
let rpgLivesValue = 3;
let rpgWaveValue = 1;
let rpgKillsValue = 0;
let rpgScoreValue = 0;
let rpgComboValue = 0;
let rpgGrenades = 2;
let rpgFreezes = 1;
let rpgFrozenUntil = 0;
const RPG_SHIELD_MAX_SECONDS = 30;
const RPG_SHIELD_REWARD_KILLS = 5;
const RPG_SHIELD_REWARD_SECONDS = 5;
let rpgShieldEnergy = RPG_SHIELD_MAX_SECONDS;
let rpgShieldActive = false;
let rpgShieldHolding = false;
let rpgKillsSinceShieldReward = 0;
let rpgShieldDisplayedSeconds = RPG_SHIELD_MAX_SECONDS;
let rpgTargetId = null;
let rpgEnemyId = 0;
let rpgBossActive = false;
let rpgBossPending = false;
let rpgBossProjectiles = [];
let rpgBossLastAttack = 0;
let rpgXPValue = Number(localStorage.getItem("typeforgeRPGXP") || 0);
let rpgLevelValue = Number(localStorage.getItem("typeforgeRPGLevel") || 1);
let rpgShortWords = 0;
let rpgSimilarWords = 0;
let rpgShortWordsUntil = 0;

const RPG_SHORT_WORD_POOL = [
    "go", "run", "hit", "zap", "win", "aim", "dash", "code", "type", "fast",
    "jump", "move", "hack", "fire", "save", "lock", "rush", "stop"
];

// Same Word picks one easy/medium word and applies it only to enemies
// already on screen when the ability is activated.
const RPG_SAME_WORD_POOL = [
    "planet", "rocket", "silver", "garden", "window", "orange",
    "button", "pencil", "forest", "little", "bright", "travel",
    "monkey", "castle", "market", "purple", "stream", "pocket",
    "rabbit", "sunset", "coffee", "winter", "smooth", "circle"
];

function rpgXPNeeded(level) {
    return 100 + (level - 1) * 75;
}

function addRPGXP(amount) {
    if (!amount || !rpgRunning) return;
    rpgXPValue += amount;
    let leveledUp = false;
    while (rpgXPValue >= rpgXPNeeded(rpgLevelValue)) {
        rpgXPValue -= rpgXPNeeded(rpgLevelValue);
        rpgLevelValue++;
        leveledUp = true;
        // Level 2 unlocks Short Words; Level 4 unlocks Similar Words.
        if (rpgLevelValue >= 2) rpgShortWords++;
        if (rpgLevelValue >= 4) rpgSimilarWords++;
    }
    localStorage.setItem("typeforgeRPGXP", rpgXPValue);
    localStorage.setItem("typeforgeRPGLevel", rpgLevelValue);
    updateRPGHud();
    if (leveledUp) {
        rpgArena.classList.remove("shake");
        void rpgArena.offsetWidth;
        rpgArena.classList.add("shake");
    }
}

function refreshRPGPowerupButtons() {
    const shortUnlocked = rpgLevelValue >= 2;
    const similarUnlocked = rpgLevelValue >= 4;
    shortWordsButton.disabled = !rpgRunning || !shortUnlocked || rpgShortWords <= 0;
    similarWordsButton.disabled = !rpgRunning || !similarUnlocked || rpgSimilarWords <= 0;
    shortWordsCount.textContent = shortUnlocked ? rpgShortWords : "LOCK";
    similarWordsCount.textContent = similarUnlocked ? rpgSimilarWords : "LOCK";
}

function activateShortWords() {
    if (!rpgRunning || rpgLevelValue < 2 || rpgShortWords <= 0 || rpgBossActive) return;
    rpgShortWords--;
    rpgShortWordsUntil = performance.now() + 10000;
    rpgEnemies.forEach(enemy => {
        if (enemy.type === "BOSS") return;
        const candidates = RPG_SHORT_WORD_POOL.filter(word => !rpgEnemies.some(other => other.id !== enemy.id && other.word === word));
        if (candidates.length) enemy.word = candidates[Math.floor(Math.random() * candidates.length)];
        enemy.el.dataset.word = enemy.word;
        enemy.el.querySelector(".rpg-enemy-word").textContent = enemy.word;
    });
    rpgInput.value = "";
    refreshRPGPowerupButtons();
    rpgInput.focus();
}

function activateSimilarWords() {
    if (!rpgRunning || rpgLevelValue < 4 || rpgSimilarWords <= 0 || rpgBossActive) return;

    // Pick one random easy/medium word and give it to every regular enemy
    // currently on screen. Enemies spawned later keep their normal words.
    const targets = rpgEnemies.filter(enemy => enemy.type !== "BOSS");
    if (targets.length === 0) return;

    rpgSimilarWords--;
    const sharedWord = RPG_SAME_WORD_POOL[
        Math.floor(Math.random() * RPG_SAME_WORD_POOL.length)
    ];

    targets.forEach(enemy => {
        enemy.word = sharedWord;
        enemy.sameWordGroup = true;
        enemy.el.dataset.word = sharedWord;
        const wordLabel = enemy.el.querySelector(".rpg-enemy-word");
        if (wordLabel) wordLabel.textContent = sharedWord;
    });

    rpgInput.value = "";
    refreshRPGPowerupButtons();
    rpgInput.focus();
}

function openRPGMode() {
    levelMenu.style.display = "none";
    gameScreen.style.display = "none";
    profileScreen.style.display = "none";
    rpgScreen.style.display = "block";
    resetRPG();
}

rpgModeButton.addEventListener("click", openRPGMode);

function resetRPG() {
    cancelAnimationFrame(rpgAnimation);
    clearTimeout(rpgSpawnTimer);
    rpgRunning = false;

    rpgEnemies.forEach(enemy => enemy.el.remove());
    rpgEnemies = [];

    rpgBossProjectiles.forEach(projectile => projectile.el.remove());
    rpgBossProjectiles = [];
    rpgBossLastAttack = 0;
    rpgLastFrame = 0;
    rpgLivesValue = 3;
    rpgWaveValue = 1;
    rpgKillsValue = 0;
    rpgScoreValue = 0;
    rpgComboValue = 0;
    rpgGrenades = 2;
    rpgFreezes = 1;
    rpgFrozenUntil = 0;
    rpgShieldEnergy = RPG_SHIELD_MAX_SECONDS;
    rpgShieldActive = false;
    rpgShieldHolding = false;
    rpgKillsSinceShieldReward = 0;
    rpgShieldDisplayedSeconds = RPG_SHIELD_MAX_SECONDS;
    rpgTargetId = null;
    rpgBossActive = false;
    rpgBossPending = false;
    rpgShortWords = rpgLevelValue >= 2 ? 1 : 0;
    rpgSimilarWords = rpgLevelValue >= 4 ? 1 : 0;
    rpgShortWordsUntil = 0;
    rpgInput.value = "";
    rpgInput.disabled = true;
    rpgStartOverlay.style.display = "flex";
    rpgGameOver.style.display = "none";
    grenadeButton.disabled = true;
    freezeButton.disabled = true;
    shieldButton.disabled = true;
    rpgArena.querySelector(".player-core").textContent = "[ YOU ]";
    rpgArena.classList.remove("boss-mode");
    updateRPGHud();
}

function startRPG() {
    resetRPG();
    rpgRunning = true;
    rpgStartOverlay.style.display = "none";
    rpgInput.disabled = false;
    grenadeButton.disabled = false;
    freezeButton.disabled = false;
    shieldButton.disabled = false;
    refreshRPGPowerupButtons();
    rpgInput.focus();
    spawnRPGEnemy();
    scheduleRPGSpawn();
    rpgAnimation = requestAnimationFrame(rpgLoop);
}

function scheduleRPGSpawn() {
    if (!rpgRunning || rpgBossActive || rpgBossPending) return;
    const delay = Math.max(650, 1700 - rpgWaveValue * 90);
    rpgSpawnTimer = setTimeout(() => {
        if (rpgRunning && !rpgBossActive && !rpgBossPending) {
            spawnRPGEnemy();
        }
        scheduleRPGSpawn();
    }, delay);
}

function rpgDifficulty() {
    return {
        speed: 24 + rpgWaveValue * 3.2,
        maxEnemies: Math.min(14, 3 + Math.floor(rpgWaveValue * 0.8)),
        wordPool: Math.min(RPG_WORDS.length, 7 + rpgWaveValue * 2)
    };
}


function getRPGSpawnPosition() {
    const w = rpgArena.clientWidth;
    const h = rpgArena.clientHeight;
    const margin = 35;

    // Enemies always enter from the right side.
    const x = w - margin;
    const y = margin + Math.random() * (h - margin * 2);

    return { x, y };
}

function chooseRPGEnemyType() {
    const roll = Math.random();
    // Only three regular enemy types exist. The boss is spawned separately.
    if (rpgWaveValue >= 3 && roll < 0.20) return "ARMORED";
    if (roll < 0.45) return "RUSH";
    return "NORMAL";
}

function spawnRPGEnemy() {
    if (!rpgRunning || rpgBossActive || rpgBossPending) return;
    const difficulty = rpgDifficulty();
    if (rpgEnemies.length >= difficulty.maxEnemies) return;

    const { x, y } = getRPGSpawnPosition();
    const pool = RPG_WORDS.slice(0, difficulty.wordPool);
    const activeWords = new Set(rpgEnemies.map(e => e.word));
    let availableWords;

    if (performance.now() < rpgShortWordsUntil) {
        availableWords = RPG_SHORT_WORD_POOL.filter(word => !activeWords.has(word));
    } else {
        availableWords = pool.filter(word => !activeWords.has(word));
    }

    if (availableWords.length === 0) {
        availableWords = RPG_WORDS.filter(word => !activeWords.has(word));
    }
    const word = availableWords[Math.floor(Math.random() * availableWords.length)];
    const type = chooseRPGEnemyType();
    const id = ++rpgEnemyId;
    const el = document.createElement("div");
    el.className = "rpg-enemy" +
        (type === "ARMORED" ? " armored" : "") +
        (type === "RUSH" ? " rush" : "");
    el.dataset.id = id;
    el.dataset.word = word;
    el.innerHTML = `<div class="rpg-enemy-core">[${type}]</div><div class="rpg-enemy-word">${word}</div>${type === "ARMORED" ? '<div class="rpg-enemy-hp">HP ■■</div>' : ''}`;
    el.style.left = x + "px";
    el.style.top = y + "px";
    el.addEventListener("click", () => selectRPGTarget(id));
    rpgArena.appendChild(el);

    rpgEnemies.push({
        id,
        el,
        x,
        y,
        word,
        type,
        hp: type === "ARMORED" ? 2 : 1,
        speed: difficulty.speed * (type === "RUSH" ? 1.35 : 0.85 + Math.random() * 0.35)
    });

    if (rpgTargetId === null || !rpgEnemies.some(e => e.id === rpgTargetId)) {
        selectRPGTarget(id);
    }
}

function selectRPGTarget(id) {
    rpgTargetId = id;
    rpgEnemies.forEach(e => e.el.classList.toggle("targeted", e.id === id));
    rpgInput.value = "";
    rpgInput.focus();
}

function getRPGTarget() {
    // Always recover a valid target if the previous target was removed.
    let target = rpgEnemies.find(e => e.id === rpgTargetId);
    if (!target && rpgEnemies.length) {
        target = rpgEnemies[0];
        rpgTargetId = target.id;
        rpgEnemies.forEach(e => e.el.classList.toggle("targeted", e.id === target.id));
    }
    return target || null;
}

function updateRPGAchievementProgress() {
    const highestWave = Number(localStorage.getItem("typeforgeRPGHighestWave") || 1);
    if (rpgWaveValue > highestWave) localStorage.setItem("typeforgeRPGHighestWave", String(rpgWaveValue));

    const bestScore = Number(localStorage.getItem("typeforgeRPGBestScore") || 0);
    if (rpgScoreValue > bestScore) localStorage.setItem("typeforgeRPGBestScore", String(rpgScoreValue));

    renderProfileChoices();
    window.dispatchEvent(new CustomEvent("typeforge:rpg-progress"));
}

function advanceRPGWave() {
    rpgWaveValue++;
    updateRPGAchievementProgress();
    if (rpgWaveValue % 3 === 0) rpgGrenades++;
    if (rpgWaveValue % 4 === 0) rpgFreezes++;

    // Every 5th wave becomes a boss encounter.
    if (rpgWaveValue % 5 === 0) {
        rpgBossPending = true;
        clearTimeout(rpgSpawnTimer);
        rpgSpawnTimer = null;
        if (rpgEnemies.length === 0) startRPGBoss();
    }
}

function destroyRPGEnemy(enemy, bonus = 0, countKill = true) {
    if (!enemy || !rpgRunning) return;
    enemy.el.classList.add("dead");
    rpgComboValue++;
    if (countKill) {
        rpgKillsValue++;
        rpgKillsSinceShieldReward++;
        if (rpgKillsSinceShieldReward >= RPG_SHIELD_REWARD_KILLS) {
            rpgKillsSinceShieldReward -= RPG_SHIELD_REWARD_KILLS;
            rpgShieldEnergy = Math.min(
                RPG_SHIELD_MAX_SECONDS,
                rpgShieldEnergy + RPG_SHIELD_REWARD_SECONDS
            );
        }
    }
    rpgScoreValue += 100 + rpgComboValue * 10 + bonus;
    setTimeout(() => enemy.el.remove(), 350);
    rpgEnemies = rpgEnemies.filter(e => e.id !== enemy.id);
    if (rpgTargetId === enemy.id) rpgTargetId = null;

    if (countKill && rpgKillsValue % 5 === 0) {
        advanceRPGWave();
    }
    updateRPGAchievementProgress();

    if (rpgEnemies.length === 0 && rpgBossPending && !rpgBossActive) {
        startRPGBoss();
    } else if (!rpgTargetId && rpgEnemies.length) {
        selectRPGTarget(rpgEnemies[0].id);
    }

    rpgInput.value = "";
    if (countKill) addRPGXP(enemy.type === "ARMORED" ? 45 : enemy.type === "RUSH" ? 35 : 25);
    updateRPGHud();
}

function renderRPGBossWords(boss) {
    const container = boss.el.querySelector(".rpg-boss-words");
    if (!container) return;

    container.innerHTML = "";

    boss.words.forEach(word => {
        const chip = document.createElement("span");
        chip.className = "rpg-boss-word-chip";
        chip.textContent = word;

        Object.assign(chip.style, {
            display: "inline-block",
            padding: "6px 9px",
            margin: "4px",
            border: "1px solid #65ff65",
            color: "#65ff65",
            background: "#071407",
            fontFamily: "monospace",
            fontWeight: "bold",
            fontSize: "14px",
            letterSpacing: "1px"
        });

        container.appendChild(chip);
    });

    const hpLabel = boss.el.querySelector(".rpg-enemy-hp");
    if (hpLabel) {
        hpLabel.textContent =
            "HP " + "■ ".repeat(boss.words.length).trim();
    }

    const phaseLabel = boss.el.querySelector(".rpg-boss-phase");
    if (phaseLabel) {
        phaseLabel.textContent =
            `BOSS // WAVE ${rpgWaveValue}`;
    }
}

function startRPGBoss() {
    if (!rpgRunning || rpgBossActive) return;

    rpgBossPending = false;
    rpgBossActive = true;
    rpgBossLastAttack = performance.now();

    clearTimeout(rpgSpawnTimer);
    rpgSpawnTimer = null;

    // Clear regular enemies for the boss encounter.
    rpgEnemies.forEach(enemy => enemy.el.remove());
    rpgEnemies = [];
    rpgTargetId = null;

    // Wave 5 = 3 words, Wave 10 = 4, Wave 15 = 5, etc.
    const wordCount = 3 + Math.floor((rpgWaveValue - 5) / 5);

    const shuffled = [...RPG_BOSS_WORD_POOL]
        .sort(() => Math.random() - 0.5);

    const words = shuffled.slice(
        0,
        Math.min(wordCount, RPG_BOSS_WORD_POOL.length)
    );

    const arenaWidth = rpgArena.clientWidth;
    const arenaHeight = rpgArena.clientHeight;
    const bossWidth = Math.min(320, arenaWidth * 0.8);

    // Start off-screen to the right; move to the center.
    const startX = arenaWidth + 20;
    const targetX = (arenaWidth - bossWidth) / 2;
    const y = Math.max(50, arenaHeight * 0.25);

    const id = ++rpgEnemyId;
    const el = document.createElement("div");

    el.className = "rpg-enemy rpg-boss";
    el.dataset.id = id;

    el.innerHTML = `
        <div class="rpg-boss-phase">BOSS // WAVE ${rpgWaveValue}</div>
        <div class="rpg-enemy-core">[ CORE ]</div>
        <div style="margin:10px 0;font-size:12px;color:#65ff65">
            TYPE ANY WORD BELOW
        </div>
        <div class="rpg-boss-words"></div>
        <div class="rpg-enemy-hp"></div>
        <div style="margin-top:8px;font-size:11px;color:#ff6666">
            INCOMING ASCII ATTACKS
        </div>
    `;

    Object.assign(el.style, {
        width: bossWidth + "px",
        boxSizing: "border-box",
        textAlign: "center",
        zIndex: "5"
    });

    el.style.left = startX + "px";
    el.style.top = y + "px";

    rpgArena.appendChild(el);

    const boss = {
        id,
        el,
        x: startX,
        y,
        targetX,
        word: words[0],
        words,
        type: "BOSS",
        hp: words.length,
        speed: 220
    };

    rpgEnemies.push(boss);

    renderRPGBossWords(boss);

    rpgArena.classList.add("boss-mode");
    rpgArena.querySelector(".player-core").textContent = "[ BOSS ]";

    selectRPGTarget(id);
    updateRPGHud();
}

function damageRPGBoss(boss, completedWord) {
    if (!boss || !rpgBossActive || !boss.words.includes(completedWord)) {
        return;
    }

    // One correctly typed word removes one HP segment.
    boss.words = boss.words.filter(word => word !== completedWord);
    boss.hp = boss.words.length;

    boss.el.classList.remove("hit");
    void boss.el.offsetWidth;
    boss.el.classList.add("hit");

    rpgComboValue++;
    rpgScoreValue += 250 + rpgComboValue * 25;

    rpgInput.value = "";

    if (boss.words.length > 0) {
        // Keep the remaining words visible.
        boss.word = boss.words[0];
        renderRPGBossWords(boss);
        updateRPGHud();
        rpgInput.focus();
        return;
    }

    // All words completed: defeat the boss.
    boss.el.classList.add("dead");

    rpgKillsValue++;
    rpgScoreValue += 750 + rpgComboValue * 25;

    rpgEnemies = rpgEnemies.filter(enemy => enemy.id !== boss.id);
    rpgTargetId = null;
    rpgBossActive = false;
    rpgBossPending = false;

    rpgBossProjectiles.forEach(projectile => projectile.el.remove());
    rpgBossProjectiles = [];

    rpgArena.classList.remove("boss-mode");
    rpgArena.querySelector(".player-core").textContent = "[ YOU ]";

    updateRPGAchievementProgress();
    addRPGXP(200);

    // Move to the next wave after the boss is defeated.
    rpgWaveValue++;
    updateRPGHud();

    setTimeout(() => {
        boss.el.remove();

        if (rpgRunning) {
            spawnRPGEnemy();
            scheduleRPGSpawn();
        }
    }, 700);
}

function spawnRPGBossProjectile(boss, playerX, playerY) {
    if (!boss || !rpgBossActive) return;

    const startX = boss.x + boss.el.offsetWidth / 2;
    const startY = boss.y + boss.el.offsetHeight / 2;

    const dx = playerX - startX;
    const dy = playerY - startY;
    const distance = Math.sqrt(dx * dx + dy * dy) || 1;
    const speed = 300;

    const el = document.createElement("div");
    el.className = "rpg-boss-projectile";
    el.textContent = "<==<";

    Object.assign(el.style, {
        position: "absolute",
        left: startX + "px",
        top: startY + "px",
        transform: "translate(-50%, -50%)",
        color: "#ff5555",
        fontFamily: "monospace",
        fontWeight: "bold",
        fontSize: "18px",
        whiteSpace: "nowrap",
        pointerEvents: "none",
        zIndex: "8",
        textShadow: "0 0 8px #ff3333"
    });

    rpgArena.appendChild(el);

    rpgBossProjectiles.push({
        el,
        x: startX,
        y: startY,
        vx: (dx / distance) * speed,
        vy: (dy / distance) * speed
    });
}

function rpgLoop(timestamp) {
    if (!rpgRunning) return;

    const dt = Math.min(
        (timestamp - (rpgLastFrame || timestamp)) / 1000,
        0.05
    );

    rpgLastFrame = timestamp;

    const playerX = rpgArena.clientWidth * 0.1;
    const playerY = rpgArena.clientHeight / 2;
    const frozen = performance.now() < rpgFrozenUntil;

    // Shield energy drains only while the shield is held.
    if (rpgShieldHolding && rpgShieldActive) {
        rpgShieldEnergy = Math.max(0, rpgShieldEnergy - dt);

        const displayedSeconds = Math.ceil(rpgShieldEnergy);

        if (displayedSeconds !== rpgShieldDisplayedSeconds) {
            rpgShieldDisplayedSeconds = displayedSeconds;
            updateRPGHud();
        }

        if (rpgShieldEnergy <= 0) stopRPGShieldHold();
    }

    rpgEnemies.slice().forEach(enemy => {
        if (frozen) return;

        // The boss enters from the left, then stays in the center.
        if (enemy.type === "BOSS") {
            if (Math.abs(enemy.x - enemy.targetX) > 2) {
                const direction = enemy.x > enemy.targetX ? -1 : 1;
                enemy.x += direction * enemy.speed * dt;
                if (direction === -1) {
                    enemy.x = Math.max(enemy.targetX, enemy.x);
                } else {
                    enemy.x = Math.min(enemy.targetX, enemy.x);
                }

                enemy.el.style.left = enemy.x + "px";
                enemy.el.style.top = enemy.y + "px";
            }

            // Fire projectiles only after the boss reaches its position.
            if (
                enemy.x >= enemy.targetX &&
                timestamp - rpgBossLastAttack >= 1500
            ) {
                rpgBossLastAttack = timestamp;
                spawnRPGBossProjectile(enemy, playerX, playerY);
            }

            return;
        }

        // Normal enemies retain their original chase behaviour.
        const dx = playerX - enemy.x;
        const dy = playerY - enemy.y;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;

        enemy.x += (dx / distance) * enemy.speed * dt;
        enemy.y += (dy / distance) * enemy.speed * dt;

        enemy.el.style.left = enemy.x + "px";
        enemy.el.style.top = enemy.y + "px";

        if (distance < 42) {
            hitPlayer(enemy);
        }
    });

    // Move and resolve boss projectiles.
    rpgBossProjectiles.slice().forEach(projectile => {
        if (frozen || !rpgRunning) return;

        projectile.x += projectile.vx * dt;
        projectile.y += projectile.vy * dt;

        projectile.el.style.left = projectile.x + "px";
        projectile.el.style.top = projectile.y + "px";

        const dx = projectile.x - playerX;
        const dy = projectile.y - playerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 30) {
            projectile.el.remove();
            rpgBossProjectiles = rpgBossProjectiles.filter(
                item => item !== projectile
            );

            // Shield blocks incoming boss projectiles.
            if (rpgShieldActive) {
                rpgArena.classList.remove("hit");
                void rpgArena.offsetWidth;
                rpgArena.classList.add("hit");
                return;
            }

            rpgLivesValue--;
            rpgComboValue = 0;

            rpgArena.classList.remove("shake");
            void rpgArena.offsetWidth;
            rpgArena.classList.add("shake");

            updateRPGHud();

            if (rpgLivesValue <= 0) {
                endRPG();
            }

            return;
        }

        // Remove projectiles that have left the arena.
        if (
            projectile.x < -50 ||
            projectile.x > rpgArena.clientWidth + 50 ||
            projectile.y < -50 ||
            projectile.y > rpgArena.clientHeight + 50
        ) {
            projectile.el.remove();
            rpgBossProjectiles = rpgBossProjectiles.filter(
                item => item !== projectile
            );
        }
    });

    rpgAnimation = requestAnimationFrame(rpgLoop);
}


function hitPlayer(enemy) {
    if (!rpgRunning) return;
    if (rpgShieldActive) {
        // The shield stays active while held. Regular enemies are repelled;
        // a boss attack is blocked without instantly defeating the boss.
        if (enemy.type === "BOSS") {
            enemy.x = rpgArena.clientWidth * 0.62;
            enemy.y = rpgArena.clientHeight * 0.5;
            enemy.el.style.left = enemy.x + "px";
            enemy.el.style.top = enemy.y + "px";
            enemy.el.classList.remove("hit");
            void enemy.el.offsetWidth;
            enemy.el.classList.add("hit");
            return;
        }
        enemy.el.classList.add("hit");
        setTimeout(() => enemy.el.remove(), 180);
        rpgEnemies = rpgEnemies.filter(e => e.id !== enemy.id);
        if (rpgTargetId === enemy.id) rpgTargetId = null;
        if (!rpgTargetId && rpgEnemies.length) selectRPGTarget(rpgEnemies[0].id);
        updateRPGHud();
        return;
    }
    rpgLivesValue--;
    rpgComboValue = 0;
    rpgArena.classList.remove("shake");
    void rpgArena.offsetWidth;
    rpgArena.classList.add("shake");
    enemy.el.remove();
    rpgEnemies = rpgEnemies.filter(e => e.id !== enemy.id);
    rpgTargetId = null;
    if (enemy.type === "BOSS") {
        rpgBossActive = false;
        rpgArena.classList.remove("boss-mode");
        rpgArena.querySelector(".player-core").textContent = "[ YOU ]";
    }
    updateRPGHud();
    if (rpgLivesValue <= 0) endRPG();
    else if (rpgEnemies.length) selectRPGTarget(rpgEnemies[0].id);
}

function updateRPGHud() {
    rpgLives.textContent = rpgLivesValue > 0 ? "■ ".repeat(rpgLivesValue).trim() : "—";
    rpgWave.textContent = rpgWaveValue;
    rpgKills.textContent = rpgKillsValue;
    rpgScore.textContent = rpgScoreValue;
    rpgCombo.textContent = rpgComboValue;
    grenadeCount.textContent = rpgGrenades;
    freezeCount.textContent = rpgFreezes;
    shieldCount.textContent = `${Math.ceil(rpgShieldEnergy)}s`;
    shieldButton.title = "Hold to activate the shield. Energy drains only while held. Earn +5 seconds every 5 regular enemy kills (maximum 30 seconds).";
    shieldButton.setAttribute("aria-label", `Hold shield, ${Math.ceil(rpgShieldEnergy)} seconds remaining`);
    shieldButton.disabled = !rpgRunning || rpgShieldEnergy <= 0;
    rpgLevel.textContent = rpgLevelValue;
    rpgXP.textContent = `${rpgXPValue}/${rpgXPNeeded(rpgLevelValue)}`;
    refreshRPGPowerupButtons();
}

function endRPG() {
    stopRPGShieldHold();
    rpgRunning = false;
    rpgBossProjectiles.forEach(projectile => projectile.el.remove());
    rpgBossProjectiles = [];
    cancelAnimationFrame(rpgAnimation);
    clearTimeout(rpgSpawnTimer);
    rpgInput.disabled = true;
    grenadeButton.disabled = true;
    freezeButton.disabled = true;
    shieldButton.disabled = true;
    shortWordsButton.disabled = true;
    similarWordsButton.disabled = true;
    rpgFinalStats.innerHTML = `WAVE ${rpgWaveValue}<br>KILLS ${rpgKillsValue}<br>SCORE ${rpgScoreValue}<br>COMBO ${rpgComboValue}`;
    rpgGameOver.style.display = "flex";
    window.dispatchEvent(new CustomEvent("typeforge:rpg-finished"));
}

function useRPGGrenade() {
    if (!rpgRunning || rpgGrenades <= 0 || rpgBossActive) return;
    rpgGrenades--;
    rpgEnemies.slice().forEach(enemy => destroyRPGEnemy(enemy, 50));
    rpgArena.classList.remove("shake");
    void rpgArena.offsetWidth;
    rpgArena.classList.add("shake");
    updateRPGHud();
    rpgInput.focus();
}

function useRPGFreeze() {
    if (!rpgRunning || rpgFreezes <= 0) return;
    rpgFreezes--;
    rpgFrozenUntil = performance.now() + 4500;
    rpgEnemies.forEach(enemy => enemy.el.style.filter = "brightness(1.7)");
    setTimeout(() => rpgEnemies.forEach(enemy => enemy.el.style.filter = ""), 4500);
    updateRPGHud();
    rpgInput.focus();
}

function startRPGShieldHold() {
    if (!rpgRunning || rpgShieldEnergy <= 0 || rpgShieldHolding) return;
    rpgShieldHolding = true;
    rpgShieldActive = true;
    rpgArena.querySelector(".player-core").textContent = "[ SHIELD ]";
    shieldButton.classList.add("shield-active");
    updateRPGHud();
}

function stopRPGShieldHold() {
    rpgShieldHolding = false;
    rpgShieldActive = false;
    if (shieldButton) shieldButton.classList.remove("shield-active");
    const playerCore = rpgArena ? rpgArena.querySelector(".player-core") : null;
    if (playerCore) playerCore.textContent = rpgBossActive ? "[ BOSS ]" : "[ YOU ]";
    if (typeof shieldButton !== "undefined" && shieldButton) updateRPGHud();
}

rpgInput.addEventListener("input", () => {
    if (!rpgRunning) return;

    const typed = rpgInput.value.toLowerCase().trim();
    if (!typed) return;

    // BOSS: allow any currently visible word, in any order.
    if (rpgBossActive) {
        const boss = rpgEnemies.find(enemy => enemy.type === "BOSS");

        if (!boss) return;

        const matchingWord = boss.words.find(
            word => word.startsWith(typed)
        );

        if (!matchingWord) {
            rpgComboValue = 0;
            rpgInput.value = "";
            updateRPGHud();
            return;
        }

        if (typed === matchingWord) {
            damageRPGBoss(boss, matchingWord);
        }

        return;
    }

    // REGULAR ENEMIES: retain existing target switching.
    let target = getRPGTarget();

    if (!target || !target.word.startsWith(typed)) {
        const exact = rpgEnemies.find(
            enemy => enemy.word === typed && enemy.sameWordGroup
        );

        const anyExact = rpgEnemies.find(
            enemy => enemy.word === typed
        );

        const prefixMatches = rpgEnemies.filter(
            enemy => enemy.word.startsWith(typed)
        );

        target = exact || anyExact || prefixMatches[0] || null;

        if (target) {
            rpgTargetId = target.id;
            rpgEnemies.forEach(enemy => {
                enemy.el.classList.toggle(
                    "targeted",
                    enemy.id === target.id
                );
            });
        }
    }

    if (!target) {
        rpgComboValue = 0;
        rpgInput.value = "";
        updateRPGHud();
        return;
    }

    if (target.word.startsWith(typed)) {
        if (typed === target.word) {
            if (target.sameWordGroup) {
                const groupWord = target.word;

                const group = rpgEnemies.filter(
                    enemy =>
                        enemy.type !== "BOSS" &&
                        enemy.sameWordGroup &&
                        enemy.word === groupWord
                );

                group.forEach(enemy => destroyRPGEnemy(enemy));
            } else if (target.hp > 1) {
                target.hp--;

                target.el.classList.remove("hit");
                void target.el.offsetWidth;
                target.el.classList.add("hit");

                if (
                    target.type === "ARMORED" &&
                    target.hp === 1
                ) {
                    target.el.classList.remove("armored");
                    target.el.classList.add("armor-broken");
                }

                const hpLabel = target.el.querySelector(".rpg-enemy-hp");
                if (hpLabel) hpLabel.textContent = "HP ■";

                rpgComboValue++;
                rpgScoreValue += 40 + rpgComboValue * 5;
                rpgInput.value = "";
                updateRPGHud();
            } else {
                destroyRPGEnemy(target);
            }
        }
    } else {
        rpgComboValue = 0;
        rpgInput.value = "";
        updateRPGHud();
    }
});

rpgModeButton.addEventListener("click", openRPGMode);
rpgBackButton.addEventListener("click", () => { resetRPG(); showLevelMenu(); });
rpgStartButton.addEventListener("click", startRPG);
rpgRetryButton.addEventListener("click", startRPG);
rpgMenuButton.addEventListener("click", () => { resetRPG(); showLevelMenu(); });
grenadeButton.addEventListener("click", useRPGGrenade);
freezeButton.addEventListener("click", useRPGFreeze);
// Hold the shield button to spend shield energy; releasing pauses the drain.
shieldButton.style.touchAction = "none";
shieldButton.addEventListener("pointerdown", event => {
    if (shieldButton.disabled) return;
    event.preventDefault();
    try { shieldButton.setPointerCapture(event.pointerId); } catch (_) {}
    startRPGShieldHold();
});
shieldButton.addEventListener("pointerup", stopRPGShieldHold);
shieldButton.addEventListener("pointercancel", stopRPGShieldHold);
shieldButton.addEventListener("lostpointercapture", stopRPGShieldHold);
window.addEventListener("pointerup", stopRPGShieldHold);
window.addEventListener("blur", stopRPGShieldHold);
shortWordsButton.addEventListener("click", activateShortWords);
similarWordsButton.addEventListener("click", activateSimilarWords);



/* ================================
   RPG KEYBOARD SHORTCUTS
================================ */

document.addEventListener("keydown", function (event) {
    if (!rpgRunning || event.repeat) return;

    if (event.altKey || event.ctrlKey || event.metaKey) return;

    const key = event.key;

    if (!["1", "2", "3", "4", "5"].includes(key)) return;

    // Keep normal typing in other editable fields unaffected.
    const focused = document.activeElement;

    if (
        focused &&
        focused !== rpgInput &&
        (
            focused.matches("input, textarea, select") ||
            focused.isContentEditable
        )
    ) {
        return;
    }

    console.log("TypeForge RPG shortcut:", key);

    event.preventDefault();

    switch (key) {
        case "1":
            useRPGGrenade();
            break;

        case "2":
            useRPGFreeze();
            break;

        case "3":
            startRPGShieldHold();
            break;

        case "4":
            activateShortWords();
            break;

        case "5":
            activateSimilarWords();
            break;
    }
});

document.addEventListener("keyup", function (event) {
    if (event.key === "3") {
        stopRPGShieldHold();
    }
});

window.addEventListener("blur", stopRPGShieldHold);

/* ================================
   BUTTONS
================================ */

restartButton.addEventListener(
    "click",
    restartGame
);


retryButton.addEventListener(
    "click",
    restartGame
);


levelSelectButton.addEventListener(
    "click",
    showLevelMenu
);


/* ================================
   PROFILE NAVIGATION
================================ */

applyProfileCustomization();
renderProfileChoices();

profileButton.addEventListener(
    "click",
    () => {

        levelList.style.display =
            "none";


        profileScreen.style.display =
            "block";


        updatePlayerProfile();

    }
);


profileBackButton.addEventListener(
    "click",
    () => {

        profileScreen.style.display =
            "none";


        showLevelMenu();

    }
);


/* ================================
   INITIALIZE
================================ */

showLevelMenu();

/* ================================
   ONLINE PROFILE / LEADERBOARD HOOKS
================================ */
window.typeforgeRefreshProfile = function () {
    updatePlayerProfile();
    renderProfileChoices();
    applyProfileCustomization();
};
window.typeforgeGetOnlineState = function () {
    return {
        name: playerProfile.name,
        avatar: playerProfile.avatar,
        design: playerProfile.design,
        font: playerProfile.font,
        rpgBestScore: Number(localStorage.getItem("typeforgeRPGBestScore") || 0),
        rpgHighestWave: Number(localStorage.getItem("typeforgeRPGHighestWave") || 1),
        rpgLevel: Number(localStorage.getItem("typeforgeRPGLevel") || 1)
    };
};
