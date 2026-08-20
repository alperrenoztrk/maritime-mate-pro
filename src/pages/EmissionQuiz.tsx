import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, CheckCircle, XCircle, RotateCcw, Trophy } from "lucide-react";
import { toast } from "sonner";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What are the two main parameters used in CO₂ emission calculation?",
    options: [
      "Draft and trim values",
      "Fuel consumption and carbon factor (CF)",
      "Wind speed and wave height",
      "Engine speed and torque"
    ],
    correctAnswer: 1,
    explanation: "CO₂ = Fuel consumption (tonnes) × CF. Carbon factor varies depending on fuel type (HFO: 3.114, MGO: 3.206)."
  },
  {
    id: 2,
    question: "What is the global sulfur limit effective from 2020?",
    options: [
      "3.5% m/m",
      "1.0% m/m",
      "0.50% m/m",
      "0.10% m/m"
    ],
    correctAnswer: 2,
    explanation: "With the IMO 2020 rule, the global sulfur limit is determined as 0.50% m/m. 0.10% m/m is applied in ECA zones."
  },
  {
    id: 3,
    question: "Which rating system does CII (Carbon Intensity Indicator) use?",
    options: [
      "Numeric from 1 to 5",
      "Letter A to E",
      "Low-Medium-High",
      "Green-Yellow-Red"
    ],
    correctAnswer: 1,
    explanation: "CII uses letter ratings from A (best) to E (worst). Ships receiving D or E must submit a corrective action plan."
  },
  {
    id: 4,
    question: "What should be the minimum distance and depth for ballast water exchange (D-1 standard)?",
    options: [
      "50nm, 50m",
      "100nm, 100m",
      "200nm, 200m",
      "300nm, 300m"
    ],
    correctAnswer: 2,
    explanation: "According to the D-1 standard, ballast replacement must be done at least 200 nautical miles from land and at a depth of 200 meters."
  },
  {
    id: 5,
    question: "What is the discharge rule for plastic waste into the sea according to MARPOL Annex V?",
    options: [
      "Can be discharged after 12 nm from land",
      "Can be discharged after 25 nm from land",
      "It is completely prohibited",
      "Can be discharged if ground"
    ],
    correctAnswer: 2,
    explanation: "Discharge of plastic waste into the sea is PROHIBITED under all conditions and in all regions."
  },
  {
    id: 6,
    question: "In which regions is the Tier III standard for NOx emissions mandatory?",
    options: [
      "In all seas",
      "Only within territorial waters",
      "In NECA (NOx Emission Control Areas) regions",
      "Only in ports"
    ],
    correctAnswer: 2,
    explanation: "Tier III is mandatory in NECA regions (North America, Caribbean, etc.) for ships built after 2016."
  },
  {
    id: 7,
    question: "From what date is EEXI certification mandatory?",
    options: [
      "2020",
      "2021",
      "2023",
      "2025"
    ],
    correctAnswer: 2,
    explanation: "EEXI (Energy Efficiency Existing Ship Index) is mandatory for existing ships from 2023."
  },
  {
    id: 8,
    question: "What should be the maximum oil content for bilge water discharge?",
    options: [
      "5 ppm",
      "10ppm",
      "15ppm",
      "25ppm"
    ],
    correctAnswer: 2,
    explanation: "For bilge water discharge, the oil content must be less than 15 ppm and approved oil filtration equipment must be used."
  },
  {
    id: 9,
    question: "What is the carbon factor (CF) of LNG fuel?",
    options: [
      "3.114",
      "3.206",
      "2.750",
      "1.375"
    ],
    correctAnswer: 2,
    explanation: "CF for LNG = 2,750 tonnes CO₂/tonne fuel. This value is lower than HFO (3.114) and MGO (3.206)."
  },
  {
    id: 10,
    question: "For which ships is IMO DCS (Data Collection System) mandatory?",
    options: [
      "All ships",
      "Ships over 400 GT",
      "Ships over 5000 GT",
      "Tankers only"
    ],
    correctAnswer: 2,
    explanation: "IMO DCS is mandatory for ships of 5000 GT and above operating international voyages."
  }
];

export default function EmissionQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    if (answered) return;
    
    setSelectedAnswer(answerIndex);
    setAnswered(true);

    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      toast.success("TRUE!");
    } else {
      toast.error("Wrong!");
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswered(false);
  };

  const question = questions[currentQuestion];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-green-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12">

        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl mb-4">
            <Leaf className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent mb-3">
            Environment Quiz
          </h1>
        </div>

        {!showResult ? (
          <Card className="border-border/60 bg-card/85 animate-fade-in">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Question {currentQuestion + 1}/{questions.length}</CardTitle>
                <span className="text-sm text-muted-foreground">Score: {score}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <div 
                  className="bg-emerald-500 h-2 rounded-full transition-[background-color,color,border-color,box-shadow,opacity,transform,width]"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-foreground font-medium text-lg">{question.question}</p>

              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={answered}
                    className={`w-full p-4 rounded-xl text-left transition-[background-color,color,border-color,box-shadow,opacity,transform,width] ${
                      answered
                        ? index === question.correctAnswer
                          ? "bg-emerald-100 dark:bg-emerald-900/30 border-2 border-emerald-500"
                          : index === selectedAnswer
                          ? "bg-red-100 dark:bg-red-900/30 border-2 border-red-500"
                          : "bg-muted/50 border border-border"
                        : "bg-muted/50 border border-border hover:bg-muted hover:border-emerald-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {answered && index === question.correctAnswer && (
                        <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                      )}
                      {answered && index === selectedAnswer && index !== question.correctAnswer && (
                        <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                      )}
                      <span className="text-foreground">{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              {answered && (
                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>Description:</strong> {question.explanation}
                  </p>
                </div>
              )}

              {answered && (
                <Button 
                  onClick={nextQuestion}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                >
                  {currentQuestion < questions.length - 1 ? "Next Question" : "See Result"}
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card className="border-border/60 bg-card/85 animate-fade-in text-center">
            <CardContent className="pt-8 pb-8 space-y-6">
              <Trophy className="h-16 w-16 mx-auto text-amber-500" />
              <div>
                <h2 className="text-2xl font-bold text-foreground">Quiz Completed!</h2>
                <p className="text-muted-foreground mt-2">
                  {questions.length} sorudan {score} you answered one correctly
                </p>
              </div>

              <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                %{Math.round((score / questions.length) * 100)}
              </div>

              <p className="text-sm text-muted-foreground">
                {score >= 8 ? "Perfect! You are an expert on the environment." :
                 score >= 6 ? "Good morning my baby! With a little more work you can become perfect." :
                 "It is recommended that you study more."}
              </p>

              <Button 
                onClick={restartQuiz}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
