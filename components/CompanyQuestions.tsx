'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useData } from '../contexts/DataContext'
import CompanySelector from '@/components/CompanySelector'
import SearchFilters, { Filters } from '@/components/SearchFilters'
import QuestionList from '@/components/QuestionList'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Button } from '@/components/ui/button'
import { BookmarkIcon } from 'lucide-react'

const defaultFilters: Filters = {
  search: "",
  difficulties: [],
  minAcceptance: 0,
  minFrequency: 0,
  sortBy: "frequency",
  sortOrder: "desc"
}

export default function CompanyQuestions() {
  const { companyData, loading, error } = useData()
  const [selectedCompany, setSelectedCompany] = useState<string>("")
  const [filters, setFilters] = useState<Filters>(defaultFilters)

  const companies = Array.from(companyData.keys()).sort()
  const selectedData = companyData.get(selectedCompany) || []

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-8 text-red-500"
      >
        {error}
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 items-center"
      >
        <CompanySelector
          companies={companies}
          selectedCompany={selectedCompany}
          onCompanyChange={setSelectedCompany}
        />
        <div className="flex-1">
          <SearchFilters filters={filters} onFiltersChange={setFilters} />
        </div>
        <Link href="/my-saves" passHref>
          <Button variant="outline">
            <BookmarkIcon className="mr-2" />
            My Saves
          </Button>
        </Link>
      </motion.div>

      {selectedCompany && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Tabs defaultValue={selectedData[0]?.timeframe}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-4 sm:space-y-0">
              <div className="w-full overflow-x-auto">
                <TabsList className="justify-start w-full sm:w-auto">
                  {selectedData.map((data) => (
                    <TabsTrigger key={data.timeframe} value={data.timeframe}>
                      {data.timeframe}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              <div className="flex flex-wrap gap-2 mt-4 sm:mt-0">
                {['Easy', 'Medium', 'Hard'].map((difficulty) => (
                  <Button
                    key={difficulty}
                    variant={filters.difficulties.includes(difficulty) ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilters(prev => ({
                      ...prev,
                      difficulties: prev.difficulties.includes(difficulty)
                        ? prev.difficulties.filter(d => d !== difficulty)
                        : [...prev.difficulties, difficulty]
                    }))}
                  >
                    {difficulty}
                  </Button>
                ))}
              </div>
            </div>

            {selectedData.map((data) => (
              <TabsContent key={data.timeframe} value={data.timeframe}>
                <QuestionList
                  questions={data.questions}
                  filters={filters}
                  loading={loading}
                />
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      )}

      {!selectedCompany && !loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-muted-foreground"
        >
          Select a company to view its LeetCode questions
        </motion.div>
      )}
    </div>
  )
}

