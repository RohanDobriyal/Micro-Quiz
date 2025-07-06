import { NextResponse } from 'next/server';

export interface QuizCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  quizCount: number;
}

const categories: QuizCategory[] = [
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

export async function GET() {
  return NextResponse.json(categories);
}