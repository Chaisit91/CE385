import 'dotenv/config';
import express, { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
4
const app = express();
app.use(express.json());


const ai = new GoogleGenAI({
    apiKey: process.env['GEMINI_APY_KEY'],

});


app.post('/chat', async (req: Request, res: Response) => {
    try{
    const { message } = req.body as { message?: string };

    if (!message || message.trim() === '') {
        res.status(400).json({ error: 'message is required' });
        return;
    }

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-lite',
        contents: [{ role: 'user', parts: [{ text: message }] }],



    });

    
    res.json({ reply: response.text });
} catch (error: unknown) {
    if (error instanceof Error) {
      const message = error.message;

      if (message.includes("API_KEY_INVALID") || message.includes("401")) {
        console.error("API Key is invalid or expired. Check your GEMINI_API_KEY in .env.");
      } else if (message.includes("429") || message.includes("RESOURCE_EXHAUSTED")) {
        console.error("Rate limit exceeded or resources exhausted.");
      } else if (message.includes("SAFETY")) {
        console.error("Warning: Safety filter triggered.");
      } else if (message.includes("50") || message.includes("UNAVAILABLE")) {
        console.error("Service unavailable - Try again later.");
      } else {
        console.error("Unexpected error:", message);
      }
    }

    return null;
  }


    
});
app.post('/chat/stream', async (req: Request, res: Response) => {
    const { message } = req.body as { message?: string };

    if (!message || message.trim() === '') {
        res.status(400).json({ error: 'message is required' });
        return;
    }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cahe-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const response = await ai.models.generateContentStream({
        model: 'gemini-2.5-flash-lite',
        contents: [{ role: 'user', parts: [{ text: message }] }],


    });

    for await (const chunk of response) {
        if (chunk.text) {
            res.write(`data: ${JSON.stringify({ text: chunk.text })}\n\n`);

        }
    }

    res.write('data:[DONE] \n\n');
    res.end();
});


app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');

});

