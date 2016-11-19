$(document).ready(function() {
	var correct = 0;
	var wrong = 0;
	var unanswered = 0;
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
    
    // startTime();

    function startTime() {
    	time = setInterval(count, 1000);
    }

    function count() {
    	$('#timeRemaining').html(timeLeft);
    	if (timeLeft < 0) {
    		reset();
    	}
    	else {
    		timeLeft--;
		}
    }

    function reset() {
    	clearInterval(time);
    	timeLeft = 10;
    	$('#timeRemaining').html(timeLeft);
    	// startTime();
    }

    $('.answer').on('click', function() {
    	// console.log($(this).parent().next('.question').attr('id'));
    	$(this).parent().hide();
    	$(this).parent().next('.question').show();
    	reset();
    });

    $('#start').on('click', function() {
    	$(this).hide();
    	$(this).prop('disabled', true);
    	$(this).next().show();
    	startTime();
    });
});