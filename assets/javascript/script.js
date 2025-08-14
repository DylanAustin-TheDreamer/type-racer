const difficultySelect = document.getElementById('difficulty-select');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const retryBtn = document.getElementById('retryBtn');
const textToType = document.getElementById('text-to-type');
const typingInput = document.getElementById('typing-input');

//prevent copy pasting
typingInput.addEventListener('paste', function(e) {
    e.preventDefault();
});

//for the results field
const typingSpeed = document.getElementById('typing-speed');
const typingAccuracy = document.getElementById('typing-accuracy');
const typingEfficiency = document.getElementById('typing-efficiency');

//set up the event listeners
startBtn.addEventListener('click', startTest);
stopBtn.addEventListener('click', stopTest);
retryBtn.addEventListener('click', retryTest);

checkDifficulty();
difficultySelect.addEventListener('change', checkDifficulty);

//setting reusable variables accross functions - this is a work around, though it may not be best practice. Have pity on me...
let startTime = null;
let hasStarted = false;

function checkDifficulty(){
    // Check the selected difficulty level
    let difficulty = difficultySelect.value;

    if (difficulty === 'easy') {
        textToType.innerText = "The tired cat sat on the mat.";
        
    } else if (difficulty === 'medium') {
        textToType.innerText = "The tired cat sat on the mat. He reached for his hat, then gave his head a pat.";
        
    } else if (difficulty === 'hard') {
        textToType.innerText = "The tired cat sat on the mat. He reached for his hat, then gave his head a pat. He gave up his struggle, dealing with his world of trouble, licked his lap, and fell into a celestial nap.";
    } else {
        textToType.innerText = "Please select a difficulty level.";
    }
}

function startTest(){
    // Start the typing test
    let difficulty = difficultySelect.value;
    if(difficulty !== 'none'){
        hasStarted = true;
        // Reset the input field
        typingInput.value = '';

        startTime = new Date();

        startBtn.style.display = 'none'; // Hide the start button
    }
}

function stopTest(){
    // Stop the typing test

    if(hasStarted === true){
        //gather input
        let userInput = typingInput.value;
        let correctText = textToType.innerText;

        //restore start button
        startBtn.style.display = 'block';
        //gather time taken
        let endTime = new Date();
        let timeTaken = (endTime - startTime) / 1000; // in seconds
        calculateScore(timeTaken);
        hasStarted = false;
        typingInput.value = '';
    }
}

function calculateScore(timeTaken) {
    //calculates player's score

    let userInput = typingInput.value.trim();
    let correctText = textToType.innerText.trim();

    // Calculate WPM
    let wordCount = userInput.split(/\s+/).length;
    let wpm = Math.round(wordCount / (timeTaken / 60));
    typingSpeed.innerText = wpm;

    // Calculate accuracy (character by character)
    let correctChars = 0;
    for (let i = 0; i < Math.min(userInput.length, correctText.length); i++) {
        if (userInput[i] === correctText[i]) correctChars++;
    }
    let accuracy = Math.round((correctChars / correctText.length) * 100);
    typingAccuracy.innerText = accuracy;

    // Set target WPM based on difficulty
    let difficulty = difficultySelect.value;
    let targetWPM = 60; // default
    if (difficulty === 'easy') targetWPM = 60;
    else if (difficulty === 'medium') targetWPM = 50;
    else if (difficulty === 'hard') targetWPM = 40;

    // Calculate WPM as a percent of target
    let wpmPercent = Math.min((wpm / targetWPM) * 100, 100);

    // Efficiency is the average of wpmPercent and accuracy
    let efficiency = Math.round((wpmPercent + accuracy) / 2);
    if(accuracy <= 95){
        let newEfficiency = efficiency - 5;
        typingEfficiency.innerText = newEfficiency;
    }
    else{
        typingEfficiency.innerText = efficiency;
    }

    if (efficiency >= 100 && difficultySelect.value === 'hard') {
        // Award a certificate
        certificate();
    }
}

function retryTest(){
    // Reset the typing test instantly
    typingInput.value = '';
    typingInput.disabled = false;
    typingSpeed.innerText = '';
    typingAccuracy.innerText = '';
    typingEfficiency.innerText = '';
    startTime = null;
    startTime = new Date();
}

function certificate(){
    // Generate a certificate for the user
    let certificateText = "Congratulations! You've completed the typing test with flying colors.";
    alert(certificateText);
}