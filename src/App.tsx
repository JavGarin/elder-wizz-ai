import { useState } from 'react';
import Header from './components/Header';
import CodeEditor from './components/CodeEditor';
import Suggestions from './components/Suggestions';
import Exercise from './components/Exercise';

// --- Type Definitions for API and State ---

interface GeminiPart {
    text: string;
}

interface GeminiContent {
    parts: GeminiPart[];
    role: string;
}

interface GeminiCandidate {
    content: GeminiContent;
    finishReason: string;
    index: number;
    safetyRatings: any[]; // You might want to define a more specific type for safetyRatings
}

interface GeminiResponse {
    candidates: GeminiCandidate[];
    // The usageData is not used in this application, so it's commented out.
    // usageMetadata: {
    //     promptTokenCount: number;
    //     candidatesTokenCount: number;
    //     totalTokenCount: number;
    // };
}

interface ExerciseCache {
    date: string;
    exercise: string;
}

type Difficulty = 'aprendizaje' | 'intermedio' | 'avanzado';

// --- Main App Component ---

export default function App() {
    const initialCode = `// Pega tu código aquí...
function factorial(n) {
    if (n < 0) return -1; 
    if (n == 0) return 1;
    var result = 1;
    for(var i=n; i > 0; i--){
    result = result * i;
}
    return result;
}`;

    const [code, setCode] = useState<string>(initialCode);
    const [analysisResult, setAnalysisResult] = useState<string>('');
    const [dailyExercise, setDailyExercise] = useState<string>('');
    const [isLoadingAnalysis, setIsLoadingAnalysis] = useState<boolean>(false);
    const [isLoadingExercise, setIsLoadingExercise] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    // --- API Call Logic ---

    const callGeminiAPI = async (prompt: string): Promise<string> => {
        const requestBody = { prompt };

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const errorBody = await response.json();
                console.error("API Error Response:", errorBody);
                throw new Error(`Error de la API: ${response.status} ${response.statusText}. ${errorBody?.error || ''}`);
            }

            const data: GeminiResponse = await response.json();

            if (data.candidates && data.candidates.length > 0 && data.candidates[0].content) {
                return data.candidates[0].content.parts[0].text;
            } else {
                if (data.candidates?.[0]?.finishReason === 'SAFETY') {
                    return "El contenido no pudo ser generado debido a las políticas de seguridad. Intenta con un código diferente.";
                }
                console.warn("Unexpected API response structure:", data);
                return "No se recibió una respuesta válida de la IA.";
            }
        } catch (err: unknown) {
            console.error("Failed to call Gemini API:", err);
            const message = err instanceof Error ? err.message : String(err);
            setError(`No se pudo conectar con el servicio de IA. Revisa la consola para más detalles. (${message})`);
            throw err;
        }
    };

    // --- Feature Handlers ---

    const handleAnalyzeCode = async (): Promise<void> => {
        setIsLoadingAnalysis(true);
        setAnalysisResult('');
        
        const systemPrompt = `Eres un analista de código experto y un mentor de programación...`; // Same prompt as before
        const userPrompt = `${systemPrompt}

Analiza este código:


${code}


`;

        try {
            const result = await callGeminiAPI(userPrompt);
            setAnalysisResult(result);
        } catch {
            // Error is handled in callGeminiAPI
        } finally {
            setIsLoadingAnalysis(false);
        }
    };

    const handleGenerateExercise = async (difficulty: Difficulty): Promise<void> => {
        const today = new Date().toISOString().split('T')[0];
        const cachedItem = localStorage.getItem(`exercise_${difficulty}`);

        if (cachedItem) {
            const { date, exercise }: ExerciseCache = JSON.parse(cachedItem);
            if (date === today) {
                setDailyExercise(exercise);
                return;
            }
        }

        setIsLoadingExercise(true);
        setDailyExercise('');

        const prompt = `Genera un único ejercicio de programación para un desarrollador de nivel '${difficulty}'...`; // Same prompt as before
        
        try {
            const result = await callGeminiAPI(prompt);
            setDailyExercise(result);
            const newCache: ExerciseCache = { date: today, exercise: result };
            localStorage.setItem(`exercise_${difficulty}`, JSON.stringify(newCache));
        } catch {
            // Error is handled in callGeminiAPI
        } finally {
            setIsLoadingExercise(false);
        }
    };

    return (
        <div className="bg-gba-deep-brown text-gba-light-yellow min-h-screen font-vt323 flex flex-col">
            <Header />

            {/* Main Content */}
            <main className="container mx-auto px-6 py-8 flex-grow">
                {error && (
                    <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6 shadow-lg" role="alert">
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:items-stretch">
                    <CodeEditor 
                        code={code} 
                        setCode={setCode} 
                        handleAnalyzeCode={handleAnalyzeCode} 
                        isLoadingAnalysis={isLoadingAnalysis} 
                    />
                    <Suggestions 
                        analysisResult={analysisResult} 
                        isLoadingAnalysis={isLoadingAnalysis} 
                    />
                </div>

                <Exercise 
                    dailyExercise={dailyExercise} 
                    isLoadingExercise={isLoadingExercise} 
                    handleGenerateExercise={handleGenerateExercise} 
                />

            </main>
        </div>
    );
}