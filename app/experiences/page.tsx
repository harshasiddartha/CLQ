import dynamic from 'next/dynamic'
const InterviewExperiences = dynamic(() => import('../../components/InterviewExperiences'))

export default function ExperiencesPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Interview Experiences</h1>
      <InterviewExperiences />
    </div>
  )
}

