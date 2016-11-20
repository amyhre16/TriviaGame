$(document).ready(function() {
   //  create vars
    var correct = 0;
	var wrong = 0;
	var unanswered = 0;
    var result;
	var timeLeft = 10;
	var time;


    function timeDown() {
        $("#timeRemaining").html(timeLeft);
        time = setTimeout(timeDown, 1000);
	    if (timeLeft == 0) {
	    	console.log("done");
	    	clearTimeout(time);
	    	$('.question').hide();
	    	reset();
	    }
        timeLeft--;
    }
    
    // starts the timer
    function startTime() {
    	timeLeft = 10;
    	time = setInterval(count, 1000);
    }

    // increments and displays the remaining time
    function count() {
    	$('#timeRemaining').html(timeLeft);
    	if (timeLeft == 0) {
            result = "<h2>Time's up!</h2><h4>" + $('.current').children('.correct').text() + "</h4";
            var currentQuestion = $('.current');
            currentQuestion.removeClass('current');
            currentQuestion.hide();
            // $(this).parent().next().next('.question').show();

            // add current class to the next question
            currentQuestion.next('.question').addClass('current');
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

    // event listener for the start button
    $('#start').on('click', function() {
    	$(this).hide();
    	$(this).prop('disabled', true);
    	$(this).next().show();
    	startTime();
    });

    // function to display the question result
    function displayCorrectAnswer() {
        $('.result').html(result);

    }

    // event listener for when the user clicks on an answer
    $('.answer').on('click', function() {
         // console.log($(this).parent().next('.question').attr('id'));
        
        // remove the current class from this question and hide it
        $(this).parent().removeClass('current');
        $(this).parent().hide();
        // $(this).parent().next().next('.question').show();

        // add current class to the next question
        $(this).parent().next().next('.question').addClass('current');
        // show the correct answer div
        $('#resultDisplay').show();
        
        // if the answer chosen is correct, assign a header to the result variable and display it
        if ($(this).hasClass('correct')) {
            result = "<h2>Correct!</h2>";
            displayCorrectAnswer();
            console.log("Correct");
        }
        // if the incorrect answer is chosen, assign a header to the result var and display it
        else {
            result = "<h2>Incorrect!</h2><h4>The answer we were looking for was " + $(this).parent().next('.correct').text() +"</h4>";
            displayCorrectAnswer();
            console.log("Wrong!");
        }

        // clear the timer
        clearInterval(time);
        // startTime();
        // reset();
    });

});