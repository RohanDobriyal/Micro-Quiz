'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Search, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-16 w-16 text-yellow-500" />
          </div>
          <CardTitle className="text-2xl">Page Not Found</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="space-y-2">
            <Link href="/" className="block">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            
            <p className="text-sm text-gray-500">
              Or choose a category to explore our quizzes:
            </p>
            
            <div className="grid grid-cols-2 gap-2 text-sm">
              <Link href="/quizzes/history">
                <Button variant="outline" size="sm" className="w-full">
                  🏛️ History
                </Button>
              </Link>
              <Link href="/quizzes/science">
                <Button variant="outline" size="sm" className="w-full">
                  🔬 Science
                </Button>
              </Link>
              <Link href="/quizzes/math">
                <Button variant="outline" size="sm" className="w-full">
                  🧮 Math
                </Button>
              </Link>
              <Link href="/quizzes/programming">
                <Button variant="outline" size="sm" className="w-full">
                  💻 Programming
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}