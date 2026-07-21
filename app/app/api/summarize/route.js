import { GoogleGenerativeAI } from "@google/generative-ai"

export async function POST(req) {
  const { text } = await req.json()
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
  
  const prompt = `Summarize this text in 5 bullet points and make 3 MCQs with answers: ${text}`
  const result = await model.generateContent(prompt)
  
  return Response.json({ result: result.response.text() })
}
