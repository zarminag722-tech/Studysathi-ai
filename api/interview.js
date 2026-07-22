import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { job, answer } = req.body;
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    let prompt;
    if (!answer) {
      prompt = `You are an HR Interviewer. Ask 3 interview questions for a ${job} job.`;
    } else {
      prompt = `Job: ${job}. Candidate Answer: ${answer}. Give score out of 10 and 2 lines feedback. Be supportive.`;
    }
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const output = response.text();
    
    res.status(200).json({ result: output });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
