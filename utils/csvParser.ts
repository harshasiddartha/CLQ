import Papa from 'papaparse';

export interface LeetCodeExperience {
  Company: string;
  Role: string;
  Location: string;
  Date: string;
  Views: string;
  "Anonymous User": string;
  Education: string;
  Experience: string;
  "Current Role": string;
  "Application Method": string;
  "Round Type": string;
  "Round Details": string;
  Outcome: string;
  Reflection: string;
}

export async function fetchAndParseCSV(): Promise<LeetCodeExperience[]> {
  const response = await fetch(
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/leetcode_experiences-1XfDoQrKha2dAb8JuKzQULWrUg7n4V.csv'
  );
  const csvText = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse<LeetCodeExperience>(csvText, {
      header: true,
      complete: (results) => {
        const validQuestions = results.data.filter((entry) => !!entry.Company); // Ensure valid data
        resolve(validQuestions);
      },
      error: (error: Error) => {
        console.error('Error parsing CSV:', error.message);
        reject(error);
      },
    });
  });
}