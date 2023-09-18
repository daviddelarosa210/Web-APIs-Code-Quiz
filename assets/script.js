var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var questionContainerElement = document.getElementById('question-container')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')
var score = document.getElementById("user-score")
var timeEl = document.querySelector(".timer")
var secondsLeft= 100;
let shuffledQuestions, currentQuestionIndex
var count = localStorage.getItem("count")
var welcome= document.querySelector(".welcome")



startButton.addEventListener('click', startGame,)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
welcome.classList.add("hide")
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
  setTime()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    var button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerHTML = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

var questions = [
  {
    question: "What is a string?",
    answers: [
      { text: 'A. stores a series of characters', correct: true },
      { text: 'B. The name of a band', correct: false },
      { text: 'C. None of the above', correct: false }
    ]
  },
  {
    question: 'what is a Boolean?',
    answers: [
      { text: 'A. Something spooky', correct: false },
      { text: 'B. stores a series of characters', correct: false },
      { text: 'C. a value that can either be TRUE or FALSE', correct: true },
    ]
  },
  {
    question: 'What is JavaScript?',
    answers: [
      { text: 'A. What Minecraft was built on', correct: false },
      { text: 'B.something to do with coffee', correct: false },
      { text: 'C. a scripting or programming language that allows you to implement complex features on web pages', correct: true },
     
    ]
  },

]

function setTime() {

    var timerInterval = setInterval(function() {
      secondsLeft--;
      timeEl.textContent = secondsLeft + " seconds left";
  
      if(secondsLeft === 0) {
        

        clearInterval(timerInterval);
    
        sendMessage();
      }
  
    }, 1000);
  }
  
 
  function sendMessage() {
    timeEl.textContent = " ";
    var imgEl = document.createElement("img");
    imgEl.setAttribute("src", "images/image_1.jpg");
    mainEl.appendChild(imgEl);
  
  }
