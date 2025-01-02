'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import InterviewExperienceDetails from '@/components/InterviewExperienceDetails'
import { LeetCodeExperience } from '@/utils/csvParser'
import { Loader2 } from 'lucide-react'

export default function InterviewExperienceDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [experience, setExperience] = useState<LeetCodeExperience | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      if (typeof params.id === 'string') {
        const decodedExperience = JSON.parse(decodeURIComponent(params.id)) as LeetCodeExperience
        setExperience(decodedExperience)
      } else {
        throw new Error('Invalid experience data')
      }
    } catch (err) {
      console.error('Error parsing interview experience:', err)
      setError('Failed to load interview experience. Please try again later.')
    } finally {
      setLoading(false)
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  if (!experience) {
    return <div className="text-center">Interview experience not found.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <InterviewExperienceDetails experience={experience} />
    </div>
  )
}

