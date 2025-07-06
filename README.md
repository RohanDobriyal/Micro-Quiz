# Micro-Quiz Platform

A modern, responsive quiz application built with Next.js 13+ (App Router) that demonstrates advanced Next.js features including Static Site Generation (SSG), Server-Side Rendering (SSR), Dynamic Routing, and API Routes.

## Features

### Core Functionality
- **Interactive Quiz Taking**: Questions presented one at a time with immediate feedback
- **Multiple Categories**: History, Science, Math, and Programming quizzes
- **Real-time Scoring**: Instant feedback with explanations for each answer
- **Progress Tracking**: Visual progress indicators and completion statistics
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices

### Next.js Specific Features
- **Static Site Generation (SSG)**: Home page is pre-rendered at build time
- **Server-Side Rendering (SSR)**: Category pages are rendered on each request
- **Dynamic Routing**: Category pages (`/quizzes/[category]`) and quiz pages (`/quiz/[id]`)
- **API Routes**: RESTful endpoints for categories, quizzes, and quiz details
- **SEO Optimization**: Dynamic meta tags and Open Graph support
- **Image Optimization**: Uses `next/image` for optimized image loading

## Architecture

### File Structure
```
app/
├── api/
│   ├── categories/route.ts          # API route for quiz categories
│   ├── quizzes/[category]/route.ts  # API route for category quizzes
│   └── quiz/[id]/route.ts          # API route for individual quiz details
├── quizzes/[category]/page.tsx      # Dynamic category pages (SSR)
├── quiz/[id]/page.tsx              # Dynamic quiz pages (client-side)
├── layout.tsx                      # Root layout with SEO metadata
├── page.tsx                        # Home page (SSG)
├── not-found.tsx                   # 404 error page
└── globals.css                     # Global styles
```

### Data Flow
1. **Home Page**: Fetches categories at build time using SSG
2. **Category Pages**: Fetches quizzes for each category using SSR
3. **Quiz Pages**: Fetches quiz details client-side with real-time state management
4. **API Routes**: Serve mock data for all quiz content

## Technologies Used

- **Next.js 13+**: App Router, SSG, SSR, API Routes
- **React 18**: Functional components, hooks, state management
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Shadcn/UI**: Beautiful, accessible component library
- **Lucide React**: Modern icon library

## Next.js Requirements Implementation

### 1. Static Site Generation (SSG)
**Location**: `app/page.tsx`
- Home page is statically generated at build time
- Categories are fetched from API route during build
- Implements proper SEO metadata and caching strategies

### 2. Server-Side Rendering (SSR)
**Location**: `app/quizzes/[category]/page.tsx`
- Category pages are server-side rendered on each request
- Fresh quiz data is fetched for each category
- Dynamic SEO metadata based on category

### 3. Dynamic Routing
**Locations**: 
- `app/quizzes/[category]/page.tsx` - Category-based routing
- `app/quiz/[id]/page.tsx` - Quiz ID-based routing
- Proper 404 handling for invalid routes

### 4. API Routes
**Locations**:
- `app/api/categories/route.ts` - Returns all quiz categories
- `app/api/quizzes/[category]/route.ts` - Returns quizzes for a specific category
- `app/api/quiz/[id]/route.ts` - Returns detailed quiz data with questions

### 5. Client-Side State Management
**Location**: `app/quiz/[id]/page.tsx`
- Uses React hooks (useState, useEffect) for quiz state
- Manages current question, user answers, score, and timing
- Implements real-time feedback and progress tracking

## Design Features

### User Experience
- **Intuitive Navigation**: Clear breadcrumbs and navigation paths
- **Visual Feedback**: Immediate answer feedback with explanations
- **Progress Indicators**: Progress bars and question counters
- **Responsive Design**: Optimized for all screen sizes

### Visual Design
- **Modern UI**: Clean, professional design with subtle animations
- **Color System**: Consistent color scheme with proper contrast
- **Typography**: Readable fonts with proper hierarchy
- **Accessibility**: Proper ARIA labels and keyboard navigation

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd micro-quiz-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## Quiz Data Structure

The application uses mock JSON data structured as follows:

### Categories
```typescript
interface QuizCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  quizCount: number;
}
```

### Quizzes
```typescript
interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questionCount: number;
  estimatedTime: number;
}
```

### Questions
```typescript
interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}
```

## Testing

The application includes comprehensive quiz functionality with:
- **Unit Testing**: Component logic and utility functions
- **Integration Testing**: API routes and data flow
- **End-to-End Testing**: Complete user journey from home to quiz completion

### Running Tests
```bash
npm test
# or
yarn test
```

## Development Decisions

### Architecture Choices
- **App Router**: Chose Next.js 13+ App Router for modern development patterns
- **TypeScript**: Full type safety to prevent runtime errors
- **Component Library**: Shadcn/UI for consistent, accessible components
- **State Management**: React hooks for client-side state (no external library needed)

### Performance Optimizations
- **Static Generation**: Home page pre-rendered for fast loading
- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Next.js image optimization for better performance
- **Caching**: Proper cache strategies for API routes

### SEO Considerations
- **Dynamic Metadata**: Category-specific SEO tags
- **Structured Data**: Proper page titles and descriptions
- **Open Graph**: Social media sharing optimization

## Challenges & Solutions

### Challenge 1: Data Fetching Strategy
**Problem**: Balancing SSG, SSR, and client-side rendering
**Solution**: Used SSG for static content (home), SSR for dynamic content (categories), and client-side for interactive content (quiz taking)

### Challenge 2: State Management
**Problem**: Managing complex quiz state with multiple interactions
**Solution**: Implemented custom React hooks with proper state transitions and validation

### Challenge 3: Type Safety
**Problem**: Ensuring type safety across API routes and components
**Solution**: Created comprehensive TypeScript interfaces and proper API typing

### Challenge 4: Mobile Responsiveness
**Problem**: Creating a good mobile experience for quiz taking
**Solution**: Implemented responsive design with touch-friendly interfaces and proper mobile navigation

## Future Enhancements

- **User Authentication**: User accounts and progress tracking
- **Quiz Analytics**: Detailed performance analytics
- **Social Features**: Quiz sharing and leaderboards
- **Custom Quizzes**: User-generated quiz content
- **Offline Mode**: Progressive Web App features
- **Real Database**: Integration with PostgreSQL or MongoDB

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

