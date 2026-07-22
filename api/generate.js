export default async function handler(req, res) {
  if (req.method!== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { notes } = req.body;
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  const prompt = notes;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  const data = await response.json();
  const result = data.candidates?.[0]?.content?.parts?.[0]?.text;

  res.status(200).json({ result });
}
