import Papa from 'papaparse';

export interface LeetCodeQuestion {
  ID: string;
  Title: string;
  Acceptance: string;
  Difficulty: string;
  Frequency: number;
  "Leetcode Question Link": string;
  youtubeLink: string;
  company: string; // Add this line
}

export interface CompanyData {
  company: string;
  timeframe: string;
  questions: LeetCodeQuestion[];
}

const GITHUB_API_BASE = 'https://api.github.com/repos/krishnadey30/LeetCode-Questions-CompanyWise';
const RAW_CONTENT_BASE = 'https://raw.githubusercontent.com/krishnadey30/LeetCode-Questions-CompanyWise/master';

export async function fetchAllFiles(): Promise<string[]> {
  const response = await fetch(`${GITHUB_API_BASE}/contents`);
  const files = await response.json();
  return files
    .filter((file: any) => file.name.endsWith('.csv'))
    .map((file: any) => file.name);
}

const dummyYoutubeIds = [
  'dQw4w9WgXcQ', 'jNQXAC9IVRw', 'kJQP7kiw5Fk', 'JGwWNGJdvx8', 'fJ9rUzIMcZQ',
  'YVkUvmDQ3HY', 'OPf0YbXqDm0', 'CevxZvSJLk8', '9bZkp7q19f0', 'hT_nvWreIhg'
];

export async function fetchCSVContent(filename: string): Promise<LeetCodeQuestion[]> {
  try {
    const response = await fetch(`${RAW_CONTENT_BASE}/${filename}`);
    const csvText = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          const validQuestions = (results.data as LeetCodeQuestion[])
            .filter(q => q.Title && q.Difficulty && q["Leetcode Question Link"])
            .map(q => ({
              ...q,
              youtubeLink: dummyYoutubeIds[Math.floor(Math.random() * dummyYoutubeIds.length)],
              company: parseFileInfo(filename).company // Add this line
            }));
          resolve(validQuestions);
        },
        error: reject
      });
    });
  } catch (error) {
    console.error(`Error fetching ${filename}:`, error);
    return [];
  }
}

export function parseFileInfo(filename: string): { company: string; timeframe: string } {
  const [fullCompany, timeframe] = filename.replace('.csv', '').split('_');
  return {
    company: fullCompany,
    timeframe: timeframe || 'unknown'
  };
}

export async function fetchAllCompanyData(): Promise<Map<string, CompanyData[]>> {
  const files = await fetchAllFiles();
  const companyMap = new Map<string, CompanyData[]>();

  await Promise.all(
    files.map(async (filename) => {
      const { company, timeframe } = parseFileInfo(filename);
      const questions = await fetchCSVContent(filename);
      
      if (!companyMap.has(company)) {
        companyMap.set(company, []);
      }
      
      companyMap.get(company)?.push({
        company,
        timeframe,
        questions
      });
    })
  );

  return companyMap;
}

