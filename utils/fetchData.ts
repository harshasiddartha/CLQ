import Papa from 'papaparse';

export interface Question {
  ID: string;
  Title: string;
  Acceptance: string;
  Difficulty: string;
  Frequency: number;
  "Leetcode Question Link": string;
}

export async function fetchQuestions(): Promise<Question[]> {
  const response = await fetch('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/amazon_1year-G44wypih53NVMpFQuc0mOA40wDbinz.csv');
  const csvText = await response.text();
  
  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      header: true,
      complete: (results) => {
        const validQuestions = (results.data as Question[]).filter(q => 
          q.Title && typeof q.Title === 'string' &&
          q.Difficulty && typeof q.Difficulty === 'string' &&
          q.Acceptance && typeof q.Acceptance === 'string' &&
          q["Leetcode Question Link"] && typeof q["Leetcode Question Link"] === 'string'
        );
        resolve(validQuestions);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
}

