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
    var randomQuestions = [];
    var currentQuestion;
    var questionObjects = [
        {
            question: $('<div class="question">').text("How many national championships have the Longhorns won?"),
            answers: [$("<div class='answer btn correct'>").text(4),
                 $("<div class='answer btn'>").text(6),
                 $("<div class='answer btn'>").text(0),
                 $("<div class='answer btn'>").text(1)
            ],
            // path is "assets/images/ + gif
            gif: "vy-dance.gif",
            correctAnswer: 4
        },
        {
            question: $('<div class="question">').text("What Texas legend's record for most consecutive games with 100+ yards rushing did D'Onta Foreman recently break?"),
            answers: [$("<div class='answer btn correct'>").text('Earl Campbell'),
                $("<div class='answer btn'>").text("Vince Young"),
                $("<div class='answer btn'>").text("Jamaal Charles"),
                $("<div class='answer btn'>").text("Ricky Williams")
            ],
            gif: "earl-campbell.gif",
            correctAnswer: "Earl Campbell"
        },
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
    ]; // end of questionObjects

    /*
        starts the game when the reset game button is clicked
        pauses the eyes of texas sound, starts texas fight from the beginning
        resets variables
        empties the holder div, shows the holder and time divs
        displays the first question
    */
    function startGame() {
        eyesOfTexas.pause();
        texasFight.currentTime = 0;
        texasFight.play();
        correct = 0;
        wrong = 0;
        unanswered = 0;
        timeLeft = 15;
        time;
        result;
        randomQuestions = [];
        currentQuestion;
        $('#holder').empty();
        $('#holder').show();
        $('.time').show();
        nextQuestion();
    } // end of startGame()
    
    /*
        starts the timer
    */
    function startTime() {
        timeLeft = 15;
        $('#timeRemaining').html(timeLeft);
        time = setInterval(count, 1000);
    }

    function count() {
        /*
            if time has run out (don't want to display when timeLeft is 0 b/c that gives them another second before it displays the result)
                increment unanswered
                create the result message
                display 0 for time remaining
                clear the timer and display the correct answer
        */
        if (timeLeft == 1) {
            unanswered++;
            result = "<h2>Time's up!</h2><h4>The answer we were looking for was " + questionObjects[currentQuestion].correctAnswer + "</h4><img src='assets/images/" + questionObjects[currentQuestion].gif + "'>";
            $('#timeRemaining').html(0);
            clearInterval(time);
            displayCorrectAnswer();
        }
        /*
            if time has not run out, the decrement/display the timer
        */
        else {
            timeLeft--;
            $('#timeRemaining').html(timeLeft);
        }

    } // end of count()

    function nextQuestion() {
        // empty out the holder div
        $('#holder').empty();

        /*
            in order to get a random question, we generate a random number
            if the number generated has already been generated, that means the user has already answered that question
                generate a number until we get a new number
        */
        currentQuestion = Math.floor(Math.random() * 10);
        while (randomQuestions.indexOf(currentQuestion) != -1) {
            currentQuestion = Math.floor(Math.random() * 10);
        }
        // add the number to the random questions array
        randomQuestions.push(currentQuestion);
        // append the current question to the holder div
        $('#holder').append(questionObjects[currentQuestion].question);

        // create empty array to hold the random indexes
        var indexes = [];
        // while the length of the indexes array is less than 4 (the number of answers is 4), append the random answer to the question div
        while (indexes.length < 4) {
            // get a random index between 0 and 3 inclusive on both ends
            var index = Math.floor(Math.random() * 4);
            // if this index has yet to be appended, then append that answer and add that the index to the array
            if (indexes.indexOf(index) == -1) {
                $('.question').append(questionObjects[currentQuestion].answers[index]);
                indexes.push(index);
            }
        } // end of while loop
        // start the timer 
        startTime();
    } // end of nextQuestion()

    /*
        function to display the question result
    */
    function displayCorrectAnswer() {
        $('#holder').empty();
        // display the question result
        $('#holder').html(result);
        
        // if this is not the last question, display the next question after 5 seconds
        if (randomQuestions.length < 10) {
            var nextQuestionTimer = setTimeout(nextQuestion, 5000);
        }

        // if this is the last question, then dispay the final results after 5 seconds
        else {
            var showFinalResults = setTimeout(displayFinalResults, 5000);
        }
    } // end of displayCorrectAnswer()


    function displayFinalResults() {
        $('#holder').empty();

        // create a div to hold the quiz results
        var finalResults = $("<div id='finalResults'>");

        // create p element to display the number of correct answers and append it to the final results div
        var correctAnswerElement = $("<p>");
        correctAnswerElement.text("Correct Answers: " + correct);
        finalResults.append(correctAnswerElement);

        // wrong answers
        var incorrectAnswersElement = $("<p>");
        incorrectAnswersElement.text("Incorrect Answers: " + wrong);
        finalResults.append(incorrectAnswersElement);
        
        // unanswered answers
        var unansweredQuestionsElement = $("<p>");
        unansweredQuestionsElement.text("Unanswered Questions: " + unanswered);
        finalResults.append(unansweredQuestionsElement);

        // button for the user to restart the game
        var restartGameBtn = $("<div class='btn' id='restartGame'>");
        restartGameBtn.text("Restart Game?");
        finalResults.append(restartGameBtn);

        // append the final results div to the holder div
        $('#holder').append(finalResults);

        // stop playing Texas fight and play The Eyes of Texas from the beginning
        texasFight.pause();
        eyesOfTexas.currentTime = 0;
        eyesOfTexas.play();
    } // end of displayFinalResults()

    // event listener for when the user clicks on an answer
    $(document).on('click', '.btn', function() {
        // page has just been refreshed/loaded for the first time and the user clicked start
        if ($(this).attr('id') == 'start') {
            /*
                hide/disable the start button
                display the time and holder divs
                generate the first question
                play Texas Fight
            */
            $(this).hide();
            $(this).prop('disabled', true);
            $('.time').show();
            $('#holder').show();
            nextQuestion();
            texasFight.play();
        } // end of start condition

        // game is over and the user clicked restart
        else if ($(this).attr('id') == 'restartGame') {
            startGame();
        } // end of restart game condition

        // user clicked an answer
        else {
            // if the answer chosen is correct, assign a header to the result variable and display it
            if ($(this).hasClass('correct')) {
                correct++;
                result = "<h2>Correct!</h2><img src='assets/images/" + questionObjects[currentQuestion].gif + "'>";
                displayCorrectAnswer();
            }
            
            // if the incorrect answer is chosen, assign a header to the result var and display it
            else {
                wrong++;
                result = "<h2>Incorrect!</h2><h4>The answer we were looking for was " + questionObjects[currentQuestion].correctAnswer + "</h4><img src='assets/images/" + questionObjects[currentQuestion].gif + "'>";
                displayCorrectAnswer();
            }

            // clear the timer
            clearInterval(time);
        } // end of else
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