"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const generative_ai_1 = require("@google/generative-ai");
const MODEL_NAME = "gemini-1.5-flash-latest";
async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
    if (req.body && typeof req.body === 'object' && 'prompt' in req.body) {
        const { prompt } = req.body;
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error("GEMINI_API_KEY not found on server.");
            return res.status(500).json({ error: 'API Key not configured on server' });
        }
        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }
        try {
            const genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: MODEL_NAME });
            const generationConfig = {
                temperature: 0.9,
                topK: 1,
                topP: 1,
                maxOutputTokens: 2048,
            };
            const safetySettings = [
                {
                    category: generative_ai_1.HarmCategory.HARM_CATEGORY_HARASSMENT,
                    threshold: generative_ai_1.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                    category: generative_ai_1.HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                    threshold: generative_ai_1.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                    category: generative_ai_1.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                    threshold: generative_ai_1.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                    category: generative_ai_1.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                    threshold: generative_ai_1.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
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
            }
            else {
                console.error("Gemini API Error: No response from the API.");
                res.status(500).json({ error: 'No response from Gemini API' });
            }
        }
        catch (err) {
            console.error("Failed to call Gemini API:", err);
            const message = err instanceof Error ? err.message : String(err);
            res.status(500).json({ error: `Internal Server Error: ${message}` });
        }
    }
    else {
        return res.status(400).json({ error: 'Invalid request body' });
    }
}
