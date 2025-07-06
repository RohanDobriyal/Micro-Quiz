import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Trophy, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Micro-Quiz Platform - Test Your Knowledge',
  description: 'Challenge yourself with our collection of engaging quizzes across various topics including History, Science, Math, and Programming.',
  keywords: 'quiz, education, learning, test, knowledge, history, science, math, programming',
  openGraph: {
    title: 'Micro-Quiz Platform - Test Your Knowledge',
    description: 'Challenge yourself with our collection of engaging quizzes across various topics.',
    type: 'website',
  },
};

interface QuizCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  quizCount: number;
}

// This function runs at build time for Static Site Generation (SSG)
async function getCategories(): Promise<QuizCategory[]> {
  // In a real app, this would be an external API call
  // For demo purposes, we're calling our own API route
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  try {
    const response = await fetch(`${baseUrl}/api/categories`, {
      cache: 'force-cache' // Enable static generation
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    
    return await response.json();
  } catch (error) {
    // Fallback data for build time
    return [
      {
        id: 'history',
        name: 'History',
        description: 'Test your knowledge of historical events and figures',
        icon: '🏛️',
        quizCount: 3
      },
      {
        id: 'science',
        name: 'Science',
        description: 'Explore the wonders of scientific discoveries',
        icon: '🔬',
        quizCount: 4
      },
      {
        id: 'math',
        name: 'Math',
        description: 'Challenge yourself with mathematical problems',
        icon: '🧮',
        quizCount: 3
      },
      {
        id: 'programming',
        name: 'Programming',
        description: 'Test your coding knowledge and skills',
        icon: '💻',
        quizCount: 5
      }
    ];
  }
}

export default async function Home() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <BookOpen className="h-6 w-6" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Micro-Quiz Platform</h1>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>10K+ Users</span>
              </div>
              <div className="flex items-center space-x-1">
                <Trophy className="h-4 w-4" />
                <span>50+ Quizzes</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Test Your Knowledge
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Challenge yourself with our collection of engaging quizzes across various topics. 
            Learn, compete, and improve your knowledge in bite-sized sessions.
          </p>
          <div className="flex justify-center items-center space-x-6 text-gray-600">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>5-20 min quizzes</span>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5" />
              <span>Instant feedback</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>All skill levels</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Choose Your Category
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/quizzes/${category.id}`}
              className="group block"
            >
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-blue-300 cursor-pointer">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-2">{category.icon}</div>
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary" className="text-xs">
                      {category.quizCount} Quiz{category.quizCount !== 1 ? 'es' : ''}
                    </Badge>
                    <div className="text-sm text-gray-500 group-hover:text-blue-600 transition-colors">
                      Start Quiz →
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Why Choose Our Platform?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Quick & Engaging</h4>
              <p className="text-gray-600">
                Short, focused quizzes that respect your time while maximizing learning.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Instant Feedback</h4>
              <p className="text-gray-600">
                Get immediate explanations for answers to enhance your understanding.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">For Everyone</h4>
              <p className="text-gray-600">
                Quizzes designed for all skill levels, from beginners to experts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-blue-600 p-2 rounded-lg">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Micro-Quiz Platform</h3>
          </div>
          <p className="text-gray-400">
            © 2024 Micro-Quiz Platform. Built with Next.js and modern web technologies.
          </p>
        </div>
      </footer>
    </div>
  );
}