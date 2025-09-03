import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

const MODEL_NAME = "gemini-1.5-flash-latest";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    if (req.body && typeof req.body === 'object' && 'prompt' in req.body) {
        const { prompt } = req.body as { prompt: string };
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.error("GEMINI_API_KEY not found on server.");
            return res.status(500).json({ error: 'API Key not configured on server' });
        }

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        try {
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: MODEL_NAME });

            const generationConfig = {
                temperature: 0.9,
                topK: 1,
                topP: 1,
                maxOutputTokens: 2048,
            };

            const safetySettings = [
                {
                    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
            ];

            const parts = [
                { text: prompt },
            ];

            const result = await model.generateContent({
                contents: [{ role: "user", parts }],
                generationConfig,
                safetySettings,
            });

            if (result.response) {
                res.status(200).json(result.response);
            } else {
                console.error("Gemini API Error: No response from the API.", result);
                res.status(500).json({ error: 'No response from Gemini API' });
            }

        } catch (err: unknown) {
            console.error("Failed to call Gemini API:", err);
            const message = err instanceof Error ? err.message : String(err);
            res.status(500).json({ error: `Internal Server Error: ${message}` });
        }
    } else {
        return res.status(400).json({ error: 'Invalid request body' });
    }
}