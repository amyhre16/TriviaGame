
$(document).ready(function() {
   //  create vars
    var correct = 0;
    var wrong = 0;
    var unanswered = 0;
    var result;
    var timeLeft = 15;
    var time;
    var texasFight = new Audio('assets/sounds/texasFight.m4a');
    var eyesOfTexas = new Audio('assets/sounds/the-eyes-of-texas.m4a');
    var texasFight;
    var eyesOfTexas;
    var questionCounter = 0;
    var questionObjects = [
    	// #1 questionCounter = 0
		{
			question: $('<div class="question">').text("How many national championships have the Longhorns won?"),
			answers: [$("<div class='answer btn correct'>").text('Earl Campbell'),
				 $("<div class='answer btn'>").text("Vince Young"),
				 $("<div class='answer btn'>").text("Jamaal Charles"),
				 $("<div class='answer btn'>").text("Ricky Williams")
			],
			// path is assets/images/ + gif
			gif: "vy-dance.gif",
			correctAnswer: "Earl Campbell"
		},
		// #2 questionCounter = 1
		{
			question: $('<div class="question">').text("What Texas legend's record for most consecutive games with 100+ yards rushing did D'Onta Foreman recently break?"),
			answers: [$("<div class='answer btn correct'>").text(4),
				$("<div class='answer btn'>").text(6),
				$("<div class='answer btn'>").text(0),
				$("<div class='answer btn'>").text(1)
			],
			gif: "earl-campbell.gif",
			correctAnswer: 4
		},
		// #3 questionCounter = 2
		{
			question: $('<div class="question">').text("According to Lee Corso, on January 4, 2006, Texas \"shocked the entire universe\" when they upset USC in the BCS National Championship. What was the final score?"),
			answers: [$("<div class='answer btn correct'>").text("41 - 38"),
				$("<div class='answer btn'>").text("27 - 13"),
				$("<div class='answer btn'>").text("19-10"),
				$("<div class='answer btn'>").text("14-7")
			],
			gif: "vy-sweed.gif",
			correctAnswer: "41 - 38"
		},
		// #4 questionCounter = 3
		{
			question: $('<div class="question">').text("What Texas quarterback holds the school record for most completions in a single game?"),
			answers: [$("<div class='answer btn correct'>").text("Colt McCoy, 41 completions"),
				$("<div class='answer btn'>").text("Colt McCoy, 48 completions"),
				$("<div class='answer btn'>").text("Garret Gilbert, 34 completions"),
				$("<div class='answer btn'>").text("Shane Buechele, 31 completions")
			],
			gif: "colt-mccoy.jpg",
			correctAnswer: "Colt McCoy, 41 completions"
		},
		// #5 questionCounter = 4
		{
			question: $('<div class="question">').text("Jordan and Jaxon Shipley are two of the best receivers in Texas history. How many receiving yards did the brothers combine for in their careers?"),
			answers: [$("<div class='answer btn correct'>").text("5,701 yards"),
				$("<div class='answer btn'>").text("6,100 yards"),
				$("<div class='answer btn'>").text("5,500 yards"),
				$("<div class='answer btn'>").text("6,398 yards")
			],
			gif: "jaxon-shipley.gif",
			correctAnswer: "5,701 yards"
		},
		// #6 questionCounter = 5
		{
			question: $('<div class="question">').text("Who holds the recod for interceptions in a single season?"),
			answers: [$("<div class='answer btn correct'>").text("Earl Thomas, 8 interceptions"),
				$("<div class='answer btn'>").text("Blake Gideon, 9 interceptions"),
				$("<div class='answer btn'>").text("Jack Crain, 7 interceptions"),
				$("<div class='answer btn'>").text("Aaron Ross, 8 interceptions")
			],
			gif: "earl-thomas.jpg",
			correctAnswer: "Earl Thomas, 8 interceptions"
		},
		// #7 questionCounter = 6
		{
			question: $('<div class="question">').text("The Horns are currently third on the all-time wins list. How many wins do they have?"),
			answers: [$("<div class='answer btn correct'>").text("891 wins"),
				$("<div class='answer btn'>").text("896 wins"),
				$("<div class='answer btn'>").text("888 wins"),
				$("<div class='answer btn'>").text("903 wins")
			],
			gif: "daje-johnson.gif",
			correctAnswer: "891 wins"
		},
		// #8 questionCounter = 7
		{
			question: $('<div class="question">').text("What Texas placekicker made 121 consecutive extra points?"),
			answers: [$("<div class='answer btn correct'>").text("Dusty Mangum"),
				$("<div class='answer btn'>").text("Hunter Lawrence"),
				$("<div class='answer btn'>").text("Justin Tucker"),
				$("<div class='answer btn'>").text("Phil Dawson")
			],
			gif: "dusty-mangum.jpg",
			correctAnswer: "Dusty Mangum"
		},
		// #9 questionCounter = 8
		{
			question: $('<div class="question">').text("What is the largest win margin in team history?"),
			answers: [$("<div class='answer btn correct'>").text("92 - 0 vs Daniel Baker in 1915"),
				$("<div class='answer btn'>").text("70 - 3 vs Colorado in 2005"),
				$("<div class='answer btn'>").text("76 - 0 vs Colorado in 1946"),
				$("<div class='answer btn'>").text("81 - 16 vs TCU in 1974")
			],
			gif: "michaelgriffin.gif",
			correctAnswer: "92 - 0 vs Daniel Baker in 1915"
		},
		// #10 questionCounter = 9
		{
			question: $('<div class="question">').text("What is the most total offense Texas has gained in a single game?"),
			answers: [$("<div class='answer btn correct'>").text("715 yards vs New Mexico State in 2013"),
				$("<div class='answer btn'>").text("673 yards vs North Texas in 2004"),
				$("<div class='answer btn'>").text("645 yards vs Baylor in 2005"),
				$("<div class='answer btn'>").text("692 yards in Rice in 1998")
			],
			gif: "vince_osu.gif",
			correctAnswer: "715 yards vs New Mexico State in 2013"
		}
	];

    /*
        starts the game
        if pauses the eyes of texas sound, starts texas fight from the beginning
        resets variables
        hides the final results, starts the timer and shows the first question
    */
    function startGame() {
    	console.log("startGame() triggered");
        eyesOfTexas.pause();
        texasFight = new Audio('assets/sounds/texasFight.m4a');
        texasFight.play();
        correct = 0;
        wrong = 0;
        unanswered = 0;
        timeLeft = 15;
        time;
    	result;
    	questionCounter = 0;
    	texasFight = new Audio('assets/sounds/texasFight.m4a');
    	eyesOfTexas = new Audio('assets/sounds/the-eyes-of-texas.m4a');
        $('#finalResults').hide();
        $('.time').show();
        $('#holder').show();
        startTime();
        nextQuestion();
    }
    
    /*
        starts the timer
    */
    function startTime() {
    	console.log("startTime() triggered");
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
            result = "<h2>Time's up!</h2><h4>The answer we were looking for was " + questionObjects[questionCounter].correctAnswer + "</h4><img src='" + questionObjects[questionCounter].gif + "'>";

            displayCorrectAnswer();
    		clearInterval(time);
    	}
        /*
            if time has not run out, the decrement the timer
        */
    	else {
    		timeLeft--;
		}
    } // end of count()



    /*
        function to display the question result
    */
    function displayCorrectAnswer() {
    	$('#holder').empty();
        $('#holder').html(result);
        /*
            if this is not the last question
        */
        if (questionCounter < 9) {
            // display the next question after 5 seconds
            var nextQuestionTimer = setTimeout(nextQuestion, 5000);
        }
        // if this is the last question, then dispay the final results after 5 seconds
        else {
            var showFinalResults = setTimeout(displayFinalResults, 5000);
        }
        questionCounter++;
    } // end of displayCorrectAnswer()

    function nextQuestion() {
        startTime();
        $('#holder').empty();
        console.log("nextQuestion() triggered");
        /*
			want to randomize question order
			run function (might not need a function)
				- have an empty array that will store the indexes of random numbers drawn
				- run a while loop that runs while the length of the array is less than # of questions
				- append each random index to the question div
        */
        // create empty array to hold the random indexes
        var indexes = [];

        // append the current question to the holder div
        $('#holder').append(questionObjects[questionCounter].question);
        // while the length of the indexes array is less than 5 (the number of questions is 4), append the random answer to the question div
		while (indexes.length < 5) {
			// get a random index between 0 and 3 inclusive on both ends
			var index = Math.floor(Math.random() * 4);
			// if this index has yet to be appended, then append that answer and add that the index to the array
			if (indexes.indexOf(index) == -1) {
				$('.question').append(questionObjects[questionCounter].answers[index]);
				indexes.push(index);
			}
		}
    } // end of nextQuestion()

    function displayFinalResults() {
        $('#holder').empty();
        var correctAnswerElement = $("<p>");
        correctAnswerP.text("Correct Answers: " + correct);
        var incorrectAnswersElement = $("<p>");
        incorrectAnswersElement.text("Incorrect Answers: " + wrong);
        var unansweredQuestionsElement = $("<p>");
        unansweredQuestionsElement.text("Unanswered Questions: " + unanswered);
        var restartGameBtn = $("<div class='btn'>");
        restartGameBtn.text("Restart Game?");
        $('#holder').append(correctAnswerElement)
        	.append(incorrectAnswersElement)
        	.append(unansweredQuestionsElement)
        	.append(restartGameBtn);
        texasFight.pause();
        eyesOfTexas = new Audio('assets/sounds/the-eyes-of-texas.m4a');
        eyesOfTexas.play();
    } // end of displayFinalResults()

    // event listener for when the user clicks on an answer
    $(document).on('click', '.btn', function() {
        // page has just been refreshed/loaded for the first time and the user clicked start
        if ($(this).attr('id') == 'start') {
            /*
                hide/disable the start button
                display the timer and the first question
                start the timer and play Texas Fight
            */
            $(this).hide();
            console.log($(this).text());
            $(this).prop('disabled', true);
            startGame();
        	console.log("Start button clicked");
            /*$('.time').show();
            $('#holder').show();
            // startTime();
            nextQuestion();
            texasFight.play();*/
        }

        // game is over and the user clicked restart
        else if ($(this).attr('id') == 'restartGame') {
        	console.log("restart game button clicked");
            startGame();
        }

        // user clicked an answer
        else {
        	console.log("answer has been clicked");
            // if the answer chosen is correct, assign a header to the result variable and display it
            if ($(this).hasClass('correct')) {
                correct++;
                result = "<h2>Correct!</h2><img src='" + questionObjects[questionCounter].gif + "'>";
                displayCorrectAnswer();
            }
            // if the incorrect answer is chosen, assign a header to the result var and display it
            else {
                wrong++;
                result = "<h2>Incorrect!</h2><h4>The answer we were looking for was " + questionObjects[questionCounter].correctAnswer + "</h4><img src='" + questionObjects[questionCounter].gif + "'>";
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