import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, ArrowLeft, Play, BarChart3 } from 'lucide-react';

interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questionCount: number;
  estimatedTime: number;
}

// This function runs on each request for Server-Side Rendering (SSR)
async function getQuizzes(category: string): Promise<Quiz[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  try {
    const response = await fetch(`${baseUrl}/api/quizzes/${category}`, {
      cache: 'no-store' // Ensure fresh data on each request for SSR
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return [];
      }
      throw new Error('Failed to fetch quizzes');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    return [];
  }
}

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = params;
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
  
  return {
    title: `${categoryName} Quizzes - Micro-Quiz Platform`,
    description: `Test your knowledge with our ${categoryName.toLowerCase()} quizzes. Challenge yourself with questions ranging from beginner to advanced levels.`,
    keywords: `${categoryName.toLowerCase()}, quiz, education, learning, test, knowledge`,
    openGraph: {
      title: `${categoryName} Quizzes - Micro-Quiz Platform`,
      description: `Test your knowledge with our ${categoryName.toLowerCase()} quizzes.`,
      type: 'website',
    },
  };
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

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;
  const quizzes = await getQuizzes(category);
  
  if (quizzes.length === 0) {
    notFound();
  }
  
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
  const categoryIcon = getCategoryIcon(category);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <ArrowLeft className="h-5 w-5" />
              <span className="text-sm font-medium text-gray-600">Back to Categories</span>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{categoryIcon}</div>
              <h1 className="text-2xl font-bold text-gray-900">{categoryName} Quizzes</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Category Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {categoryName} Knowledge Center
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Challenge yourself with our carefully curated {categoryName.toLowerCase()} quizzes. 
            Each quiz is designed to test different aspects of your knowledge and help you learn.
          </p>
        </div>

        {/* Quiz Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{quizzes.length}</div>
                <div className="text-sm text-gray-600">Available Quizzes</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {Math.round(quizzes.reduce((sum, quiz) => sum + quiz.estimatedTime, 0) / quizzes.length)}
                </div>
                <div className="text-sm text-gray-600">Avg. Time (mins)</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Play className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {quizzes.reduce((sum, quiz) => sum + quiz.questionCount, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Questions</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quizzes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <Card key={quiz.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                    {quiz.title}
                  </CardTitle>
                  <Badge className={getDifficultyColor(quiz.difficulty)}>
                    {quiz.difficulty}
                  </Badge>
                </div>
                <CardDescription className="text-sm line-clamp-2">
                  {quiz.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{quiz.estimatedTime} min</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BarChart3 className="h-4 w-4" />
                    <span>{quiz.questionCount} questions</span>
                  </div>
                </div>
                <Link href={`/quiz/${quiz.id}`} className="block">
                  <Button className="w-full group-hover:bg-blue-600 transition-colors">
                    Start Quiz
                    <Play className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}