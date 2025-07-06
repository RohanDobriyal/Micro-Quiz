'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, ArrowLeft, Trophy, Clock, RotateCcw } from 'lucide-react';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizDetail {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: QuizQuestion[];
}

interface QuizState {
  currentQuestion: number;
  selectedAnswer: number | null;
  showFeedback: boolean;
  userAnswers: (number | null)[];
  score: number;
  isCompleted: boolean;
  timeStarted: number;
  timeEnded: number | null;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'easy': return 'bg-green-100 text-green-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'hard': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'history': return '🏛️';
    case 'science': return '🔬';
    case 'math': return '🧮';
    case 'programming': return '💻';
    default: return '📚';
  }
};

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = params.id as string;
  
  const [quiz, setQuiz] = useState<QuizDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    selectedAnswer: null,
    showFeedback: false,
    userAnswers: [],
    score: 0,
    isCompleted: false,
    timeStarted: Date.now(),
    timeEnded: null
  });

  // Fetch quiz data on component mount
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`/api/quiz/${quizId}`);
        if (!response.ok) {
          throw new Error('Quiz not found');
        }
        const quizData = await response.json();
        setQuiz(quizData);
        setQuizState(prev => ({ 
          ...prev, 
          userAnswers: new Array(quizData.questions.length).fill(null) 
        }));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load quiz');
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (quizState.showFeedback) return;
    
    setQuizState(prev => ({
      ...prev,
      selectedAnswer: answerIndex
    }));
  };

  const handleSubmitAnswer = () => {
    if (quizState.selectedAnswer === null || !quiz) return;
    
    const currentQuestion = quiz.questions[quizState.currentQuestion];
    const isCorrect = quizState.selectedAnswer === currentQuestion.correctAnswer;
    
    setQuizState(prev => {
      const newUserAnswers = [...prev.userAnswers];
      newUserAnswers[prev.currentQuestion] = prev.selectedAnswer;
      
      return {
        ...prev,
        userAnswers: newUserAnswers,
        score: isCorrect ? prev.score + 1 : prev.score,
        showFeedback: true
      };
    });
  };

  const handleNextQuestion = () => {
    if (!quiz) return;
    
    if (quizState.currentQuestion + 1 >= quiz.questions.length) {
      // Quiz completed
      setQuizState(prev => ({
        ...prev,
        isCompleted: true,
        timeEnded: Date.now()
      }));
    } else {
      // Move to next question
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        selectedAnswer: null,
        showFeedback: false
      }));
    }
  };

  const handleRestartQuiz = () => {
    setQuizState({
      currentQuestion: 0,
      selectedAnswer: null,
      showFeedback: false,
      userAnswers: quiz ? new Array(quiz.questions.length).fill(null) : [],
      score: 0,
      isCompleted: false,
      timeStarted: Date.now(),
      timeEnded: null
    });
  };

  const getScoreMessage = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return "Excellent! You're a master of this topic!";
    if (percentage >= 70) return "Great job! You have a solid understanding.";
    if (percentage >= 50) return "Good effort! Keep practicing to improve.";
    return "Keep learning! Practice makes perfect.";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Not Found</h2>
          <p className="text-gray-600 mb-4">{error || 'The quiz you\'re looking for doesn\'t exist.'}</p>
          <Button onClick={() => router.push('/')} className="bg-blue-600 hover:bg-blue-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[quizState.currentQuestion];
  const progress = ((quizState.currentQuestion + 1) / quiz.questions.length) * 100;
  const timeTaken = quizState.timeEnded ? 
    Math.round((quizState.timeEnded - quizState.timeStarted) / 1000) : 
    Math.round((Date.now() - quizState.timeStarted) / 1000);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => router.push(`/quizzes/${quiz.category}`)}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to {quiz.category}</span>
            </Button>
            <div className="flex items-center space-x-3">
              <div className="text-xl">{getCategoryIcon(quiz.category)}</div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">{quiz.title}</h1>
                <div className="flex items-center space-x-2">
                  <Badge className={getDifficultyColor(quiz.difficulty)}>
                    {quiz.difficulty}
                  </Badge>
                  <span className="text-sm text-gray-600">
                    {quiz.questions.length} questions
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!quizState.isCompleted ? (
          <>
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Question {quizState.currentQuestion + 1} of {quiz.questions.length}
                </span>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{Math.floor(timeTaken / 60)}:{(timeTaken % 60).toString().padStart(2, '0')}</span>
                </div>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Question Card */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">
                  {currentQuestion.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={quizState.showFeedback}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                        quizState.selectedAnswer === index
                          ? quizState.showFeedback
                            ? index === currentQuestion.correctAnswer
                              ? 'border-green-500 bg-green-50'
                              : 'border-red-500 bg-red-50'
                            : 'border-blue-500 bg-blue-50'
                          : quizState.showFeedback && index === currentQuestion.correctAnswer
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      } ${quizState.showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {quizState.showFeedback && (
                          <>
                            {index === currentQuestion.correctAnswer && (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            )}
                            {quizState.selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                              <XCircle className="h-5 w-5 text-red-500" />
                            )}
                          </>
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Feedback */}
                {quizState.showFeedback && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start space-x-3">
                      {quizState.selectedAnswer === currentQuestion.correctAnswer ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      )}
                      <div>
                        <p className="font-medium text-gray-900 mb-1">
                          {quizState.selectedAnswer === currentQuestion.correctAnswer ? 'Correct!' : 'Incorrect'}
                        </p>
                        <p className="text-gray-600 text-sm">{currentQuestion.explanation}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end mt-6">
                  {!quizState.showFeedback ? (
                    <Button
                      onClick={handleSubmitAnswer}
                      disabled={quizState.selectedAnswer === null}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Submit Answer
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNextQuestion}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {quizState.currentQuestion + 1 >= quiz.questions.length ? 'Finish Quiz' : 'Next Question'}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          /* Quiz Completed */
          <div className="text-center">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Trophy className="h-16 w-16 text-yellow-500" />
                </div>
                <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
                <CardDescription>
                  {getScoreMessage(quizState.score, quiz.questions.length)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{quizState.score}/{quiz.questions.length}</div>
                    <div className="text-sm text-gray-600">Score</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">
                      {Math.round((quizState.score / quiz.questions.length) * 100)}%
                    </div>
                    <div className="text-sm text-gray-600">Accuracy</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">
                      {Math.floor(timeTaken / 60)}:{(timeTaken % 60).toString().padStart(2, '0')}
                    </div>
                    <div className="text-sm text-gray-600">Time</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={handleRestartQuiz}
                    variant="outline"
                    className="w-full"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Retake Quiz
                  </Button>
                  <Button
                    onClick={() => router.push(`/quizzes/${quiz.category}`)}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Try Another Quiz
                  </Button>
                  <Button
                    onClick={() => router.push('/')}
                    variant="ghost"
                    className="w-full"
                  >
                    Back to Home
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}