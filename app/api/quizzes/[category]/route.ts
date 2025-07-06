import { NextResponse } from 'next/server';

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questionCount: number;
  estimatedTime: number;
}

const quizzes: Quiz[] = [
  // History quizzes
  {
    id: 'ancient-civilizations',
    title: 'Ancient Civilizations',
    description: 'Test your knowledge of ancient civilizations like Egypt, Greece, and Rome',
    category: 'history',
    difficulty: 'medium',
    questionCount: 10,
    estimatedTime: 8
  },
  {
    id: 'world-wars',
    title: 'World Wars',
    description: 'Questions about World War I and World War II',
    category: 'history',
    difficulty: 'hard',
    questionCount: 15,
    estimatedTime: 12
  },
  {
    id: 'american-revolution',
    title: 'American Revolution',
    description: 'Learn about the birth of the United States',
    category: 'history',
    difficulty: 'easy',
    questionCount: 8,
    estimatedTime: 6
  },
  // Science quizzes
  {
    id: 'physics-basics',
    title: 'Physics Basics',
    description: 'Fundamental concepts of physics',
    category: 'science',
    difficulty: 'medium',
    questionCount: 12,
    estimatedTime: 10
  },
  {
    id: 'chemistry-elements',
    title: 'Chemistry Elements',
    description: 'Test your knowledge of the periodic table',
    category: 'science',
    difficulty: 'hard',
    questionCount: 20,
    estimatedTime: 15
  },
  {
    id: 'biology-cells',
    title: 'Biology: Cells',
    description: 'Understanding cellular structure and function',
    category: 'science',
    difficulty: 'medium',
    questionCount: 10,
    estimatedTime: 8
  },
  {
    id: 'astronomy',
    title: 'Astronomy',
    description: 'Explore the cosmos and celestial bodies',
    category: 'science',
    difficulty: 'easy',
    questionCount: 8,
    estimatedTime: 6
  },
  // Math quizzes
  {
    id: 'algebra-basics',
    title: 'Algebra Basics',
    description: 'Fundamental algebraic concepts and equations',
    category: 'math',
    difficulty: 'easy',
    questionCount: 10,
    estimatedTime: 8
  },
  {
    id: 'calculus',
    title: 'Calculus',
    description: 'Derivatives, integrals, and limits',
    category: 'math',
    difficulty: 'hard',
    questionCount: 15,
    estimatedTime: 20
  },
  {
    id: 'geometry',
    title: 'Geometry',
    description: 'Shapes, angles, and spatial relationships',
    category: 'math',
    difficulty: 'medium',
    questionCount: 12,
    estimatedTime: 10
  },
  // Programming quizzes
  {
    id: 'javascript-basics',
    title: 'JavaScript Basics',
    description: 'Fundamental JavaScript concepts',
    category: 'programming',
    difficulty: 'easy',
    questionCount: 10,
    estimatedTime: 8
  },
  {
    id: 'react-fundamentals',
    title: 'React Fundamentals',
    description: 'Components, hooks, and state management',
    category: 'programming',
    difficulty: 'medium',
    questionCount: 12,
    estimatedTime: 10
  },
  {
    id: 'data-structures',
    title: 'Data Structures',
    description: 'Arrays, linked lists, trees, and graphs',
    category: 'programming',
    difficulty: 'hard',
    questionCount: 15,
    estimatedTime: 15
  },
  {
    id: 'algorithms',
    title: 'Algorithms',
    description: 'Sorting, searching, and optimization',
    category: 'programming',
    difficulty: 'hard',
    questionCount: 18,
    estimatedTime: 20
  },
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'HTML, CSS, and web technologies',
    category: 'programming',
    difficulty: 'medium',
    questionCount: 10,
    estimatedTime: 8
  }
];

export async function GET(
  request: Request,
  { params }: { params: { category: string } }
) {
  const { category } = params;
  const categoryQuizzes = quizzes.filter(quiz => quiz.category === category);
  
  if (categoryQuizzes.length === 0) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 });
  }
  
  return NextResponse.json(categoryQuizzes);
}