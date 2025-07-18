const testItem = document.getElementById("textDisplay");
const inputItem = document.getElementById("textInput");
const timeName = document.getElementById("timeName");
const time = document.getElementById("time");
const cwName = document.getElementById("cwName");
const cw = document.getElementById("cw");
const restartBtn = document.getElementById("restartBtn");
const timeSelect = document.getElementById("timeSelect");
const scoreDisplay = document.getElementById("scoreDisplay");

var wordNo = 1;
var wordsSubmitted = 0;
var wordsCorrect = 0;
var timer = 30;
var flag = 0;
var factor = 2;
var seconds;

displayTest();

//on Input
inputItem.addEventListener('input', function (event) {
    if (flag === 0) {
        flag = 1;
        timeStart();
    }
    let charEntered = event.data;
    if (/\s/g.test(charEntered)) {  //check if the character entered is a whitespace
        checkWord();
    }
    else {
        currentWord();
    }
});

// Time selection
timeSelect.addEventListener("change", function () {
    timer = parseInt(timeSelect.value);
    factor = 60 / timer;
    time.innerText = timer;
});

// Restart the test
restartBtn.addEventListener("click", function () {
    location.reload();
});

// Start the timer countdown
function timeStart() {
    timeSelect.style.visibility = 'hidden';
    seconds = setInterval(function () {
        time.innerText--;
        if (time.innerText == "-1") {
            timeOver();
            clearInterval(seconds);
        }
    }, 1000);
}

// Disable textarea and show score
function timeOver() {
    inputItem.disabled = true;
    restartBtn.focus();
    displayScore();
}
// Display the score below input
function displayScore() {
    let percentageAcc = wordsSubmitted !== 0 ? Math.floor((wordsCorrect / wordsSubmitted) * 100) : 0;
    scoreDisplay.innerHTML = `WPM: ${factor * wordsCorrect} | Accuracy: ${percentageAcc}%`;
}

// Check if the user is entering the correct word
function currentWord() {
    const wordEntered = inputItem.value;
    const currentID = "word " + wordNo;
    const currentSpan = document.getElementById(currentID);
    const curSpanWord = currentSpan.innerText;

    if (wordEntered == curSpanWord.substring(0, wordEntered.length)) {
        colorSpan(currentID, 2);
    } else {
        colorSpan(currentID, 3);
    }
}
// Check word entered
function checkWord() {
    const wordEntered = inputItem.value;
    inputItem.value = '';

    const wordID = "word " + wordNo;
    const checkSpan = document.getElementById(wordID);
    wordNo++;
    wordsSubmitted++;

    if (checkSpan.innerText === wordEntered) {
        colorSpan(wordID, 1);
        wordsCorrect++;
        cw.innerText = wordsCorrect;
    } else {
        colorSpan(wordID, 3);
    }

    if (wordNo > 40) {
        displayTest();
    } else {
        const nextID = "word " + wordNo;
        colorSpan(nextID, 2);
    }
}
// Color the words
function colorSpan(id, color) {
    const span = document.getElementById(id);
    if (color === 1) {
        span.classList.remove('wrong');
        span.classList.remove('current');
        span.classList.add('correct');
    } else if (color === 2) {
        span.classList.remove('correct');
        span.classList.remove('wrong');
        span.classList.add('current');
    } else {
        span.classList.remove('correct');
        span.classList.remove('current');
        span.classList.add('wrong');
    }
}
// Display random words on screen
function displayTest() {
    wordNo = 1;
    testItem.innerHTML = '';

    let newTest = randomWords();
    newTest.forEach(function (word, i) {
        let wordSpan = document.createElement('span');
        wordSpan.innerText = word;
        wordSpan.setAttribute("id", "word " + (i + 1));
        testItem.appendChild(wordSpan);
    });

    const nextID = "word " + wordNo;
    colorSpan(nextID, 2);
}
// Generate an array of random 40 words
function randomWords() {
    const wordArray = ["a", "about", "above", "across", "act", "add", "afraid", "after", "again", "age", "ago", "agree", "air", "all", "alone", "along", "always", "am", "amount", "an", "and", "angry", "another", "answer", "any", "anyone", "appear", "apple", "are", "area", "arm", "army", "around", "arrive", "art", "as", "ask", "at", "aunt", "away", "baby", "back", "bad", "bag", "ball", "bank", "base", "bath", "be", "bean", "bear", "bed", "beer", "before", "begin", "bell", "below", "best", "big", "bird", "birth", "bit", "bite", "black", "bleed", "block", "blood", "blow", "blue", "board", "boat", "body", "boil", "bone", "book", "border", "born", "both", "bowl", "box", "boy", "branch", "brave", "bread", "break", "breathe", "bridge", "bright", "bring", "brother", "brown", "brush", "build", "burn", "bus", "busy", "but", "buy", "by", "cake", "call", "can", "cap", "car", "card", "care", "carry", "case", "cat", "catch", "chair", "chase", "cheap", "cheese", "child", "choice", "circle", "city", "class", "clever", "clean", "clear", "climb", "clock", "cloth", "cloud", "close", "coffee", "coat", "coin", "cold", "colour", "comb", "common", "compare", "come", "control", "cook", "cool", "copper", "corn", "corner", "correct", "cost", "count", "cover", "crash", "cross", "cry", "cup", "cut", "dance", "dark", "day", "dead", "decide", "deep", "deer", "desk", "die", "dirty", "dish", "do", "dog", "door", "down", "draw", "dream", "dress", "drink", "drive", "drop", "dry", "duck", "dust", "duty", "each", "ear", "early", "earn", "earth", "east", "easy", "eat", "effect", "egg", "eight", "else", "empty", "end", "enemy", "enjoy", "enter", "equal", "even", "event", "ever", "every", "exact", "except", "expect", "explain", "eye", "face", "fact", "fail", "fall", "false", "family", "famous", "far", "farm", "fast", "fat", "fault", "fear", "feed", "feel", "fever", "few", "fight", "fill", "film", "find", "fine", "fire", "first", "fish", "fit", "five", "fix", "flag", "flat", "float", "floor", "flour", "fly", "fold", "food", "fool", "foot", "for", "force", "forest", "forget", "fork", "form", "fox", "four", "free", "freeze", "fresh", "friend", "from", "front", "fruit", "full", "fun", "funny", "future", "game", "gate", "get", "gift", "give", "glad", "glass", "go", "goat", "god", "gold", "good", "grass", "grave", "great", "green", "gray", "group", "grow", "gun", "hair", "half", "hall", "hand", "happy", "hard", "hat", "hate", "have", "he", "head", "hear", "heavy", "heart", "hello", "help", "hen", "her", "here", "hers", "hide", "high", "hill", "him", "his", "hit", "hobby", "hold", "hole", "home", "hope", "horse", "hot", "hotel", "house", "how", "hour", "hurry", "hurt", "I", "ice", "idea", "if", "in", "into", "invent", "iron", "is", "island", "it", "its", "jelly", "job", "join", "juice", "jump", "just", "keep", "key", "kill", "kind", "king", "knee", "knife", "knock", "know", "lady", "lamp", "land", "large", "last", "late", "laugh", "lazy", "lead", "leaf", "learn", "leave", "leg", "left", "lend", "length", "less", "lesson", "let", "letter", "lie", "life", "light", "like", "lion", "lip", "list", "live", "lock", "lonely", "long", "look", "lose", "lot", "love", "low", "lower", "luck", "main", "make", "male", "man", "many", "map", "mark", "may", "me", "meal", "mean", "meat", "meet", "milk", "mind", "miss", "mix", "model", "money", "month", "moon", "more", "most", "mouth", "move", "much", "music", "must", "my", "name", "near", "neck", "need", "needle", "net", "never", "new", "news", "next", "nice", "night", "nine", "no", "noble", "noise", "none", "nor", "north", "nose", "not", "notice", "now", "obey", "ocean", "of", "off", "offer", "office", "often", "oil", "old", "on", "one", "only", "open", "or", "orange", "order", "other", "our", "out", "over", "own", "page", "pain", "paint", "pair", "pan", "paper", "park", "part", "party", "pass", "past", "path", "pay", "peace", "pen", "per", "piano", "pick", "piece", "pig", "pin", "pink", "place", "plane", "plant", "plate", "play", "please", "plenty", "point", "polite", "pool", "poor", "pour", "power", "press", "pretty", "price", "prince", "prison", "prize", "pull", "punish", "pupil", "push", "put", "queen", "quick", "quiet", "radio", "rain", "rainy", "raise", "reach", "read", "ready", "real", "red", "rent", "reply", "rest", "rice", "rich", "ride", "right", "ring", "rise", "road", "rob", "rock", "room", "round", "rude", "rule", "ruler", "run", "rush", "sad", "safe", "sail", "salt", "same", "sand", "save", "say", "school", "search", "seat", "second", "see", "seem", "sell", "send", "serve", "seven", "sex", "shade", "shake", "shape", "share", "sharp", "she", "sheep", "sheet", "shine", "ship", "shirt", "shoe", "shoot", "shop", "short", "shout", "show", "sick", "side", "silly", "silver", "simple", "single", "since", "sing", "sink", "sister", "sit", "six", "size", "skill", "skin", "skirt", "sky", "sleep", "slip", "slow", "small", "smell", "smile", "smoke", "snow", "so", "soap", "sock", "soft", "some", "son", "soon", "sorry", "sound", "soup", "south", "space", "speak", "speed", "spell", "spend", "spoon", "sport", "spread", "spring", "square", "stamp", "stand", "star", "start", "stay", "steal", "steam", "street", "study", "stupid", "such", "sugar", "sun", "sunny", "sure", "sweet", "swim", "sword", "table", "take", "talk", "tall", "taste", "taxi", "tea", "teach", "team", "tear", "tell", "ten", "tennis", "test", "than", "that", "the", "their", "then", "there", "these", "thick", "thin", "thing", "think", "third", "this", "threat", "three", "tidy", "tie", "title", "to", "today", "toe", "too", "tool", "tooth", "top", "total", "touch", "town", "train", "tram", "tree", "true", "trust", "twice", "try", "turn", "type", "ugly", "uncle", "under", "unit", "until", "up", "use", "useful", "usual", "usually", "very", "voice", "visit", "wait", "wake", "walk", "want", "warm", "was", "wash", "waste", "watch", "water", "way", "we", "weak", "wear", "week", "weight", "were", "well", "west", "wet", "what", "wheel", "when", "where", "which", "while", "white", "who", "why", "wide", "wife", "wild", "will", "win", "wind", "wine", "wire", "wise", "wish", "with", "woman", "word", "work", "world", "worry", "yard", "yell", "yet", "you", "young", "your", "zero", "zoo"];
    let selectedWords = [];
    for (let i = 0; i < 40; i++) {
        let randomNumber = Math.floor(Math.random() * wordArray.length);
        selectedWords.push(wordArray[randomNumber] + " ");
    }
    return selectedWords;
}