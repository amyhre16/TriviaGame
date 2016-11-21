$(document).ready(function() {
   //  create vars
    var correct = 0;
    var wrong = 0;
    var unanswered = 0;
    var result;
    var timeLeft = 15;
    var time;
    var last = false;
    var texasFight = new Audio('assets/sounds/texasFight.m4a');
    var eyesOfTexas = new Audio('assets/sounds/the-eyes-of-texas.m4a');

    /*
        starts the game
        if pauses the eyes of texas sound, starts texas fight from the beginning
        resets variables
        hides the final results, starts the timer and shows the first question
    */
    function startGame() {
        eyesOfTexas.pause();
        texasFight = new Audio('assets/sounds/texasFight.m4a');
        texasFight.play();
        correct = 0;
        wrong = 0;
        unanswered = 0;
        timeLeft = 15;
        time;
        last = false;
        $('#finalResults').hide();
        startTime();
        $('.current').show();
    }
    
    /*
        starts the timer
    */
    function startTime() {
    	timeLeft = 15;
    	time = setInterval(count, 1000);
    }

    function count() {
        // displays the time
    	$('#timeRemaining').html(timeLeft);
        /*
            if time has run out
                increment unanswered
                create the result message
                add the current class to the next question and remove it from last question and hide it (the one that the user ran out of time on)
                display the result message and clear the timer
        */
    	if (timeLeft == 0) {
            unanswered++;
            result = "<h2>Time's up!</h2><h4>The answer we were looking for was " + $('.current').children('.correct').text() + "</h4>";
            
            var currentQuestion = $('.current');
            currentQuestion.next('.question').addClass('current');
            currentQuestion.removeClass('current');
            currentQuestion.hide();

            displayCorrectAnswer();
    		clearInterval(time);
    	}
        /*
            if time has not run out, the decrement the timer
        */
    	else {
    		timeLeft--;
		}
    }



    /*
        function to display the question result
    */
    function displayCorrectAnswer() {
        $('#resultDisplay').show();
        $('.result').html(result);
        /*
            if this is not the last question
        */
        if (last == false) {
            /*
                if the next question is the last question, set last to true
            */
            if ($('.current').hasClass('last')) {
                last = true;
            }
            // display the next question after 5 seconds
            var nextQuestionTimer = setTimeout(nextQuestion, 5000);
        }
        // if this is the last question, then dispay the final results after 5 seconds
        else {
            var showFinalResults = setTimeout(displayFinalResults, 5000);
        }
    }

    function nextQuestion() {
        startTime();
        $('#resultDisplay').hide();
        $('.current').show();
    }

    function displayFinalResults() {
        $('#resultDisplay').hide();
        $('#finalResults').show();
        $('#numberCorrect').html(correct);
        $('#numberIncorrect').html(wrong);
        $('#numberUnanswered').html(unanswered);
        $('#question1').addClass('current');
        texasFight.pause();
        eyesOfTexas = new Audio('assets/sounds/the-eyes-of-texas.m4a');
        eyesOfTexas.play();
    }

    // event listener for when the user clicks on an answer
    $('.btn').on('click', function() {
        // page has just been refreshed/loaded and the user clicked start
        if ($(this).attr('id') == 'start') {
            /*
                hide/disable the start button
                display the timer and the first question
                start the timer and play Texas Fight
            */
            $(this).hide();
            $(this).prop('disabled', true);
            $('.time').show();
            $('.current').show();
            startTime();
            texasFight.play();
        }

        // game is over and the user clicked restart
        else if ($(this).attr('id') == 'restartGame') {
            startGame();
        }

        // user clicked an answer
        else {
            // remove current class from this question and hide it
            $(this).parent().removeClass('current');
            $(this).parent().hide();

            // add current class to the next question
            $(this).parent().next('.question').addClass('current');
            // show the correct answer div
            $('#resultDisplay').show();
            
            // if the answer chosen is correct, assign a header to the result variable and display it
            if ($(this).hasClass('correct')) {
                correct++;
                result = "<h2>Correct!</h2><img src='" + $(this).attr('data-gif') + "'>";
                displayCorrectAnswer();
            }
            // if the incorrect answer is chosen, assign a header to the result var and display it
            else {
                wrong++;
                result = "<h2>Incorrect!</h2><h4>The answer we were looking for was " + $(this).parent().children('.correct').text()
                    + "</h4><img src='" + $(this).parent().children('.correct').attr('data-gif') + "'>";
                displayCorrectAnswer();
            }

            // clear the timer
            clearInterval(time);
        }
    });

    /*
        adds an event listener to texasFight (which is an Audio object) to check for when the sound has ended.
        sets the current time to 0 and plays it
    */
    texasFight.addEventListener('ended', function() {        
        this.currentTime = 0;
        this.play();
    });

});