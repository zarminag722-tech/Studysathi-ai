'use client'

import { useState } from 'react'

export default function Home() {
  const [text, setText] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSummarize = async () => {
    setLoading(true)
    setResult('')
    try {
      const res = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      })
      const data = await res.json()
      setResult(data.result || 'Koi error aa gayi')
    } catch {
      setResult('API connect nahi ho rahi')
    }
    setLoading(false)
  }

  return (
    <main style={{padding: '2rem', maxWidth: '800px', margin: 'auto', fontFamily: 'Arial'}}>
      <h1>StudySathi AI 📚</h1>
      <p>Notes paste karo, AI summarize + MCQs bana dega</p>
      
      <textarea 
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Yahan apne notes paste karo..."
        rows={10}
        style={{width: '100%', padding: '1rem', marginTop: '1rem'}}
      />
      
      <button onClick={handleSummarize} disabled={loading} style={{marginTop: '1rem', padding: '0.8rem 1.5rem', cursor: 'pointer'}}>
        {loading ? 'Bana raha hun...' : 'Summarize + MCQs Banao'}
      </button>

      {result && <div style={{marginTop: '2rem', padding: '1rem', background: '#f0f0f0', whiteSpace: 'pre-wrap'}}>{result}</div>}
    </main>
  )
}
