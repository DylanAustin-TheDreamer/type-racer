const difficultySelect = document.getElementById('difficulty-select');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const retryBtn = document.getElementById('retryBtn');
const textToType = document.getElementById('text-to-type');
const typingInput = document.getElementById('typing-input');

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

function checkDifficulty(){
    // Check the selected difficulty level
    let difficulty = difficultySelect.value;
    if (difficulty === 'easy') {
        textToType.innerText = "The tired cat sat on the mat.";
    } else if (difficulty === 'medium') {
        textToType.innerText = "The tired cat sat on the mat. He reached for his hat, then gave his head a pat.";
    } else if (difficulty === 'hard') {
        textToType.innerText = "The tired cat sat on the mat. He reached for his hat, then gave his head a pat. He gave up his struggle, dealing with his world of trouble. He licked his lap and fell into a celestial nap.";
    }
    else {
        textToType.innerText = "Please select a difficulty level.";
    }
}

function startTest(){
    // Start the typing test

    // Reset the input field
    typingInput.value = '';
}

function stopTest(){
    // Stop the typing test
    //gather input
    let userInput = typingInput.value;
    let correctText = textToType.innerText;

    //gather time taken
    let endTime = new Date();
    let timeTaken = (endTime - startTime) / 1000; // in seconds
    calculateScore(timeTaken);
}

function calculateScore(timeTaken){
    // Calculate the user's typing speed and accuracy
}

function retryTest(){
    // Retry the typing test
}

function certificate(){
    // Generate a certificate for the user
}