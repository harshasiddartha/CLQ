export interface InterviewExperience {
  id: string;
  company: string;
  role: string;
  date: string;
  content: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export const interviewExperiences: InterviewExperience[] = [
  {
    id: '1',
    company: 'Google',
    role: 'Software Engineer',
    date: '2023-06-15',
    content: 'The interview process was challenging but fair. They asked me to implement a trie data structure and solve a system design problem.',
    difficulty: 'Hard'
  },
  {
    id: '2',
    company: 'Amazon',
    role: 'Frontend Developer',
    date: '2023-05-20',
    content: 'I had to complete a coding challenge involving React hooks and state management. The onsite interview focused on JavaScript fundamentals.',
    difficulty: 'Medium'
  },
  {
    id: '3',
    company: 'Microsoft',
    role: 'Full Stack Developer',
    date: '2023-04-10',
    content: 'The interview consisted of both frontend and backend questions. I had to design a simple API and implement a responsive UI.',
    difficulty: 'Medium'
  },
  {
    id: '4',
    company: 'Facebook',
    role: 'Software Engineer',
    date: '2023-03-05',
    content: 'The interview was intense. I had to solve complex algorithmic problems and discuss scalability issues in distributed systems.',
    difficulty: 'Hard'
  },
  {
    id: '5',
    company: 'Apple',
    role: 'iOS Developer',
    date: '2023-02-15',
    content: 'The interview focused on iOS-specific questions, including memory management and UI design patterns.',
    difficulty: 'Medium'
  },
  {
    id: '6',
    company: 'Netflix',
    role: 'Backend Engineer',
    date: '2023-01-20',
    content: 'I was asked to design a content recommendation system and discuss strategies for handling high traffic loads.',
    difficulty: 'Hard'
  },
  {
    id: '7',
    company: 'Google',
    role: 'Data Scientist',
    date: '2022-12-10',
    content: 'The interview involved statistical analysis and machine learning concepts. I had to explain various clustering algorithms.',
    difficulty: 'Hard'
  },
  {
    id: '8',
    company: 'Amazon',
    role: 'DevOps Engineer',
    date: '2022-11-05',
    content: 'I was asked about CI/CD pipelines, containerization, and cloud infrastructure. Practical knowledge of AWS was crucial.',
    difficulty: 'Medium'
  },
  {
    id: '9',
    company: 'Microsoft',
    role: 'Product Manager',
    date: '2022-10-01',
    content: 'The interview focused on product strategy, user experience, and cross-functional team management.',
    difficulty: 'Easy'
  },
  {
    id: '10',
    company: 'Facebook',
    role: 'UI/UX Designer',
    date: '2022-09-15',
    content: 'I had to present my portfolio and discuss my design process. There was also a live design challenge.',
    difficulty: 'Medium'
  }
];

