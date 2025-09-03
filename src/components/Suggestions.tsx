import React from 'react';
import { Bot, Lightbulb, Loader } from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';

interface SuggestionsProps {
    analysisResult: string;
    isLoadingAnalysis: boolean;
}

const Suggestions: React.FC<SuggestionsProps> = ({ analysisResult, isLoadingAnalysis }) => {
    return (
        <div className="bg-gba-dark-brown/60 p-6 rounded-xl shadow-2xl border border-gba-brown flex flex-col">
            <h2 className="text-xl font-press-start mb-4 flex items-center gap-2">
                <Bot className="text-gba-gold" />
                Sugerencias del Asistente
            </h2>
            <div className="bg-gba-deep-brown/70 rounded-lg p-4 flex-grow overflow-y-auto">
                {isLoadingAnalysis ? (
                    <div className="flex items-center justify-center h-full text-gba-yellow"><Loader className="animate-spin w-8 h-8 mr-3" /> Procesando tu código...</div>
                ) : !analysisResult ? (
                    <div className="flex flex-col items-center justify-center h-full text-center text-gba-brown">
                        <Lightbulb className="w-10 h-10 mb-2"/>
                        <p>Los resultados de tu análisis aparecerán aquí.</p>
                    </div>
                ) : (
                    <MarkdownRenderer content={analysisResult} />
                )}
            </div>
        </div>
    );
};

export default Suggestions;
