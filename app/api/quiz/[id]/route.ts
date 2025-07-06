import { NextResponse } from 'next/server';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizDetail {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: QuizQuestion[];
}

const quizDetails: Record<string, QuizDetail> = {
  'javascript-basics': {
    id: 'javascript-basics',
    title: 'JavaScript Basics',
    description: 'Fundamental JavaScript concepts',
    category: 'programming',
    difficulty: 'easy',
    questions: [
      { id: '1', question: 'What is the correct way to declare a variable in JavaScript?', options: ['var myVar = 5;', 'let myVar = 5;', 'const myVar = 5;', 'myVar := 5;'], correctAnswer: 2, explanation: 'const declares a variable with an immutable binding.' },
      { id: '2', question: 'Which of the following is NOT a JavaScript data type?', options: ['String', 'Boolean', 'Symbol', 'Integer'], correctAnswer: 3, explanation: 'JavaScript has Number type, not specifically Integer.' },
      { id: '3', question: 'What does "===" compare in JavaScript?', options: ['Value only', 'Type only', 'Both value and type', 'Memory reference'], correctAnswer: 2, explanation: '=== checks strict equality of both type and value.' },
      { id: '4', question: 'Which method is used to add an element to the end of an array?', options: ['push()', 'pop()', 'shift()', 'unshift()'], correctAnswer: 0, explanation: 'push() adds element(s) at the end of an array.' },
      { id: '5', question: 'What is the output of "typeof null" in JavaScript?', options: ['null', 'undefined', 'object', 'boolean'], correctAnswer: 2, explanation: 'typeof null is a historic bug returning "object".' }
    ]
  },
  'react-fundamentals': {
    id: 'react-fundamentals',
    title: 'React Fundamentals',
    description: 'Components, hooks, and state management',
    category: 'programming',
    difficulty: 'medium',
    questions: [
      { id: '1', question: 'What is JSX?', options: ['JavaScript XML', 'JavaScript Syntax', 'Java Syntax Extension', 'None of the above'], correctAnswer: 0, explanation: 'JSX stands for JavaScript XML.' },
      { id: '2', question: 'Which hook is used to manage state in functional components?', options: ['useState', 'useEffect', 'useContext', 'useReducer'], correctAnswer: 0, explanation: 'useState provides state in functional components.' },
      { id: '3', question: 'What is the purpose of useEffect hook?', options: ['Data fetching', 'DOM updating', 'Event handling', 'All of the above'], correctAnswer: 3, explanation: 'useEffect handles side effects like fetching, subscriptions, etc.' },
      { id: '4', question: 'What are props in React?', options: ['Internal component state', 'Attributes passed to components', 'Browser properties', 'Global variables'], correctAnswer: 1, explanation: 'Props are parameters passed to components.' },
      { id: '5', question: 'Which lifecycle method runs after component mounts in class components?', options: ['componentDidMount', 'componentWillMount', 'render', 'shouldComponentUpdate'], correctAnswer: 0, explanation: 'componentDidMount runs after the first render.' }
    ]
  },
  'physics-basics': {
    id: 'physics-basics',
    title: 'Physics Basics',
    description: 'Fundamental concepts of physics',
    category: 'science',
    difficulty: 'medium',
    questions: [
      { id: '1', question: 'What is Newton\'s first law of motion?', options: ['F = ma', 'Inertia', 'Action-reaction', 'Energy conservation'], correctAnswer: 1, explanation: 'It describes inertia.' },
      { id: '2', question: 'What is the speed of light in vacuum?', options: ['3×10^8 m/s', '3×10^6 m/s', '1.5×10^8 m/s', '1×10^6 m/s'], correctAnswer: 0, explanation: 'Approximately 3×10^8 meters per second.' },
      { id: '3', question: 'What is the unit of force in SI?', options: ['Joule', 'Pascal', 'Newton', 'Watt'], correctAnswer: 2, explanation: 'Force is measured in Newtons (N).' },
      { id: '4', question: 'Which quantity is scalar?', options: ['Velocity', 'Acceleration', 'Mass', 'Force'], correctAnswer: 2, explanation: 'Mass has only magnitude.' },
      { id: '5', question: 'What is the formula for kinetic energy?', options: ['½mv²', 'mgh', 'F×d', 'MA'], correctAnswer: 0, explanation: 'KE = ½ m v squared.' }
    ]
  },
  'ancient-civilizations': {
    id: 'ancient-civilizations',
    title: 'Ancient Civilizations',
    description: 'Test your knowledge of ancient civilizations like Egypt, Greece, and Rome',
    category: 'history',
    difficulty: 'medium',
    questions: [
      { id: '1', question: 'Which river was crucial to ancient Egyptian civilization?', options: ['Nile', 'Tigris', 'Euphrates', 'Yellow River'], correctAnswer: 0, explanation: 'Nile provided fertile soil.' },
      { id: '2', question: 'Who built the Parthenon?', options: ['Romans', 'Athenians', 'Persians', 'Spartans'], correctAnswer: 1, explanation: 'Athenians built it in honor of Athena.' },
      { id: '3', question: 'Which writing system did the Sumerians develop?', options: ['Hieroglyphics', 'Cuneiform', 'Latin', 'Phoenician'], correctAnswer: 1, explanation: 'Cuneiform was developed in Mesopotamia.' },
      { id: '4', question: 'Who was the first emperor of Rome?', options: ['Julius Caesar', 'Augustus', 'Nero', 'Caligula'], correctAnswer: 1, explanation: 'Augustus (Octavian) was Rome\'s first emperor.' },
      { id: '5', question: 'The Great Wall is located in which country?', options: ['India', 'China', 'Egypt', 'Persia'], correctAnswer: 1, explanation: 'Built across northern China.' }
    ]
  },
  'algebra-basics': {
    id: 'algebra-basics',
    title: 'Algebra Basics',
    description: 'Fundamental algebraic concepts and equations',
    category: 'math',
    difficulty: 'easy',
    questions: [
      { id: '1', question: 'Solve for x: 2x + 3 = 11', options: ['4', '5', '3', '2'], correctAnswer: 0, explanation: '2x = 8, x = 4.' },
      { id: '2', question: 'What is the slope of y = 3x + 2?', options: ['3', '2', '1', '0'], correctAnswer: 0, explanation: 'Slope m is 3.' },
      { id: '3', question: 'Factor: x² - 9', options: ['(x-3)(x+3)', '(x-9)(x+1)', '(x-1)²', '(x+9)(x-1)'], correctAnswer: 0, explanation: 'Difference of squares.' },
      { id: '4', question: 'What is the quadratic formula?', options: ['(-b±√(b²-4ac))/(2a)', '(b±√(b²-4ac))/(2a)', '(-b±√(4ac-b²))/(2a)', '(b±√(4ac-b²))/(2a)'], correctAnswer: 0, explanation: 'Standard solution for ax²+bx+c=0.' },
      { id: '5', question: 'Simplify: 3(x+2) - x', options: ['2x+6', '3x+6', 'x+6', '2x+2'], correctAnswer: 0, explanation: 'Expand and combine like terms.' }
    ]
  },
  'calculus': {
    id: 'calculus',
    title: 'Calculus',
    description: 'Derivatives, integrals, and limits',
    category: 'math',
    difficulty: 'hard',
    questions: [
      { id: '1', question: 'What is the derivative of sin(x)?', options: ['cos(x)', '-cos(x)', 'sin(x)', '-sin(x)'], correctAnswer: 0, explanation: 'd/dx sin(x) = cos(x).' },
      { id: '2', question: 'What is ∫ x dx?', options: ['x²/2 + C', 'x + C', '1/x + C', 'ln|x| + C'], correctAnswer: 0, explanation: 'Power rule integration.' },
      { id: '3', question: 'What is the limit of (1+1/n)^n as n→∞?', options: ['e', '1', '∞', '0'], correctAnswer: 0, explanation: 'Defines Euler’s number.' },
      { id: '4', question: 'What is the derivative of e^x?', options: ['e^x', 'xe^(x-1)', 'x*e^x', 'e^x + C'], correctAnswer: 0, explanation: 'Exponential function derivative equals itself.' },
      { id: '5', question: 'What is ∫ from 0 to 1 of x dx?', options: ['1/2', '1', '1/3', '2'], correctAnswer: 0, explanation: 'Compute definite integral: 0.5.' }
    ]
  },
  'geometry': {
    id: 'geometry',
    title: 'Geometry',
    description: 'Shapes, angles, and spatial relationships',
    category: 'math',
    difficulty: 'medium',
    questions: [
      { id: '1', question: 'What is the sum of interior angles in a triangle?', options: ['180°', '360°', '90°', '270°'], correctAnswer: 0, explanation: 'Triangle interior angles sum to 180°.' },
      { id: '2', question: 'What is the area of a circle with radius r?', options: ['πr²', '2πr', 'πd', 'r²'], correctAnswer: 0, explanation: 'Area formula.' },
      { id: '3', question: 'What is a right angle?', options: ['90°', '45°', '180°', '60°'], correctAnswer: 0, explanation: 'Perpendicular lines form 90°.' },
      { id: '4', question: 'What is the Pythagorean theorem?', options: ['a²+b²=c²', 'a+b=c', 'ab=c', 'a²-b²=c²'], correctAnswer: 0, explanation: 'Relates sides of a right triangle.' },
      { id: '5', question: 'Volume of a cube with side s?', options: ['s³', '6s²', 's²', '2s³'], correctAnswer: 0, explanation: 'Cube volume s cubed.' }
    ]
  },
  'data-structures': {
    id: 'data-structures',
    title: 'Data Structures',
    description: 'Arrays, linked lists, trees, and graphs',
    category: 'programming',
    difficulty: 'hard',
    questions: [
      { id: '1', question: 'Which data structure uses FIFO order?', options: ['Queue', 'Stack', 'Tree', 'Graph'], correctAnswer: 0, explanation: 'Queue is first-in, first-out.' },
      { id: '2', question: 'What is the time complexity of binary search on sorted array?', options: ['O(log n)', 'O(n)', 'O(n log n)', 'O(1)'], correctAnswer: 0, explanation: 'Binary search runs in logarithmic time.' },
      { id: '3', question: 'Which structure uses LIFO?', options: ['Stack', 'Queue', 'LinkedList', 'Heap'], correctAnswer: 0, explanation: 'Stack is last-in, first-out.' },
      { id: '4', question: 'What is a balanced binary tree?', options: ['Height difference ≤1', 'All leaves same depth', 'Binary sorted', 'Complete tree'], correctAnswer: 0, explanation: 'Height difference between children ≤1.' },
      { id: '5', question: 'Which data structure is best for BFS traversal?', options: ['Queue', 'Stack', 'Heap', 'LinkedList'], correctAnswer: 0, explanation: 'Queue supports level-order traversal.' }
    ]
  },
  'algorithms': {
    id: 'algorithms',
    title: 'Algorithms',
    description: 'Sorting, searching, and optimization',
    category: 'programming',
    difficulty: 'hard',
    questions: [
      { id: '1', question: 'Which sort is O(n²) in average?', options: ['Bubble Sort', 'Merge Sort', 'Quick Sort', 'Heap Sort'], correctAnswer: 0, explanation: 'Bubble sort average is O(n²).' },
      { id: '2', question: 'Which algorithm uses divide and conquer?', options: ['Merge Sort', 'Bubble Sort', 'Insertion Sort', 'Selection Sort'], correctAnswer: 0, explanation: 'Merge sort splits and merges arrays.' },
      { id: '3', question: 'What is Dijkstra\'s algorithm used for?', options: ['Shortest path', 'Sorting', 'Searching', 'Compression'], correctAnswer: 0, explanation: 'Finds shortest path in weighted graphs.' },
      { id: '4', question: 'Which search algorithm is O(log n)?', options: ['Binary Search', 'Linear Search', 'Depth First Search', 'Breadth First Search'], correctAnswer: 0, explanation: 'Binary search is logarithmic.' },
      { id: '5', question: 'What is dynamic programming?', options: ['Memoization technique', 'Divide and conquer', 'Greedy approach', 'Recursive only'], correctAnswer: 0, explanation: 'DP stores subproblem results to avoid recomputation.' }
    ]
  },
  'web-development': {
    id: 'web-development',
    title: 'Web Development',
    description: 'HTML, CSS, and web technologies',
    category: 'programming',
    difficulty: 'medium',
    questions: [
      { id: '1', question: 'What does HTML stand for?', options: ['HyperText Markup Language', 'HighText Machine Language', 'Hyperlink and Text Markup', 'HomeTool Markup Language'], correctAnswer: 0, explanation: 'Standard markup language.' },
      { id: '2', question: 'Which CSS property changes text color?', options: ['color', 'font-style', 'text-color', 'font-color'], correctAnswer: 0, explanation: 'color sets text color.' },
      { id: '3', question: 'What is the purpose of <!DOCTYPE html>?', options: ['Defines document type', 'Comments the code', 'Specifies CSS version', 'None'], correctAnswer: 0, explanation: 'Declares document type and HTML version.' },
      { id: '4', question: 'Which protocol does the web use?', options: ['HTTP', 'FTP', 'SMTP', 'TCP'], correctAnswer: 0, explanation: 'HyperText Transfer Protocol.' },
      { id: '5', question: 'What does CSS stand for?', options: ['Cascading Style Sheets', 'Computer Style Sheets', 'Creative Style System', 'Colorful Style Sheets'], correctAnswer: 0, explanation: 'CSS defines style for HTML elements.' }
    ]
  },
  'world-wars': {
    id: 'world-wars',
    title: 'World Wars',
    description: 'Questions about World War I and World War II',
    category: 'history',
    difficulty: 'hard',
    questions: [
      { id: '1', question: 'In which year did World War I begin?', options: ['1914', '1918', '1939', '1945'], correctAnswer: 0, explanation: 'World War I began in 1914.' },
      { id: '2', question: 'Which event triggered World War I?', options: ['Assassination of Archduke Franz Ferdinand', 'Invasion of Poland', 'Attack on Pearl Harbor', 'Battle of Somme'], correctAnswer: 0, explanation: 'The assassination of Archduke Franz Ferdinand triggered WWI.' },
      { id: '3', question: 'Which treaty ended World War I?', options: ['Treaty of Versailles', 'Treaty of Paris', 'Treaty of Ghent', 'Treaty of Tordesillas'], correctAnswer: 0, explanation: 'The Treaty of Versailles officially ended WWI.' },
      { id: '4', question: 'In which year did World War II end?', options: ['1945', '1944', '1939', '1950'], correctAnswer: 0, explanation: 'World War II ended in 1945.' },
      { id: '5', question: 'What was D-Day?', options: ['Allied invasion of Normandy', 'Battle of Midway', 'Battle of Stalingrad', 'Battle of the Bulge'], correctAnswer: 0, explanation: 'D-Day refers to the Normandy landings on June 6, 1944.' }
    ]
  },
  'american-revolution': {
    id: 'american-revolution',
    title: 'American Revolution',
    description: 'Learn about the birth of the United States',
    category: 'history',
    difficulty: 'easy',
    questions: [
      { id: '1', question: 'In which year did the American Revolutionary War begin?', options: ['1775', '1783', '1765', '1791'], correctAnswer: 0, explanation: 'The war began in 1775.' },
      { id: '2', question: 'What document declared American independence?', options: ['Declaration of Independence', 'Articles of Confederation', 'U.S. Constitution', 'Bill of Rights'], correctAnswer: 0, explanation: 'Adopted on July 4, 1776.' },
      { id: '3', question: 'Who was commander-in-chief of the Continental Army?', options: ['George Washington', 'Thomas Jefferson', 'John Adams', 'Benjamin Franklin'], correctAnswer: 0, explanation: 'George Washington led Continental forces.' },
      { id: '4', question: 'Which battle is considered a turning point?', options: ['Battle of Saratoga', 'Bunker Hill', 'Yorktown', 'Trenton'], correctAnswer: 0, explanation: 'Saratoga secured French support.' },
      { id: '5', question: 'In which year was the treaty ending the war signed?', options: ['1783', '1781', '1778', '1785'], correctAnswer: 0, explanation: 'Treaty of Paris signed in 1783.' }
    ]
  },
  'chemistry-elements': {
    id: 'chemistry-elements',
    title: 'Chemistry Elements',
    description: 'Test your knowledge of the periodic table',
    category: 'science',
    difficulty: 'hard',
    questions: [
      { id: '1', question: 'What is the chemical symbol for gold?', options: ['Au', 'Ag', 'Gd', 'Go'], correctAnswer: 0, explanation: 'Au from Latin Aurum.' },
      { id: '2', question: 'Which element has atomic number 1?', options: ['Hydrogen', 'Helium', 'Lithium', 'Oxygen'], correctAnswer: 0, explanation: 'Hydrogen is #1.' },
      { id: '3', question: 'What is the most abundant gas in Earth’s atmosphere?', options: ['Nitrogen', 'Oxygen', 'Argon', 'Carbon Dioxide'], correctAnswer: 0, explanation: 'Nitrogen ~78%.' },
      { id: '4', question: 'Which element is a halogen?', options: ['Chlorine', 'Helium', 'Iron', 'Calcium'], correctAnswer: 0, explanation: 'Chlorine in group 17.' },
      { id: '5', question: 'What is the chemical symbol for sodium?', options: ['Na', 'S', 'So', 'Sd'], correctAnswer: 0, explanation: 'Na from Natrium.' }
    ]
  },
  'biology-cells': {
    id: 'biology-cells',
    title: 'Biology: Cells',
    description: 'Understanding cellular structure and function',
    category: 'science',
    difficulty: 'medium',
    questions: [
      { id: '1', question: 'Which organelle is the powerhouse of the cell?', options: ['Mitochondria', 'Nucleus', 'Ribosome', 'Endoplasmic Reticulum'], correctAnswer: 0, explanation: 'Produces ATP.' },
      { id: '2', question: 'Which structure contains DNA?', options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Lysosome'], correctAnswer: 0, explanation: 'Nucleus houses genetic material.' },
      { id: '3', question: 'What is the function of ribosomes?', options: ['Protein synthesis', 'Lipid synthesis', 'Digestion', 'Energy production'], correctAnswer: 0, explanation: 'Ribosomes translate mRNA to proteins.' },
      { id: '4', question: 'Which organelle performs photosynthesis?', options: ['Chloroplast', 'Mitochondria', 'Golgi apparatus', 'Vacuole'], correctAnswer: 0, explanation: 'Chloroplasts convert light to energy.' },
      { id: '5', question: 'What regulates entry and exit in cells?', options: ['Cell membrane', 'Cell wall', 'Cytoplasm', 'Nucleus'], correctAnswer: 0, explanation: 'Cell membrane is selectively permeable.' }
    ]
  },
  'astronomy': {
    id: 'astronomy',
    title: 'Astronomy',
    description: 'Explore the cosmos and celestial bodies',
    category: 'science',
    difficulty: 'easy',
    questions: [
      { id: '1', question: 'Which planet is known as the Red Planet?', options: ['Mars', 'Venus', 'Jupiter', 'Saturn'], correctAnswer: 0, explanation: 'Mars is red due to iron oxide.' },
      { id: '2', question: 'What is the center of our solar system?', options: ['The Sun', 'Earth', 'Jupiter', 'The Moon'], correctAnswer: 0, explanation: 'The Sun is the star at center.' },
      { id: '3', question: 'Which galaxy is Earth in?', options: ['Milky Way', 'Andromeda', 'Triangulum', 'Whirlpool'], correctAnswer: 0, explanation: 'Earth resides in the Milky Way.' },
      { id: '4', question: 'What is a supernova?', options: ['Exploding star', 'Black hole', 'Nebula', 'Comet'], correctAnswer: 0, explanation: 'Supernova is a star explosion.' },
      { id: '5', question: 'What is Sagittarius A*?', options: ['Milky Way’s central black hole', 'A star cluster', 'A nebula', 'A comet'], correctAnswer: 0, explanation: 'Sagittarius A* is our galaxy'}
    ]
  }
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const quiz = quizDetails[id];
  if (!quiz) {
    return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
  }
  return NextResponse.json(quiz);
}
