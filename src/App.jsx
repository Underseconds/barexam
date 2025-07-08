// bar_exam_quiz_site - Main App Setup

import React, { useState } from 'react';
import questions from './data/questions.json';
import QuizCard from './components/QuizCard';

export default function App() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const question = questions[current];

  const handleAnswer = (index) => {
    setSelected(index);
    setShowResult(true);
    if (index === question.answerIndex) {
      setCorrectCount(prev => prev + 1);
    } else {
      setIncorrectCount(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    setSelected(null);
    setShowResult(false);
    setCurrent((prev) => (prev + 1) % questions.length);
  };

  const resetQuiz = () => {
    setCorrectCount(0);
    setIncorrectCount(0);
    setCurrent(0);
    setSelected(null);
    setShowResult(false);
  };

  const totalAnswered = correctCount + incorrectCount;
  const scorePercentage = totalAnswered > 0 ? ((correctCount / totalAnswered) * 100).toFixed(1) : 0;

  return (
    <div className="min-h-screen p-6 bg-white text-black">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Elizabeth's Bar Exam Quiz</h1>
        <h2 className="text-lg font-semibold mb-4">{question.question}</h2>
        <QuizCard question={question} selected={selected} handleAnswer={handleAnswer} />

        {showResult && (
          <div className="mt-4 bg-gray-100 p-4 rounded">
            <p>{selected === question.answerIndex ? '✅ Correct!' : '❌ Incorrect.'}</p>
            <p className="mt-2 italic text-sm">{question.explanation}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={nextQuestion}
            >
              Next
            </button>
          </div>
        )}

        <div className="mt-6 text-sm text-gray-600">
          <p>✅ Correct: {correctCount}</p>
          <p>❌ Incorrect: {incorrectCount}</p>
          <p>📊 Total Answered: {totalAnswered}</p>
          <p>📈 Score: {scorePercentage}%</p>
        </div>

        <button
          onClick={resetQuiz}
          className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Restart Quiz
        </button>
      </div>
    </div>
  );
}
