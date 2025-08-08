
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const words = [
  { word: "Bonjour", meaning: "Hello", audio: "/bonjour.mp3" },
  { word: "Merci", meaning: "Thank you", audio: "/merci.mp3" },
  { word: "Pomme", meaning: "Apple", audio: "/pomme.mp3" },
];

const Page = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quizMode, setQuizMode] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [summaryPublished, setSummaryPublished] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [instagramConnected, setInstagramConnected] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'fr-FR';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.trim();
        const correct = transcript.toLowerCase() === words[currentIndex].word.toLowerCase();
        if (correct) {
          setScore(prev => prev + 1);
          alert(`Correct pronunciation: ${transcript}`);
        } else {
          alert(`You said: ${transcript}. Try again.`);
        }
        setIsListening(false);
      };

      recognition.onerror = () => {
        alert("Speech recognition failed. Please try again.");
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      alert("Speech recognition not supported on this browser.");
    }
  }, []);

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setQuizMode(true);
    }
  };

  const handleQuizSubmit = () => {
    const correct = userAnswer.trim().toLowerCase() === words[currentIndex].word.toLowerCase();
    if (correct) setScore(score + 1);
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserAnswer("");
    } else {
      publishSummary();
    }
  };

  const handleListen = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const connectInstagram = () => {
    alert("Connected to Instagram account successfully.");
    setInstagramConnected(true);
  };

  const publishToInstagram = () => {
    if (!instagramConnected) {
      alert("Please connect your Instagram account first.");
      return;
    }
    const message = `📚 Lex French Learning Report\nScore: ${score}/${words.length}\n#LearnFrench #DailyFrench #LexLearns`;
    console.log("Posting to Instagram:", message);
    setSummaryPublished(true);
  };

  const publishSummary = () => {
    console.log("Summary ready for Instagram publishing.");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">🇫🇷 Learn French with Lex</h1>
      {!instagramConnected && (
        <div className="text-center mb-6">
          <Button onClick={connectInstagram}>📲 Connect Instagram</Button>
        </div>
      )}

      {!quizMode ? (
        <Card className="mb-6 shadow-xl">
          <CardContent className="space-y-4">
            <p className="text-xl"><strong>Word:</strong> {words[currentIndex].word}</p>
            <p className="text-lg text-gray-700"><strong>Meaning:</strong> {words[currentIndex].meaning}</p>
            <div className="flex space-x-4">
              <Button onClick={() => alert(`Playing audio: ${words[currentIndex].audio}`)}>🔊 Play</Button>
              <Button variant="secondary" onClick={handleListen} disabled={isListening}>
                🎤 {isListening ? "Listening..." : "Pronounce"}
              </Button>
              <Button className="ml-auto" onClick={handleNext}>Next ➡️</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="mb-6 shadow-xl">
          <CardContent className="space-y-4">
            <p className="text-xl"><strong>Quiz:</strong> What is the French word for "{words[currentIndex].meaning}"?</p>
            <Input value={userAnswer} onChange={e => setUserAnswer(e.target.value)} placeholder="Type your answer" />
            <Button className="mt-2 w-full" onClick={handleQuizSubmit}>✅ Submit</Button>
            <Button className="w-full" onClick={handleListen} disabled={isListening}>
              🎙️ {isListening ? "Listening..." : "Pronounce it"}
            </Button>
            <Button className="w-full" onClick={publishToInstagram} disabled={!instagramConnected}>
              📸 Share Summary to Instagram
            </Button>
            {summaryPublished && <p className="mt-4 text-green-600 font-semibold text-center">✅ Summary shared to Instagram!</p>}
          </CardContent>
        </Card>
      )}
      <p className="text-center font-semibold">Score: {score} / {words.length}</p>
    </div>
  );
};

export default Page;
