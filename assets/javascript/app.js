$(document).ready(function() {
   //  create vars
    var correct = 0;
	var wrong = 0;
	var unanswered = 0;
    var result;
	var timeLeft = 15;
	var time;
    var last = false;

    function startGame() {
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
    
    // starts the timer
    function startTime() {
    	timeLeft = 15;
    	time = setInterval(count, 1000);
    }

    // increments and displays the remaining time
    function count() {
    	$('#timeRemaining').html(timeLeft);
    	if (timeLeft == 0) {
            unanswered++;
            result = "<h2>Time's up!</h2><h4>The answer we were looking for was " + $('.current').children('.correct').text() + "</h4>";
            var currentQuestion = $('.current');
            // console.log(currentQuestion.next('.question'));
            // var next = currentQuestion.next('.question');
            currentQuestion.next('.question').addClass('current');
            // nextQ.addClass('current');
            currentQuestion.removeClass('current');
            currentQuestion.hide();
            // $(this).parent().next().next('.question').show();

            // add current class to the next question
            displayCorrectAnswer();
    		reset();
    	}
    	else {
    		timeLeft--;
		}
    }

    // clears the time interval
    function reset() {
    	clearInterval(time);
    	// timeLeft = 10;
    	// $('#timeRemaining').html(timeLeft);
    	// startTime();
    }

    // function to display the question result
    function displayCorrectAnswer() {
        $('#resultDisplay').show();
        $('.result').html(result);
        if (last == false) {
            if ($('.current').hasClass('last')) {
                last = true;
            }
            console.log(last);
            var nextQuestionTimer = setTimeout(nextQuestion, 500);
        }
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
    }

    // event listener for the start button
    // $('#start').on('click', function() {
    //     $(this).hide();
    //     $(this).prop('disabled', true);
    //     $('.time').show();
    //     $('.current').show();
    //     startTime();
    // });

    // event listener for when the user clicks on an answer
    $('.btn').on('click', function() {
         // console.log($(this).parent().next('.question').attr('id'));
        if ($(this).attr('id') == 'start') {
            $(this).hide();
            $(this).prop('disabled', true);
            $('.time').show();
            $('.current').show();
            startTime();
        }

        else if ($(this).attr('id') == 'restartGame') {
            // do stuff
            startGame();
        }

        // remove the current class from this question and hide it
        else /*if ($(this).hasClass('answer'))*/ {
            $(this).parent().removeClass('current');
            $(this).parent().hide();
            // $(this).parent().next().next('.question').show();

            // add current class to the next question
            $(this).parent().next('.question').addClass('current');
            // show the correct answer div
            $('#resultDisplay').show();
            
            // if the answer chosen is correct, assign a header to the result variable and display it
            if ($(this).hasClass('correct')) {
                correct++;
                result = "<h2>Correct!</h2>";
                displayCorrectAnswer();
                console.log("Correct");
            }
            // if the incorrect answer is chosen, assign a header to the result var and display it
            else {
                wrong++;
                result = "<h2>Incorrect!</h2><h4>The answer we were looking for was " + $(this).parent().children('.correct').text() +"</h4>";
                displayCorrectAnswer();
                console.log("Wrong!");
            }

            // clear the timer
            clearInterval(time);
            // startTime();
            // reset();
        }
    });

    $()

});