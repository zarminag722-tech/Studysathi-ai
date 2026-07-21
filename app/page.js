'use client'
import { useState } from 'react'

export default function Home() {
  const [text, setText] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSummarize = async () => {
    setLoading(true)
    const res = await fetch('/api/summarize', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ text })
    })
    const data = await res.json()
    setResult(data.result)
    setLoading(false)
  }

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">📚 StudySathi AI</h1>
      <textarea className="w-full h-40 p-3 border rounded" placeholder="Paste your notes here..." value={text} onChange={(e)=>setText(e.target.value)}></textarea>
      <button onClick={handleSummarize} className="mt-3 px-5 py-2 bg-blue-600 text-white rounded" disabled={loading}>
        {loading ? 'Generating...' : 'Summarize + Quiz'}
      </button>
      {result && <div className="mt-5 p-4 bg-gray-100 rounded whitespace-pre-wrap">{result}</div>}
    </main>
  )
}
