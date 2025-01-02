"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { LeetCodeQuestion } from '@/utils/githubFetcher';

interface SavedQuestionsContextType {
  savedQuestions: LeetCodeQuestion[];
  completedQuestions: string[];
  saveQuestion: (question: LeetCodeQuestion) => void;
  removeQuestion: (questionId: string) => void;
  isSaved: (questionId: string) => boolean;
  toggleCompleted: (questionId: string) => void;
  isCompleted: (questionId: string) => boolean;
}

const SavedQuestionsContext = createContext<SavedQuestionsContextType | undefined>(undefined);

export function SavedQuestionsProvider({ children }: { children: React.ReactNode }) {
  const [savedQuestions, setSavedQuestions] = useState<LeetCodeQuestion[]>([]);
  const [completedQuestions, setCompletedQuestions] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('savedQuestions');
    if (saved) {
      setSavedQuestions(JSON.parse(saved));
    }
    const completed = localStorage.getItem('completedQuestions');
    if (completed) {
      setCompletedQuestions(JSON.parse(completed));
    }
  }, []);

  const saveQuestion = (question: LeetCodeQuestion) => {
    setSavedQuestions((prev) => {
      const updated = [...prev, { ...question, company: question.company }];
      localStorage.setItem('savedQuestions', JSON.stringify(updated));
      return updated;
    });
  };

  const removeQuestion = (questionId: string) => {
    setSavedQuestions((prev) => {
      const updated = prev.filter((q) => q.ID !== questionId);
      localStorage.setItem('savedQuestions', JSON.stringify(updated));
      return updated;
    });
  };

  const isSaved = (questionId: string) => {
    return savedQuestions.some((q) => q.ID === questionId);
  };

  const toggleCompleted = (questionId: string) => {
    setCompletedQuestions((prev) => {
      const updated = prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId];
      localStorage.setItem('completedQuestions', JSON.stringify(updated));
      return updated;
    });
  };

  const isCompleted = (questionId: string) => {
    return completedQuestions.includes(questionId);
  };

  return (
    <SavedQuestionsContext.Provider value={{ 
      savedQuestions, 
      completedQuestions, 
      saveQuestion, 
      removeQuestion, 
      isSaved, 
      toggleCompleted, 
      isCompleted 
    }}>
      {children}
    </SavedQuestionsContext.Provider>
  );
}

export function useSavedQuestions() {
  const context = useContext(SavedQuestionsContext);
  if (context === undefined) {
    throw new Error('useSavedQuestions must be used within a SavedQuestionsProvider');
  }
  return context;
}

