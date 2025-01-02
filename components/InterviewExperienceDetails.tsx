'use client'

import { LeetCodeExperience } from '@/utils/csvParser'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building2, Calendar, Eye, GraduationCap, Briefcase, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface InterviewExperienceDetailsProps {
  experience: LeetCodeExperience
}

export default function InterviewExperienceDetails({ experience }: InterviewExperienceDetailsProps) {
  return (
    <div className="space-y-6">
      <Link href="/experiences" passHref>
        <Button variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
        </Button>
      </Link>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <CardTitle className="text-2xl">
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
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-2 text-sm">
            <Eye className="w-4 h-4" />
            <span>{experience.Views || "Unknown"} views</span>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Education</h3>
            <div className="flex items-center space-x-2 text-sm">
              <GraduationCap className="w-4 h-4" />
              <span>{experience.Education || "Unknown Education"}</span>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Experience</h3>
            <div className="flex items-center space-x-2 text-sm">
              <Briefcase className="w-4 h-4" />
              <span>{experience.Experience || "Unknown Experience"}</span>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Application Process</h3>
            <p className="text-sm">{experience["Application Method"] || "Not specified"}</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Interview Round: {experience["Round Type"] || "Not specified"}</h3>
            <p className="text-sm">{experience["Round Details"] || "No details provided"}</p>
          </div>
          {experience.Reflection && (
            <div className="space-y-2">
              <h3 className="font-semibold">Reflection</h3>
              <p className="text-sm">{experience.Reflection}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

