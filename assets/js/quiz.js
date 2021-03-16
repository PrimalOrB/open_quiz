// global variables
var questionEl, 
    questionID, 
    timeInterval, 
    timeLeft,
    perTime, //global perTime
    penaltyTime, // global penaltyTime
    bonusTime, // global bonusTime
    settings = {}, // init settings
    highScores = getData(); // load storage data as current highScores array

// capture container and timer as variables
var container = document.getElementById( 'container' );
var timer = document.getElementById('timer');

// High Scored Button Click --jQuery
$('#high-scores').click( function() { 
        // prevent button default
    event.preventDefault();
        // run pause quiz to see if confirmation of aborting active quiz is required
    var confirmExit = pauseQuiz()
        // if true
    if ( confirmExit) {
            // stop the interval 
        clearInterval(timeInterval)
        timeLeft = 0
            // proceed to high score page
        highScoreHTML() 
    }
})    

// settings Scored Button Click --jQuery
$('#settings-gear').click( function() { 
        // prevent button default
    event.preventDefault();
        // run pause quiz to see if confirmation of aborting active quiz is required
    var confirmExit = pauseQuiz()
        // if true
    if ( confirmExit) {
            // stop the interval 
        clearInterval(timeInterval)
        timeLeft = 0
            // proceed to high score page
        questionsPage() 
    }   
})    

    // get settings
getSettings();

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
}

// Start Page --jQuery
function startHTMl() {
        // load questions
    getQuestions()

        //title section 
    var startTitle = $( '<h1>' )
        .text( 'question and answer' );

    var startPara = $( '<p>' )
        .text( 'Read the question and choose the right answer' );

    var startButton = $( '<button>' )
        .attr( 'id', 'start-button' )
        .text( 'start quiz' );
        
    var buttonDiv  = $( '<div>' )
        .append( startButton )

    var startDiv = $( '<div>' )
        .attr( 'id', 'start-el' )
        .addClass( 'block' )
        .append( startTitle )
        .append( startPara )
        .append( buttonDiv )
   
    // question / settings button
        // if no questions, make empty array and set to storage    
    if( !questions ) { 
        questions = []
        storeQuestions()
    }

    $('#container')
        .html( "" )
        .append( startDiv )

        // listen to start button to begin the quiz
    $('#start-button').click( function() {
            // prevent button action
        event.preventDefault();
            // refresh question list
        getQuestions()
            // alert if no questions, otherwise proceed to game
        if( questions.length === 0 ) {
            alert('You currently have no questions!')
        } else {
            questionHTML();
        }
    })    

    $('#question-list-but').click( function() {
            // prevent button action
        event.preventDefault();
            // proceed to questions / settings page
        questionsPage();
    })
}

// Questions / Settings Page
function questionsPage() {

         // clear container
    container.innerHTML = ""
         // clear timer
    timer.innerHTML = ""
        // get settings
    getSettings()
     
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


        // settings
    var settingsDiv = document.createElement( 'div' );
    settingsDiv.setAttribute( 'id', 'settings-div' );
    var settingsTitle = document.createElement( 'h1' );
    settingsTitle.textContent = 'Settings';
    
    var settingPer = document.createElement( 'div' );
    settingPer.setAttribute( 'class', 'setting-line' );
    settingPer.setAttribute( 'id', 'setting-time-per' );
    var settingTimePerData = document.createElement( 'span' );
    settingTimePerData.textContent = perTime;
    var settingTimePer = document.createElement( 'p' );
    settingTimePer.textContent = 'seconds per question';

    var settingPenalty = document.createElement( 'div' );
    settingPenalty.setAttribute( 'class', 'setting-line' );
    settingPenalty.setAttribute( 'id', 'setting-time-penalty' );
    var settingTimePenaltyData = document.createElement( 'span' );
    settingTimePenaltyData.textContent = penaltyTime;
    var settingTimePenalty = document.createElement( 'p' );
    settingTimePenalty.textContent = 'second penalty ( wrong answer / remaining questions at the end )';

    var settingBonus = document.createElement( 'div' );
    settingBonus.setAttribute( 'class', 'setting-line' );
    settingBonus.setAttribute( 'id', 'setting-time-bonus' );
    var settingTimeBonusData = document.createElement( 'span' );
    settingTimeBonusData.textContent = bonusTime;
    var settingTimeBonus = document.createElement( 'p' );
    settingTimeBonus.textContent = 'second bonus ( correct answer )';

    settingPer.appendChild( settingTimePerData )
    settingPer.appendChild( settingTimePer )

    settingPenalty.appendChild( settingTimePenaltyData )
    settingPenalty.appendChild( settingTimePenalty )

    settingBonus.appendChild( settingTimeBonusData )
    settingBonus.appendChild( settingTimeBonus )
    
    
    settingsDiv.appendChild( settingsTitle )
    settingsDiv.appendChild( settingPer )
    settingsDiv.appendChild( settingPenalty )
    settingsDiv.appendChild( settingBonus )
 
     questionsDiv.appendChild( headerBlock );
     questionsDiv.appendChild( questionContainer );
     questionsDiv.appendChild( controlsContainer );
     questionsDiv.appendChild( settingsDiv );
 
     container.appendChild( questionsDiv )
     
         // get refreshed data
    getQuestions()
         // post question
     for ( var i = 0; i < questions.length; i ++ ) {
             // generate li items for appending to ul
         var  li = document.createElement('li')
         li.setAttribute( 'class', 'list-item ')
         var questionI = questions[i].question;
         var idHolder = document.createElement( 'i' );
         var id = i + 1
         idHolder.textContent = id
         var questionHolder= document.createElement( 'div' );
         questionHolder.setAttribute( 'class', 'question-entry' )
         questionHolder.textContent = `  ${questionI}`  
         var deleteHolder = document.createElement( 'div' );
         deleteHolder.setAttribute( 'class', 'delete' );
         deleteHolder.textContent = 'X'
         li.appendChild( idHolder )
         li.appendChild( questionHolder )
         li.appendChild( deleteHolder )
         questionUl.appendChild(li)
     }

     
        // listen to add button to open modal
     $('#add-button').click( function() {
        modalQuestion()
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


        // Listen for settings enter
    $('#settings-div').on('click', 'div', function() {
        var value = $(this.children)
            .closest('span')
            .text()
            .trim();
        var text = $(this.children)
            .closest('p')
            .text()            
            .trim();
        var attr = $(this)
            .attr( 'id' );
          
        var textInput = $( '<textarea>' )
            .addClass( 'setting-entry' )
            .attr( 'id', attr )
            .attr( 'data-text', text )
            .attr( 'maxlength', 3 )
            .attr( 'rows', 1 )
            .val(value);
        $(this).replaceWith(textInput)
        textInput.trigger( 'focus' )        


    })  

        // Listen for setting changes
    $('#settings-div').on('blur', 'textarea', function() {
        // get the text area's current value/test
        var value = $(this)
          .val()
          .trim();

        if( !parseFloat( value ) > 0 ) {
            alert('Entry must be a number greater than 0')
            return
        }  
      
        // get the parent ul's id attribute
        var attr = $(this)
          .attr('id');
      
        // get the task's position in the list of other li elements
        var text = $(this)
          .attr( 'data-text')

          // recreate element
        var div = $( '<div>' )
          .addClass( 'setting-line' )
          .attr( 'id', attr );

        var span = $( '<span>' )
            .text( value );
        
        var p = $( '<p>' )
            .text( text );

        div
            .append(span)  
            .append(p)          
      
        // replace textarea with p element
        $(this).replaceWith(div)  

        settings[`${attr}`] = value

        storeSettings( settings )
        
      });

}

// Modal Operation --jQuery
function modalControl() {
        // modal
    var modal = document.getElementById("addNewModal");
        // display modal
    modal.style.display = "block";

    $('#question-new')
        .focus();

        // close on clicking span
    $('span').click( function() {
        modal.style.display = "none";
    })

        // close on click outside modal
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        $('.del').remove()
        }
    }
}

// Modal Content --jQuery
function modalQuestion() {
    var submitButton = $('<button>')
        .attr('id', 'add-submit' )
        .text( 'submit new question' );
    var submit = $( '<div>' )
        .addClass( 'form-line del' )
        .append( submitButton )

    var newAnswerButton = $('<button>')
        .attr('id', 'add-new-answer' )
        .text( 'add new wrong answer' );
    var addAnswer = $( '<div>' )
        .addClass( 'form-line small del' )
        .append( newAnswerButton )

    var questionLabel = $( '<label>' )
        .attr( 'for', 'question_new' )
        .text( 'Question:' );

    var questionInput = $( '<input>' )
        .attr( 'type', 'text' )
        .attr( 'id', 'question-new' )
        .attr( 'placeholder', 'New question' );

    var question = $( '<div>' )
        .addClass( 'form-line del' )
        .append( questionLabel )
        .append( questionInput );

    var answerCorrectLabel = $( '<label>' )
        .attr( 'for', 'answer_1' )
        .text( 'Correct Answer:' );

    var answerCorrectInput = $( '<input>' )
        .attr( 'type', 'text' )
        .attr( 'id', 'answer_1' )
        .attr( 'placeholder', 'Correct answer' )
        .attr( 'data-answer', 'true' )
        .addClass( 'correct-answer answer-entry' );

    var answerCorrect = $( '<div>' )
        .addClass( 'form-line del' )
        .append( answerCorrectLabel )
        .append( answerCorrectInput );

    var answerWrongLabel = $( '<label>' )
        .attr( 'for', 'answer_false' )
        .text( 'Wrong Answer:' );

    var answerWrongInput = $( '<input>' )
        .attr( 'type', 'text' )
        .attr( 'id', 'answer_false' )
        .attr( 'placeholder', 'Enter wrong answer' )
        .attr( 'data-answer', 'false' )
        .addClass( 'wrong-answer answer-entry' );

    var answerWrong = $( '<div>' )
        .addClass( 'form-line del' )
        .append( answerWrongLabel )
        .append( answerWrongInput );    

    $('.form-container')
        .append( submit )
        .append( addAnswer)
        .append( question )
        .append( answerCorrect )  
        .append( answerWrong ); 

    var label = $( '<i>' )
        .addClass( 'subtitle del' )
        .text( '** Answers will be shuffled while playing the quiz' )

    $('.modal-content')  
        .append( label )  

    var addSubmitButton = document.getElementById( 'add-submit' )
    addSubmitButton.addEventListener( "click", addNewEntry )

    $('#add-new-answer').click( function() {
        event.preventDefault()
        modalAnswers()
    })
}

// Modal Answers (dynamic) --jQuery
function modalAnswers() {
    
    var answerWrongLabel = $( '<label>' )
    .attr( 'for', 'answer_false' )
    .text( 'Wrong Answer:' );

    var answerWrongInput = $( '<input>' )
    .attr( 'type', 'text' )
    .attr( 'id', 'answer_false' )
    .attr( 'placeholder', 'Enter wrong answer' )
    .attr( 'data-answer', 'false' )
    .addClass( 'wrong-answer answer-entry' );

    var answerWrong = $( '<div>' )
        .addClass( 'form-line del' )
        .append( answerWrongLabel )
        .append( answerWrongInput );

    $('.form-container') 
        .append( answerWrong )
}

// Add new --jQuery
function addNewEntry(event) {
    event.preventDefault()
    
    var newQuestion = $('#question-new')
        .val()

    var isValid = false

    function validateForm() {
        isValid = true;
        $('.answer-entry').each(function() {
            if ( $(this).val() === '' || !newQuestion )
                isValid = false;
        });
        return isValid;
    }    
    validateForm()
    // check entries for data
    if( !isValid  ) {
        alert('Please fill in all fields')
        return
    }

    var current = questions.length
    questions[current] = { 
        'question': newQuestion,
        'answersObj': []
    }

    // push answers to current array
    $('.answer-entry').each( function( i, obj) {
        var a = questions[current].answersObj.length
        console.log(obj.value)
        questions[current].answersObj[a] = { 'answer': obj.value,       'value': obj.dataset['answer'] }
    })

        //store the new questions
    storeQuestions()
        //get the new questions
    getQuestions()

    var modal = document.getElementById("addNewModal");
    modal.style.display = "none";

    questionsPage()
    $('.del').remove()
}

// Pause Quiz  --JS
function pauseQuiz() {
        // default to true
    var response = true

    console.log(timeLeft)
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

// Question Game Playing List Page
function questionHTML() {
    getSettings()
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

// End Game Page  --jQuery
function endGameHTML() {
            // calculate score
    var score = timeLeft
        // set default message end
    var message = ', great job! Save your score.'  
    if( questions.length > questionID ) {
            // calculate remaining questions
        var remainder = questions.length - questionID
            // calculate score penalty per remainder
        score = timeLeft - ( remainder * 10 )
            // change message to explain penlaty
        message = `, time ran out with <strong> ${ questions.length - questionID } </strong> ${ ( remainder === 1 ) ? 'question' : 'questions' } left. Save your score!`
    }
   
    // end game section
        // title
    var scoreTitle = $( '<h1>' )
        .text( 'all done!' );
        // text
    var scorePara = $( '<span>' )
        .attr( 'id', 'score-span' )
        .html( `Your score is <strong id="score"> ${ score } </strong> ${ message } ` );
        // form
        
    var scoreLabel = $( '<label>' )
        .attr( 'for', 'initials' )
        .attr( 'id', 'label' )
        .text( 'Enter Initials: ' );
        
    var scoreInput = $( '<input>' )
        .attr( 'type', 'text' )
        .attr( 'placeholder', 'Initials' )
        .attr( 'id', 'input' );

    var scoreButton = $( '<button>' )
        .attr( 'type', 'submit' )
        .attr( 'id', 'submit-button' )
        .text( 'submit' );

    var scoreButtonDiv = $( '<div>' )
        .append( scoreButton );
        
    var scoreForm = $( '<form>' )
        .attr( 'id', 'submit' )
        .attr( 'autocomplete', 'off' )
        .append( scoreLabel )
        .append( scoreInput )
        .append( scoreButtonDiv );

    var scoreDiv = $( '<div>' )
        .attr( 'id', 'question' )
        .addClass( 'block' )
        .append( scoreTitle )
        .append( scorePara )
        .append( scoreForm )

    $('#container')
        .html( "" )
        .append(scoreDiv)

    $('#timer')
        .html( "" )    

        // focus keyboard to entry field
    $('input')
        .focus()
   
        // listen to submit button to go to high score page
    $('form').submit( function() {
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

// High Scores Page --jQuery
function highScoreHTML() {
        // title
    var scoresTitle = $( '<h1>' )
        .text( 'high scores!' );
    
        // list container
    var scoreUl = $( '<ul>' )
        .attr( 'id', 'scores');
          
    var scoreContainer = $( '<div>' )
        .attr( 'id', 'score-list' )
        .append( scoreUl );

        // controls      
    var backButton = $( '<button>' )
        .attr( 'id', 'back-button' )
        .text( 'go back' );

    var backButtonDiv = $( '<div>' )
        .append( backButton );

    var clearButton = $( '<button>' )
        .attr( 'id', 'clear-button' )
        .text( 'clear high scores' );

    var clearButtonDiv = $( '<div>' )
        .append( clearButton );

    var controlsConatiner = $( '<div>' )
        .attr( 'id', 'controls' )
        .append( backButtonDiv )
        .append( clearButtonDiv );

    var scoresDiv = $( '<div>' )
        .attr( 'id', 'scores-container' )
        .addClass( 'block' )
        .append( scoresTitle )  
        .append( scoreContainer )
        .append( controlsConatiner );

    $('#timer')
        .html( "" );

    $('#container')
        .html( "" )
        .append( scoresDiv );
    
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
        var li = $( '<li>' )
            .html( `<div>${i + 1}:   ${highScores[i].initials.toUpperCase()}    (  ${highScores[i].score}   )</div>  <small>${result}</small>` )

        $('#scores')
            .append( li )
    }

        // listen to back button to return to start page
    $('#back-button').click( function() {
        event.preventDefault();
        startHTMl();
    })    
   
        // listen to clear button to clear the high scores
    $('#clear-button').click( function() {
        event.preventDefault();
        clearScores();
        highScoreHTML();
    })    
}

// Timer function   --JS
function timerStart() {
    perTime = settings['setting-time-per'] ? settings['setting-time-per'] : 8;
    // set timer value based on the number of questions
    timeLeft = questions.length * perTime;
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

// Penalize Time  --jQuery
function penalize() {
    timeLeft = timeLeft - penaltyTime

    var penalty = $( '<div>' )
        .addClass( 'penalty' )
        .text( `- ${penaltyTime}s` );
    $('#timer')
        .append( penalty )
}

// Bonus Time  --jQuery
function bonus() {
    timeLeft = timeLeft + bonusTime

    var bonus = $( '<div>' )
        .addClass( 'bonus' )
        .text( `- ${bonusTime}s` );
    $('#timer')
        .append( bonus )
}

// Init Quiz  --JS
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

// Iterate through quiz questions  --jQuery
function iterateQuiz() {
        // iterate question counter
    questionID = questionID + 1 
        // if questions remain, run quiz on next item
    if ( questions.length - 1 >= questionID ) {
            //shuffle answer order of current question
        shuffle(questions[questionID].answersObj)
            // generate HTML and display random question
        questionEl.textContent = questions[questionID].question

            // clear OL
        $('ol')
            .html( "" )

            // loop in shuffled answer
        for ( var i = 0; i < questions[questionID].answersObj.length; i++ ) {
                // create new li and append
            var li = $( '<li>' )
                .text( questions[questionID].answersObj[i].answer )
                .attr( 'data-response', questions[questionID].answersObj[i].value )
            $('ol')
                .append( li )
        }
    } else {
            // change to end game page
        endGameHTML()
            // stop timer
        clearInterval(timeInterval)
    } 
}

// Shuffle Arrays  --JS
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

// Store user data  --JS
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

// get stored user data  --JS
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

// Store user data  --JS
function storeSettings( e ) {

    var stringEntry = JSON.stringify( settings )
    // set to local storage
    localStorage.setItem('quiz-stored-settings', stringEntry)
}

// get settings  --JS
function getSettings() {
    // declare as empty array
    settings = {}
        // get local storage string
    var getStorage = localStorage.getItem('quiz-stored-settings')
        // if string is null, return empty array
    if ( !getStorage ) { 
        settings['setting-time-per'] = 8;
        settings['setting-time-penalty'] = 8;
        settings['setting-time-bonus'] = 8;
    } else {
        // parse string and set settings
        settings = JSON.parse( getStorage )
    }
    perTime = parseFloat( settings[`setting-time-per`] )
    penaltyTime = parseFloat( settings[`setting-time-penalty`] )
    bonusTime = parseFloat( settings[`setting-time-bonus`] )
        // return
    return settings
}

// sort user data  --JS
function sortData() {
    highScores.sort( ( a, b ) => b.score-a.score )
    // stack overflow: https://stackoverflow.com/questions/54623130/javascript-sort-an-array-of-objects-by-a-numeric-property-in-each-object/54623139
}

// clear high scores  --JS
function clearScores() {
        // empty local highscores array
    highScores = []
        // remove localStorage data
    localStorage.removeItem('stored-scores')
}

  // Listen for true / false clicks on answers
$('#container').click( function(e) {
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

