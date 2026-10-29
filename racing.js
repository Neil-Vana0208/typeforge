/* =========================================
   TYPEFORGE RACING - SOLO GHOST RACE
   Kept separate from game.js to protect RPG.
========================================= */
(() => {
    "use strict";

    const $ = id => document.getElementById(id);
    const menu = $("levelMenu");
    const rpgScreen = $("rpgScreen");
    const gameScreen = $("gameScreen");
    const profileScreen = $("profileScreen");
    const screen = $("racingScreen");
    const modeButton = $("racingModeButton");
    const backButton = $("racingBackButton");
    const startButton = $("racingStartButton");
    const resetButton = $("racingResetButton");
    const input = $("racingInput");
    const prompt = $("racingPrompt");
    const playerCar = $("racingPlayerCar");
    const ghostCar = $("racingGhostCar");
    const message = $("racingMessage");
    const wpmDisplay = $("racingWpm");
    const accuracyDisplay = $("racingAccuracy");
    const timeDisplay = $("racingTime");

    if (![screen, modeButton, backButton, startButton, resetButton, input, prompt].every(Boolean)) {
        console.error("TypeForge Racing could not start: one or more required HTML elements are missing.");
        return;
    }

    const passages = [
        "Speed is nothing without accuracy. Stay focused, keep a steady rhythm, and let every correct keystroke move you closer to the finish line.",
        "A great racer does not need to type wildly fast. Read ahead, trust your fingers, correct your mistakes, and keep moving until the race is complete.",
        "Welcome to TypeForge Racing. Every word is another stretch of road, every accurate character adds momentum, and consistency is the key to victory."
    ];

    let targetText = passages[0];
    let running = false;
    let finished = false;
    let startedAt = 0;
    let elapsedBeforePause = 0;
    let animationId = 0;
    let lastFrame = 0;
    let totalTyped = 0;
    let correctTyped = 0;
    let ghostProgress = 0;
    let playerProgress = 0;
    let previousValue = "";

    function showRacing() {
        if (menu) menu.style.display = "none";
        if (gameScreen) gameScreen.style.display = "none";
        if (profileScreen) profileScreen.style.display = "none";
        if (rpgScreen) rpgScreen.style.display = "none";
        screen.style.display = "block";
        resetRace();
    }

    function showMenu() {
        stopAnimation();
        running = false;
        input.disabled = true;
        screen.style.display = "none";
        if (typeof window.showLevelMenu === "function") {
            window.showLevelMenu();
        } else if (menu) {
            menu.style.display = "block";
            if (gameScreen) gameScreen.style.display = "none";
            if (profileScreen) profileScreen.style.display = "none";
            if (rpgScreen) rpgScreen.style.display = "none";
        }
    }

    function renderPrompt() {
        const typed = input.value;
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < targetText.length; i++) {
            const span = document.createElement("span");
            span.textContent = targetText[i];
            if (i < typed.length) span.className = typed[i] === targetText[i] ? "race-correct" : "race-wrong";
            else if (i === typed.length) span.className = "race-current";
            fragment.appendChild(span);
        }
        prompt.replaceChildren(fragment);
    }

    function updateStats(now) {
        const elapsed = running ? elapsedBeforePause + (now - startedAt) : elapsedBeforePause;
        const minutes = elapsed > 0 ? elapsed / 60000 : 0;
        const wpm = minutes > 0 ? Math.round((correctTyped / 5) / minutes) : 0;
        const accuracy = totalTyped > 0 ? Math.round((correctTyped / totalTyped) * 100) : 100;
        wpmDisplay.textContent = String(wpm);
        accuracyDisplay.textContent = accuracy + "%";
        timeDisplay.textContent = (elapsed / 1000).toFixed(1) + "s";
    }

    function setCarProgress(car, progress) {
        // Keep the full car inside its lane, including on narrow phone screens.
        const safeProgress = Math.min(100, Math.max(0, progress));
        const carWidth = car.offsetWidth || 96;
        car.style.left = `calc(${safeProgress}% - ${(carWidth * safeProgress / 100).toFixed(1)}px - ${(38 * safeProgress / 100).toFixed(1)}px)`;
    }

    function stopAnimation() {
        if (animationId) cancelAnimationFrame(animationId);
        animationId = 0;
        lastFrame = 0;
    }

    function finishRace(playerWon, now) {
        if (finished) return;
        finished = true;
        running = false;
        elapsedBeforePause += Math.max(0, now - startedAt);
        updateStats(now);
        input.disabled = true;
        stopAnimation();
        screen.classList.remove("race-live");
        const trackStatus = screen.querySelector(".racing-track-status");
        if (trackStatus) trackStatus.textContent = playerWon ? "● PLAYER FINISHED" : "● RACE OVER";
        if (playerWon) {
            playerProgress = 100;
            setCarProgress(playerCar, 100);
            message.textContent = "🏁 YOU WIN! CLEAN RUN, RACER.";
            message.classList.add("race-win");
        } else {
            ghostProgress = 100;
            setCarProgress(ghostCar, 100);
            message.textContent = "GHOST RACER WINS — TRY AGAIN!";
            message.classList.add("race-loss");
        }
        startButton.textContent = "RACE AGAIN";
    }

    function frame(now) {
        if (!running) return;
        if (!lastFrame) lastFrame = now;
        const delta = now - lastFrame;
        lastFrame = now;

        // The ghost takes about 42 seconds to finish; its progress is independent of typing.
        ghostProgress = Math.min(100, ghostProgress + (delta / 42000) * 100);
        setCarProgress(ghostCar, ghostProgress);
        updateStats(now);

        if (playerProgress >= 100) {
            finishRace(true, now);
            return;
        }
        if (ghostProgress >= 100) {
            finishRace(false, now);
            return;
        }
        animationId = requestAnimationFrame(frame);
    }

    function startRace() {
        if (running) return;
        if (finished) resetRace();
        running = true;
        finished = false;
        startedAt = performance.now();
        lastFrame = 0;
        input.disabled = false;
        input.value = "";
        previousValue = "";
        totalTyped = 0;
        correctTyped = 0;
        elapsedBeforePause = 0;
        ghostProgress = 0;
        playerProgress = 0;
        setCarProgress(playerCar, 0);
        setCarProgress(ghostCar, 0);
        screen.classList.add("race-live");
        const trackStatus = screen.querySelector(".racing-track-status");
        if (trackStatus) trackStatus.textContent = "● RACE LIVE";
        message.className = "racing-message";
        message.textContent = "GO! TYPE ACCURATELY!";
        startButton.textContent = "RACE IN PROGRESS";
        startButton.disabled = true;
        renderPrompt();
        input.focus();
        animationId = requestAnimationFrame(frame);
    }

    function resetRace() {
        stopAnimation();
        running = false;
        finished = false;
        startedAt = 0;
        elapsedBeforePause = 0;
        totalTyped = 0;
        correctTyped = 0;
        ghostProgress = 0;
        playerProgress = 0;
        previousValue = "";
        targetText = passages[Math.floor(Math.random() * passages.length)];
        input.value = "";
        input.disabled = true;
        startButton.disabled = false;
        startButton.textContent = "START RACE";
        screen.classList.remove("race-live");
        const trackStatus = screen.querySelector(".racing-track-status");
        if (trackStatus) trackStatus.textContent = "● READY";
        message.className = "racing-message";
        message.textContent = "READY TO RACE?";
        setCarProgress(playerCar, 0);
        setCarProgress(ghostCar, 0);
        updateStats(0);
        renderPrompt();
    }

    input.addEventListener("input", () => {
        if (!running) return;
        const value = input.value.slice(0, targetText.length);
        if (input.value !== value) input.value = value;

        // Count newly entered characters; backspace changes progress but isn't counted as a new key.
        if (value.length > previousValue.length) {
            for (let i = previousValue.length; i < value.length; i++) {
                totalTyped++;
                if (value[i] === targetText[i]) correctTyped++;
            }
        }
        previousValue = value;
        playerProgress = (value.length / targetText.length) * 100;
        setCarProgress(playerCar, playerProgress);
        renderPrompt();
        updateStats(performance.now());

        if (value.length >= targetText.length && value === targetText) {
            finishRace(true, performance.now());
        }
    });

    input.addEventListener("keydown", event => {
        if (event.key === "Enter") event.preventDefault();
    });
    modeButton.addEventListener("click", showRacing);
    backButton.addEventListener("click", showMenu);
    startButton.addEventListener("click", startRace);
    resetButton.addEventListener("click", resetRace);
    resetRace();
})();
