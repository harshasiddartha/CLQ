import { NextResponse } from 'next/server'
import { load } from 'cheerio'

export interface LeetCodeInterviewExperience {
  id: string
  title: string
  company: string
  date: string
  url: string
  likes: number
  comments: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')

  try {
    const leetcodeUrl = `https://leetcode.com/discuss/interview-experience?currentPage=${page}&orderBy=hot&query=`
    console.log('Fetching from LeetCode:', leetcodeUrl)

    const response = await fetch(leetcodeUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const html = await response.text()
    const $ = load(html)
    const experiences: LeetCodeInterviewExperience[] = []

    $('.discuss-topic-row').each((_, element) => {
      const $el = $(element)
      const title = $el.find('.discuss-topic-title').text().trim()
      const url = 'https://leetcode.com' + $el.find('.discuss-topic-title').attr('href')
      const company = $el.find('.company-tag').text().trim()
      const dateStr = $el.find('.relative-time').text().trim()
      const likes = parseInt($el.find('.like-count').text().trim()) || 0
      const comments = parseInt($el.find('.comment-count').text().trim()) || 0
      
      let difficulty: 'Easy' | 'Medium' | 'Hard' = 'Medium'
      const titleLower = title.toLowerCase()
      if (titleLower.includes('hard') || titleLower.includes('difficult')) {
        difficulty = 'Hard'
      } else if (titleLower.includes('easy') || titleLower.includes('simple')) {
        difficulty = 'Easy'
      }

      experiences.push({
        id: url.split('/').pop() || Math.random().toString(),
        title,
        company: company || 'Unknown Company',
        date: dateStr,
        url,
        likes,
        comments,
        difficulty
      })
    })

    console.log(`Fetched ${experiences.length} experiences`)

    return NextResponse.json({
      experiences,
      page,
      hasMore: experiences.length === 20 // LeetCode typically shows 20 items per page
    })

  } catch (error) {
    console.error('Error in GET /api/interview-experiences:', error)
    return NextResponse.json({ error: 'Failed to fetch interview experiences' }, { status: 500 })
  }
}

