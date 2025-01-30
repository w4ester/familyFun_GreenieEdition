import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle, Upload } from 'lucide-react';
import Papa from 'papaparse';

const EnvironmentalFeud = () => {
  const [score, setScore] = useState(0);
  const [strikes, setStrikes] = useState(0);
  const [revealedAnswers, setRevealedAnswers] = useState(new Set());
  const [currentRound, setCurrentRound] = useState(0);
  const [customRounds, setCustomRounds] = useState(null);
  
  const defaultRounds = [
    {
      question: "Name a type of Career Preparation activity from the WBL progression",
      answers: [
        { text: "Internships", points: 30 },
        { text: "Apprenticeships", points: 25 },
        { text: "School-based Enterprises", points: 20 },
        { text: "Career & Technical Education", points: 15 },
        { text: "Student Organizations", points: 12 },
        { text: "Simulated Work Learning", points: 10 },
        { text: "Job-seeking Training", points: 8 },
        { text: "Counseling", points: 5 }
      ]
    },
    {
      question: "Name one of the key criteria for IRC approval",
      answers: [
        { text: "Aligns with In-Demand Occupations", points: 35 },
        { text: "Validated by Industry", points: 25 },
        { text: "Assessment-Based", points: 20 },
        { text: "Standards-Driven", points: 15 },
        { text: "Attainable & Accessible", points: 12 },
        { text: "Portable", points: 10 },
        { text: "Provides Documented Outcomes", points: 8 },
        { text: "Stackable", points: 5 }
      ]
    },
    {
      question: "Name something included in Career Awareness activities",
      answers: [
        { text: "Interest Surveys", points: 30 },
        { text: "Classroom Career Activities", points: 25 },
        { text: "Employer Job Talks", points: 20 },
        { text: "Career Fairs", points: 15 },
        { text: "Workplace Tours", points: 12 },
        { text: "Job Shadows", points: 10 },
        { text: "Informational Interviews", points: 8 },
        { text: "Career Exploration Lessons", points: 5 }
      ]
    },
    {
      question: "What's required for Apprenticeship Maryland participation?",
      answers: [
        { text: "450 Hours Work Training", points: 30 },
        { text: "Age 16 or Older", points: 25 },
        { text: "Eligible Employer Supervision", points: 20 },
        { text: "One Year Related Instruction", points: 15 },
        { text: "High School Enrollment", points: 12 },
        { text: "STEM/Manufacturing Focus", points: 10 },
        { text: "Career Pathway Plan", points: 8 },
        { text: "Paid Position", points: 5 }
      ]
    }
  ];

  const rounds = customRounds || defaultRounds;

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const text = await file.text();
        Papa.parse(text, {
          complete: (results) => {
            const formattedRounds = results.data.reduce((acc, row, index) => {
              if (index === 0 || index % 9 === 0) {
                acc.push({
                  question: row[0],
                  answers: []
                });
              } else {
                const currentQuestion = acc[acc.length - 1];
                if (row[0] && row[1]) {
                  currentQuestion.answers.push({
                    text: row[0],
                    points: parseInt(row[1])
                  });
                }
              }
              return acc;
            }, []);
            setCustomRounds(formattedRounds);
            resetGame();
          }
        });
      } catch (error) {
        console.error('Error reading file:', error);
      }
    }
  };

  const playRevealSound = () => {
    const audio = new Audio('https://cdnjs.cloudflare.com/ajax/libs/sound-effects/1.0.0/reveal.mp3');
    audio.play().catch(e => console.log('Audio play failed', e));
  };

  const playStrikeSound = () => {
    const audio = new Audio('https://cdnjs.cloudflare.com/ajax/libs/sound-effects/1.0.0/strike.mp3');
    audio.play().catch(e => console.log('Audio play failed', e));
  };

  const revealAnswer = (index) => {
    if (!revealedAnswers.has(index)) {
      playRevealSound();
      setRevealedAnswers(new Set([...revealedAnswers, index]));
      setScore(score + rounds[currentRound].answers[index].points);
    }
  };

  const addStrike = () => {
    if (strikes < 3) {
      playStrikeSound();
      setStrikes(strikes + 1);
    }
  };

  const nextRound = () => {
    if (currentRound < rounds.length - 1) {
      setCurrentRound(currentRound + 1);
      setRevealedAnswers(new Set());
      setStrikes(0);
    }
  };

  const resetGame = () => {
    setCurrentRound(0);
    setScore(0);
    setStrikes(0);
    setRevealedAnswers(new Set());
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4 bg-gradient-to-b from-green-50 to-blue-50">
      {/* Upload Section */}
      <div className="w-full mb-4 p-4 border-2 border-dashed border-green-300 rounded-lg">
        <label className="flex flex-col items-center cursor-pointer">
          <Upload className="w-8 h-8 text-green-600" />
          <span className="mt-2 text-sm text-gray-600">Upload Custom Questions (CSV)</span>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Header */}
      <div className="w-full text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-green-800">Environmental Education Feud</h1>
        <h2 className="text-2xl mb-4 text-green-700">{rounds[currentRound].question}</h2>
        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl text-blue-700">Score: {score}</div>
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <XCircle
                key={i}
                size={32}
                className={i < strikes ? "text-red-500" : "text-gray-300"}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Answer Board */}
      <div className="grid grid-cols-2 gap-4 w-full mb-8">
        {rounds[currentRound].answers.map((answer, index) => (
          <Card
            key={index}
            className={`p-4 text-center cursor-pointer transform transition-all duration-700 ${
              revealedAnswers.has(index)
                ? "bg-green-600 text-white scale-105"
                : "bg-blue-700 text-transparent hover:bg-blue-600"
            }`}
            onClick={() => revealAnswer(index)}
          >
            <div className={`text-xl font-bold ${
              revealedAnswers.has(index) 
                ? "animate-fadeIn" 
                : ""
            }`}>
              {revealedAnswers.has(index) ? (
                <div className="flex justify-between items-center px-4">
                  <span className="w-8">{index + 1}.</span>
                  <span className="flex-grow text-left">{answer.text}</span>
                  <span className="w-16 text-right">{answer.points}</span>
                </div>
              ) : (
                <div className="w-full text-center">{index + 1}</div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        <Button 
          onClick={addStrike} 
          variant="destructive" 
          className="px-6 bg-red-500 hover:bg-red-600"
        >
          Strike
        </Button>
        <Button 
          onClick={nextRound} 
          className="px-6 bg-green-600 hover:bg-green-700"
        >
          Next Round
        </Button>
        <Button 
          onClick={resetGame} 
          variant="outline" 
          className="px-6 border-green-600 text-green-600 hover:bg-green-50"
        >
          Reset Game
        </Button>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default EnvironmentalFeud;