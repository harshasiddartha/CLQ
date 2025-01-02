import  CompanyQuestions  from '../../components/CompanyQuestions'

export default function QuestionsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">LeetCode Questions</h1>
      <CompanyQuestions />
    </div>
  )
}

