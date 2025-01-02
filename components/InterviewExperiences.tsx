'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Loader2, Building2, Calendar, Eye } from 'lucide-react'
import { fetchInterviewExperiences } from '@/app/actions/fetchInterviewExperiences'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LeetCodeExperience } from '@/utils/csvParser'
import Link from 'next/link'

export default function InterviewExperiences() {
  const [experiences, setExperiences] = useState<LeetCodeExperience[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCompany, setSelectedCompany] = useState<string>('all')
  const [page, setPage] = useState(1)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const companies = Array.from(new Set(experiences.map(exp => exp.Company || "Unknown Company"))).sort()

  useEffect(() => {
    loadExperiences(true)
  }, [loadExperiences])

  async function loadExperiences(reset: boolean = false) {
    try {
      if (reset) {
        setLoading(true)
        setPage(1)
      } else {
        setLoadingMore(true)
      }
      
      const currentPage = reset ? 1 : page
      const { experiences: newExperiences, hasMore: moreAvailable } = await fetchInterviewExperiences(currentPage)
      
      setHasMore(moreAvailable)
      
      if (reset) {
        setExperiences(newExperiences)
      } else {
        setExperiences(prev => [...prev, ...newExperiences])
      }
      
      setPage(prev => prev + 1)
      setError(null)
    } catch (err) {
      console.error('Error in loadExperiences:', err)
      setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again later.')
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  const filteredExperiences = experiences.filter(exp => {
    if (selectedCompany !== 'all' && (exp.Company || "unknown") !== selectedCompany) {
      return false;
    }
    return true;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Select value={selectedCompany} onValueChange={setSelectedCompany}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select company" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Companies</SelectItem>
            {companies.map((company) => (
              <SelectItem key={company} value={company || "unknown"}>
                {company || "Unknown Company"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
          <Button onClick={() => loadExperiences(true)} className="mt-2" variant="outline">
            Retry
          </Button>
        </Alert>
      )}

      <ScrollArea className="h-[600px]">
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredExperiences.map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <CardTitle className="text-lg">
                          {experience.Role} at {experience.Company || "Unknown Company"}
                        </CardTitle>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Building2 className="w-4 h-4" />
                          <span>{experience.Location || "Unknown Location"}</span>
                          <span>•</span>
                          <Calendar className="w-4 h-4" />
                          <span>{experience.Date || "Unknown Date"}</span>
                        </div>
                      </div>
                      <Badge variant={experience.Outcome === 'Selected' ? 'default' : 'secondary'}>
                        {experience.Outcome || "Unknown Outcome"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2 text-sm">
                      <Eye className="w-4 h-4" />
                      <span>{experience.Views || "Unknown"} views</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/interview-experience/${encodeURIComponent(JSON.stringify(experience))}`} passHref>
                      <Button variant="outline">View Details</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredExperiences.length === 0 && !loading && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-muted-foreground py-8"
            >
              No interview experiences found matching your criteria.
            </motion.p>
          )}
        </div>
        {!loading && hasMore && (
          <div className="flex justify-center py-4">
            <Button
              onClick={() => loadExperiences()}
              disabled={loadingMore}
              variant="outline"
            >
              {loadingMore ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Loading more...
                </>
              ) : (
                'Load More'
              )}
            </Button>
          </div>
        )}
      </ScrollArea>
    </div>
  )
}

