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
    // set bonus
var bonusTime = 10    

// On page load, populate DOM with start page
startHTMl()

// Question Array
var questions = []

// Store questions
function storeQuestions() {
    localStorage.setItem( "quiz-questions", JSON.stringify( questions ) );
}

// Retrieve questions
function getQuestions() {
    questions = JSON.parse( localStorage.getItem( 'quiz-questions' ) );
    console.log(questions)
}

// Start Page
function startHTMl() {
    getQuestions()
           
        // clear container
    container.innerHTML = ""

        //title section
    var startDiv = document.createElement( 'div' );
    startDiv.setAttribute( 'id', 'start-el' );
    startDiv.setAttribute( 'class', 'block' );
    var startTitle = document.createElement( 'h1' );
    startTitle.textContent = 'question and answer'
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

        // question list
    var questionDiv = document.createElement( 'div' );
    questionDiv.setAttribute( 'id', 'question-stick' )
    var questionBut = document.createElement( 'button' );
    questionBut.setAttribute( 'id', 'question-list-but');
    if( !questions ) { 
        questions = []
        storeQuestions()
    }
    questionBut.textContent = 'You currently have ' + questions.length + ' questions in your game.';
    questionDiv.appendChild( questionBut );

    container.appendChild( questionDiv );

    console.log(questions)

        // listen to start button to begin the quiz
    document.getElementById( 'start-button' ).addEventListener( 'click', function() { 
        event.preventDefault();
        getQuestions()
        if( questions.length === 0 ) {
            alert('You currently have no questions!')
        } else {
            questionHTML();
        }
    })

       // listen to start button to begin the quiz
       document.getElementById( 'question-list-but' ).addEventListener( 'click', function() { 
        event.preventDefault();
        questionsPage();
    })
}

// Questions Page
function questionsPage() {
         // clear container
         container.innerHTML = ""
         // clear timer
     timer.innerHTML = ""
     
         //end game section
     var questionsDiv = document.createElement( 'div' );
     questionsDiv.setAttribute( 'id', 'questions-container' );
     questionsDiv.setAttribute( 'class', 'block' );

    // head
    var headerBlock = document.createElement( 'div' );
    headerBlock.setAttribute( 'class', 'questions-header' )


     var questionsTitle = document.createElement( 'h1' );
     questionsTitle.textContent = 'question list';
     var addButtonDiv = document.createElement( 'div' );
     var addButton = document.createElement( 'button' );
     addButton.setAttribute( 'id', 'add-button' );
     addButton.textContent = 'add new questions';
     addButtonDiv.appendChild( addButton );
     headerBlock.appendChild( questionsTitle )
     headerBlock.appendChild( addButtonDiv )
 
         // score list
     var questionContainer = document.createElement( 'div' );
     questionContainer.setAttribute( 'id', 'question-list' );
     questionContainer.setAttribute( 'class', 'question-list' );
     var questionUl = document.createElement( 'ul' );
     questionUl.setAttribute( 'id', 'q-ul' );
     questionUl.setAttribute( 'class', 'q-ul' );
     questionContainer.appendChild( questionUl );
 
         // controls
     var controlsContainer = document.createElement( 'div' );
     controlsContainer.setAttribute( 'id', 'controls' );
     var backButtonDiv = document.createElement( 'div' );
     var backButton = document.createElement( 'button' );
     backButton.setAttribute( 'id', 'back-button' );
     backButton.textContent = 'go back';
     backButtonDiv.appendChild( backButton );
     controlsContainer.appendChild( backButtonDiv );

 
     questionsDiv.appendChild( headerBlock );
     questionsDiv.appendChild( questionContainer );
     questionsDiv.appendChild( controlsContainer );
 
     container.appendChild( questionsDiv )
     
         // get refreshed data
    getQuestions()
         // post question
     for ( var i = 0; i < questions.length; i ++ ) {
             // generate li items for appending to ul
         var  li = document.createElement('li')
         li.setAttribute( 'class', 'list-item ')
         var questionI = questions[i].question;
         var answerArr = questions[i].answersObj;
         var answer = answerArr.map(function(e) { return e.value; }).indexOf(true);
        //  var liContainer = document.createElement('div');
        //  liContainer.setAttribute( 'class', 'list-item-container')
         var idHolder = document.createElement( 'i' );
         var id = i + 1
         idHolder.textContent = id
         var questionHolder= document.createElement( 'div' );
         questionHolder.setAttribute( 'class', 'question-entry' )
         questionHolder.textContent = `  ${questionI}    (  ${answer}   )`  
         var deleteHolder = document.createElement( 'div' );
         deleteHolder.setAttribute( 'class', 'delete' );
         deleteHolder.textContent = 'X'
         li.appendChild( idHolder )
         li.appendChild( questionHolder )
         li.appendChild( deleteHolder )
         questionUl.appendChild(li)
     }

        // listen to add button to open modal
    document.getElementById( 'add-button' ).addEventListener( 'click', function() { 
        console.log('add new open modal')
        modalControl()
    })
 
         // listen to back button to return to start page
     document.getElementById( 'back-button' ).addEventListener( 'click', function() { 
         event.preventDefault();
         startHTMl();
     })
        // listen for click on delete button of question, and remove from array
     $('.q-ul').on('click', '.delete', function() {
        var val = $(this)
            .closest('.list-item')
            .children('i')
            .text();

        questions.splice( val-1, 1 ) 
        storeQuestions()  
        questionsPage();
      })

}

// Modal Operation
function modalControl() {
        // modal
    var modal = document.getElementById("addNewModal");
        // display modal
    modal.style.display = "block";

        // span (close button)
    var span = document.getElementsByClassName("close")[0];

        //button (add button)
    var button = document.getElementById( 'add-submit' )

        // close on clicking span
    span.onclick = function() {
        modal.style.display = "none";
    }

        // close on click outside modal
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        }
    }
}

// Add new
function addNewEntry(event) {
    event.preventDefault()
    console.log('add2')
    var newQuestion = document.getElementById( 'question_new' ).value
    var newAnswer1 = document.getElementById( 'answer1' ).value
    var newRadio1 = document.getElementById( 'radio1' ).checked
    var newAnswer2 = document.getElementById( 'answer2' ).value
    var newRadio2 = document.getElementById( 'radio2' ).checked
    var newAnswer3 = document.getElementById( 'answer3' ).value
    var newRadio3 = document.getElementById( 'radio3' ).checked
    var newAnswer4 = document.getElementById( 'answer4' ).value
    var newRadio4 = document.getElementById( 'radio4' ).checked

    // check entries for data
    if( !newQuestion || !newAnswer1 || !newAnswer2 || !newAnswer3 || !newAnswer4 ) {
        alert('Please fill in all fields')
        return
    }

    // check radios are not all false
    if ( !newRadio1 && !newRadio2 && !newRadio3 && !newRadio4 ) {
        alert('Please check correct answer')
        return
    }

    var current = questions.length

    questions[current] = { 
        'question': newQuestion,
        'answersObj': [
            { 'answer': newAnswer1,     'value': newRadio1 },
            { 'answer': newAnswer2,     'value': newRadio2 },
            { 'answer': newAnswer3,     'value': newRadio3 },
            { 'answer': newAnswer4,     'value': newRadio4 },
        ]
    }
    storeQuestions()
    console.log(questions)

    var modal = document.getElementById("addNewModal");
    modal.style.display = "none";

    document.getElementById( 'question_new' ).value = ""
    document.getElementById( 'answer1' ).value = ""
    document.getElementById( 'radio1' ).checked = false
    document.getElementById( 'answer2' ).value = ""
    document.getElementById( 'radio2' ).checked = false
    document.getElementById( 'answer3' ).value = ""
    document.getElementById( 'radio3' ).checked = false
    document.getElementById( 'answer4' ).value = ""
    document.getElementById( 'radio4' ).checked = false

    questionsPage()
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
    timeLeft = timeLeft - penaltyTime

    var penalty = document.createElement( 'div' );
    penalty.setAttribute( 'class', 'penalty' );
    penalty.textContent = `- ${penaltyTime}s`
    timer.appendChild( penalty )
}

// Bonus Time
function bonus() {
    timeLeft = timeLeft + bonusTime

    var bonus = document.createElement( 'div' );
    bonus.setAttribute( 'class', 'bonus' );
    bonus.textContent = `+ ${bonusTime}s`
    timer.appendChild( bonus )
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
            // add time
            bonus()
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

//listen for add new question button
var addSubmitButton = document.getElementById( 'add-submit' )
addSubmitButton.addEventListener( "click", addNewEntry )
