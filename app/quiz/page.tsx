"use client";

import { useState } from "react";
import thermodynamics from "./data/thermodynamics.json";
import boilers from "./data/boilers.json";
import electrical from "./data/electrical.json";

// Define the shape of a question
type Question = {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
};

// Define allowed topic keys
type TopicKey = "Thermodynamics" | "Boilers" | "Electrical";

// Map topics to their questions
const topics: Record<TopicKey, Question[]> = {
  Thermodynamics: thermodynamics,
  Boilers: boilers,
  Electrical: electrical,
};

export default function QuizPage() {
  const [selectedTopic, setSelectedTopic] = useState<TopicKey | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const startQuiz = (topic: TopicKey) => {
    setSelectedTopic(topic);
    setQuestions(topics[topic]);
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setShowAnswer(false);
  };

  const handleAnswer = (option: string) => {
    setSelected(option);
    setShowAnswer(true);

    if (option === questions[current].answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setSelected(null);
    setShowAnswer(false);

    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
    } else {
      alert(`Final Score: ${score}/${questions.length}`);
      setSelectedTopic(null);
    }
  };

  if (!selectedTopic) {
    return (
      <main className="p-10">
        <h1 className="text-2xl font-bold mb-6">Choose a topic to study</h1>
        {Object.keys(topics).map((topic) => (
          <button
            key={topic}
            onClick={() => startQuiz(topic as TopicKey)}
            className="block mb-2 px-4 py-2 bg-black text-white rounded"
          >
            {topic}
          </button>
        ))}
      </main>
    );
  }

  const q = questions[current];

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">{selectedTopic} Quiz</h1>

      <div className="mt-6">
        <p className="mb-4">{q.question}</p>

        {q.options.map((option) => {
          let style = "block mb-2 p-2 border rounded";

          if (showAnswer) {
            if (option === q.answer) style += " bg-green-200";
            else if (option === selected) style += " bg-red-200";
          }

          return (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              disabled={showAnswer}
              className={style}
            >
              {option}
            </button>
          );
        })}

        {showAnswer && (
          <div className="mt-4">
            <p className="font-bold">
              {selected === q.answer ? "Correct!" : "Incorrect"}
            </p>
            <p className="mt-2">{q.explanation}</p>

            <button
              onClick={nextQuestion}
              className="mt-4 px-4 py-2 bg-black text-white rounded"
            >
              Next Question
            </button>
          </div>
        )}
      </div>
    </main>
  );
}