import React from 'react';

export default function QuizCard({ question, selected, handleAnswer }) {
  return (
    <div className="space-y-2">
      {question.choices.map((choice, index) => (
        <button
          key={index}
          onClick={() => handleAnswer(index)}
          className={
            'w-full p-2 border rounded text-left ' +
            (selected !== null
              ? index === question.answerIndex
                ? 'bg-green-200'
                : index === selected
                ? 'bg-red-200'
                : ''
              : '')
          }
          disabled={selected !== null}
        >
          {choice}
        </button>
      ))}
    </div>
  );
}
