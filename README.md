# User Generated Quiz

## Purpose
Functional quiz web application to ask multiple choice questions about anything!

## Build With
* HTML
* CSS FlexBox
* JavaScript
* jQuery
* jQuery UI

## Website
https://primalorb.github.io/open_quiz/

## Resources Referenced / Used
* An expansion of my project [code_quiz](https://primalorb.github.io/code_quiz/) allowing for more features:
  * Define your own questions / answers
  * Define your own time settings
    * Base time per question
    * Penalty time for getting an answer wrong to subtract from the countown, or remaining questions at the end to subtract from the final score
    * Bonus time for getting an answer correct to add to the countdown     
* Sorting arrays by object properties ( for displaying high score results )
  * https://stackoverflow.com/questions/54623130/javascript-sort-an-array-of-objects-by-a-numeric-property-in-each-object/54623139


## Application Flow
* Settings / Question Setup
  * Add new question button with modal popup to define new questions/answer objects. 
    *  The first answer entry is the "true" value
    *  Add additional wrong answers by pressing the add button
  * Questions are displayed in a list, and can be individually deleted
  * Time settings are individually controlled. Just click on the field to make it editable, and then click out to update the value

* Start Quiz
  * Question page is loaded  
    * Shuffle question array order
    * Iterate through questions (i++) until all questions are asked
      * Shuffle order of answers to display on page
        * Correct answer 
          * displays "correct"
          * iterates to next question
        * Incorrect answer 
          * penalizes the time counter
          * graphic of penalty generated and animated
          * display "wrong"
          * iterates to next question
  * Timer Starts

* End Quiz
  * Whichever occurs first
    * All questions are answered
      * Score is time remaining on the timer
    * Timer is run to zero (or below if due to penalty)
      * Score is the timer value ( can be negative due to penalties )
      * Additional negative score is factored by the number of questions not answers yet (penalty for each)

* Submit Score
  * Different text generated based on end quiz conditions ( remaining question / all completed questions )
  * Enter initials (or name, I do not have a limit on max length)
  * Initials are validated by requiring at least some sort of input
  * Object created of timestamp, initials, and score
  * Object pushed to array of scores on localStorage

* High Score Page
  * Array of scores pulled from localStorage
  * Array sorted to be score descending ( highest score first )
  * Page displays the scores (no limit) and decodes the timestamp into a date/time record
  * Go back button will return to the start quiz page
  * Clear high scores button
    * Removes array from localStorage
    * empties the current array in use

* Leaving active quiz
  * If clicking high score list while in active quiz
    * time is "paused" by iterating timer++ to offset the timer-- of the regular interval
    * user is asked to confirm they want to abort the quiz
      * if yes, timer interval is cleared, value set to zero, and proceed to high score page
      * if no, timer is resumed and the quiz continues as is
  



