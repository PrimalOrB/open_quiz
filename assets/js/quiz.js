// Single Page Element Generation
var container = document.getElementById( 'container' );
var highScoreButton = document.getElementById( 'high-scores' ).addEventListener( 'click', function() {
    event.preventDefault();
        // run pause quiz to see if confirmation of aborting active quiz is required
    var confirmExit = pauseQuiz()
        // if true
    if ( confirmExit) {
            // stop the interval 
        clearInterval(timeInterval)
            // proceed to high score page
        highScoreHTML() 
    }
})
var timer = document.getElementById('timer');
var questionEl, questionID, timeInterval, timeLeft; 
    // load storage data as current highScores array
var highScores = getData();
    // set penalty
var penaltyTime = 10

// On page load, populate DOM with start page
startHTMl()

// Question Array
    // Questions inspried by items found at:
        // https://www.topzenith.com/2020/04/javascript-quiz-with-questions-and-answers.html
        // https://www.javatpoint.com/result.jsp?answer=obj.method%28%29&x=39&y=7
        // General knowledge

var questions = [
    { 'question': 'What is the HTML tag under which one can write the JavaScript code?',   'answersObj': [
            { 'answer': ' <javascript> ... </javascript>',          'value': false },
            { 'answer': '<scripted> ... </scripted>',               'value': false },
            { 'answer': '<script>...  </script>',                   'value': true },
            { 'answer': '<js> ... </js>',                           'value': false },
        ]
    },
    { 'question': 'What is the correct file extension for Javascript files?',   'answersObj': [
            { 'answer': '.java',                                    'value': false },
            { 'answer': '.js',                                      'value': true },
            { 'answer': '.javascript',                              'value': false },
            { 'answer': '.script',                                  'value': false },
        ]
    },
    { 'question': 'Which of the following is the correct syntax to display “You have a message!” in an alert box using JavaScript?',   'answersObj': [
            { 'answer': 'alertbox(“You have a message!”);',         'value': false },
            { 'answer': 'msgbox(“You have a message!”);',           'value': false },
            { 'answer': 'alert(“You have a message!”);',            'value': true },
            { 'answer': 'msg(“You have a message!”);',              'value': false },
        ]
    },
    { 'question': 'What is the output of this statement? 33 == 33.0',   'answersObj': [
            { 'answer': 'true',                                     'value': true },
            { 'answer': 'false',                                    'value': false },
            { 'answer': '33',                                       'value': false },
            { 'answer': 'none of the above',                        'value': false },
        ]
    },
    { 'question': 'What is the output or this statement? "45" === 45',   'answersObj': [
            { 'answer': 'true',                                     'value': false },
            { 'answer': 'false',                                    'value': true },
            { 'answer': '45',                                       'value': false },
            { 'answer': 'none of the above',                        'value': false },
        ]
    },
    { 'question': `Which event is specific to the keyboard`,   'answersObj': [
            { 'answer': 'onclick',                                  'value': false },
            { 'answer': 'onfocus',                                  'value': false },
            { 'answer': 'onkeydown',                                'value': true },
            { 'answer': 'onkeyboardpress',                          'value': false },
        ]
    },
    { 'question': `What does the programming princinple of DRY refer to`,   'answersObj': [
            { 'answer': 'Do not repeat yourself',                   'value': true },
            { 'answer': 'Defensive rushing yards',                  'value': false },
            { 'answer': 'Design reference year',                    'value': false },
            { 'answer': 'Do not spill liquids on your keyboard',    'value': false },
        ]
    },
    { 'question': `If (a === 5) and (b === 20), what will the return from the function( a * b )`,   'answersObj': [
            { 'answer': '100',                                      'value': true },
            { 'answer': '520',                                      'value': false },
            { 'answer': '25',                                       'value': false },
            { 'answer': 'null',                                     'value': false },
        ]
    },
    { 'question': `How could you select a DOM element defined as <p id="test">`,   'answersObj': [
            { 'answer': 'document.getElementsByTagName("p")',       'value': false },
            { 'answer': 'document.querySelector("#test")',          'value': false },
            { 'answer': 'document.getElementsById("test")',         'value': false },
            { 'answer': 'All answers will select the element ',     'value': true },
        ]
    },
    { 'question': `For "var obj = { 'param1':1,  'param2':2 }", what will return if you call "obj.length"`,   'answersObj': [
            { 'answer': '1, 2',                                     'value': false },
            { 'answer': 'i',                                        'value': false },
            { 'answer': '2',                                        'value': false },
            { 'answer': 'undefined ',                               'value': true },
        ]
    }
]

// Start Page
function startHTMl() {
        // clear container
    container.innerHTML = ""
        
        //title section
    var startDiv = document.createElement( 'div' );
    startDiv.setAttribute( 'id', 'start-el' );
    startDiv.setAttribute( 'class', 'block' );
    var startTitle = document.createElement( 'h1' );
    startTitle.textContent = 'coding quiz challenge'
    var startPara = document.createElement( 'p' );
    startPara.innerHTML = `Try to answer the following code-related questions within the time limit. </br>
    Keep in mind that incorrect or unanswered answers will penalize your score/time by ten seconds! </br>
    You can answer questions by clicking with your mouse, or pushing the corresponding keyboard button`;
    var buttonDiv = document.createElement( 'div' )
    var startButton = document.createElement( 'button' );
    startButton.setAttribute( 'id', 'start-button');
    startButton.textContent = 'start quiz';
    buttonDiv.appendChild( startButton )
    startDiv.appendChild( startTitle );
    startDiv.appendChild( startPara );
    startDiv.appendChild( buttonDiv );
    container.appendChild( startDiv );

        // listen to start button to begin the quiz
    document.getElementById( 'start-button' ).addEventListener( 'click', function() { 
        event.preventDefault();
        questionHTML();
    })
}

// Pause Quiz
function pauseQuiz() {
        // default to true
    var response = true
        // timer is running if there is timeLeft value above zero
    if ( timeLeft > 0 ) {
            // hold timer value by adding interval to offset the -- of the timer
        timeLeft = timeLeft++
            // confirm the user wants to abort
        response = confirm('Quiz in progress, would you like to abort?')
    }
    // return response
    return response
}

// Question List Page
function questionHTML() {
        // clear container
    container.innerHTML = ""

        //question section
    var questionDiv = document.createElement( 'div' );
    questionDiv.setAttribute( 'id', 'question' );
    questionDiv.setAttribute( 'class', 'block' );
    var questionSpan = document.createElement('span');
    questionSpan.setAttribute( 'id', 'question-el' );
    questionSpan.textContent = ' ';
    questionDiv.appendChild( questionSpan );
    container.appendChild( questionDiv );

        // answer section
    var answerDiv = document.createElement('div');
    answerDiv.setAttribute( 'id', 'answer' );
    answerDiv.setAttribute( 'class', 'block' );
    var answerOl = document.createElement('ol');
    answerOl.setAttribute( 'id', 'ol' )
    answerDiv.appendChild( answerOl );
    container.appendChild( answerDiv );

        // response section
    var responseDiv = document.createElement( 'div' );
    responseDiv.setAttribute( 'id', 'response' );
    responseDiv.setAttribute( 'class', 'block' );
    var responseSpan = document.createElement( 'span' );
    responseSpan.setAttribute( 'id', 'response-el' );
    responseSpan.textContent = '';
    var responsePara = document.createElement( 'p' );
    responseSpan.appendChild( responsePara )
    responseDiv.appendChild( responseSpan );
    container.appendChild( responseDiv );

        // start timer
    timerStart()
        // start quiz
    initQuiz()
}

// End Game Page
function endGameHTML() {
            // calculate score
    var score = timeLeft
        // set default message end
    var message = ', great job! Save your achievement to the high score board.'  
    if( questions.length > questionID ) {
            // calculate remaining questions
        var remainder = questions.length - questionID
            // calculate score penalty per remainder
        score = timeLeft - ( remainder * 10 )
            // change message to explain penlaty
        message = `, due to the timer running out with <strong> ${ questions.length - questionID } </strong> ${ ( remainder === 1 ) ? 'question' : 'questions' } remaining. Save your score so you can try and beat it next time!`
    }
   
        // clear container
    container.innerHTML = ""
        // clear timer
    timer.innerHTML = ""

        //end game section
    var scoreDiv = document.createElement( 'div' );
    scoreDiv.setAttribute( 'id', 'question' );
    scoreDiv.setAttribute( 'class', 'block' );
    var scoreTitle = document.createElement( 'h1' );
    scoreTitle.textContent = 'all done!';

        //span  
    var scorePara = document.createElement( 'span' );
    scorePara.setAttribute( 'id', 'score-span' );
    scorePara.innerHTML = `Your final score is <strong id="score"> ${ score } </strong> ${ message } `;

        //form
    var scoreForm = document.createElement( 'form' );
    scoreForm.setAttribute( 'id', 'submit' );
    scoreForm.setAttribute( 'autocomplete', 'off' )
    var scoreLabel = document.createElement( 'label' );
    scoreLabel.setAttribute( 'for', 'initials');
    scoreLabel.setAttribute( 'id', 'label' );
    scoreLabel.textContent = 'Enter initials: ';
    var scoreInput = document.createElement( 'input' );
    scoreInput.setAttribute( 'type', 'text');
    scoreInput.setAttribute( 'placeholder', 'Initials');
    scoreInput.setAttribute( 'id', 'input');
    var scoreButtonDiv = document.createElement( 'div' );
    var scoreButton = document.createElement( 'button' );
    scoreButton.setAttribute( 'type', 'submit');
    scoreButton.setAttribute( 'id', 'submit-button');
    scoreButton.textContent = 'submit';
    scoreButtonDiv.appendChild( scoreButton );
    scoreForm.appendChild( scoreLabel );
    scoreForm.appendChild( scoreInput );
    scoreForm.appendChild( scoreButtonDiv );
    scoreDiv.appendChild( scoreTitle );
    scoreDiv.appendChild( scorePara );
    scoreDiv.appendChild( scoreForm );
    container.appendChild( scoreDiv );

        // focus keyboard to entry field
    scoreInput.focus();
   
        // listen to submit button to go to high score page
    document.getElementById( 'submit' ).addEventListener( 'submit', function() {
        event.preventDefault();
        var initials = document.getElementById( 'input' ).value.toLowerCase()
            // verify that initials are entered
        if ( initials === '') {
            alert('You must enter your initials')
            return
        }
            // if initials entered, send initials and score as arguments to storeScore
        storeData(initials, score)
        highScoreHTML()
    })
    timeLeft = 0
}

// High Scores Page
function highScoreHTML() {
        // clear container
    container.innerHTML = ""
        // clear timer
    timer.innerHTML = ""
    
        //end game section
    var scoresDiv = document.createElement( 'div' );
    scoresDiv.setAttribute( 'id', 'scores-container' );
    scoresDiv.setAttribute( 'class', 'block' );
    var scoresTitle = document.createElement( 'h1' );
    scoresTitle.textContent = 'high scores!';

        // score list
    var scoreContainer = document.createElement( 'div' );
    scoreContainer.setAttribute( 'id', 'score-list' );
    var scoreUl = document.createElement( 'ul' );
    scoreUl.setAttribute( 'id', 'scores' );
    scoreContainer.appendChild( scoreUl );

        // controls
    var controlsContainer = document.createElement( 'div' );
    controlsContainer.setAttribute( 'id', 'controls' );
    var backButtonDiv = document.createElement( 'div' );
    var backButton = document.createElement( 'button' );
    backButton.setAttribute( 'id', 'back-button' );
    backButton.textContent = 'go back';
    backButtonDiv.appendChild( backButton );
    var clearButtonDiv = document.createElement( 'div' );
    var clearButton = document.createElement( 'button' );
    clearButton.setAttribute( 'id', 'clear-button' );
    clearButton.textContent = 'clear high scores';
    clearButtonDiv.appendChild( clearButton )
    controlsContainer.appendChild( backButtonDiv );
    controlsContainer.appendChild( clearButtonDiv );

    scoresDiv.appendChild( scoresTitle );
    scoresDiv.appendChild( scoreContainer );
    scoresDiv.appendChild( controlsContainer );

    container.appendChild( scoresDiv )
    
        // get refreshed data after entry of score
    getData()
        // sort high scores
    sortData()

        // post high scores
    for ( var i = 0; i < highScores.length; i ++ ) {
            // transform timestamp into a displayed date/time
        var options = {
            year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        timestamp = new Date( highScores[i].timestamp )
        var result = timestamp.toLocaleDateString('en', options);
            // generate li items for appending to ul
        var  li = document.createElement('li')
        li.innerHTML = `<div>${i + 1}:   ${highScores[i].initials.toUpperCase()}    (  ${highScores[i].score}   )</div>  <small>${result}</small>`
        scoreUl.appendChild(li)
    }

        // listen to back button to return to start page
    document.getElementById( 'back-button' ).addEventListener( 'click', function() { 
        event.preventDefault();
        startHTMl();
    })
        // listen to clear button to clear the high scores
    document.getElementById( 'clear-button' ).addEventListener( 'click', function() { 
        event.preventDefault();
        clearScores();
        highScoreHTML();
    })
}

// Timer function
function timerStart() {
    // set timer value based on the number of questions
    timeLeft = questions.length * 8;
    timer.textContent = timeLeft + ' seconds'
    // timer interval countdown
    timeInterval = setInterval(function() {
        timeLeft--
        timer.textContent = timeLeft + ' seconds'
        if( timeLeft <= 0 ) {
            // when timeout, stop tmie and go to end game
            clearInterval(timeInterval)
            endGameHTML()
        }
        return timeLeft
    }, 1000); 
}

// Penalize Time
function penalize() {
    timeLeft = timeLeft - 10

    var penalty = document.createElement( 'div' );
    penalty.setAttribute( 'class', 'penalty' );
    penalty.textContent = `- ${penaltyTime}s`
    timer.appendChild( penalty )


}

// Init Quiz
function initQuiz() {
        // reset question counter
    questionID = -1
        // locate generated question element
    questionEl = document.getElementById('question')
        // shuffle question order
    shuffle(questions)
        // run quiz loop
    iterateQuiz()
}

// Iterate through quiz questions
function iterateQuiz() {
        // iterate question counter
    questionID = questionID + 1 
        // if questions remain, run quiz on next item
    if ( questions.length - 1 >= questionID ) {
            //shuffle answer order of current question
        shuffle(questions[questionID].answersObj)
            // generate HTML and display random question
        questionEl.textContent = questions[questionID].question
        var ol = document.getElementById('ol')
        ol.innerHTML = ""
            // loop in shuffled answer
        for ( var i = 0; i < questions[questionID].answersObj.length; i++ ) {
            var li = document.createElement('li')
            li.textContent = questions[questionID].answersObj[i].answer
            li.setAttribute( 'data-response', questions[questionID].answersObj[i].value )
            ol.appendChild(li)
        }
    } else {
            // change to end game page
        endGameHTML()
            // stop timer
        clearInterval(timeInterval)
    } 
}

// Shuffle Arrays
function shuffle(a) {
    for ( var i = 0; i < a.length; i++ ) {
        // select a random number up to the length of the array
      var random = Math.floor( Math.random() * ( i ) )
        // set aside the value of original indexed selection
      var orig = a[i]
        // reset the value of the indexed selection to the value of a random index
      a[i] = a[random]
        // set the value of the same random index to the value of the original indexed selection
      a[random] = orig
    }
};

// Store user data
function storeData( initials, score ) {
        // capture a timestamp as a unique ID
    var now = new Date().getTime();
    var entry = { 'timestamp': now,     'initials': initials,       'score': score };
        // push object to high scores array
    highScores.push(entry)
        // stringify
    var stringEntry = JSON.stringify(highScores)
        // set to local storage
    localStorage.setItem('stored-scores', stringEntry)
}

// get stored user data
function getData() {
        // declare as empty array
    highScores = []
        // get local storage string
    var getStorage = localStorage.getItem('stored-scores')
        // if string is null, return empty array
    if ( !getStorage ) { 
        return highScores 
    }
        // parse string and set highScores
    highScores = JSON.parse( getStorage )
        // return
    return highScores
}

// sort user data
function sortData() {
    highScores.sort( ( a, b ) => b.score-a.score )
    // stack overflow: https://stackoverflow.com/questions/54623130/javascript-sort-an-array-of-objects-by-a-numeric-property-in-each-object/54623139
}

// clear high scores
function clearScores() {
        // empty local highscores array
    highScores = []
        // remove localStorage data
    localStorage.removeItem('stored-scores')
}

  // Listen for true / false clicks on answers
container.addEventListener('click', function(e) {
      var response = e.target.dataset.response
        // send response for processing
      processResponse( response )
})

// listen for keyboard to answer questions
window.addEventListener('keyup', function(e) {
        // get number value of pressed key (NaN is acceptable)
    var key = Number( e.key ) - 1
        // set reference
    var ol;
    if ( !document.getElementById('ol') ) {
        // if falsy, then the quiz is not active
        return
    } else {
        // if truthy, quiz is active and can select question list
        ol = document.getElementById('ol')
    }

        // if key pressed value is less than the length of questions, proceed
    if( key < ol.children.length && key > -1) {
            // get true/false statement from dataset.response
        var response = ol.children[key].dataset.response
            // send response for processing
        processResponse( response )
    }
})

// process answer from either clicks or keyboard inputs
function processResponse(e) {
    var responsePost = document.getElementById( 'response-el' )
        if( e === 'true' ) {
            // post true
            responsePost.children[0].textContent = 'Correct!'
            responsePost.children[0].classList.remove('false')
            responsePost.children[0].classList.add('true')
            // go to next question
        iterateQuiz()
    } else if ( e === 'false' ) {
            // remove time
            penalize()
            // post false
            responsePost.children[0].textContent = 'Wrong!'
            responsePost.children[0].classList.remove('true')
            responsePost.children[0].classList.add('false')
                // go to next question
            iterateQuiz()
    }
}

