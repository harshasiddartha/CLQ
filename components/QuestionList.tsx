"use client"

import { LeetCodeQuestion } from '@/utils/githubFetcher'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { motion, AnimatePresence } from "framer-motion"
import { Filters } from './SearchFilters'
import QuestionSkeleton from './QuestionSkeleton'
import { useSavedQuestions } from '@/contexts/SavedQuestionsContext'
import { BookmarkIcon, Youtube, Building2 } from 'lucide-react'

interface QuestionListProps {
  questions: LeetCodeQuestion[]
  filters: Filters
  loading?: boolean
}

export default function QuestionList({ questions, filters, loading = false }: QuestionListProps) {
  const { saveQuestion, removeQuestion, isSaved, toggleCompleted, isCompleted } = useSavedQuestions();

  const filteredAndSortedQuestions = questions
    .filter(question => {
      const matchesSearch = question.Title.toLowerCase().includes(filters.search.toLowerCase())
      const matchesDifficulty = filters.difficulties.length === 0 || filters.difficulties.includes(question.Difficulty)
      const acceptanceRate = parseFloat(question.Acceptance)
      const matchesAcceptance = !isNaN(acceptanceRate) && acceptanceRate >= filters.minAcceptance
      const frequency = Number(question.Frequency) * 100
      const matchesFrequency = frequency >= filters.minFrequency

      return matchesSearch && matchesDifficulty && matchesAcceptance && matchesFrequency
    })
    .sort((a, b) => {
      const order = filters.sortOrder === 'asc' ? 1 : -1
      
      switch (filters.sortBy) {
        case 'frequency':
          return (Number(b.Frequency) - Number(a.Frequency)) * order
        case 'acceptance':
          return (parseFloat(b.Acceptance) - parseFloat(a.Acceptance)) * order
        case 'title':
          return a.Title.localeCompare(b.Title) * order
        default:
          return 0
      }
    })

  if (loading) {
    return (
      <ScrollArea className="h-[600px] rounded-md border">
        <div className="p-4 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <QuestionSkeleton key={i} />
          ))}
        </div>
      </ScrollArea>
    )
  }

  return (
    <ScrollArea className="h-[600px] rounded-md border">
      <div className="p-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredAndSortedQuestions.map((question) => (
            <motion.div
              key={question.ID}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{question.Title}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`completed-${question.ID}`}
                        checked={isCompleted(question.ID)}
                        onCheckedChange={() => toggleCompleted(question.ID)}
                      />
                      <label
                        htmlFor={`completed-${question.ID}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Completed
                      </label>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => isSaved(question.ID) ? removeQuestion(question.ID) : saveQuestion(question)}
                      >
                        <BookmarkIcon className={isSaved(question.ID) ? "fill-current" : ""} />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
                    <Badge variant={
                      question.Difficulty === 'Easy' ? 'secondary' :
                      question.Difficulty === 'Medium' ? 'default' : 'destructive'
                    }>
                      {question.Difficulty}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Acceptance: {question.Acceptance}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">
                      Frequency: {(Number(question.Frequency) * 100).toFixed(2)}%
                    </span>
                    <span className="text-sm font-medium flex items-center">
                      <Building2 className="mr-1 h-4 w-4" />
                      {question.company}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <a
                      href={question["Leetcode Question Link"]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Solve on LeetCode
                    </a>
                    <a
                      href={`https://www.youtube.com/watch?v=${question.youtubeLink}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-500 hover:underline flex items-center"
                    >
                      <Youtube className="mr-1 h-4 w-4" />
                      Watch Solution
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
        {filteredAndSortedQuestions.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-muted-foreground py-8"
          >
            No questions found matching your criteria.
          </motion.p>
        )}
      </div>
    </ScrollArea>
  )
}

