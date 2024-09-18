import React, { useState } from 'react';

const quizQuestions = [
  {
    question: 'What is the capital of France?',
    options: ['Paris', 'Berlin', 'Madrid', 'Rome'],
    answer: 'Paris',
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
    answer: 'Mars',
  },
  {
    question: 'Who wrote "Hamlet"?',
    options: ['Shakespeare', 'Hemingway', 'Tolkien', 'Dickens'],
    answer: 'Shakespeare',
  },
];

const Quiz = ({ onQuizComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === quizQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }
    setSelectedOption('');
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      onQuizComplete(score + (selectedOption === quizQuestions[currentQuestion].answer ? 1 : 0));
    }
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-lg w-1/2">
      <h2 className="text-xl font-bold mb-4">{quizQuestions[currentQuestion].question}</h2>
      <div>
        {quizQuestions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            className={`block w-full p-2 my-2 text-left rounded-lg ${
              selectedOption === option ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <button
        onClick={handleNextQuestion}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Next
      </button>
    </div>
  );
};

export default Quiz;
