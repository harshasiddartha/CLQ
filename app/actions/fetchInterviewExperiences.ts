'use server'

import { fetchAndParseCSV, LeetCodeExperience } from '@/utils/csvParser'

export async function fetchInterviewExperiences(page: number = 1, pageSize: number = 20): Promise<{
  experiences: LeetCodeExperience[]
  hasMore: boolean
}> {
  try {
    const allExperiences = await fetchAndParseCSV()
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedExperiences = allExperiences.slice(startIndex, endIndex)

    return {
      experiences: paginatedExperiences,
      hasMore: endIndex < allExperiences.length
    }
  } catch (error) {
    console.error('Error in fetchInterviewExperiences:', error)
    throw error
  }
}

