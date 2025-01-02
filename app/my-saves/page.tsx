"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useSavedQuestions } from '@/contexts/SavedQuestionsContext'
import QuestionList from '@/components/QuestionList'
import SearchFilters, { Filters } from '@/components/SearchFilters'
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { HomeIcon } from 'lucide-react'

const defaultFilters: Filters = {
  search: "",
  difficulties: [],
  minAcceptance: 0,
  minFrequency: 0,
  sortBy: "frequency",
  sortOrder: "desc"
}

export default function MySavesPage() {
  const { savedQuestions } = useSavedQuestions();
  const [filters, setFilters] = useState<Filters>(defaultFilters)

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8 text-center"
      >
        My Saved Questions
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6 flex justify-between items-center"
      >
        <Link href="/" passHref>
          <Button variant="outline">
            <HomeIcon className="mr-2 h-4 w-4" />
            Return to Home
          </Button>
        </Link>
        <SearchFilters filters={filters} onFiltersChange={setFilters} />
      </motion.div>
      <QuestionList questions={savedQuestions} filters={filters} />
    </div>
  )
}

