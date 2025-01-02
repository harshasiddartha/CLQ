'use client'

import { Tabs, TabsContent } from "@/components/ui/tabs"
import dynamic from 'next/dynamic'
const InterviewExperiences = dynamic(() => import('@/components/InterviewExperiences'), { ssr: false })
import CompanyQuestions from '@/components/CompanyQuestions'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">LeetCode Company Questions and Experiences</h1>
      <Tabs defaultValue="questions" className="space-y-6">
        <TabsContent value="questions">
          <CompanyQuestions />
        </TabsContent>
        <TabsContent value="experiences">
          <InterviewExperiences />
        </TabsContent>
      </Tabs>
    </div>
  )
}

