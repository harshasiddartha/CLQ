export interface Question {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  link: string;
  lastAsked: string; // New field for the date
}

export interface CompanyQuestions {
  [company: string]: Question[];
}

export const companyQuestions: CompanyQuestions = {
  "Google": [
    { id: 1, title: "Two Sum", difficulty: "Easy", link: "https://leetcode.com/problems/two-sum/", lastAsked: "2023-06-15" },
    { id: 2, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", lastAsked: "2023-06-10" },
    { id: 3, title: "Median of Two Sorted Arrays", difficulty: "Hard", link: "https://leetcode.com/problems/median-of-two-sorted-arrays/", lastAsked: "2023-06-05" },
  ],
  "Amazon": [
    { id: 4, title: "Reverse Integer", difficulty: "Medium", link: "https://leetcode.com/problems/reverse-integer/", lastAsked: "2023-06-12" },
    { id: 5, title: "String to Integer (atoi)", difficulty: "Medium", link: "https://leetcode.com/problems/string-to-integer-atoi/", lastAsked: "2023-06-08" },
    { id: 6, title: "Container With Most Water", difficulty: "Medium", link: "https://leetcode.com/problems/container-with-most-water/", lastAsked: "2023-06-03" },
  ],
  "Microsoft": [
    { id: 7, title: "Roman to Integer", difficulty: "Easy", link: "https://leetcode.com/problems/roman-to-integer/", lastAsked: "2023-06-14" },
    { id: 8, title: "3Sum", difficulty: "Medium", link: "https://leetcode.com/problems/3sum/", lastAsked: "2023-06-09" },
    { id: 9, title: "Letter Combinations of a Phone Number", difficulty: "Medium", link: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/", lastAsked: "2023-06-07" },
  ],
};

