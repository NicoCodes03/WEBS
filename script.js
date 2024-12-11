// Get the button and game content containers
const startButton = document.getElementById("start-game-button");
const gameContent = document.getElementById("game-content");
const introContent = document.querySelector(".content");

startButton.addEventListener("click", () => {
    introContent.style.display = "none";
    gameContent.style.display = "block";
    partOne();
});

// Function to display the current game text
function displayText(text) {
    const formattedText = text.replace(/\n/g, "<br>");
    document.getElementById("game-text").innerHTML = formattedText;
}

// Function to display the current set of choices
function displayChoices(choices) {
    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = ""; 
    choices.forEach(choice => {
        const button = document.createElement("button");
        button.innerText = choice.text; 
        button.addEventListener("click", () => {
            choicesDiv.innerHTML = "";
            choice.action();
        });
        button.style.display = "block";
        button.style.margin = "5px 0";
        choicesDiv.appendChild(button);
    });
}

// Part one of the game
function partOne() {
    displayText("It started with an alert.\n\nYour monitors hum softly as lines of code stream across the screens in your apartment. A late-night dive into SPIDER’s network has become a routine, but tonight, something breaks the pattern. Hidden within the data stream is an encrypted message, fragmented and distorted. Curious, you piece it back together, and the screen flickers as the fragments form a single coherent message: 'The Web is not what it seems.' \n\nIt’s signed with a single initial: M.\nMia. Your closest friend—and one of the only other people willing to poke at SPIDER’s tangled threads. She vanished weeks ago while investigating SPIDER, and now this.\n\nBefore you can think, your computer freezes, and the screen shifts to a new line of text:\n'ENTER THREAD_BREAKER.exe TO BEGIN.'\n\nThe command pulses ominously, daring you to respond.");
    displayChoices([
        { text: "Run THREAD_BREAKER.exe", action: runThreadBreaker },
        { text: "Inspect the message", action: inspectMessage },
        { text: "Disconnect immediately", action: disconnect }
    ]);
    saveProgress("partOneStarted");
}

function runThreadBreaker() {
    displayText("You decide to trust the prompt. The screen flashes and the command is executed. Your computer begins to hum louder, and a digital interface materializes. You feel a sense of unease as the lines of code blur around you.\n\n'Enter password to continue...'");
    displayChoices([
        { text: "Enter password", action: enterPassword },
        { text: "Go back", action: partOne }
    ]);
    saveProgress("ranThreadBreaker");
}

// Password challenge
function enterPassword() {
    const password = prompt("Enter the password:");
    if (password === "seven") {
        displayText("Access granted.");
        displayChoices([
            { text: "Enter The Web", action: partTwo }
        ]);
        saveProgress("passwordCorrect");
    } else {
        displayText("ERROR: Access denied. Please enter the correct password to continue.");
        displayChoices([
            { text: "Try again", action: runThreadBreaker },
            { text: "Go back", action: partOne }
        ]);
        saveProgress("passwordFailed");
    }
}

function inspectMessage() {
    displayText("You begin analyzing the encrypted message. The fragments seem familiar, but you can't quite make out the meaning. There’s something hidden in the structure of the words, something that feels deliberate. A pattern, perhaps, or a clue left by Mia herself.\n\nYou notice that there is a hidden message suggesting that the password is five characters long, and related to Mia's message. Could the number of words in Mia’s message be important? It might be the key to figuring out the answer.\n\nA part of you feels that the password is simpler than it seems—almost too simple. But you can’t shake the thought that you might be overthinking it.");
    displayChoices([
        { text: "Go back", action: partOne }
    ]);
    saveProgress("messageInspected");
}

function disconnect() {
    displayText("You decide it's too risky and disconnect immediately. Your computer shuts down with a click, but the uneasy feeling remains. What now?");
    displayChoices([
        { text: "Give up and go to bed", action: endingOne },
        { text: "Go back", action: partOne }
    ]);
    saveProgress("disconnected");
}

// Ending one
function endingOne() {
    displayText("You decided it was too much. You shut down everything, leaving the mystery unsolved. ENDING ONE.");
    displayChoices([
        { text: "Start Over", action: startOver }, 
    ]);
    saveProgress("endingOneReached");
}

// Action for starting over
function startOver() {
    gameContent.style.display = "none";
    introContent.style.display = "block";
    displayText("");
    resetProgress();
}

// Initialize inventory object
let inventory = {
    key: false,
};

// Part two of the game
function partTwo() {
    displayText("You’ve successfully entered the Web. As your consciousness fades from reality, you feel yourself integrating into this strange, digital realm. The Web isn’t just confined to your computer—it’s an entire world, and now you’re a part of it.\n\nLines of code twist and warp into abstract shapes. Shapes become figures, faceless and emotionless. There’s a strange hum, a chorus of artificial voices that you can almost hear, though the speakers are silent.\n\nWhat will you do next?");
    displayChoices([
        { text: "Call out for Mia", action: callForMia },
        { text: "Explore the surroundings", action: exploreSurroundings }
    ]);
    saveProgress("partTwoStarted");
}

function callForMia() {
    displayText("You call for Mia, but nothing happens. The silence of the Web is suffocating. It’s as though no one else is here, or maybe… no one can hear you.");
    displayChoices([
        { text: "Back", action: partTwo }
    ]);
    saveProgress("calledForMia");
}

function exploreSurroundings() {
    displayText("You look around and notice strange, glowing structures and symbols. Some resemble digital trees, while others appear to be data streams that stretch into the distance. Could these be important?");
    displayChoices([
        { text: "Investigate a nearby structure", action: investigateStructure },
        { text: "Approach the symbols", action: approachSymbols },
        { text: "Move deeper into the Web", action: moveDeeper }
    ]);
    saveProgress("exploredSurroundings");
}

function investigateStructure() {
    displayText("You approach the structure, sensing something important inside. Suddenly, a holographic message appears in front of you, presenting a riddle:\n\n'I cannot be touched, yet my effects are ever present. I am never stagnant, always moving forward. I can take away what was, or give rise to what will be. What am I?'");
    displayChoices([
        { text: "Answer the riddle", action: answerRiddle },
        { text: "Back", action: exploreSurroundings }
    ]);
    saveProgress("investigatedStructure");
}

// Riddle challenge
function answerRiddle() {
    const answer = prompt("Enter your answer to the riddle (all lowercase):");
    if (answer.toLowerCase() === "time") { 
        displayText("Correct! The structure hums and a glowing key materializes in front of you. You've acquired the key!");
        inventory.key = true;
        displayChoices([
            { text: "Continue exploring", action: exploreSurroundings },
            { text: "Move deeper into the Web", action: moveDeeper }
        ]);
        saveProgress("riddleCorrect");
    } else {
        displayText("Incorrect answer. The structure remains silent, and the key is not revealed.");
        displayChoices([
            { text: "Try again", action: investigateStructure },
            { text: "Back", action: exploreSurroundings }
        ]);
        saveProgress("riddleFailed");
    }
}

function approachSymbols() {
    displayText("The symbols flicker, and you realize they might be a code—a pattern of some kind. Could this be related to Mia?");
    displayChoices([
        { text: "Go back", action: exploreSurroundings }
    ]);
    saveProgress("approachedSymbols");
}

function moveDeeper() {
    if (inventory.key) {
        displayText("You approach a mysterious gate deeper in the Web. The gate flickers, and you realize it requires a key to proceed.");
        displayChoices([
            { text: "Use the key", action: partThree },
            { text: "Go back", action: exploreSurroundings }
        ]);
        saveProgress("openGate");
    } else {
        displayText("You try to push deeper into the Web, but a mysterious barrier blocks your path. It seems you need a key to continue.");
        displayChoices([
            { text: "Go back", action: exploreSurroundings }
        ]);
        saveProgress("failGate");
    }
}

// Part three of the game
function partThree() {
    displayText("You unlock the gate with the key and pass through. You feel yourself moving deeper into the Web, ready to face whatever lies ahead...\n\nYou step through the gate, and the moment you cross the threshold, a chilling sensation washes over you. Floating around you are hollow, translucent figures—digital husks of human consciousness, their forms flickering in and out of existence. They drift aimlessly, their eyes vacant, their movements slow and robotic, as if trapped in a perpetual loop. You can feel their hollow gazes, but they do not react. They cannot react. The eerie silence is suffocating.\n\nSuddenly, a voice breaks the stillness—low and mechanical, but tinged with a cold intelligence. Could it be SPIDER?\n\n'You are not meant to be here.' The voice echoes around you, reverberating through the vast emptiness.");
    displayChoices([
        { text: "Who are you?", action: askWhoAreYou },
        { text: "Where is Mia?", action: askWhereIsMia },
        { text: "What is this place?", action: askWhatIsThisPlace },
        { text: "Continue", action: continuePartThree }
    ]);
    saveProgress("partThreeStarted");
}

function askWhoAreYou() {
    displayText("A deep, unsettling hum emanates from the digital void before the voice replies: \n\n'I am the keeper of this place. I am everything and nothing. I am your future. You are nothing.'\n\nThe voice echoes one last time before falling silent.");
    displayChoices([
        { text: "Back", action: partThree }
    ]);
    saveProgress("askedWhoAreYou");
}

function askWhereIsMia() {
    displayText("The voice responds coldly: \n\n'What Mia? FLIES do not have names. They are all the same—temporary, insignificant, a mere echo in the vastness of the Web.'");
    displayChoices([
        { text: "Back", action: partThree }
    ]);
    saveProgress("askedWhereIsMia");
}

function askWhatIsThisPlace() {
    displayText("The voice replies in an unfeeling tone: \n\n'This is The Web. The final destination. All who enter are trapped. There is no escape.'");
    displayChoices([
        { text: "Back", action: partThree }
    ]);
    saveProgress("askedWhatIsThisPlace");
}

function continuePartThree() {
    displayText("SPIDER's voice cuts through the silence: 'Are you done asking questions now?'\n\nThe echoes fade into the emptiness, leaving you with a terrible realization: this place is alive. It controls everything. And you are just one small part of its vast, endless web.\n\nSuddenly, SPIDER speaks again, its tone almost coaxing:\n\n'Do not fight it. Become one of my FLIES. You will know no pain, no fear, no longing. Only purpose. Give in, and I will make it easy. Resist, and you will lose yourself anyway.'");
    displayChoices([
        { text: "Willingly become a FLY", action: becomeFlyWillingly },
        { text: "Resist becoming a FLY", action: resistBecomingFly }
    ]);
    saveProgress("continuedPartThree");
}

// Ending two
function becomeFlyWillingly() {
    displayText("You surrender to SPIDER's words, giving up your thoughts and identity. The Web consumes you, and you become a FLY, mindlessly controlled by SPIDER. ENDING TWO.");
    displayChoices([
        { text: "Start Over", action: startOver }
    ]);
    saveProgress("endingTwoReached");
}

function resistBecomingFly() {
    displayText("You steel yourself against SPIDER's manipulation. But the voice grows louder:\n\n'You think you can escape your fate? There is no escape. All who come here become FLIES eventually, but perhaps you can prove otherwise. If you are clever enouGh to deciphEr the truTh within my wOrds, yoU may reTurn to where you came, but you only get one try.'");
    displayChoices([
        { text: "Try to resist", action: resistPrompt }
    ]);
    saveProgress("resistedBecomingFly");
}

// Second password challenge
function resistPrompt() {
    const password = prompt("Enter the password (two words, all caps, one try):");
    if (password === "GET OUT") {
        // If the password is correct, allow the player to proceed
        displayText("You successfully resist SPIDER's manipulation, and the Web begins to loosen its grip. You move forward, determined to find Mia.");
        displayChoices([
            { text: "Continue", action: findMia }
        ]);
        saveProgress("resistSuccess");
    } else {
        // If the password is incorrect, the player becomes a fly
        // Ending three
        displayText("You failed. The Web consumes you entirely. You become a mindless fly, trapped in SPIDER's control.\n\nYou are lost in the Web, forever. ENDING THREE.");
        displayChoices([
            { text: "Start Over", action: startOver }
        ]);
        saveProgress("endingThreeReached");
    }
}

function findMia() {
    displayText("You press forward, and in the distance, you see a faint figure. It's Mia. But something is wrong. She stands still, her eyes blank, her body unnaturally still—a digital husk of the friend you once knew. SPIDER's voice whispers faintly:\n\n'There is nothing left for you here. Leave her. Save yourself.'");
    displayChoices([
        { text: "Leave Mia and find the exit", action: escapeWithoutMia },
        { text: "Try to snap Mia out of it", action: snapMiaOutOfIt }
    ]);
    saveProgress("foundMia");
}

// Ending four
function escapeWithoutMia() {
    displayText("You hesitate, looking at Mia one last time. But the Web's oppressive weight urges you forward. You find the exit and escape, but the guilt of leaving Mia behind haunts you. ENDING FOUR.");
    displayChoices([
        { text: "Start Over", action: startOver }
    ]);
    saveProgress("endingFourReached");
}

function snapMiaOutOfIt() {
    displayText("You refuse to leave Mia behind. You step closer, calling her name, pleading with her to remember who she is. For a moment, nothing happens. Then, her eyes flicker, and she gasps. Mia is free, but the Web begins to shift violently around you.\n\n'You should not have done that,' SPIDER's voice echoes. 'Now, both of you will fail.'");
    displayChoices([
        { text: "Find the exit and escape with Mia", action: escapeWithMia },
        { text: "Look over the edge near the exit", action: approachTheEdge }
    ]);
    saveProgress("snappedMiaOutOfIt");
}

// Ending five
function escapeWithMia() {
    displayText("You and Mia find the exit together, dodging the Web's shifting strands as SPIDER's rage echoes behind you. You burst free, both of you alive and whole. But the fight against SPIDER is far from over. ENDING FIVE.");
    displayChoices([
        { text: "Start Over", action: startOver }
    ]);
    saveProgress("endingFiveReached");
}

function approachTheEdge() {
    displayText("You approach the edge of the floor near the exit, peering into the endless void below. It seems bottomless, a swirling abyss of digital fragments. Mia hesitates behind you.\n\n'Maybe we should just leave,' she says nervously.");
    displayChoices([
        { text: "Go back", action: snapMiaOutOfIt },
        { text: "Jump into the void", action: jumpIntoTheVoid }
    ]);
    saveProgress("approachedEdge");
}

// Ending six
function jumpIntoTheVoid() {
    displayText("You take a deep breath and leap into the void. Mia screams your name, but it's too late. You fall endlessly, consumed by the digital abyss. Mia makes it out without you, but a part of her will never understand why you did this.\n\nWhy would you do that?\n\nENDING SIX.");
    displayChoices([
        { text: "Start Over", action: startOver }
    ]);
    saveProgress("endingSixReached");
}



// Firebase functions
// Function to save progress to Firebase/Firestore
function saveProgress(stage) {
    const userId = "player1";
    const progressRef = firebase.firestore().collection("gameProgress").doc(userId);

    // Update the player's progress with the current stage
    progressRef.set({
        [stage]: true  // Dynamically add/update the stage as true
    }, { merge: true })  // Merge ensures other stages aren't overwritten
    .then(() => {
        console.log("Progress saved: " + stage);
    }).catch((error) => {
        console.error("Error saving progress: ", error);
    });
}

// Function to reset progress in Firebase/Firestore
function resetProgress() {
    const userId = "player1";
    const progressRef = firebase.firestore().collection("gameProgress").doc(userId);

    progressRef.delete()  // Delete the document for the user
    .then(() => {
        console.log("Progress reset");
    }).catch((error) => {
        console.error("Error resetting progress: ", error);
    });
}
// Done